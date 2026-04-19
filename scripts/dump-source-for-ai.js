/**
 * Tek seferlik: app/, lib/, kök config ve public metinlerini birleştirir.
 * Çalıştır: node scripts/dump-source-for-ai.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outName = 'KAYNAK_BIRLESIK_AI_ICIN.txt';
const sep = `\n\n${'='.repeat(80)}\n\n`;

function add(chunks, rel) {
  const fp = path.join(root, rel);
  if (!fs.existsSync(fp)) return;
  chunks.push(`FILE: ${rel.split(path.sep).join('/')}`);
  chunks.push(fs.readFileSync(fp, 'utf8'));
}

function collect(relDir, pred) {
  const base = path.join(root, relDir);
  if (!fs.existsSync(base)) return [];
  const out = [];
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, ent.name);
      const r = path.relative(root, f);
      if (ent.isDirectory()) walk(f);
      else if (pred(ent.name, r)) out.push(r.split(path.sep).join('/'));
    }
  }
  walk(base);
  return out.sort();
}

const chunks = [];
const header =
  'FinansRehberi — proje kaynak kodu (birleştirilmiş)\n' +
  'Kullanım: başka bir AI’ya yapıştırmak / analiz\n' +
  'NOT: .env.local ve node_modules DAHİL DEĞİL\n\n';
chunks.push(header);

const appFiles = collect('app', (n) => /\.(js|css)$/.test(n));
const libFiles = collect('lib', (n) => n.endsWith('.js'));

for (const f of [
  'package.json',
  'next.config.js',
  'tailwind.config.js',
  'postcss.config.js',
  'jsconfig.json',
  '.eslintrc.json',
]) {
  add(chunks, f);
}

for (const f of [
  'README.md',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/favicon.svg',
  'public/google6e82a2373f8ed4ee.html',
]) {
  add(chunks, f);
}

for (const f of appFiles) add(chunks, f);
for (const f of libFiles) add(chunks, f);

const text = chunks.join(sep);
const outPath = path.join(root, outName);
fs.writeFileSync(outPath, text, 'utf8');

let fileCount = 0;
for (let i = 0; i < chunks.length; i++) {
  if (chunks[i].startsWith('FILE: ')) fileCount++;
}
console.log('Yazıldı:', outPath);
console.log('Boyut (bayt):', Buffer.byteLength(text, 'utf8'));
console.log('Dosya sayısı:', fileCount);
