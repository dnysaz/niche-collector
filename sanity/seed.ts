// Example seed data - import via sanity CLI or Studio
// npx sanity dataset import seed.ndjson production
export const seed = [
  {_type: 'hobbyCategory', _id: 'cat-hotwheels', title: 'Hot Wheels', slug: {current: 'hot-wheels'}, icon: '🏎️', description: 'Diecast 1:64 Mattel', marketplaceKeywords: ['hot wheels treasure hunt', 'hot wheels sth']},
  {_type: 'hobbyCategory', _id: 'cat-gundam', title: 'Gunpla', slug: {current: 'gunpla'}, icon: '🤖', description: 'Bandai Gundam Plastic Model'},
  {_type: 'collectibleItem', _id: 'item-1', title: 'Hot Wheels 1967 Camaro Super Treasure Hunt', slug: {current: 'camaro-sth-1967'}, category: {_ref: 'cat-hotwheels', _type: 'reference'}, brand: 'Mattel', year: 2023, condition: 'mint_sealed', rarity: 'grail', purchasePrice: 150000, currentValue: 1250000, quantity: 1, status: 'owned', tags: ['sth', 'camaro']},
  {_type: 'priceHistory', item: {_ref: 'item-1', _type: 'reference'}, source: 'tokopedia', price: 1200000, currency: 'IDR', recordedAt: new Date().toISOString(), url: 'https://tokopedia.com/example'},
]
