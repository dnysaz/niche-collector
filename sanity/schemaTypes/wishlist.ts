import {defineField, defineType} from 'sanity'

export const wishlist = defineType({
  name: 'wishlist',
  title: 'Wishlist / Hunt List',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Wanted Item Name', type: 'string', validation: r => r.required()}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'hobbyCategory'}]}),
    defineField({name: 'targetPrice', title: 'Target Price (IDR)', type: 'number'}),
    defineField({name: 'priority', title: 'Priority', type: 'string', options: {list: ['low', 'medium', 'high', 'grail']}, initialValue: 'medium'}),
    defineField({name: 'alertActive', title: 'Price Alert Active?', type: 'boolean', initialValue: true}),
    defineField({name: 'notes', title: 'Notes', type: 'text'}),
    defineField({name: 'referenceUrl', title: 'Reference URL', type: 'url'}),
  ],
})
