'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Shield, Award, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ThreeBackground from '@/components/ThreeBackground'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We are new to this field but have a genuine feeling to do noble work for senior people."
    },
    {
      icon: Users,
      title: "Family-Centered",
      description: "We believe in creating a warm, welcoming environment that feels like home for every resident."
    },
    {
      icon: Shield,
      title: "Dignity & Respect",
      description: "Our goal is to ensure that every resident experiences peace, joy, and a true sense of belonging."
    },
    {
      icon: Award,
      title: "Fresh Dedication",
      description: "Though new to this field, we bring fresh energy and commitment to senior care."
    }
  ]

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
              About <span className="text-primary-600">Serenity Living</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              At Serenity Living, our vision is to create a home where seniors feel safe, valued, and cared for with dignity.
              We are dedicated to providing compassionate support in an environment that promotes independence, comfort, and meaningful connections.
            </p>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    The story of Serenity Living began with a deeply personal realization — that assisted living should be about more than just care, it should be about living well. Our founders experienced firsthand the difficulty of finding a place where loved ones could feel both supported and truly at home.
                  </p>
                  <p>
                    Too often, facilities felt impersonal or clinical, leaving families wishing for something warmer and more genuine. Serenity Living was born from that experience and vision: to create a place where seniors are treated like family, and where care is infused with compassion, respect, and love.
                  </p>
                  <p>
                    Every decision — from the design of our welcoming spaces to the way our caregivers engage with residents — reflects this commitment. We believe that aging is a journey to be embraced with dignity and joy. At Serenity Living, we honor each resident's story, celebrate everyday moments, and provide families with the peace of mind that their loved ones are in caring hands.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-primary-200 hover:border-primary-400"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/70 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Clock className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">Opening Soon</h3>
                      <p className="text-gray-600">Coming Soon</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/70 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-secondary-600 transition-colors duration-300">32 Suites</h3>
                      <p className="text-gray-600">24/7 Facility</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/70 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-accent-600 transition-colors duration-300">120 Rice Dr</h3>
                      <p className="text-gray-600">Gilbert, SC 29054</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do at Serenity Living
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const colors = [
                  { bg: 'from-accent-50 to-accent-100', icon: 'bg-gradient-to-br from-accent-500 to-accent-600', text: 'group-hover:text-accent-600', border: 'border-accent-200 hover:border-accent-400' },
                  { bg: 'from-primary-50 to-primary-100', icon: 'bg-gradient-to-br from-primary-500 to-primary-600', text: 'group-hover:text-primary-600', border: 'border-primary-200 hover:border-primary-400' },
                  { bg: 'from-warm-50 to-warm-100', icon: 'bg-gradient-to-br from-warm-500 to-warm-600', text: 'group-hover:text-warm-600', border: 'border-warm-200 hover:border-warm-400' },
                  { bg: 'from-coral-50 to-coral-100', icon: 'bg-gradient-to-br from-coral-400 to-coral-500', text: 'group-hover:text-coral-500', border: 'border-coral-200 hover:border-coral-400' }
                ];
                const colorScheme = colors[index % colors.length];

                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className={`group text-center bg-gradient-to-br ${colorScheme.bg} rounded-2xl shadow-lg border-2 ${colorScheme.border} p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer`}
                  >
                    <div className={`w-16 h-16 ${colorScheme.icon} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <value.icon className="text-white" size={32} />
                    </div>
                    <h3 className={`text-xl font-bold text-gray-900 ${colorScheme.text} mb-3 transition-colors duration-300`}>{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-gradient-to-br from-accent-50 via-primary-50 to-warm-50 rounded-3xl p-8 md:p-12 text-center border-2 border-accent-200 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-warm-600 bg-clip-text text-transparent mb-6">Our Promise</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                At Serenity Living, we are more than caregivers – we&apos;re
                companions, advocates, and friends. Our carefully selected team works around
                the clock to ensure every resident feels valued, respected, and truly at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book-tour"
                  className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 text-center transform"
                >
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">Schedule a Visit</span>
                </Link>
                <Link
                  href="/contact"
                  className="group border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-105 text-center shadow-md hover:shadow-xl transform"
                >
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">Contact Us</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}