import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 4}),
    defineField({name: 'fr', title: 'French', type: 'text', rows: 4}),
  ],
})
