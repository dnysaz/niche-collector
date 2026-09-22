export const COLLECTIONS_QUERY = `*[_type == "collection"]{
  _id, title, slug, description, isPublic,
  "category": category->title,
  "itemCount": count(items),
  "totalValue": math::sum(items[]->currentValue)
}`

export const ITEMS_WITH_TREND_QUERY = `*[_type == "collectibleItem" && status=="owned"] | order(currentValue desc){
  _id, title, slug, brand, rarity, condition, purchasePrice, currentValue, quantity,
  "category": category->title,
  "categoryIcon": category->icon,
  "image": images[0],
  "gain": currentValue - purchasePrice,
  "gainPercent": round(((currentValue - purchasePrice)/purchasePrice)*100),
  "priceHistory": *[_type=="priceHistory" && item._ref==^._id && isOutlier != true] | order(recordedAt desc)[0..5]{price, recordedAt, source}
}`

export const PORTFOLIO_STATS_QUERY = `{
  "totalItems": count(*[_type=="collectibleItem" && status=="owned"]),
  "totalPurchase": math::sum(*[_type=="collectibleItem" && status=="owned"].purchasePrice),
  "totalMarket": math::sum(*[_type=="collectibleItem" && status=="owned"].currentValue),
  "wishlistCount": count(*[_type=="wishlist"]),
  "grails": *[_type=="collectibleItem" && rarity=="grail" && status=="owned"]{title, currentValue}
}`

export const WISHLIST_ALERTS_QUERY = `*[_type=="wishlist" && alertActive==true]{
  title, targetPrice,
  "category": category->title,
  "lowestMarket": *[_type=="collectibleItem" && title match ^.title][0].currentValue
}`
