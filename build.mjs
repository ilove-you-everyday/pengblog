import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public');
const output = path.join(root, 'dist');
const contentDir = path.join(root, 'content', 'posts');
for (const relative of ['index.html', 'styles.css', 'app.js', 'data/posts.json', 'assets/clawd-motions.css', 'assets/clawd-404.svg', '404.html']) {
  await access(path.join(source, relative)).catch(() => { throw new Error(`Build input is missing: public/${relative}`); });
}
function yamlScalar(value) {
  const s = String(value ?? '').trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  return s;
}
function parseArticle(sourceText, filename) {
  const text = sourceText.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  if (!text.startsWith('---\n')) throw new Error(`${filename}: missing YAML front matter opening ---`);
  const split = text.indexOf('\n---\n', 4);
  if (split < 0) throw new Error(`${filename}: missing YAML front matter closing ---`);
  const metaText = text.slice(4, split);
  const content = text.slice(split + 5).trim();
  const meta = {};
  for (const line of metaText.split('\n')) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    if (key === 'tags') {
      try { meta.tags = JSON.parse(raw); }
      catch { meta.tags = raw.replace(/^\[|\]$/g, '').split(',').map(x => yamlScalar(x)).filter(Boolean); }
    } else if (key === 'published') meta.published = raw.trim().toLowerCase() !== 'false';
    else meta[key] = yamlScalar(raw);
  }
  const title = String(meta.title || '').trim();
  const slug = String(meta.slug || path.basename(filename, path.extname(filename))).trim().toLowerCase();
  if (!title) throw new Error(`${filename}: title is required`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${filename}: slug must use lowercase letters, numbers and hyphens`);
  if (!content) throw new Error(`${filename}: Markdown body is empty`);
  const date = String(meta.date || new Date('2000-01-01T00:00:00.000Z').toISOString().slice(0, 10));
  const tags = Array.isArray(meta.tags) ? meta.tags.map(x => String(x).trim()).filter(Boolean).slice(0, 20) : [];
  const plain = content.replace(/```[\s\S]*?```/g, ' ').replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/^#{1,6}\s+/gm, '').replace(/[*_`>#~-]/g, ' ').replace(/\s+/g, ' ').trim();
  return { title, slug, category: String(meta.category || '').trim(), tags, published: meta.published !== false, content, excerpt: plain.slice(0, 180), createdAt: date, updatedAt: date, publishedAt: meta.published === false ? null : date };
}
const sourcePosts = [];
for (const filename of (await readdir(contentDir)).filter(name => name.toLowerCase().endsWith('.md') && name.toLowerCase() !== 'readme.md').sort()) {
  sourcePosts.push(parseArticle(await readFile(path.join(contentDir, filename), 'utf8'), filename));
}
const slugs = new Set();
for (const post of sourcePosts) { if (slugs.has(post.slug)) throw new Error(`Duplicate article slug: ${post.slug}`); slugs.add(post.slug); }
const posts = sourcePosts.filter(post => post.published).sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await mkdir(path.join(output, 'data'), { recursive: true });
await writeFile(path.join(output, 'data', 'posts.json'), JSON.stringify({ version: 1, posts }, null, 2) + '\n', 'utf8');
const html = await readFile(path.join(output, 'index.html'), 'utf8');
if (!html.includes('id="post-grid"')) throw new Error('Built HTML is missing the article grid.');
if (posts.length === 0 && !html.includes('id="post-status"')) throw new Error('Empty article state hook is missing.');
console.log(`Built dist/ with ${posts.length} published Markdown article(s), interactive assets and branded 404 page.`);
