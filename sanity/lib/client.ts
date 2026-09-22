import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project'
const sanitizedProjectId = /^[a-z0-9-]+$/.test(projectId) ? projectId : 'dummy-project'

export const client = createClient({
  projectId: sanitizedProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export const isSanityConfigured = () => {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return !!pid && /^[a-z0-9-]+$/.test(pid) && pid !== 'dummy-project'
}
