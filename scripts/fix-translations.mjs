/**
 * One-shot Sanity translation fixes, run inside the Netlify build.
 * Applies Wendy's and Mark W's approved corrections to translation docs
 * that still carry the old (pre-correction) values. A doc whose text no
 * longer matches the expected old value is left alone — so later edits
 * made in the Studio are never overwritten.
 *
 * Guarded: exits quietly unless RUN_FIXES=1 and SANITY_TOKEN are set.
 */
import {createClient} from '@sanity/client'

if (process.env.RUN_FIXES !== '1' || !process.env.SANITY_TOKEN) {
  console.log('[fix] RUN_FIXES not set — skipping translation fixes.')
  process.exit(0)
}

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// key -> {en: [oldValue, newValue], fr: [oldValue, newValue]}
const FIXES = {
  'terroir.elev': {
    en: ['Elevation: 400–700 m', 'Elevation: 350–650 m'],
    fr: ['Altitude : 400–700 m', 'Altitude : 350–650 m'],
  },
  'terroir.soils': {
    en: ['Soils: schist, granite', 'Soils: granite, schist'],
    fr: ['Sols : schiste, granit', 'Sols : granit, schiste'],
  },
  'terroir.farming': {
    en: ['Farming: organic (certified), hand harvested',
         'Farming: certified organic from the outset, biodynamic (Demeter certified) since 2008, hand harvested'],
    fr: ['Viticulture : biologique (certifiée), vendanges manuelles',
         'Viticulture : biologique certifiée dès l’origine, biodynamique (certifiée Demeter) depuis 2008, vendanges manuelles'],
  },
  'terroir.climate': {
    en: ['Climate: mountain influence; Tramontane wind',
         'Climate: Mediterranean meeting mountain; Tramontane wind'],
    fr: ['Climat : influence montagnarde ; vent de Tramontane',
         'Climat : méditerranéen et montagnard ; vent de Tramontane'],
  },
}

// Generic substring corrections applied across ALL translation docs
const SUBSTITUTIONS = [
  ['Schist and granite', 'Granite and schist'],
  ['schist and granite', 'granite and schist'],
  ['Schiste et granit', 'Granit et schiste'],
  ['schiste et granit', 'granit et schiste'],
]

let changed = 0

// 1. Exact-match fixes
for (const [key, langs] of Object.entries(FIXES)) {
  const doc = await client.fetch('*[_type=="translation" && key==$key][0]{_id,en,fr}', {key})
  if (!doc) { console.log(`[fix] ${key}: no doc, skipped`); continue }
  const patch = {}
  for (const lang of ['en', 'fr']) {
    const [oldV, newV] = langs[lang]
    if (doc[lang] === oldV) patch[lang] = newV
    else if (doc[lang] !== newV) console.log(`[fix] ${key}.${lang}: value diverged, left alone`)
  }
  if (Object.keys(patch).length) {
    await client.patch(doc._id).set(patch).commit()
    changed++
    console.log(`[fix] ${key}: updated ${Object.keys(patch).join(', ')}`)
  }
}

// 2. Substring sweeps
const all = await client.fetch('*[_type=="translation"]{_id,key,en,fr}')
for (const doc of all) {
  const patch = {}
  for (const lang of ['en', 'fr']) {
    let v = doc[lang]
    if (typeof v !== 'string') continue
    for (const [a, b] of SUBSTITUTIONS) v = v.split(a).join(b)
    if (v !== doc[lang]) patch[lang] = v
  }
  if (Object.keys(patch).length) {
    await client.patch(doc._id).set(patch).commit()
    changed++
    console.log(`[fix] ${doc.key}: soil-order corrected`)
  }
}

console.log(`[fix] done — ${changed} documents updated`)
process.exit(0)
