/**
 * Idempotent seed: pushes the current static content + assets to Sanity.
 * Requires env: SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN (with write perms).
 * Run with: npx tsx scripts/seed-sanity.ts
 */
import { createClient } from '@sanity/client'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_TOKEN env vars.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
})

// ---- helpers ----------------------------------------------------------------

const uploadCache = new Map<string, string>() // resolvedPath -> asset _id

async function resolveAssetImportPath(spec: string): Promise<string> {
  // Handles "@assets/foo.png" or relative paths from client/src/data
  if (spec.startsWith('@assets/')) {
    return path.join(ROOT, 'attached_assets', spec.slice('@assets/'.length))
  }
  if (path.isAbsolute(spec)) return spec
  return path.join(ROOT, spec)
}

async function uploadImage(absPath: string): Promise<string | undefined> {
  if (!existsSync(absPath)) {
    console.warn('  ! missing image:', absPath)
    return undefined
  }
  if (uploadCache.has(absPath)) return uploadCache.get(absPath)
  const buf = await readFile(absPath)
  const filename = path.basename(absPath)
  const asset = await client.assets.upload('image', buf, { filename })
  uploadCache.set(absPath, asset._id)
  console.log('  ↑ uploaded', filename, '→', asset._id)
  return asset._id
}

function imgRef(assetId?: string) {
  return assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined
}

// Resolve image URLs assigned via Vite import (we re-read the raw TS to grab the import literal)
async function staticImportMap(filePath: string): Promise<Map<string, string>> {
  const src = await readFile(filePath, 'utf8')
  const map = new Map<string, string>()
  const re = /import\s+(\w+)\s+from\s+["']([^"']+)["']/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) map.set(m[1], m[2])
  return map
}

// ---- load static sources ----------------------------------------------------

async function loadStatic() {
  // Import via TS file URL — tsx supports it
  const winesMod = await import(pathToFileURL(path.join(ROOT, 'client/src/data/wines.ts')).href)
  const journalMod = await import(pathToFileURL(path.join(ROOT, 'client/src/data/journal.ts')).href)
  const translationsMod = await import(
    pathToFileURL(path.join(ROOT, 'client/src/data/translations.ts')).href
  )
  return {
    wines: winesMod.wines,
    journal: journalMod.journalEntries,
    translations: translationsMod.translations,
    wineImports: await staticImportMap(path.join(ROOT, 'client/src/data/wines.ts')),
    journalImports: await staticImportMap(path.join(ROOT, 'client/src/data/journal.ts')),
  }
}

// When Vite resolves `@assets/x.png` it returns a hashed URL string at runtime.
// In Node (via tsx), the import returns the literal source spec, so we reverse-map
// by parsing the file's import statements ourselves.
function resolveWineImageSpec(varValue: string, imports: Map<string, string>): string | undefined {
  // varValue from import will be the resolved string; but under tsx without Vite, the
  // imported `.png/.jpeg` will throw. So we don't actually import images — we ONLY use the
  // source map of `name -> @assets/...` we parsed. The data file references images by
  // identifier (e.g. blancImage). We can't dereference them post-import. To handle this we
  // re-parse: walk the array literal in source instead.
  return undefined
}

// Because importing image files from a TS module under tsx will fail, we instead
// parse the wines/journal source files for their literal structure.
async function parseWines(): Promise<any[]> {
  const file = path.join(ROOT, 'client/src/data/wines.ts')
  const src = await readFile(file, 'utf8')
  const imports = await staticImportMap(file)
  // Strip imports, then evaluate the array literal with image vars replaced by their @assets paths
  const noImports = src.replace(/^import[^\n]*\n/gm, '')
  let replaced = noImports
  for (const [name, spec] of imports.entries()) {
    replaced = replaced.replace(new RegExp(`\\b${name}\\b`, 'g'), JSON.stringify(spec))
  }
  // Replace `export const wines =` with `module.exports.wines =`
  replaced = replaced.replace(/export\s+const\s+wines\s*=/, 'globalThis.__WINES__ =')
  // eslint-disable-next-line no-new-func
  new Function(replaced)()
  return (globalThis as any).__WINES__
}

async function parseJournal(): Promise<any[]> {
  const file = path.join(ROOT, 'client/src/data/journal.ts')
  const src = await readFile(file, 'utf8')
  const imports = await staticImportMap(file)
  const noImports = src.replace(/^import[^\n]*\n/gm, '')
  let replaced = noImports
  for (const [name, spec] of imports.entries()) {
    replaced = replaced.replace(new RegExp(`\\b${name}\\b`, 'g'), JSON.stringify(spec))
  }
  replaced = replaced.replace(/export\s+const\s+journalEntries\s*=/, 'globalThis.__JOURNAL__ =')
  new Function(replaced)()
  return (globalThis as any).__JOURNAL__
}

// ---- flatten translations ---------------------------------------------------

function flatten(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object') Object.assign(out, flatten(v, key))
    else out[key] = String(v)
  }
  return out
}

// ---- seed -------------------------------------------------------------------

async function seedWines(wines: any[]) {
  console.log(`\n— Wines (${wines.length})`)
  for (let i = 0; i < wines.length; i++) {
    const w = wines[i]
    const mainPath = await resolveAssetImportPath(w.img)
    const mainId = await uploadImage(mainPath)
    const galleryIds: string[] = []
    for (const g of w.images || []) {
      const id = await uploadImage(await resolveAssetImportPath(g))
      if (id) galleryIds.push(id)
    }
    const doc: any = {
      _id: `wine-${w.slug}`,
      _type: 'wine',
      slug: { _type: 'slug', current: w.slug },
      name: { en: w.en.name, fr: w.fr.name },
      vintage: w.en.vintage || '',
      order: i,
      mainImage: imgRef(mainId),
      gallery: galleryIds.map((id, idx) => ({ _key: `g${idx}`, ...imgRef(id) })),
      techSheetUrl: w.tech,
      note: { en: w.en.note, fr: w.fr.note },
      tastingNotes: w.en.tastingNotes
        ? {
            sight: { en: w.en.tastingNotes.sight, fr: w.fr.tastingNotes.sight },
            nose: { en: w.en.tastingNotes.nose, fr: w.fr.tastingNotes.nose },
            palate: { en: w.en.tastingNotes.palate, fr: w.fr.tastingNotes.palate },
          }
        : undefined,
      awards: (w.en.awards || []).map((a: any, idx: number) => ({
        _key: `a${idx}`,
        _type: 'award',
        title: { en: a.title, fr: w.fr.awards?.[idx]?.title || a.title },
        score: { en: a.score, fr: w.fr.awards?.[idx]?.score || a.score },
        year: a.year,
      })),
      quote: { en: w.en.quote, fr: w.fr.quote },
      quoteSource: w.en.quotesource,
    }
    await client.createOrReplace(doc)
    console.log('  ✓ wine', w.slug)
  }
}

async function seedJournal(entries: any[]) {
  console.log(`\n— Journal (${entries.length})`)
  for (let i = 0; i < entries.length; i++) {
    const j = entries[i]
    const id = await uploadImage(await resolveAssetImportPath(j.img))
    const slug = (j.en.title || `post-${i}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const doc: any = {
      _id: `journal-${slug}-${i}`,
      _type: 'journalPost',
      slug: { _type: 'slug', current: slug },
      title: { en: j.en.title, fr: j.fr.title },
      excerpt: { en: j.en.excerpt, fr: j.fr.excerpt },
      href: j.href || '#',
      publishedAt: new Date(j.date).toISOString(),
      image: imgRef(id),
    }
    await client.createOrReplace(doc)
    console.log('  ✓ journal', slug)
  }
}

async function seedStory() {
  console.log('\n— Story paragraphs')
  const paragraphs = [
    { key: 'p1', img: 'bee_1754904751800.png', alt: "Bee on vine leaves", caption: 'The bee as our muse' },
    { key: 'p2', img: 'Le Soula valley_1754909174954.jpeg', alt: 'Le Soula valley landscape', caption: 'Terroir of granite and schist' },
    { key: 'p3', img: 'Etiquettes_1754823984581.jpg', alt: 'Le Soula wine labels', caption: 'Restored cellar in Prugnanes' },
    { key: 'p4', img: '6_1754904851528.png', alt: 'Wendy Wilson at the winery', caption: "Today's living ecosystem" },
  ]
  // pull en/fr text from translations module
  const translationsMod = await import(pathToFileURL(path.join(ROOT, 'client/src/data/translations.ts')).href)
  const t = translationsMod.translations
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i]
    const id = await uploadImage(path.join(ROOT, 'attached_assets', p.img))
    const doc: any = {
      _id: `story-${i + 1}`,
      _type: 'storyParagraph',
      order: i + 1,
      body: { en: t.en.story[p.key], fr: t.fr.story[p.key] },
      image: imgRef(id),
      imageAlt: { en: p.alt, fr: p.alt },
      caption: { en: p.caption, fr: p.caption },
    }
    await client.createOrReplace(doc)
    console.log('  ✓ story', p.key)
  }
}

async function seedTranslations() {
  console.log('\n— UI Translations')
  const translationsMod = await import(pathToFileURL(path.join(ROOT, 'client/src/data/translations.ts')).href)
  const t = translationsMod.translations
  const enFlat = flatten(t.en)
  const frFlat = flatten(t.fr)
  const keys = new Set([...Object.keys(enFlat), ...Object.keys(frFlat)])
  let n = 0
  for (const key of keys) {
    const safeId = 'tr-' + key.replace(/[^a-zA-Z0-9]/g, '-')
    await client.createOrReplace({
      _id: safeId,
      _type: 'translation',
      key,
      en: enFlat[key] || '',
      fr: frFlat[key] || enFlat[key] || '',
    })
    n++
  }
  console.log(`  ✓ ${n} translation entries`)
}

async function main() {
  console.log(`Seeding Sanity project=${projectId} dataset=${dataset}`)
  const wines = await parseWines()
  const journal = await parseJournal()
  await seedWines(wines)
  await seedJournal(journal)
  await seedStory()
  await seedTranslations()
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
