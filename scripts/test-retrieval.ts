
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import * as lancedb from '@lancedb/lancedb';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

async function testRetrieval(query: string) {
  try {
    const dbPath = path.join(process.cwd(), 'data', 'lancedb');
    console.log(`Connecting to DB at ${dbPath}`);
    const db = await lancedb.connect(dbPath);
    const table = await db.openTable('knowledge');

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log(`Generating embedding for: "${query}"`);
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    const queryVector = embeddingResponse.data[0].embedding;

    console.log('Searching vector store...');
    const results = await table.vectorSearch(queryVector)
      .limit(5)
      .toArray();

    console.log(`\nFound ${results.length} results:\n`);
    results.forEach((r, i) => {
      console.log(`--- Result ${i + 1} (Distance: ${r._distance}) ---`);
      console.log(`Source: ${r.source}`);
      console.log(`Text preview: ${r.text.substring(0, 200)}...\n`);
    });

  } catch (error) {
    console.error('Retrieval failed:', error);
  }
}

testRetrieval("what skill set does girish has");
