export const winesQuery = `*[_type == "wine"] | order(order asc, name.en asc) {
  "slug": slug.current,
  name, vintage, note, quote, "quoteSource": quoteSource,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  "techSheetUrl": techSheetUrl,
  "vintages": vintages[]{
    label,
    "techSheetFr": techSheetFr.asset->url,
    "techSheetEn": techSheetEn.asset->url
  },
  tastingNotes, awards
}`

export const wineBySlugQuery = `*[_type == "wine" && slug.current == $slug][0] {
  "slug": slug.current,
  name, vintage, note, quote, "quoteSource": quoteSource,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  "techSheetUrl": techSheetUrl,
  "vintages": vintages[]{
    label,
    "techSheetFr": techSheetFr.asset->url,
    "techSheetEn": techSheetEn.asset->url
  },
  tastingNotes, awards
}`

export const journalPostsQuery = `*[_type == "journalPost"] | order(publishedAt desc) {
  _id, title, excerpt, href, publishedAt,
  "image": image.asset->url,
  "slug": slug.current,
  "hasBody": count(bodyEn) > 0 || count(bodyFr) > 0
}`

export const journalPostBySlugQuery = `*[_type == "journalPost" && slug.current == $slug][0] {
  _id, title, excerpt, href, publishedAt,
  "image": image.asset->url,
  "slug": slug.current,
  "bodyEn": bodyEn[]{..., _type == "image" => {"url": asset->url}},
  "bodyFr": bodyFr[]{..., _type == "image" => {"url": asset->url}}
}`

export const storyParagraphsQuery = `*[_type == "storyParagraph"] | order(order asc) {
  _id, order, body, imageAlt, caption,
  "image": image.asset->url
}`

export const translationsQuery = `*[_type == "translation"]{ key, en, fr }`

export type LocaleString = { en?: string; fr?: string }
export type SanityVintage = {
  label: string
  techSheetFr?: string
  techSheetEn?: string
}
export type SanityWine = {
  slug: string
  name: LocaleString
  vintage?: string
  note?: LocaleString
  quote?: LocaleString
  quoteSource?: string
  mainImage?: string
  gallery?: string[]
  techSheetUrl?: string
  vintages?: SanityVintage[]
  tastingNotes?: {
    sight?: LocaleString
    nose?: LocaleString
    palate?: LocaleString
  }
  awards?: Array<{ title?: LocaleString; score?: LocaleString; year?: string }>
}
export type SanityJournalPost = {
  _id: string
  slug?: string
  title: LocaleString
  excerpt?: LocaleString
  href?: string
  publishedAt: string
  image?: string
  hasBody?: boolean
  bodyEn?: any[]
  bodyFr?: any[]
}
export type SanityStoryParagraph = {
  _id: string
  order: number
  body: LocaleString
  image?: string
  imageAlt?: LocaleString
  caption?: LocaleString
}
export type SanityTranslation = { key: string; en?: string; fr?: string }
