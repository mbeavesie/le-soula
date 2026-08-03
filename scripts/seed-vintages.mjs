/**
 * One-shot content seed, designed to run inside the Netlify build
 * (which has unrestricted network access).
 *
 * - Creates the five wine documents in Sanity from seed/wine-content.json
 *   (skipping any that already exist, so Wendy's edits are never overwritten)
 * - Downloads every technical-sheet PDF from the old le-soula.com server
 *   (manifest: seed/vintage-manifest.json) and uploads them as Sanity file
 *   assets, attached per-vintage in both languages
 * - Idempotent: wines that already have vintages are left untouched.
 *   Sanity deduplicates identical file uploads by content hash.
 *
 * Guarded: exits quietly unless RUN_SEED=1 and SANITY_TOKEN are set.
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {fileURLToPath} from 'url'
import path from 'path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

console.log('[seed] env check: RUN_SEED=%s TOKEN=%s PROJECT=%s',
  process.env.RUN_SEED ?? 'unset',
  process.env.SANITY_TOKEN ? 'present' : 'missing',
  process.env.VITE_SANITY_PROJECT_ID ?? 'unset')
if (process.env.RUN_SEED !== '1' || !process.env.SANITY_TOKEN) {
  console.log('[seed] trigger or token missing — skipping content seed.')
  process.exit(0)
}

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
if (!projectId) {
  console.error('[seed] VITE_SANITY_PROJECT_ID missing')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const OLD_SITE = 'https://www.le-soula.com/'
const manifest = JSON.parse(readFileSync(path.join(root, 'seed/vintage-manifest.json'), 'utf8'))
const content = JSON.parse(readFileSync(path.join(root, 'seed/wine-content.json'), 'utf8'))

// The site presents five wines; the Trigone card carries both colours.
const VINTAGE_SOURCES = {
  blanc: [{key: 'blanc', prefix: ''}],
  rouge: [{key: 'rouge', prefix: ''}],
  maceration: [{key: 'maceration', prefix: ''}],
  trigone: [
    {key: 'trigone-blanc', prefix: 'Blanc '},
    {key: 'trigone-rouge', prefix: 'Rouge '},
  ],
  rose: [{key: 'rose', prefix: ''}],
}

const isYear = (v) => /^\d{4}$/.test(v)
const labelFor = (v, prefix) => (isYear(v) ? `${prefix}${v}` : `${prefix}N°${v}`)
const sortKey = (v) => (isYear(v) ? Number(v) : Number(v) + 1990) // interleave cuvée numbers ≈ years

async function uploadPdf(relPath) {
  const url = OLD_SITE + relPath.split('/').map(encodeURIComponent).join('/')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 5000) throw new Error(`suspiciously small (${buf.length}B): ${url}`)
  const filename = relPath.split('/').pop()
  const asset = await client.assets.upload('file', buf, {filename, contentType: 'application/pdf'})
  return {_type: 'file', asset: {_type: 'reference', _ref: asset._id}}
}

const failures = []

try {
for (const wine of content) {
  const docId = wine._id
  const existing = await client.getDocument(docId)

  if (!existing) {
    const mkLocale = (field) => ({_type: 'localeString', en: wine.en[field] || '', fr: wine.fr[field] || ''})
    const mkLocaleText = (field) => ({_type: 'localeText', en: wine.en[field] || '', fr: wine.fr[field] || ''})
    await client.createIfNotExists({
      _id: docId,
      _type: 'wine',
      slug: {_type: 'slug', current: wine.slug},
      name: mkLocale('name'),
      vintage: wine.en.vintage || '',
      order: wine.order,
      note: mkLocaleText('note'),
      tastingNotes: wine.en.tastingNotes
        ? {
            _type: 'tastingNotes',
            sight: {_type: 'localeText', en: wine.en.tastingNotes.sight, fr: wine.fr.tastingNotes?.sight || ''},
            nose: {_type: 'localeText', en: wine.en.tastingNotes.nose, fr: wine.fr.tastingNotes?.nose || ''},
            palate: {_type: 'localeText', en: wine.en.tastingNotes.palate, fr: wine.fr.tastingNotes?.palate || ''},
          }
        : undefined,
    })
    console.log(`[seed] created ${docId}`)
  } else {
    console.log(`[seed] ${docId} already exists — content untouched`)
  }

  const doc = await client.getDocument(docId)
  if (doc.vintages && doc.vintages.length > 0) {
    console.log(`[seed] ${docId} already has ${doc.vintages.length} vintages — skipping uploads`)
    continue
  }

  const entries = []
  for (const src of VINTAGE_SOURCES[wine.slug] || []) {
    const vintages = manifest[src.key] || {}
    for (const [v, files] of Object.entries(vintages)) {
      entries.push({v, prefix: src.prefix, files, sort: sortKey(v)})
    }
  }
  entries.sort((a, b) => b.sort - a.sort || a.prefix.localeCompare(b.prefix))

  const vintageObjs = []
  for (const e of entries) {
    const obj = {_type: 'vintageEntry', _key: `${e.prefix}${e.v}`.replace(/\s/g, '-').toLowerCase(), label: labelFor(e.v, e.prefix)}
    for (const [lang, field] of [['fr', 'techSheetFr'], ['en', 'techSheetEn']]) {
      if (!e.files[lang]) continue
      try {
        obj[field] = await uploadPdf(e.files[lang])
        console.log(`[seed] uploaded ${wine.slug} ${obj.label} ${lang}`)
      } catch (err) {
        failures.push(`${wine.slug} ${obj.label} ${lang}: ${err.message}`)
        console.warn(`[seed] FAILED ${wine.slug} ${obj.label} ${lang}: ${err.message}`)
      }
    }
    if (obj.techSheetFr || obj.techSheetEn) vintageObjs.push(obj)
  }

  await client.patch(docId).set({vintages: vintageObjs}).commit()
  console.log(`[seed] ${docId}: ${vintageObjs.length} vintages attached`)
}

} catch (err) {
  // Never fail the site build because of the seed — log and move on.
  console.error('[seed] aborted:', err.message)
}

console.log(failures.length ? `[seed] DONE WITH ${failures.length} FAILURES:\n  ${failures.join('\n  ')}` : '[seed] done, no failures')
process.exit(0)
