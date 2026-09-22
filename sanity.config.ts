import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

const sid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project'
const safeId = /^[a-z0-9-]+$/.test(sid) ? sid : 'dummy-project'

export default defineConfig({
  name: 'koleksi-studio',
  title: 'Niche Collector - Koleksi Tracker',
  projectId: safeId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
