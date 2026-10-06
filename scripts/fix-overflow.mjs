import fs from 'fs';
let code = fs.readFileSync('app/menu/page.tsx', 'utf-8');

const regex = /(<nav className="menu-controls sticky"[\s\S]*?<\/nav>)\s*(<div className="page-body">)/;
code = code.replace(regex, '$2\n\n        $1');

fs.writeFileSync('app/menu/page.tsx', code);
