import {createClient, type SanityClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production'
const apiVersion = '2024-10-01'

export const sanityEnabled = Boolean(projectId)

export const sanityClient: SanityClient | null = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

export function urlFor(source: any): string | undefined {
  if (!builder || !source) return undefined
  try {
    return builder.image(source).auto('format').fit('max').url()
  } catch {
    return undefined
  }
}
