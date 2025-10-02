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
  title: 'Serenity Living — Premier Senior Living Community | Gilbert, SC',
  description: 'Experience compassionate, dignified care at Serenity Living. Our senior living community offers assisted living, memory care, and skilled nursing services in Gilbert, SC.',
  keywords: 'senior living, assisted living, memory care, nursing home, Gilbert SC, Lexington SC, elderly care, rehabilitation, respite care',
  authors: [{ name: 'Serenity Living of Lexington' }],
  openGraph: {
    title: 'Serenity Living — Premier Senior Living Community',
    description: 'Experience compassionate, dignified care at Serenity Living. Our senior living community offers assisted living, memory care, and skilled nursing services in Gilbert, SC.',
    type: 'website',
    url: 'https://theserenityliving.com',
    images: ['/logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/logo.jpg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SeniorCareServices",
              "name": "Serenity Living of Lexington",
              "description": "Premier senior living and nursing community providing compassionate assisted living, memory care, skilled nursing, and rehabilitation services.",
              "url": "https://theserenityliving.com",
              "logo": "https://theserenityliving.com/logo.jpg",
              "image": "https://theserenityliving.com/logo.jpg",
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