import fs from 'fs';
let code = fs.readFileSync('components/cafe-site.tsx', 'utf-8');

// The regex I used earlier: /function SiteDialog[\s\S]*?export function BranchExplorer[^}]*\}\s*\}/
// Let's just find the indexes!
const startIndex = code.indexOf('function SiteDialog');
const endIndex = code.indexOf('function PageHeading');
if (startIndex !== -1 && endIndex !== -1) {
  code = code.slice(0, startIndex) + code.slice(endIndex);
}

fs.writeFileSync('components/cafe-site.tsx', code);
