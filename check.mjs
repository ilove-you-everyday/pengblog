import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => readFile(path.join(root, relative), 'utf8');
const pkg = JSON.parse(await read('package.json'));
const config = JSON.parse(await read('vercel.json'));
const html = await read('public/index.html');
const css = await read('public/styles.css');
const app = await read('public/app.js');
const notFound = await read('public/404.html');
const build = await read('scripts/build.mjs');
const motion = await read('public/assets/clawd-motions.css');
for (const file of ['public/index.html','public/styles.css','public/app.js','public/data/posts.json','public/404.html','public/assets/clawd-404.svg','public/assets/clawd-motions.css','content/posts/README.md','api/twikoo.js']) {
  await access(path.join(root,file)).catch(()=>{throw new Error(`Missing required file: ${file}`)});
}
if (!config.rewrites?.some(rule=>rule.source==='/api/twikoo/(.*)'&&rule.destination==='/api/twikoo')) throw new Error('Twikoo API route rewrite is missing.');
if (!config.functions || !Object.keys(config.functions).includes('api/*.js')) throw new Error('Vercel API function pattern must match api/*.js.');
if (!pkg.dependencies?.['twikoo-vercel']) throw new Error('Twikoo server adapter dependency missing.');
if (pkg.dependencies?.mongodb) throw new Error('Unused database dependency remains; article authoring is Markdown-based.');
if (html.includes('管理入口') || html.includes('id="admin-layer"') || html.includes('id="admin-token"') || html.includes('footer-admin')) throw new Error('Admin entry or login markup should not ship.');
if (html.includes('starter-posts-data') || html.includes('写作，是把模糊的念头变成可以复用的知识') || html.includes('class="tag-static"')) throw new Error('Bundled demonstration content should not ship.');
if (!html.includes('id="home-clawd"') || !app.includes("homeMount.addEventListener('click'")) throw new Error('Clawd touch interaction missing.');
if (!app.includes("e.key === 'Enter' || e.key === ' '")) throw new Error('Clawd keyboard interaction missing.');
if (!html.includes('aria-label="主导航"') || !html.includes('id="menu-toggle"') || !html.includes('id="menu-panel"') || !css.includes('body.nav-compact .site-header')) throw new Error('Reference-style floating nav or its compact-on-scroll state is missing.');
if (!css.includes('.clawd-interaction-hint')) throw new Error('Clawd interaction hint missing.');
if (motion.includes('\\n.clawd-send') || motion.includes('\\n.clawd-sent')) throw new Error('Clawd motion stylesheet contains literal escaped line breaks.');
if (!html.includes('id="stat-post-count"') || !html.includes('id="stat-category-count"')) throw new Error('Homepage article/category statistics are missing.');
if (html.includes('id="tags"') || /<section[^>]*class="tags-section/.test(html) || app.includes('function renderTags') || app.includes('activeTag')) throw new Error('The removed tag page/filter is still present.');
if (!html.includes('id="category-filter"') || !html.includes('data-category-entry') || !app.includes('function renderCategories') || !app.includes('activeCategory')) throw new Error('The category navigation must open a working category filter.');
if (!html.includes('class="clawd-interaction-hint sr-only"') || !css.includes('.sr-only{')) throw new Error('Clawd hint must remain accessible without occupying visible layout.');
if (app.includes('post-card-bottom') || html.includes('class="post-card-tags"')) throw new Error('Article cards still include the removed footer/tag UI.');
if (!css.includes('min-height:300px') || !css.includes('.hero-copy{align-self:start}')) throw new Error('Mobile hero spacing no longer matches the reference viewport.');
if (!notFound.includes('class="not-found-body"') || !notFound.includes('body.not-found-body{margin:0!important;padding:0!important')) throw new Error('404 page inherits homepage navigation spacing.');
if (notFound.includes('javascript:history.back()')) throw new Error('404 page must not use a javascript: URL for navigation.');
if (!css.includes('.home-clawd-mount:focus:not(:focus-visible)') || !css.includes('background:transparent!important')) throw new Error('Clawd border/background and pointer focus cleanup is missing.');
if (!css.includes('.article-layer{z-index:200}') || !html.includes('id="article-layer"')) throw new Error('Article reader must be layered above the fixed header so controls remain clickable.');
if (!app.includes('const dateOnly=raw.match(') || !app.includes('new Date(Number(dateOnly[1]),Number(dateOnly[2])-1,Number(dateOnly[3]))')) throw new Error('Date-only article values must be formatted in local calendar time.');
if (!html.includes('This is whhblog') || !html.includes('@pwhilove@gmail.com')) throw new Error('About contact line is missing.');
if (!notFound.includes('404') || !notFound.includes('回到首页') || !notFound.includes('not-found-clawd')) throw new Error('Branded and interactive 404 page is incomplete.');
if (!build.includes("path.join(root, 'content', 'posts')") || !build.includes("'posts.json'")) throw new Error('Markdown article generation is missing.');
if (!app.includes("fetch('/data/posts.json'") || !app.includes('function markdownToSafeHTML(')) throw new Error('Generated articles are not connected to front-end rendering.');
if (app.includes('header.classList.remove') || app.includes('STORAGE_ADMIN_TOKEN') || app.includes('/api/posts')) throw new Error('Removed legacy admin/hidden-header code is still referenced.');
const ids=[...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]);
if (ids.length!==new Set(ids).size) throw new Error('Duplicate HTML IDs found.');
const postFiles=(await readdir(path.join(root,'content','posts'))).filter(name=>name.endsWith('.md')&&name.toLowerCase()!=='readme.md');
if(postFiles.length!==0) console.log(`Found ${postFiles.length} Markdown article source file(s).`);
for(const file of ['index.html','styles.css','app.js','404.html']) {
  const text=await read(`public/${file}`);
  if (text.includes('\u0000')) throw new Error(`Unexpected binary NUL in public/${file}`);
}
for (const file of ['styles.css','assets/clawd-motions.css']) {
  const text=await read(`public/${file}`);
  if ((text.match(/{/g)||[]).length!==(text.match(/}/g)||[]).length) throw new Error(`Unbalanced braces in public/${file}`);
}
const scripts=(await readdir(path.join(root,'scripts'))).filter(name=>name.endsWith('.cjs'));
for(const file of scripts){const result=spawnSync(process.execPath,[path.join(root,'scripts',file)],{encoding:'utf8',env:process.env});if(result.status!==0){process.stderr.write(result.stderr||result.stdout||`Failed: ${file}\n`);process.exit(result.status||1)}process.stdout.write(result.stdout||'');}
console.log('HALCYON checks passed: responsive full-width floating navigation, touch/keyboard Clawd, empty author-owned content, Markdown build pipeline, hidden CMS removal, branded 404, Twikoo routes, and valid assets.');
