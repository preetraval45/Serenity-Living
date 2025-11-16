'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop&crop=center',
      alt: 'Modern architecture main lobby',
      caption: 'Main Lobby — Our grand entrance features elegant finishes, natural lighting, and welcoming spaces for residents and families.'
    },
    {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&crop=center',
      alt: 'Modern luxury apartments',
      caption: 'Luxury Apartments — Premium 1 and 2-bedroom units with full kitchens, accessibility features, and beautiful views designed for comfort and independence.'
    },
    {
      src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center',
      alt: 'Landscaping and garden design',
      caption: 'Future Healing Gardens — Our 3-acre campus will feature therapeutic walking paths, raised garden beds, water features, and secure outdoor therapy spaces.'
    },
    {
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&crop=center',
      alt: 'Modern dining facility in progress',
      caption: 'Upcoming Dining Experience — Restaurant-style dining spaces with gourmet cuisine, dietary accommodations, and private rooms for special occasions.'
    },
    {
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center',
      alt: 'Recreation center under development',
      caption: 'Activities Center in Progress — Multipurpose spaces for fitness classes, arts and crafts, live entertainment, educational programs, and social gatherings.'
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center',
      alt: 'Medical and therapy center',
      caption: 'Rehabilitation Wing — State-of-the-art therapy facilities with licensed professionals, modern equipment, and comfortable recovery spaces.'
    },
    {
      src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&crop=center',
      alt: 'Modern senior care facility exterior',
      caption: 'Serenity Living Exterior — Our beautiful facility will blend seamlessly with the natural landscape while providing secure, accessible living spaces.'
    },
    {
      src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center',
      alt: 'Rehabilitation center design concept',
      caption: 'Rehabilitation Center — State-of-the-art therapy facilities with advanced equipment to help residents achieve their highest level of independence.'
    },
    {
      src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop&crop=center',
      alt: 'Wellness center and spa area',
      caption: 'Wellness & Spa Center — Comprehensive health services including massage therapy, beauty services, and wellness programs for total wellbeing.'
    }
  ]

  const openLightbox = (src) => {
    setSelectedImage(src)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = ''
  }

  return (
    <>
      <section 
        id="gallery" 
        ref={sectionRef}
        className="section bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30"></div>
        
        <div className="container relative z-10">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-4 block">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Photo Gallery
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(item.src)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Caption */}
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-2xl">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-gray-800 font-medium">View Image</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl z-10"
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Gallery image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}