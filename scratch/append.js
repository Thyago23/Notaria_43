const fs = require('fs');
const tramitesFile = '../frontend/src/data/tramites.ts';
let content = fs.readFileSync(tramitesFile, 'utf8');
const missing = fs.readFileSync('missing_tramites.txt', 'utf8');

content = content.replace(/\n\];[\s\n]*$/, ',\n' + missing + '\n];\n');
fs.writeFileSync(tramitesFile, content);
console.log('Appended to tramites.ts');
