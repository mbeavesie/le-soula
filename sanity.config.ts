import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

const projectId =
  (import.meta as any).env?.VITE_SANITY_PROJECT_ID ||
  (typeof process !== 'undefined' ? process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID : '') ||
  ''
const dataset =
  (import.meta as any).env?.VITE_SANITY_DATASET ||
  (typeof process !== 'undefined' ? process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET : '') ||
  'production'

export default defineConfig({
  name: 'default',
  title: 'Le Soula',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {types: schemaTypes as any},
})
