
const fs = require('fs');
const pdf = require('pdf-parse');
console.log('Required pdf-parse:', pdf);
console.log('pdf.default:', pdf.default);



async function testPdf() {
    try {
        const dataBuffer = fs.readFileSync('public/Girish_April_2026.pdf');
        const data = await pdf(dataBuffer);
        console.log('PDF Text Length:', data.text.length);
        console.log('Preview:', data.text.substring(0, 100));
    } catch (e) {
        console.error('PDF Parse Error:', e);
    }
}

testPdf();
