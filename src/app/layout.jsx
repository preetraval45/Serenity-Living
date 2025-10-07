import './globals.css'
import { Nunito, Poppins } from 'next/font/google'
import Providers from '@/components/Providers'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://serenitylivingoflexington.com'),
  title: {
    default: 'Serenity Living of Lexington — Premier Senior Living Community in Gilbert, SC',
    template: '%s | Serenity Living of Lexington'
  },
  description: 'Experience compassionate, dignified care at Serenity Living of Lexington. Our senior living community offers assisted living, memory care, and skilled nursing services in Gilbert, SC. 24/7 care, rehabilitation, and respite services available.',
  keywords: ['senior living Gilbert SC', 'assisted living Lexington SC', 'memory care South Carolina', 'nursing home Gilbert', 'elderly care SC', 'rehabilitation services', 'respite care', 'senior community Lexington', 'skilled nursing Gilbert SC', 'Serenity Living'],
  authors: [{ name: 'Serenity Living of Lexington' }],
  creator: 'Serenity Living of Lexington',
  publisher: 'Serenity Living of Lexington',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://serenitylivingoflexington.com',
    siteName: 'Serenity Living of Lexington',
    title: 'Serenity Living of Lexington — Premier Senior Living Community',
    description: 'Experience compassionate, dignified care at Serenity Living. Assisted living, memory care, and skilled nursing in Gilbert, SC.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Serenity Living of Lexington - Senior Living Community',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serenity Living of Lexington — Premier Senior Living',
    description: 'Compassionate senior living, memory care, and skilled nursing in Gilbert, SC.',
    images: ['/og-image.jpg'],
    creator: '@serenitylex',
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
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
  alternates: {
    canonical: 'https://serenitylivingoflexington.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Serenity Living" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SeniorCareServices",
              "name": "Serenity Living of Lexington",
              "description": "Premier senior living and nursing community providing compassionate assisted living, memory care, skilled nursing, and rehabilitation services.",
              "url": "https://serenitylivingoflexington.com",
              "logo": "https://serenitylivingoflexington.com/logo.jpg",
              "image": "https://serenitylivingoflexington.com/og-image.jpg",
              "telephone": "+1-839-329-6084",
              "email": "serenitylivingoflexington@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "120 Rice Dr",
                "addressLocality": "Gilbert",
                "addressRegion": "SC",
                "postalCode": "29054",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "34.1234567",
                "longitude": "-81.1234567"
              },
              "openingHours": "Mo-Su 10:00-19:00",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "34.1234567",
                  "longitude": "-81.1234567"
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Senior Care Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Assisted Living",
                      "description": "Support for daily activities while preserving independence"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Memory Care",
                      "description": "Secure, compassionate care focused on routine and familiarity"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Skilled Nursing",
                      "description": "24/7 licensed nursing with care coordination and monitoring"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://facebook.com/serenitylivingoflexington",
                "https://www.instagram.com/serenity_living_2025",
                "https://x.com/serenitylex"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}