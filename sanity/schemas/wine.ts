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
    defineField({name: 'techSheetUrl', title: 'Tech sheet URL (legacy, current vintage)', type: 'url'}),
    defineField({
      name: 'vintages',
      title: 'Vintages / Millésimes',
      description: 'All vintages of this wine, newest first. Each can carry its technical sheet in both languages. / Tous les millésimes, du plus récent au plus ancien, avec fiche technique dans les deux langues.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'vintageEntry',
          title: 'Vintage / Millésime',
          fields: [
            defineField({
              name: 'label',
              title: 'Vintage or cuvée number / Millésime ou n° de cuvée',
              description: 'e.g. "2021" or "N°23"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'techSheetFr', title: 'Fiche technique (FR)', type: 'file', options: {accept: 'application/pdf'}}),
            defineField({name: 'techSheetEn', title: 'Technical sheet (EN)', type: 'file', options: {accept: 'application/pdf'}}),
          ],
          preview: {select: {title: 'label'}},
        },
      ],
    }),
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
