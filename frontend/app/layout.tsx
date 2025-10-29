import './globals.css'
import { Metadata, Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://highwaydelite.com'),
  title: {
    default: 'Highway Delite - Experience the Journey',
    template: '%s | Highway Delite'
  },
  description: 'Discover and book unique travel experiences across India. From local cuisines to cultural adventures, find your perfect journey with Highway Delite.',
  keywords: [
    'highway delite', 'india travel experiences', 'road trips india',
    'local experiences', 'cultural adventures', 'tourist activities',
    'travel booking', 'india tourism', 'authentic experiences',
    'highway tourism', 'travel packages', 'adventure booking'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://highwaydelite.com',
    siteName: 'Highway Delite',
    title: 'Highway Delite - Experience the Journey',
    description: 'Discover authentic Indian experiences along your journey',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Highway Delite Experiences'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Highway Delite',
    description: 'Discover authentic Indian experiences along your journey',
    images: ['/twitter-card.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#FFC107',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#FFC107" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Highway Delite" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="bg-white min-h-screen">
        {children}
        <SpeedInsights />
        <Analytics />
        {/* Structured data for better SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Highway Delite',
              description: 'Discover authentic Indian experiences along your journey',
              url: 'https://highwaydelite.com',
              logo: 'https://highwaydelite.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-XXXXXXXXXX',
                contactType: 'customer service'
              },
              sameAs: [
                'https://facebook.com/highwaydelite',
                'https://twitter.com/highwaydelite',
                'https://instagram.com/highwaydelite'
              ]
            })
          }}
        />
      </body>
    </html>
  )
}