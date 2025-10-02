'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Shield, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ImageCarousel from '@/components/ImageCarousel'

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: "easeOut"
      }
    }
  }

  const services = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We are new to this field but have a genuine feeling to do noble work for senior people"
    },
    {
      icon: Users,
      title: "Family Community",
      description: "Building meaningful relationships and connections with dedication and heart"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Secure, comfortable living spaces designed for seniors with care and attention"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="relative">
        {/* Hero Section with Image Carousel */}
        <section>
          <ImageCarousel />
        </section>

        {/* Services Section */}
        <section className="px-4 py-20 bg-gray-50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="inline-flex items-center px-10 py-6 mb-8 rounded-2xl bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 border-2 border-primary-300 shadow-xl">
                <span className="mr-4 text-4xl">🚧</span>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-1">OPENING SOON</div>
                  <div className="text-sm md:text-base text-primary-700 font-semibold">Gilbert, South Carolina</div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Serenity Living?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're new to this field but bring fresh dedication and genuine care for our senior community.
                Currently preparing to welcome our first residents!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="text-primary-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Now Open Section */}
        <section className="px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 border-2 border-primary-300 rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🏗️</span>
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-2">COMING SOON</h3>
                  <div className="text-xl md:text-2xl text-primary-700 font-semibold">Gilbert, South Carolina</div>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We're a brand new facility with fresh energy and commitment! Our premier assisted living facility
                is being prepared to provide exceptional care and comfort from day one. Join our founding
                community and discover your new home with people who truly care about senior living.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 bg-primary-50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <p className="text-lg text-gray-600">Ready to learn more or schedule a visit?</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div variants={itemVariants} className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                <p className="text-gray-600 text-sm">120 Rice Dr, Gilbert, SC 29054</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Phone className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                <p className="text-gray-600 text-sm">(839) 329-6084</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <p className="text-gray-600 text-sm">serenitylivingoflexington@gmail.com</p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-tour"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center"
              >
                Book a Tour
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300 text-center"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}