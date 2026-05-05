import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')

const TARGETS = [
  {
    src: join(ROOT, 'public/images/hero/family-hero.jpeg'),
    out: join(ROOT, 'public/images/hero/family-hero.webp'),
    width: 1280,
    quality: 78,
  },
  {
    src: join(ROOT, 'public/images/hero/office-hero.jpg'),
    out: join(ROOT, 'public/images/hero/office-hero.webp'),
    width: 1280,
    quality: 78,
  },
  {
    src: join(ROOT, 'public/images/hero/family-hero2.jpeg'),
    out: join(ROOT, 'public/images/hero/family-hero2.webp'),
    width: 1280,
    quality: 75,
  },
  {
    src: join(ROOT, 'public/images/hero/family-hero3.jpeg'),
    out: join(ROOT, 'public/images/hero/family-hero3.webp'),
    width: 1280,
    quality: 75,
  },
]

async function compress(entry) {
  const before = (await sharp(entry.src).metadata()).size
  await sharp(entry.src)
    .resize({ width: entry.width, withoutEnlargement: true })
    .webp({ quality: entry.quality, effort: 6 })
    .toFile(entry.out)
  const after = (await sharp(entry.out).metadata()).size
  const saved = (((before - after) / before) * 100).toFixed(1)
  console.log(`✓ ${basename(entry.out)}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (−${saved}%)`)
}

console.log('Compressing hero images…\n')
for (const entry of TARGETS) {
  await compress(entry)
}
console.log('\nDone.')
