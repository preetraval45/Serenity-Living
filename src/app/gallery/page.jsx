'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import ThreeBackground from '@/components/ThreeBackground'

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <ThreeBackground />
      <Navigation />
      
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M50 12.5a37.5 37.5 0 1 0 0 75 37.5 37.5 0 0 0 0-75zm0 6.25a31.25 31.25 0 1 1 0 62.5 31.25 31.25 0 0 1 0-62.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '80px 80px'
             }}
        />
      </div>

      <main className="relative pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Beautiful <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Take a virtual tour of our facilities and see why Serenity Living is the perfect 
              place to call home. From our elegant common areas to comfortable living spaces, 
              discover what makes our community special.
            </p>
          </motion.div>
        </section>

        {/* Gallery Component */}
        <Gallery />
      </main>
      
      <Footer />
    </div>
  )
}