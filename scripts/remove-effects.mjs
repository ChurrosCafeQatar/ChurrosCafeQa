import fs from 'fs';
let code = fs.readFileSync('components/cafe-site.tsx', 'utf-8');
code = code.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[[^\]]*\]\);/g, '');
fs.writeFileSync('components/cafe-site.tsx', code);
