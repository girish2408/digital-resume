
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');



async function extractTextFromPDF(path: string) {
    const pdf = require('pdf-parse');
    console.log('PDF-PARSE Import type:', typeof pdf);
    // console.log('Keys:', Object.keys(pdf));

    const dataBuffer = fs.readFileSync(path);
    let pdfFunc = pdf;
    
    // Handle weird export structure
    if (typeof pdf !== 'function') {
        if (pdf.default) pdfFunc = pdf.default;
        else if (pdf.PDFParse) pdfFunc = pdf.PDFParse; // Sometimes it's a class?
        else {
             // Try to find a function in the object
             const funcKey = Object.keys(pdf).find(k => typeof pdf[k] === 'function');
             if (funcKey) pdfFunc = pdf[funcKey];
        }
    }

    if (typeof pdfFunc !== 'function') {
        // Fallback for v1.1.1 if default export issue
        if (pdf.default && typeof pdf.default === 'function') pdfFunc = pdf.default;
    }

    try {
        console.log("Calling pdf-parse function...");
        const data = await pdfFunc(dataBuffer);
        return data.text;
    } catch (e) {
        throw e;
    }
}

// Test if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
   extractTextFromPDF('public/Girish_Jan_2026.pdf').then(text => {
       console.log('Extracted text length:', text.length);
       console.log('Preview:', text.substring(0, 500));
   }).catch(console.error);
}

export { extractTextFromPDF };
