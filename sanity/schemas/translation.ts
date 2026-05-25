import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'translation',
  title: 'UI Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Key (dot path, e.g. hero.title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'en', title: 'English', type: 'text', rows: 2}),
    defineField({name: 'fr', title: 'French', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'key', subtitle: 'en'},
  },
  orderings: [{title: 'Key', name: 'keyAsc', by: [{field: 'key', direction: 'asc'}]}],
})
