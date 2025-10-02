'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary-600 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Phone size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">(839) 329-6084</span>
              <span className="sm:hidden">Call</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Mail size={16} />
              <span className="hidden lg:inline">serenitylivingoflexington@gmail.com</span>
              <span className="lg:hidden">Email</span>
            </div>
          </div>
          <div className="hidden md:block text-xs">
            <span>120 Rice Dr, Gilbert, SC 29054</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo - Far Left */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                  <Image
                    src="/logo.jpg"
                    alt="Serenity Living Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="text-left">
                  <div className="text-lg sm:text-xl font-bold text-primary-600">Serenity Living</div>
                  <div className="text-xs text-gray-500 -mt-1 hidden sm:block">of Lexington</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Far Right */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 ml-4 lg:ml-6">
                <Link
                  href="/book-tour"
                  className="bg-primary-600 text-white px-4 lg:px-6 py-2 rounded-full hover:bg-primary-700 transition-colors duration-200 font-medium text-sm"
                >
                  Book a Tour
                </Link>
              </div>
            </div>

            {/* Mobile menu button - Far Right */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-3 rounded-md font-medium transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/book-tour"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-colors duration-200 font-medium text-center mx-3 mt-4"
                >
                  Book a Tour
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}