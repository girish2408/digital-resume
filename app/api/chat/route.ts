
import { OpenAI } from 'openai';
import * as lancedb from '@lancedb/lancedb';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const dbPath = path.join(process.cwd(), 'data/lancedb');
    // Ensure we can connect even if folder is missing (it throws if root dir missing?)
    // lancedb.connect creates the directory if using local file system usually, 
    // but openTable throws if table doesn't exist.
    const db = await lancedb.connect(dbPath);
    
    let table;
    try {
        // List tables to check if 'knowledge' exists before opening to avoid crash if API behavior is strict
        const tableNames = await db.tableNames();
        if (!tableNames.includes('knowledge')) {
             return NextResponse.json({ 
                response: "girish doesnt have clue about this or leave the query will be handled later (Knowledge base empty)" 
            });
        }
        table = await db.openTable('knowledge');
    } catch (e) {
        console.error("Error opening table:", e);
        return NextResponse.json({ 
            response: "girish doesnt have clue about this or leave the query will be handled later (Database error)" 
        });
    }

    // Generate embedding for query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    });
    const queryVector = embeddingResponse.data[0].embedding;

    // Search vector DB
    const results = await table.vectorSearch(queryVector)
      .limit(3)
      .toArray();

    // Construct context
    // If results are empty or distance is too high (low similarity), we might want to skip? 
    // But for now let's pass top 3.
    if (results.length === 0) {
         return NextResponse.json({ response: "I don't have enough details on that specific topic in my current knowledge base to provide an accurate answer, but I would be happy to discuss it further if you get in touch!" });
    }

    const context = results.map((r: any) => r.text).join('\n---\n');

    // Generate completion
    const systemPrompt = `You are a helpful assistant for Girish's resume/portfolio. 
    You have access to the following context from his knowledge base:
    
    ${context}
    
    Answer the user's question based ONLY on the above context.
    If the answer is not in the context, say exactly: "I don't have enough details on that specific topic in my current knowledge base to provide an accurate answer, but I would be happy to discuss it further if you get in touch!".
    Do not hallucinate or use outside knowledge.
    Keep the answer concise and helpful.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
    });

    const responseText = completion.choices[0].message.content || "No response generated.";

    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
