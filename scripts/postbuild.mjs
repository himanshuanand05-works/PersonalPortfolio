/**
 * Post-build step for static hosting (GitHub Pages):
 *  1. Duplicates the SPA shell into a folder per route so deep links resolve.
 *  2. Injects route-specific JSON-LD structured data into each shell (AEO/GEO).
 *  3. Writes .nojekyll so GitHub Pages serves all assets.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const browser = join(root, 'dist', 'portfolio', 'browser');

if (!existsSync(browser)) {
  console.error('✗ dist/portfolio/browser not found — run `ng build` first.');
  process.exit(1);
}

const shellPath = join(browser, 'index.html');
const shell = readFileSync(shellPath, 'utf8');

// Base for JSON-LD URLs. If an absolute siteUrl override is configured in
// content/site.config.json, use it. Otherwise derive a root-relative base from
// the build's <base href> so URLs resolve correctly on whatever host serves it.
const siteCfg = JSON.parse(readFileSync(join(root, 'content', 'site.config.json'), 'utf8'));
const baseHrefMatch = shell.match(/<base href="([^"]*)"\s*\/?>/);
const baseHref = baseHrefMatch ? baseHrefMatch[1] : '/';
const cfgSite = (siteCfg.siteUrl || '').trim();
const siteUrl = cfgSite ? cfgSite.replace(/\/+$/, '') : (baseHref === '/' ? '' : baseHref.replace(/\/+$/, ''));
console.log(`  base: ${siteUrl || '/'}`);

const profile = {
  name: 'Himanshu Anand',
  headline: 'Senior Full-Stack & Node.js Backend Engineer',
  shortAnswer:
    'Himanshu Anand is a senior full-stack software engineer based in Noida, India, with 7+ years of experience designing Node.js, NestJS and TypeScript microservices, event-driven architectures (Kafka, SAGA, CQRS, transactional outbox) and Agentic RAG platforms with LLM guardrails. He is currently open to senior/lead backend and full-stack opportunities.',
  email: 'himanshuanand05@gmail.com',
  phone: '+91-9457177820',
  location: 'Noida, India',
};
const sameAs = [
  'https://linkedin.com/in/himanshuanand05',
  'https://github.com/himanshuanand05-works',
  'https://www.npmjs.com/~himanshuanand05-works',
];

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: profile.name,
  headline: profile.headline,
  description: profile.shortAnswer,
  jobTitle: 'Lead / Senior Software Engineer',
  email: profile.email,
  telephone: profile.phone,
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  url: siteUrl,
  sameAs,
  knowsAbout: [
    'Node.js', 'TypeScript', 'NestJS', 'Microservices', 'Domain-driven design',
    'Event-driven architecture', 'CQRS', 'SAGA pattern', 'Transactional outbox',
    'Kafka', 'Redis', 'Angular', 'React', 'Agentic RAG', 'MCP', 'LLM guardrails',
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'JSS Academy of Technical Education, Noida' },
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: profile.name,
  description: profile.shortAnswer,
  url: `${siteUrl}/`,
  inLanguage: 'en-US',
  publisher: { '@id': `${siteUrl}/#person` },
  mainEntity: { '@id': `${siteUrl}/#person` },
};

const profilePage = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/#webpage`,
  name: `${profile.name} — ${profile.headline}`,
  url: `${siteUrl}/`,
  isPartOf: { '@id': `${siteUrl}/#website` },
  mainEntity: { '@id': `${siteUrl}/#person` },
  about: { '@id': `${siteUrl}/#person` },
};

const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`,
  })),
});

function render(routePath, jsonLd) {
  const dir = join(browser, ...routePath.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  let html = shell;
  // Do not inject static JSON-LD. The app's runtime SeoService/JsonLdService
  // inject JSON-LD with stable selectors; this keeps URLs correct at any host.
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
}

const staticRoutes = [
  { path: '/experience', name: 'Experience' },
  { path: '/projects', name: 'Projects' },
  { path: '/skills', name: 'Skills' },
  { path: '/knowledge', name: 'Knowledge' },
  { path: '/faq', name: 'FAQ' },
  { path: '/resume', name: 'Resume' },
  { path: '/contact', name: 'Contact' },
];

for (const route of staticRoutes) {
  render(route.path, [
    person,
    breadcrumb([{ name: 'Home', path: '/' }, { name: route.name, path: route.path }]),
  ]);
}

render('/', [website, person, profilePage, breadcrumb([{ name: 'Home', path: '/' }])]);

// Articles
const articlesDir = join(root, 'content', 'articles');
const frontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!match) return data;
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
  }
  return data;
};

if (existsSync(articlesDir)) {
  for (const file of readdirSync(articlesDir).filter((f) => f.endsWith('.md'))) {
    const meta = frontmatter(readFileSync(join(articlesDir, file), 'utf8'));
    const slug = file.replace(/\.md$/, '');
    render(`/knowledge/${slug}`, [
      person,
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: meta.title,
        description: meta.description,
        datePublished: meta.date,
        dateModified: meta.date,
        author: { '@id': `${siteUrl}/#person` },
        publisher: { '@id': `${siteUrl}/#person` },
        mainEntityOfPage: `${siteUrl}/knowledge/${slug}`,
        inLanguage: 'en-US',
      },
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Knowledge', path: '/knowledge' },
        { name: meta.title, path: `/knowledge/${slug}` },
      ]),
    ]);
  }
}

// 404
if (existsSync(join(root, 'public', '404.html'))) {
  const notFoundDir = join(browser, '404');
  mkdirSync(notFoundDir, { recursive: true });
  writeFileSync(
    join(notFoundDir, 'index.html'),
    readFileSync(join(root, 'public', '404.html'), 'utf8'),
    'utf8',
  );
}

// .nojekyll
writeFileSync(join(browser, '.nojekyll'), '', 'utf8');

console.log(`✓ postbuild: route shells duplicated (${staticRoutes.length + 1} pages + articles), .nojekyll written`);
