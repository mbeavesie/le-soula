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
    defineField({name: 'href', title: 'External link', type: 'url'}),
    defineField({name: 'publishedAt', type: 'datetime', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'publishedAt', media: 'image'},
  },
  orderings: [
    {title: 'Newest', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
})
