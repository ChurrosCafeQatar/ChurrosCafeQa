import fs from 'fs';
let code = fs.readFileSync('data/content.js', 'utf-8');

const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Four branches across Qatar')) {
    lines[i] = "  'Four branches across Qatar.<br>One unmistakable taste.': \"4 U?OU^O1 U?US U,OO.<br>U^U.OO U, U^O OO_ U,O  USU?U+O3U%.\",";
  }
  if (lines[i].includes('Four real branches across Qatar')) {
    lines[i] = "  'Four real branches across Qatar, each serving the churros, desserts, and drinks you love.': \"4 U?OU^O1 U?US U,OO OU,O_U. O U,OO'U^OU^O U^O U,OU,U^USO O U^O U,U.O'OU^O\\\"O O O U,OUS OOO\\\"UO .\",";
  }
}

fs.writeFileSync('data/content.js', lines.join('\n'));
