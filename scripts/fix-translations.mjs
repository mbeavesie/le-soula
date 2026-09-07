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
  'terroir.climate': {
    en: ['Climate: Tramontane and Mistral', 'Climate: Tramontane and Marin winds'],
    fr: ['Climat : Tramontane et Mistral', 'Climat : vents de Tramontane et du Marin'],
  },
  'terroir.farming': {
    en: ['Organic (certified) farming since 2011, hand harvested',
         'Farming: organic from the outset, biodynamic since 2008, certified since 2011; hand harvested'],
    fr: ['Viticulture biologique (certifiée) depuis 2011, vendanges manuelles',
         'Viticulture : biologique dès l’origine, biodynamique depuis 2008, certifiée depuis 2011 ; vendanges manuelles'],
  },
  'terroir.soils': {
    en: ['Soils: schist, granite, and gneiss', 'Soils: granite, schist, gneiss'],
    fr: ['Sols : schiste, granit et gneiss', 'Sols : granit, schiste, gneiss'],
  },
}

const SUBSTITUTIONS = [
  // Mark W, 5 Aug: organic from the outset, biodynamics later (story text)
  ['we embraced biodynamic viticulture from the outset',
   'we embraced organic viticulture from the outset, moving to biodynamics from 2008'],
  ['nous avons embrassé la viticulture biodynamique dès le début',
   'nous avons pratiqué la viticulture biologique dès le début, passant à la biodynamie à partir de 2008'],
  // Mark W: no vines in St Arnac (sweep any stragglers)
  ['Saint Arnac, and Le Vivier', 'and Le Vivier'],
  ['Saint Arnac and Le Vivier', 'and Le Vivier'],
  ['Saint Arnac et Le Vivier', 'et Le Vivier'],
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

// Ensure the expanded terroir text exists as editable Sanity docs (Mark W's 5 Aug wording)
const MORE = [
  ['terroir.more1',
   'The Fenouillèdes is an old borderland — the ancient "march of Spain" between Catalonia and Occitania, Roman Narbonnaise, Visigoth Septimanie. Its name comes from the Latin Pagus Fenolietensis: hay country. Vines have grown here for centuries, but always confined to the warmest, steepest south-facing slopes — the adret, known in Occitan as the soula, or soulane. It is from one of these sun-drenched slopes, Lo Soula, that the estate takes its name.',
   'Le Fenouillèdes, ancienne marche d’Espagne, est situé entre la Catalogne et l’Occitanie — Narbonnaise sous les Romains, Septimanie sous les Wisigoths. Son nom viendrait du latin Pagus Fenolietensis, le pays des foins. La vigne y est cultivée depuis des siècles, cantonnée aux terroirs les plus chauds et les plus pentus, exposés plein sud — l’adret, appelé en occitan le soula, ou soulane. C’est de l’un de ces coteaux ensoleillés, Lo Soula, que le domaine tient son nom.'],
  ['terroir.more2',
   'Le Soula is 50 hectares of wild mountainside, of which 17 are currently working vineyards, rising from 350 to 650 metres across the villages of Saint Martin de Fenouillet, Feilluns and Le Vivier. The climate is Mediterranean towards the plain and mountainous towards the Pyrenees; altitude slows ripening, trading power for freshness. From granite, schist and gneiss come wines that have been recognised, since the first vintage in 2001, as pure, full of vitality and character, with an outstanding ability to age.',
   'Le Soula, ce sont 50 hectares de montagne sauvage, dont 17 actuellement en vignes, s’étendant de 350 à 650 mètres d’altitude sur les communes de Saint Martin de Fenouillet, Feilluns et Le Vivier. Le climat y est méditerranéen en se rapprochant de la plaine et montagnard en se rapprochant des Pyrénées ; l’altitude ralentit la maturation et préserve la fraîcheur. Du granit, du schiste et du gneiss naissent des vins reconnus, depuis le premier millésime en 2001, comme purs, pleins de vitalité et de caractère, avec une remarquable aptitude au vieillissement.'],
]
for (const [key, en, fr] of MORE) {
  const existing = await client.fetch('*[_type=="translation" && key==$key][0]{_id}', {key})
  if (!existing) {
    await client.create({_type: 'translation', key, en, fr})
    changed++
    console.log(`[fix] created ${key}`)
  }
}

console.log(`[fix] done — ${changed} documents updated`)
process.exit(0)
