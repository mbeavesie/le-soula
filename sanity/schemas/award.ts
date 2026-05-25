import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'award',
  title: 'Award',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'localeString'}),
    defineField({name: 'score', type: 'localeString'}),
    defineField({name: 'year', type: 'string'}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'score.en'},
  },
})
