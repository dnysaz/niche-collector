import {defineField, defineType} from 'sanity'

export const priceHistory = defineType({
  name: 'priceHistory',
  title: 'Price History',
  type: 'document',
  fields: [
    defineField({name: 'item', title: 'Item', type: 'reference', to: [{type: 'collectibleItem'}], validation: r => r.required()}),
    defineField({name: 'source', title: 'Source', type: 'string', options: {list: ['tokopedia', 'shopee', 'bukalapak', 'ebay', 'manual']}, validation: r => r.required()}),
    defineField({name: 'price', title: 'Price (IDR)', type: 'number', validation: r => r.required().min(0)}),
    defineField({name: 'currency', title: 'Currency', type: 'string', initialValue: 'IDR'}),
    defineField({name: 'url', title: 'Listing URL', type: 'url'}),
    defineField({name: 'recordedAt', title: 'Recorded At', type: 'datetime', validation: r => r.required(), initialValue: () => new Date().toISOString()}),
    defineField({name: 'conditionAtSource', title: 'Condition at Source', type: 'string'}),
    defineField({name: 'isOutlier', title: 'Mark as Outlier?', type: 'boolean', description: 'Exclude from median calculation if scam/damaged listing'}),
  ],
  orderings: [{title: 'Date Desc', name: 'dateDesc', by: [{field: 'recordedAt', direction: 'desc'}]}],
  preview: {select: {title: 'price', subtitle: 'source', media: 'item'}},
})
