import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://niche-collector.vercel.app";
const title = "Niche Collector — Collection Tracker + Price Intelligence";
const description =
  "Track niche hobby collections (Hot Wheels, Gunpla, Mechanical Keyboards) with structured Sanity content. Auto valuation via GROQ priceHistory median, outlier filtering, and wishlist alerts.";
const keywords = [
  "niche collector",
  "collection tracker",
  "hot wheels tracker",
  "gunpla collection",
  "mechanical keyboard inventory",
  "price intelligence",
  "sanity groq",
  "portfolio valuation",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Niche Collector",
  },
  description,
  keywords,
  authors: [{ name: "Niche Collector" }],
  creator: "Niche Collector",
  publisher: "Niche Collector",
  category: "Hobby",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Niche Collector",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Niche Collector — Track Hot Wheels, Gunpla, Keyboards with GROQ valuation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
    creator: "@nichecollector",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    // google: "add-when-available",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Niche Collector",
              description,
              url: siteUrl,
              applicationCategory: "LifestyleApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "Structured collection inventory",
                "GROQ priceHistory valuation",
                "Outlier filtering",
                "Wishlist alerts",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
