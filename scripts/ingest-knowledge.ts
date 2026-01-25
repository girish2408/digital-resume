
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import * as lancedb from '@lancedb/lancedb';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Load .env.local first
dotenv.config(); // Then .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DB_DIR = path.join(process.cwd(), 'data/lancedb');

async function ingest() {
  console.log('Connecting to LanceDB at', DB_DIR);
  // Create data directory if it doesn't exist
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = await lancedb.connect(DB_DIR);
  
  // Define schema-like structure implicitly by adding data, or explicitly if needed.
  // For LanceDB, we can often just pass data. But creating table ensures it exists.
  // We'll use overwrite mode to refresh knowledge.
  
  // Note: @lancedb/lancedb API might differ slightly from python or old node versions.
  // We'll try to create a table.
  
  const files = await glob('knowledge/**/*.md');
  console.log(`Found ${files.length} knowledge files.`);

  const data: Array<{ id: string; vector: number[]; text: string; source: string }> = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    // Split by newlines to avoid huge tokens. 
    // We will group lines until we reach a rough character limit (e.g. 1000 chars)
    const lines = content.split('\n');
    const chunks: string[] = [];
    let currentChunk = '';

    for (const line of lines) {
      if ((currentChunk + line).length > 1000 && currentChunk.length > 0) {
        chunks.push(currentChunk);
        currentChunk = '';
      }
      currentChunk += line + '\n';
    }
    if (currentChunk.trim().length > 0) chunks.push(currentChunk);

    console.log(`Processing ${file}: ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
        if (i % 10 === 0) console.log(`  Processing chunk ${i + 1}/${chunks.length}...`);
      const chunk = chunks[i];
      // Skip very short chunks
      if (chunk.length < 10) continue;

      try {
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk,
        });

        const embedding = embeddingResponse.data[0].embedding;
        
        data.push({
            id: `${path.basename(file)}-${i}`,
            vector: embedding,
            text: chunk,
            source: file,
        });
      } catch (e) {
        console.error(`Error generating embedding for chunk in ${file}:`, e);
      }
    }
  }

  if (data.length > 0) {
    try {
        // Create table with the first batch of data
        // If table exists, existing one will be overwritten because we will 'overwrite' or just drop it first.
        const existingTables = await db.tableNames();
        if (existingTables.includes('knowledge')) {
            await db.dropTable('knowledge');
        }
        
        const table = await db.createTable('knowledge', data);
        console.log(`Successfully indexed ${data.length} chunks into 'knowledge' table.`);
    } catch (error) {
       console.error("Error creating table:", error); 
    }
  } else {
    console.log("No data to index.");
  }
}

ingest().catch(console.error);
