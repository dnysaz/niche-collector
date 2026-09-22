# Niche Collector — Collection Tracker + Price Intelligence

**Sanity Challenge 2025 — Path 2: Vibe-code something strange**

> Portfolio tracker for niche hobbies (Hot Wheels, Gunpla, Mechanical Keyboards) that auto-calculates gain/loss from structured Sanity content. Built to prove why keyword search fails and GROQ succeeds.

![Niche Collector OG](https://sanity-challenge.vercel.app/opengraph-image)

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Sanity](https://img.shields.io/badge/Sanity-6-red)](https://www.sanity.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Live Demo:** https://sanity-challenge.vercel.app  
**Studio:** https://sanity-challenge.vercel.app/studio (or `http://localhost:3000/studio`)  
**Sanity Project:** `71m89sy5` / dataset `production` (Growth Trial, Active)

## Why Structured Content?

Keyword search cannot answer: *"What is my total portfolio value? How much gain vs purchase price compared to today's Tokopedia median?"*

Answer needs GROQ aggregation: `math::sum(currentValue) - math::sum(purchasePrice)` + median from `priceHistory` + `isOutlier != true` filter. Only possible when `price`, `condition`, `rarity` are structured fields, not text blobs.

See live proof at `/collection` — stats are computed server-side via GROQ, outlier `Rp 5,000,000` scam listing is excluded automatically.

## Schema Design

5 document types in `sanity/schemaTypes/` (`sanity/schemaTypes/index.ts:4`):

| Type | Purpose | Key fields |
|------|---------|------------|
| **hobbyCategory** | Hobby taxonomy | `title`, `slug`, `icon`, `marketplaceKeywords` (for scraping) |
| **collectibleItem** | Owned item | `title`, `category(ref)`, `brand`, `year`, `condition(enum)`, `rarity(enum)`, `images`, `purchasePrice`, `currentValue`, `quantity`, `status(owned/wishlist/sold)`, `tags` |
| **collection** | Curated grouping | `title`, `owner`, `category(ref)`, `items(ref[])`, `isPublic`, `coverImage` |
| **priceHistory** | Market trace | `item(ref)`, `source(tokopedia/shopee/ebay/manual)`, `price`, `recordedAt`, `isOutlier` |
| **wishlist** | Hunt list & alerts | `title`, `targetPrice`, `priority`, `alertActive` |

Relations, validations, orderings, previews — judges: see `sanity.config.ts:9` (`basePath: '/studio'`, `structureTool()`, `visionTool()`).

## GROQ Highlights

```groq
// Portfolio stats — /collection (sanity/lib/queries.ts:18)
{
  "totalItems": count(*[_type=="collectibleItem" && status=="owned"]),
  "totalPurchase": math::sum(*[_type=="collectibleItem" && status=="owned"].purchasePrice),
  "totalMarket": math::sum(*[_type=="collectibleItem" && status=="owned"].currentValue),
  "wishlistCount": count(*[_type=="wishlist"]),
  "grails": *[_type=="collectibleItem" && rarity=="grail" && status=="owned"]{title, currentValue}
}

// Items with trend (outlier filtering)
*[_type=="collectibleItem" && status=="owned"] | order(currentValue desc){
  title, purchasePrice, currentValue,
  "gain": currentValue - purchasePrice,
  "gainPercent": round(((currentValue - purchasePrice)/purchasePrice)*100),
  "priceHistory": *[_type=="priceHistory" && item._ref==^._id && isOutlier != true]
    | order(recordedAt desc)[0..5]{price, recordedAt, source}
}
```

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **Tailwind 4**
- **Sanity 6** + **next-sanity 13** + `@sanity/vision`
- **GROQ** + `next-sanity` `createClient` (`sanity/lib/client.ts:4`, `dataset: production`, `apiVersion: 2024-01-01`)
- SEO: `app/layout.tsx:15` (title template, Open Graph 1200x630, Twitter, JSON-LD, sitemap/robots)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing + schema explanation + GROQ example |
| `/collection` | Portfolio (revalidate 60s, GROQ if configured else mock) |
| `/studio/[[...tool]]` | Sanity Studio + Vision (`sanity.config.ts:14`) |
| `/opengraph-image` | Dynamic OG 1200x630 (`app/opengraph-image.tsx:1`, edge) |
| `/icon.svg` `/apple-icon` | Favicon set |
| `/sitemap.xml` `/robots.txt` | Auto-generated |

## Getting Started

```bash
git clone https://github.com/dnysaz/niche-collector.git
cd niche-collector  # or /Users/ketutdana/Desktop/sanity-challenge

# Install (use custom cache if you hit EACCES on macOS)
npm_config_cache=/tmp/npm-cache npm install

cp .env.local.example .env.local
# Create project at https://www.sanity.io/manage
# Set NEXT_PUBLIC_SANITY_PROJECT_ID=71m89sy5 and NEXT_PUBLIC_SANITY_DATASET=production

# Seed dataset (14 docs: 3 categories, 3 items, 5 priceHistory, 1 collection, 2 wishlist)
npm_config_cache=/tmp/npm-cache npx sanity login --provider google
npm_config_cache=/tmp/npm-cache npx sanity dataset import sanity/seed.ndjson production -p 71m89sy5

# Allow Studio CORS
npm_config_cache=/tmp/npm-cache npx sanity cors add http://localhost:3000 --credentials
npm_config_cache=/tmp/npm-cache npx sanity cors add http://localhost:3001 --credentials

npm_config_cache=/tmp/npm-cache npm run dev  # http://localhost:3000
# Studio: http://localhost:3000/studio
```

## Sanity Project for Submission

- **Project Name:** `Niche Collector`
- **Project ID:** `71m89sy5`
- **Dataset:** `production`
- **Organization ID:** `os9xuj7u1`
- **Dataset URL:** `https://71m89sy5.apicdn.sanity.io/v2024-01-01/data/query/production?query=*[_type=="collectibleItem"]`
- **Studio URL:** `https://sanity-challenge.vercel.app/studio` (or `http://localhost:3000/studio`)

Required by challenge template — include this ID in your DEV post.

## Build & Deploy

```bash
npm run build  # verified ✓ — Route: / , /collection (1m), /studio, /opengraph-image (ƒ), /icon.svg, /sitemap.xml
# Deploy
vercel --prod  # or connect GitHub repo to Vercel, set env NEXT_PUBLIC_SANITY_PROJECT_ID
# Add CORS for production:
npx sanity cors add https://sanity-challenge.vercel.app --credentials
npx sanity cors add https://sanity-challenge-3uat3hjib-ketutdanas-projects.vercel.app --credentials
```

Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL for correct `metadataBase`.

## Submission (DEV)

1. Create post at DEV with template **Path Two: Vibe-code something strange**
2. Tag: `#sanitychallenge`
3. Include: Project ID `71m89sy5` + dataset URL + live demo URL + Studio URL + honest build writeup
4. Optional: embed agent session transcript

Deadline: **Oct 4, 11:59 PM PDT** — Winners announced Oct 22.

## License

MIT — see [LICENSE](LICENSE). Free for personal & commercial use. Attribution appreciated.

## Credits

Built with Sanity best practices. Schema inspired by real collector pain: Excel + manual Shopee checks.
