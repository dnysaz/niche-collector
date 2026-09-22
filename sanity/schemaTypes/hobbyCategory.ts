import {defineField, defineType} from 'sanity'

export const hobbyCategory = defineType({
  name: 'hobbyCategory',
  title: 'Hobby Category',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Category Name', type: 'string', validation: r => r.required(), description: 'e.g. Hot Wheels, Gundam, Mechanical Keyboard'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'icon', title: 'Icon / Emoji', type: 'string', description: 'e.g. 🏎️ 🤖 ⌨️'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'marketplaceKeywords', title: 'Marketplace Keywords', type: 'array', of: [{type: 'string'}], description: 'Keywords for price scraping: e.g. hot wheels super treasure hunt'}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})
