import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-sm tracking-widest text-zinc-500">SANITY CHALLENGE — PATH 2</p>
            <h1 className="text-4xl font-bold mt-2 dark:text-white">Niche Collector</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl">
              Collection Tracker + Price Intelligence for niche hobbies. Track Hot Wheels, Gundam, Mechanical Keyboards — auto valuation from Tokopedia/Shopee prices via Sanity structured content.
            </p>
          </div>
          <Link href="/studio" className="rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-sm font-medium">Open Sanity Studio →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border">
            <div className="text-2xl">🏎️</div>
            <h3 className="font-semibold mt-2 dark:text-white">Structured Schema</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">5 types: hobbyCategory, collectibleItem, collection, priceHistory, wishlist. Relations + GROQ for median valuation.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border">
            <div className="text-2xl">📈</div>
            <h3 className="font-semibold mt-2 dark:text-white">Price Intelligence</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">priceHistory per item → GROQ query calculates median, detects outliers, 30-day trend.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border">
            <div className="text-2xl">🎯</div>
            <h3 className="font-semibold mt-2 dark:text-white">Wishlist Alerts</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Target price vs market price → trigger alert when price drops to your budget.</p>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-zinc-900 rounded-2xl border p-6">
          <h2 className="font-semibold dark:text-white">GROQ Example — Portfolio Valuation</h2>
          <pre className="mt-3 bg-zinc-950 text-zinc-100 p-4 rounded-xl text-xs overflow-auto">
{`*[_type == "collectibleItem" && status == "owned"]{
  title, purchasePrice, currentValue,
  "trend": *[_type=="priceHistory" && item._ref==^._id] | order(recordedAt desc)[0..9]{price, recordedAt}
} | { "totalPurchase": sum([].purchasePrice), "totalMarket": sum([].currentValue), "gain": sum([].currentValue) - sum([].purchasePrice) }`}
          </pre>
          <p className="text-xs text-zinc-500 mt-2">This query only works because content is structured — keyword search cannot calculate gain/loss.</p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/collection" className="rounded-full border px-6 py-3 text-sm font-medium dark:text-white dark:border-zinc-700">View Collection Demo →</Link>
          <a href="https://www.sanity.io/docs" target="_blank" className="text-sm text-zinc-500 py-3">Sanity Docs</a>
        </div>

        <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
          <b>Setup Project ID:</b> Create a project at <code>sanity.io/manage</code> → copy Project ID → set in <code>.env.local</code> as <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>. Dataset: <code>production</code>.
        </div>
      </main>
    </div>
  );
}
