
import dotenv from 'dotenv';
import path from 'path';
import * as lancedb from '@lancedb/lancedb';
import OpenAI from 'openai';

dotenv.config({ path: '.env.local' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DB_DIR = path.join(process.cwd(), 'data/lancedb');

async function testQuery(query: string) {
    console.log(`\nTesting Query: "${query}"`);
    const db = await lancedb.connect(DB_DIR);
    const table = await db.openTable('knowledge');

    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: query,
    });
    const vector = embedding.data[0].embedding;

    const results = await table.vectorSearch(vector).limit(3).toArray();
    
    if (results.length === 0) {
        console.log("No results found in DB.");
        return;
    }

    const context = results.map((r: any) => r.text).join('\n---\n');
    // console.log("Context found:", context.substring(0, 200) + "...");

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
        { role: 'user', content: query },
      ],
    });

    console.log("Response:", completion.choices[0].message.content);
}

async function run() {
    await testQuery("What is the difference between Flow and PropTypes?");
    await testQuery("What is the capital of Mars?");
}

run();
