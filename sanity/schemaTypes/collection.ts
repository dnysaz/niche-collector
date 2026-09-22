import {defineField, defineType} from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Collection Name', type: 'string', validation: r => r.required(), description: 'e.g. My Treasure Hunt 2023'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'owner', title: 'Owner Name', type: 'string'}),
    defineField({name: 'category', title: 'Main Category', type: 'reference', to: [{type: 'hobbyCategory'}]}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'items', title: 'Items in Collection', type: 'array', of: [{type: 'reference', to: [{type: 'collectibleItem'}]}]}),
    defineField({name: 'isPublic', title: 'Public Showcase?', type: 'boolean', initialValue: false}),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
  ],
})
