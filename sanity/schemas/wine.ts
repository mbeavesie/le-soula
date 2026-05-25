import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'wine',
  title: 'Wine',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: (doc: any) => doc?.name?.en || ''},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'name', type: 'localeString', validation: (Rule) => Rule.required()}),
    defineField({name: 'vintage', type: 'string'}),
    defineField({name: 'order', type: 'number', initialValue: 0}),
    defineField({name: 'mainImage', title: 'Main image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({name: 'techSheetUrl', title: 'Tech sheet URL', type: 'url'}),
    defineField({name: 'note', type: 'localeText'}),
    defineField({name: 'tastingNotes', type: 'tastingNotes'}),
    defineField({name: 'awards', type: 'array', of: [{type: 'award'}]}),
    defineField({name: 'quote', type: 'localeText'}),
    defineField({name: 'quoteSource', type: 'string'}),
  ],
  preview: {
    select: {title: 'name.en', subtitle: 'vintage', media: 'mainImage'},
  },
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
