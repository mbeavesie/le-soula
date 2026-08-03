import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'journalPost',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: (doc: any) => doc?.title?.en || ''},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', type: 'localeString', validation: (Rule) => Rule.required()}),
    defineField({name: 'excerpt', type: 'localeText'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'href',
      title: 'External link',
      description: 'Only for posts that link out (e.g. press coverage). Leave empty when the article is written below.',
      type: 'url',
    }),
    defineField({
      name: 'bodyEn',
      title: 'Article body (EN)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'bodyFr',
      title: 'Article body (FR)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),
    defineField({name: 'publishedAt', type: 'datetime', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'publishedAt', media: 'image'},
  },
  orderings: [
    {title: 'Newest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
})
