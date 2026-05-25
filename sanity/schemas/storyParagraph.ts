import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'storyParagraph',
  title: 'Story Paragraph',
  type: 'document',
  fields: [
    defineField({name: 'order', type: 'number', validation: (Rule) => Rule.required()}),
    defineField({name: 'body', type: 'localeText', validation: (Rule) => Rule.required()}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'imageAlt', type: 'localeString'}),
    defineField({name: 'caption', type: 'localeString'}),
  ],
  preview: {
    select: {title: 'body.en', subtitle: 'order', media: 'image'},
    prepare: ({title, subtitle, media}: any) => ({
      title: `#${subtitle ?? '?'} — ${(title || '').slice(0, 60)}`,
      media,
    }),
  },
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
