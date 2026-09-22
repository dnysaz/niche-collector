import {client} from "@/sanity/lib/client"
import {ITEMS_WITH_TREND_QUERY, PORTFOLIO_STATS_QUERY} from "@/sanity/lib/queries"
import {urlFor} from "@/sanity/lib/image"
import Link from "next/link"

export const revalidate = 60

const MOCK_ITEMS = [
  {_id: '1', title: 'Hot Wheels 1967 Camaro Super Treasure Hunt', brand: 'Mattel', rarity: 'grail', condition: 'mint_sealed', purchasePrice: 150000, currentValue: 1250000, category: 'Hot Wheels', categoryIcon: '🏎️', gain: 1100000, gainPercent: 733, priceHistory: [{price: 1250000, recordedAt: new Date().toISOString(), source: 'tokopedia'},{price: 1100000, recordedAt: new Date().toISOString(), source: 'shopee'}]},
  {_id: '2', title: 'RG RX-93 Nu Gundam', brand: 'Bandai', rarity: 'rare', condition: 'mint_sealed', purchasePrice: 650000, currentValue: 850000, category: 'Gunpla', categoryIcon: '🤖', gain: 200000, gainPercent: 30, priceHistory: [{price: 850000, recordedAt: new Date().toISOString(), source: 'tokopedia'}]},
  {_id: '3', title: 'Keychron Q1 Knob - Carbon Black', brand: 'Keychron', rarity: 'uncommon', condition: 'used_excellent', purchasePrice: 2100000, currentValue: 1800000, category: 'Mechanical Keyboard', categoryIcon: '⌨️', gain: -300000, gainPercent: -14, priceHistory: [{price: 1800000, recordedAt: new Date().toISOString(), source: 'shopee'}]},
]

export default async function CollectionPage() {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const isConfigured = !!pid && /^[a-z0-9-]+$/.test(pid) && pid !== 'dummy-project'
  let items: any[] = MOCK_ITEMS
  let stats: any = {totalItems: 3, totalPurchase: 2900000, totalMarket: 3900000, wishlistCount: 2, grails: [{title: 'Hot Wheels 1967 Camaro STH', currentValue: 1250000}]}

  if (isConfigured) {
    try {
      const [sanityItems, sanityStats] = await Promise.all([
        client.fetch(ITEMS_WITH_TREND_QUERY),
        client.fetch(PORTFOLIO_STATS_QUERY),
      ])
      if (sanityItems?.length) items = sanityItems
      if (sanityStats) stats = sanityStats
    } catch (e) {
      console.error('Sanity fetch failed', e)
    }
  }

  const totalGain = stats.totalMarket - stats.totalPurchase

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/" className="text-sm text-zinc-500">← Back to Home</Link>
        <h1 className="text-3xl font-bold mt-4 dark:text-white">My Collection</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">GROQ-powered portfolio — gain/loss auto-calculated from structured priceHistory.</p>

        {!isConfigured && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm">
            Showing mock data. Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in .env.local to fetch real Sanity data via GROQ.
            Studio at <Link href="/studio" className="underline">/studio</Link>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border">
            <p className="text-xs text-zinc-500">TOTAL ITEMS</p>
            <p className="text-2xl font-bold dark:text-white">{stats.totalItems}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border">
            <p className="text-xs text-zinc-500">TOTAL MARKET VALUE</p>
            <p className="text-2xl font-bold dark:text-white">Rp {(stats.totalMarket || 0).toLocaleString('id-ID')}</p>
            <p className={`text-xs mt-1 ${totalGain >=0 ? 'text-green-600' : 'text-red-600'}`}>{totalGain>=0?'+':''}Rp {totalGain.toLocaleString('id-ID')} ({stats.totalPurchase ? Math.round((totalGain/stats.totalPurchase)*100) : 0}%)</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border">
            <p className="text-xs text-zinc-500">WISHLIST</p>
            <p className="text-2xl font-bold dark:text-white">{stats.wishlistCount}</p>
            <p className="text-xs text-zinc-500 mt-1">Grail owned: {stats.grails?.length || 0}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {items.map((item:any) => (
            <div key={item._id} className="bg-white dark:bg-zinc-900 rounded-2xl border overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-5xl">
                {item.categoryIcon || '📦'}
              </div>
              <div className="p-5">
                <div className="flex gap-2 text-[10px] tracking-widest">
                  <span className="bg-zinc-900 text-white dark:bg-white dark:text-black px-2 py-1 rounded-full">{(item.category || '').toUpperCase()}</span>
                  <span className={`px-2 py-1 rounded-full ${item.rarity==='grail'?'bg-amber-500 text-white': item.rarity==='rare'?'bg-purple-600 text-white':'bg-zinc-100 dark:bg-zinc-800 dark:text-white'}`}>{item.rarity}</span>
                </div>
                <h3 className="font-semibold mt-3 dark:text-white leading-tight">{item.title}</h3>
                <p className="text-xs text-zinc-500">{item.brand} • {item.condition}</p>
                <div className="flex justify-between mt-4 text-sm">
                  <div>
                    <p className="text-xs text-zinc-500">Purchase</p>
                    <p className="font-medium dark:text-white">Rp {item.purchasePrice?.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Market</p>
                    <p className="font-bold dark:text-white">Rp {item.currentValue?.toLocaleString('id-ID')}</p>
                    <p className={`text-xs ${item.gain >=0 ? 'text-green-600' : 'text-red-600'}`}>{item.gain>=0?'+':''}Rp {item.gain?.toLocaleString('id-ID')} ({item.gainPercent}%)</p>
                  </div>
                </div>
                {item.priceHistory?.length >0 && (
                  <div className="mt-3 pt-3 border-t text-xs text-zinc-500">
                    Trend: {item.priceHistory.map((p:any)=> `Rp ${p.price.toLocaleString('id-ID')} (${p.source})`).join(' → ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-zinc-900 text-zinc-100 rounded-2xl">
          <h3 className="font-mono text-sm">GROQ used on this page</h3>
          <pre className="text-xs mt-2 overflow-auto opacity-80">{`// Items with calculated gain + 5 last prices\n${ITEMS_WITH_TREND_QUERY}\n\n// Portfolio stats (needs structured isOutlier filter)\n${PORTFOLIO_STATS_QUERY}`}</pre>
        </div>
      </div>
    </div>
  )
}
