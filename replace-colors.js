import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacing deep blues with yellowish orange (#FFAA00)
content = content.replace(/#0055ff/g, '#FFAA00');
content = content.replace(/#0044cc/g, '#FF8C00'); // slightly deeper orange for the base to maintain contrast

fs.writeFileSync(filePath, content);
console.log('Colors replaced successfully!');
