/**
 * One-shot: add Trigone Rouge content to the trigone wine doc in Sanity.
 * - tastingNotesRouge (sight/nose/palate, EN+FR) — only if not already set
 * - techSheetUrlRouge — pointed at the newest "Rouge" vintage sheet already
 *   in the vintage library — only if not already set
 * - note — mentions both colours, only if it still exactly matches the old text
 *
 * Guarded: exits quietly unless RUN_TRIGONE=1 and SANITY_TOKEN are set.
 * Idempotent and never overwrites human edits.
 */
import {createClient} from '@sanity/client'

if (process.env.RUN_TRIGONE !== '1' || !process.env.SANITY_TOKEN) {
  console.log('[trigone] RUN_TRIGONE not set — skipping.')
  process.exit(0)
}

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const doc = await client.fetch(
  `*[_type=="wine" && slug.current=="trigone"][0]{
    _id, note, tastingNotesRouge, techSheetUrlRouge,
    "vintages": vintages[]{label, "en": techSheetEn.asset->url, "fr": techSheetFr.asset->url}
  }`
)
if (!doc) {
  console.log('[trigone] no trigone doc found — nothing to do.')
  process.exit(0)
}

const patch = {}

// Tasting notes for the red (from the Trigone Rouge N°23 technical sheet:
// 80% whole-cluster Syrah, 15% old-vine Carignan, 5% Grenache Noir,
// decomposed granite at 400–600 m)
if (!doc.tastingNotesRouge) {
  patch.tastingNotesRouge = {
    _type: 'tastingNotes',
    sight: {
      en: 'Deep ruby with violet reflections, vivid and inviting',
      fr: 'Rubis profond aux reflets violets, éclatant et engageant',
    },
    nose: {
      en: 'Dark berries, violets and garrigue, lifted by the pepper of whole-bunch Syrah over crushed granite',
      fr: 'Fruits noirs, violette et garrigue, portés par le poivre de la Syrah en grappes entières, sur un fond de granit',
    },
    palate: {
      en: 'Supple and full of energy — old-vine Carignan depth, fine tannins, mountain freshness and a long, savoury finish',
      fr: 'Souple et plein d’énergie — la profondeur des vieux carignans, tannins fins, fraîcheur d’altitude et longue finale savoureuse',
    },
  }
}

// Red tech sheet: newest "Rouge" entry in the vintage library
if (!doc.techSheetUrlRouge) {
  const rouge = (doc.vintages || []).find(
    (v) => v.label && v.label.toLowerCase().startsWith('rouge') && (v.en || v.fr)
  )
  if (rouge) patch.techSheetUrlRouge = rouge.en || rouge.fr
  else console.log('[trigone] no Rouge vintage sheet found — techSheetUrlRouge left unset.')
}

// Intro note: mention both colours (only when unchanged since launch)
const NOTE_OLD = {
  en: [
    'Our perpetual blend. Multiple vintages with textural depth. Savoury complexity, remarkable persistence.',
    'A perpetual blend across multiple vintages, textural depth. Savoury complexity, remarkable persistence.',
  ],
  fr: [
    'Assemblage perpétuel de plusieurs millésimes, profondeur texturale. Complexité savoureuse, persistance remarquable.',
    'Notre assemblage perpétuel. Plusieurs millésimes, profondeur texturale. Complexité savoureuse, persistance remarquable.',
  ],
}
const NOTE_NEW = {
  en: 'Our perpetual blend, made in both white and red. Multiple vintages with textural depth. Savoury complexity, remarkable persistence.',
  fr: 'Notre assemblage perpétuel, décliné en blanc et en rouge. Plusieurs millésimes, profondeur texturale. Complexité savoureuse, persistance remarquable.',
}
const note = {...(doc.note || {})}
let noteChanged = false
for (const lang of ['en', 'fr']) {
  if (NOTE_OLD[lang].includes(doc.note?.[lang])) {
    note[lang] = NOTE_NEW[lang]
    noteChanged = true
  } else if (doc.note?.[lang] && doc.note[lang] !== NOTE_NEW[lang]) {
    console.log(`[trigone] note.${lang} diverged, left alone`)
  }
}
if (noteChanged) patch.note = note

if (Object.keys(patch).length) {
  await client.patch(doc._id).set(patch).commit()
  console.log(`[trigone] updated: ${Object.keys(patch).join(', ')}`)
} else {
  console.log('[trigone] nothing to change — already up to date.')
}
process.exit(0)
