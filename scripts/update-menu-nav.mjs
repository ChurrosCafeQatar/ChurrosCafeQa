import fs from 'fs';
let code = fs.readFileSync('app/menu/page.tsx', 'utf-8');

const regex = /<nav className="category-nav sticky" aria-label="Menu categories">[\s\S]*?<\/nav>/;
const newNav = `<nav className="menu-controls sticky" aria-label="Menu categories">
        <div className="filters">
          {MENU_CATEGORIES.map(category => {
            const items = menuByCategory[category.slug];
            const firstItem = items && items.length > 0 ? items.find((item: any) => item.imageExists !== false && item.image) || items[0] : null;
            const imageSrc = firstItem && firstItem.image ? \`/assets/\${firstItem.image}\` : '/assets/menu/Classic Churros.webp';
            
            return (
              <a key={category.slug} href={\`#\${category.slug}\`} className="filter" style={{ textDecoration: 'none' }}>
                <span className="filter-image">
                  <SiteImage src={imageSrc} width={100} height={100} alt="" aria-hidden="true" />
                </span>
                <span>{category.label}</span>
              </a>
            );
          })}
        </div>
      </nav>`;

code = code.replace(regex, newNav);

// also ensure SiteImage is imported if it isn't
if (!code.includes('import SiteImage')) {
  code = code.replace(/import \{ ProductCard, SiteDialog \} from '\.\.\/\.\.\/components\/cafe-interactive';/, `import { ProductCard, SiteDialog } from '../../components/cafe-interactive';\nimport SiteImage from '../../components/site-image';`);
}

fs.writeFileSync('app/menu/page.tsx', code);
