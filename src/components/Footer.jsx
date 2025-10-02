'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Instagram, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book a Tour', href: '/book-tour' }
  ]

  const services = [
    'Assisted Living',
    'Memory Care',
    'Personal Care',
    'Health & Wellness',
    'Activities & Recreation'
  ]

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-primary-600 hover:bg-primary-700 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <Image
                    src="/logo.jpg"
                    alt="Serenity Living Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Serenity Living</div>
                  <div className="text-sm text-gray-400">of Lexington</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Where Compassionate Care Meets Comfortable Living. Experience the warmth of family 
                in a community designed for dignity, independence, and joy.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/serenitylivingoflexington"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/serenity_living_2025"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="mailto:serenitylivingoflexington@gmail.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-300 flex items-center group">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-primary-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-gray-300">120 Rice Dr</p>
                    <p className="text-gray-300">Gilbert, SC 29054</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary-500 flex-shrink-0" size={20} />
                  <a 
                    href="tel:+18393296084" 
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                  >
                    (839) 329-6084
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="text-primary-500 flex-shrink-0 mt-1" size={20} />
                  <a
                    href="mailto:serenitylivingoflexington@gmail.com"
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-300 break-words text-sm"
                  >
                    serenitylivingoflexington@gmail.com
                  </a>
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="mt-6">
                <Link
                  href="/book-tour"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Schedule a Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>&copy; {currentYear} Serenity Living of Lexington. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <Heart className="text-primary-500" size={16} />
                <span>for our community</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center mt-4 space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-primary-400 transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}