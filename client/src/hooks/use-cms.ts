import { useQuery } from '@tanstack/react-query'
import { sanityClient, sanityEnabled } from '@/lib/sanity'
import {
  winesQuery,
  wineBySlugQuery,
  journalPostsQuery,
  storyParagraphsQuery,
  translationsQuery,
  type SanityWine,
  type SanityJournalPost,
  type SanityStoryParagraph,
  type SanityTranslation,
} from '@/lib/sanity-queries'
import { wines as fallbackWines } from '@/data/wines'
import { journalEntries as fallbackJournal } from '@/data/journal'
import { translations as fallbackTranslations } from '@/data/translations'

// Wines: normalize Sanity payload to the shape the UI already uses
export type UIWine = {
  slug: string
  img: string
  tech: string
  images: string[]
  en: any
  fr: any
}

function wineFromSanity(w: SanityWine): UIWine {
  const mk = (lang: 'en' | 'fr') => ({
    name: w.name?.[lang] || w.name?.en || '',
    vintage: w.vintage || '',
    note: w.note?.[lang] || w.note?.en || '',
    quote: w.quote?.[lang] || w.quote?.en || '',
    quotesource: w.quoteSource || '',
    tastingNotes: w.tastingNotes
      ? {
          sight: w.tastingNotes.sight?.[lang] || w.tastingNotes.sight?.en || '',
          nose: w.tastingNotes.nose?.[lang] || w.tastingNotes.nose?.en || '',
          palate: w.tastingNotes.palate?.[lang] || w.tastingNotes.palate?.en || '',
        }
      : undefined,
    awards: (w.awards || []).map((a) => ({
      title: a.title?.[lang] || a.title?.en || '',
      score: a.score?.[lang] || a.score?.en || '',
      year: a.year || '',
    })),
  })
  return {
    slug: w.slug,
    img: w.mainImage || w.gallery?.[0] || '',
    tech: w.techSheetUrl || '#',
    images: (w.gallery && w.gallery.length ? w.gallery : w.mainImage ? [w.mainImage] : []) as string[],
    en: mk('en'),
    fr: mk('fr'),
  }
}

export function useWines() {
  return useQuery<UIWine[]>({
    queryKey: ['cms', 'wines'],
    queryFn: async () => {
      if (!sanityClient) return fallbackWines as unknown as UIWine[]
      try {
        const data = await sanityClient.fetch<SanityWine[]>(winesQuery)
        if (!data || data.length === 0) return fallbackWines as unknown as UIWine[]
        return data.map(wineFromSanity)
      } catch (e) {
        console.warn('[cms] wines fetch failed, using fallback', e)
        return fallbackWines as unknown as UIWine[]
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function useWine(slug: string | undefined) {
  return useQuery<UIWine | undefined>({
    queryKey: ['cms', 'wine', slug],
    enabled: !!slug,
    queryFn: async () => {
      if (!slug) return undefined
      if (!sanityClient) {
        return (fallbackWines as unknown as UIWine[]).find((w) => w.slug === slug)
      }
      try {
        const data = await sanityClient.fetch<SanityWine | null>(wineBySlugQuery, { slug })
        if (!data) return (fallbackWines as unknown as UIWine[]).find((w) => w.slug === slug)
        return wineFromSanity(data)
      } catch (e) {
        console.warn('[cms] wine fetch failed, using fallback', e)
        return (fallbackWines as unknown as UIWine[]).find((w) => w.slug === slug)
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export type UIJournalPost = {
  id: string
  img: string
  href: string
  publishedAt: string
  en: { title: string; excerpt: string }
  fr: { title: string; excerpt: string }
}

export function useJournalPosts() {
  return useQuery<UIJournalPost[]>({
    queryKey: ['cms', 'journal'],
    queryFn: async () => {
      const toFallback = (): UIJournalPost[] =>
        fallbackJournal.map((j, i) => ({
          id: `fallback-${i}`,
          img: j.img,
          href: j.href,
          publishedAt: j.date,
          en: j.en,
          fr: j.fr,
        }))
      if (!sanityClient) return toFallback()
      try {
        const data = await sanityClient.fetch<SanityJournalPost[]>(journalPostsQuery)
        if (!data || data.length === 0) return toFallback()
        return data.map((p) => ({
          id: p._id,
          img: p.image || '',
          href: p.href || '#',
          publishedAt: p.publishedAt,
          en: { title: p.title?.en || '', excerpt: p.excerpt?.en || '' },
          fr: { title: p.title?.fr || p.title?.en || '', excerpt: p.excerpt?.fr || p.excerpt?.en || '' },
        }))
      } catch (e) {
        console.warn('[cms] journal fetch failed, using fallback', e)
        return toFallback()
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

export type UIStoryParagraph = {
  id: string
  order: number
  img?: string
  alt: string
  caption: string
  en: string
  fr: string
}

export function useStoryParagraphs() {
  return useQuery<UIStoryParagraph[]>({
    queryKey: ['cms', 'story'],
    queryFn: async () => {
      if (!sanityClient) return []
      try {
        const data = await sanityClient.fetch<SanityStoryParagraph[]>(storyParagraphsQuery)
        return (data || []).map((p) => ({
          id: p._id,
          order: p.order,
          img: p.image,
          alt: p.imageAlt?.en || '',
          caption: p.caption?.en || '',
          en: p.body?.en || '',
          fr: p.body?.fr || p.body?.en || '',
        }))
      } catch (e) {
        console.warn('[cms] story fetch failed', e)
        return []
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Translations: deep-merge Sanity flat docs into the static defaults
function setDeep(obj: any, path: string, value: any) {
  const parts = path.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]
    if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {}
    cur = cur[k]
  }
  cur[parts[parts.length - 1]] = value
}

export type TranslationsTree = typeof fallbackTranslations

export function useTranslations() {
  return useQuery<TranslationsTree>({
    queryKey: ['cms', 'translations'],
    queryFn: async () => {
      if (!sanityClient) return fallbackTranslations
      try {
        const data = await sanityClient.fetch<SanityTranslation[]>(translationsQuery)
        if (!data || data.length === 0) return fallbackTranslations
        const merged: any = JSON.parse(JSON.stringify(fallbackTranslations))
        for (const t of data) {
          if (!t.key) continue
          if (t.en) setDeep(merged.en, t.key, t.en)
          if (t.fr) setDeep(merged.fr, t.key, t.fr)
        }
        return merged as TranslationsTree
      } catch (e) {
        console.warn('[cms] translations fetch failed, using fallback', e)
        return fallbackTranslations
      }
    },
    staleTime: 10 * 60 * 1000,
  })
}
