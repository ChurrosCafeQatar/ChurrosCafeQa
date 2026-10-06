import fs from 'fs';
let code = fs.readFileSync('data/content.js', 'utf-8');

// Use regex to remove the branch object from the array
code = code.replace(/,\s*\{\s*id:\s*'mall-of-qatar'[\s\S]*?number:\s*'05'\s*\}/, '');

// Also remove the translation
code = code.replace(/,\s*'Make your Mall of Qatar visit sweeter with churros, waffles, pancakes, and refreshing drinks\.':\s*'[^']+'/g, '');

fs.writeFileSync('data/content.js', code);
