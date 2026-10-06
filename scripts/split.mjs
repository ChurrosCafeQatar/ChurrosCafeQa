import fs from 'fs';

const code = fs.readFileSync('components/cafe-site.tsx', 'utf-8');

const interactiveRegex = /export function SiteDialog[\s\S]*?export function BranchExplorer[^}]*\}\s*\}/;
const match = code.match(interactiveRegex);

// But wait! They are not exported with `export function SiteDialog`. They are `function SiteDialog`.
// Let's just find the indexes.
const start = code.indexOf('function SiteDialog');
const end = code.indexOf('function PageHeading');
let extracted = code.slice(start, end);
extracted = extracted.replace('function SiteDialog', 'export function SiteDialog')
                     .replace('function ProductCard', 'export function ProductCard');

const interactiveHeader = `// @ts-nocheck
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import SiteImage from './site-image';
import { categoryCopy, relatedCategories } from '../data/seo';
import { analyticsEnabled, track } from '../data/analytics';
import { CHURROS_CAFE, translations } from '../data/content';
import { MENU_CATEGORIES, categoryBySlug, formatPrice, getMenuSearchText, menuByCategory } from '../data/menu';
import { ArrowIcon, BurstIcon, CloseIcon, DownIcon, MenuIcon, SparkIcon } from './icons';

const filters = [
  { value: 'all', label: 'All', heading: 'All' },
  ...MENU_CATEGORIES.map(category => ({ value: category.slug, label: category.label, heading: category.label }))
];
const categoryFilters = filters.filter(filter => filter.value !== 'all');

function prefix(lang, path = '/') {
  const clean = path.startsWith('/') ? path : \`/\${path}\`;
  return lang === 'ar' ? \`/ar\${clean}\` : clean;
}

export function Rich({ as: Tag = 'span', children, ...props }: any) {
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: children }} />;
}

`;

fs.writeFileSync('components/cafe-interactive.tsx', interactiveHeader + extracted);

let serverCode = code.replace(/'use client';/, '')
                     .replace(extracted, '');
                     
// Prepend imports to cafe-site.tsx
const imports = `import { SiteDialog, ProductCard, ProductGrid, BranchExplorer } from './cafe-interactive';\n`;
const firstImport = serverCode.indexOf('import');
serverCode = serverCode.slice(0, firstImport) + imports + serverCode.slice(firstImport);
fs.writeFileSync('components/cafe-site.tsx', serverCode);
