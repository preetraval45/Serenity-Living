'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Heart, Users, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from './Navigation'
import Confetti from './Confetti'
import Footer from './Footer'
import ThreeBackground from './ThreeBackground'

export default function ComingSoon() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const services = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "24/7 professional care with a personal touch"
    },
    {
      icon: Users,
      title: "Family Community",
      description: "Building meaningful relationships and connections"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Secure, comfortable living spaces designed for seniors"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <ThreeBackground />
      <Navigation />
      <Confetti />
      
      {/* Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M50 12.5a37.5 37.5 0 1 0 0 75 37.5 37.5 0 0 0 0-75zm0 6.25a31.25 31.25 0 1 1 0 62.5 31.25 31.25 0 0 1 0-62.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '80px 80px'
             }}
        />
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section className="px-4 pt-32 pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto text-center max-w-7xl"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <div className="flex items-center justify-center w-40 h-40 mx-auto mb-6">
                <Image
                  src="/logo.jpg"
                  alt="Serenity Living Logo"
                  width={150}
                  height={150}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl lg:text-7xl">
                <span className="text-primary-600">Serenity Living</span>
              </h1>
              <div className="w-32 h-1 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"></div>
              <div className="inline-flex items-center px-6 py-3 mb-4 rounded-full bg-primary-50">
                <span className="mr-3 text-2xl">🏠</span>
                <span className="font-semibold text-primary-700">Assisted Living Service</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-4xl italic">
                "Home Away From Home"
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600 md:text-xl">
                Where compassionate care meets comfortable living. Experience the warmth of family 
                in a community designed for dignity, independence, and joy.
              </p>
              <div className="p-6 text-center border border-blue-200 bg-blue-50 rounded-2xl">
                <div className="flex items-center justify-center mb-3">
                  <span className="mr-3 text-3xl">🏡</span>
                  <h3 className="text-xl font-bold text-blue-800">Now Accepting Residents</h3>
                </div>
                <p className="text-blue-700">
                  We're a brand new facility, just getting started! Our premier assisted living facility
                  is designed to provide exceptional care and comfort from day one. Join our founding
                  community and discover your new home.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-16">
              <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl">
                      <service.icon className="text-primary-600" size={32} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-16">
              <div className="max-w-4xl p-8 mx-auto bg-primary-50 rounded-3xl md:p-12">
                <h3 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">Get in Touch</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary-600 rounded-xl">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <h4 className="mb-1 font-semibold text-gray-900">Location</h4>
                    <p className="text-sm text-gray-600">120 Rice Dr, Gilbert, SC 29054</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary-600 rounded-xl">
                      <Phone className="text-white" size={24} />
                    </div>
                    <h4 className="mb-1 font-semibold text-gray-900">Call Us</h4>
                    <p className="text-sm text-gray-600">(839) 329-6084</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary-600 rounded-xl">
                      <Mail className="text-white" size={24} />
                    </div>
                    <h4 className="mb-1 font-semibold text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600">serenitylivingoflexington@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/book-tour"
                  className="px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-xl"
                >
                  Book a Tour
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 font-semibold transition-all duration-300 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-600 hover:text-white"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}