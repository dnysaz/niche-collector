import {defineField, defineType} from 'sanity'

export const collectibleItem = defineType({
  name: 'collectibleItem',
  title: 'Collectible Item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Item Name', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'category', title: 'Category', type: 'reference', to: [{type: 'hobbyCategory'}], validation: r => r.required()}),
    defineField({name: 'brand', title: 'Brand / Maker', type: 'string', description: 'Mattel, Bandai, Keychron'}),
    defineField({name: 'year', title: 'Release Year', type: 'number'}),
    defineField({name: 'sku', title: 'SKU / Code', type: 'string'}),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {list: [{title: 'Mint Sealed', value: 'mint_sealed'}, {title: 'Mint Loose', value: 'mint_loose'}, {title: 'Used - Excellent', value: 'used_excellent'}, {title: 'Used - Good', value: 'used_good'}, {title: 'Damaged', value: 'damaged'}], layout: 'radio'},
      validation: r => r.required(),
    }),
    defineField({
      name: 'rarity',
      title: 'Rarity',
      type: 'string',
      options: {list: ['common', 'uncommon', 'rare', 'grail'], layout: 'radio'},
    }),
    defineField({name: 'images', title: 'Images', type: 'array', of: [{type: 'image', options: {hotspot: true}}]}),
    defineField({name: 'purchasePrice', title: 'Purchase Price (IDR)', type: 'number', validation: r => r.min(0)}),
    defineField({name: 'purchaseDate', title: 'Purchase Date', type: 'date'}),
    defineField({name: 'currentValue', title: 'Current Market Value (IDR)', type: 'number', description: 'Auto-updated via priceHistory median, editable as override'}),
    defineField({name: 'quantity', title: 'Quantity', type: 'number', initialValue: 1, validation: r => r.min(1)}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: [{title: 'Owned', value: 'owned'}, {title: 'Wishlist', value: 'wishlist'}, {title: 'Sold', value: 'sold'}], layout: 'radio'},
      initialValue: 'owned',
    }),
    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'notes', title: 'Private Notes', type: 'text'}),
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url', description: 'Link Tokopedia/Shopee where you track price'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'brand', media: 'images.0'},
  },
})
