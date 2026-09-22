import {defineCliConfig} from 'sanity/cli'

const cid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project'
const csafe = /^[a-z0-9-]+$/.test(cid) ? cid : 'dummy-project'
export default defineCliConfig({
  api: {
    projectId: csafe,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
