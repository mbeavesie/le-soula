import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tastingNotes',
  title: 'Tasting notes',
  type: 'object',
  fields: [
    defineField({name: 'sight', type: 'localeText'}),
    defineField({name: 'nose', type: 'localeText'}),
    defineField({name: 'palate', type: 'localeText'}),
  ],
})
