import { Metadata } from 'next'

const defaultKeywords = [
  'highway delite',
  'road trips',
  'travel experiences',
  'adventure booking',
  'india travel',
  'road trip experiences',
  'travel booking',
  'highway experiences',
  'tourist activities',
  'travel packages',
  'local experiences',
  'tourist guides',
  'travel planning',
  'highway tourism',
  'india tourism'
]

export const defaultMetadata: Metadata = {
  title: {
    default: 'Highway Delite - Experience the Journey',
    template: '%s | Highway Delite'
  },
  description: 'Discover and book unique travel experiences across India. From local cuisines to cultural adventures, find the perfect experience for your journey with Highway Delite.',
  keywords: defaultKeywords,
  metadataBase: new URL('https://highwaydelite.com'),
  openGraph: {
    type: 'website',
    title: 'Highway Delite - Experience the Journey',
    description: 'Discover and book unique travel experiences across India. From local cuisines to cultural adventures, find the perfect experience for your journey.',
    siteName: 'Highway Delite',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Highway Delite - Experience the Journey'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Highway Delite - Experience the Journey',
    description: 'Discover and book unique travel experiences across India. From local cuisines to cultural adventures, find the perfect experience for your journey.',
    images: ['/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://highwaydelite.com'
  }
}