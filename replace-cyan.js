import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/imposing-cyan/g, 'imposing-gold');
content = content.replace(/rgba\(0,\s*255,\s*255/g, 'rgba(212, 175, 55');
content = content.replace(/cyan-bg-btn/g, 'gold-bg-btn');
content = content.replace(/cyan-border-btn/g, 'gold-border-btn');
content = content.replace(/cyan-slash/g, 'gold-slash');
content = content.replace(/#00ffff/ig, '#D4AF37');
content = content.replace(/uColorCyan/g, 'uColorGold');

fs.writeFileSync(filePath, content);
console.log('Replacements completed successfully!');
