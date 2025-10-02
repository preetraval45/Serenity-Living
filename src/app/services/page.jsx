'use client'

import { motion } from 'framer-motion'
import { Heart, Home, Utensils, Activity, Shield, Clock, Users, Stethoscope } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ThreeBackground from '@/components/ThreeBackground'

export default function ServicesPage() {
  const services = [
    {
      icon: Heart,
      title: "Personal Care",
      description: "With genuine feeling for noble work, we provide heartfelt assistance with daily activities to maintain dignity and independence.",
      features: ["24/7 Care Staff", "Medication Management", "Personal Hygiene Assistance", "Mobility Support"]
    },
    {
      icon: Home,
      title: "Assisted Living",
      description: "Comfortable private rooms with modern amenities and housekeeping services.",
      features: ["Private Rooms", "Housekeeping", "Laundry Services", "Room Maintenance"]
    },
    {
      icon: Utensils,
      title: "Dining Services",
      description: "Nutritious, delicious meals prepared by our culinary team with dietary accommodations available.",
      features: ["Three Daily Meals", "Healthy Snacks", "Special Diets", "Community Dining"]
    },
    {
      icon: Activity,
      title: "Activities & Recreation",
      description: "Engaging programs and activities designed to promote social interaction and mental stimulation.",
      features: ["Daily Activities", "Exercise Programs", "Social Events", "Arts & Crafts"]
    },
    {
      icon: Stethoscope,
      title: "Health & Wellness",
      description: "Comprehensive healthcare coordination and wellness programs to maintain optimal health.",
      features: ["Health Monitoring", "Coordination with Doctors", "Therapy Services", "Wellness Programs"]
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Safe, secure environment with emergency response systems and trained staff available 24/7.",
      features: ["24/7 Security", "Emergency Response", "Safety Monitoring", "Staff Training"]
    }
  ]

  const levels = [
    {
      title: "Tier 1 Care",
      description: "Verbal reminders and supervision for daily activities with professional medication management.",
      features: [
        "Verbal reminders for all dressing and grooming",
        "Verbal reminders for all meals and activities",
        "Supervision for bathing once weekly",
        "Daily bed making",
        "Housekeeping and laundry",
        "Night checks",
        "Medication administration",
        "Coordinate care with 3rd party healthcare providers"
      ]
    },
    {
      title: "Tier 2 Care",
      description: "Includes all Tier 1 services plus minimal physical assistance for daily living activities.",
      features: [
        "All services in Tier 1",
        "1 person minimal assistance for all activities of daily living",
        "1 person minimal assistance for toileting",
        "1 person minimal assistance for all meals and activities",
        "1 person minimal assistance for bathing once weekly",
        "Support for independent walking using walker or cane",
        "Injectable medications"
      ]
    },
    {
      title: "Tier 3 Care",
      description: "Comprehensive assistance for residents needing extensive help with daily activities.",
      features: [
        "All services in Tier 1 and 2",
        "1 person extensive assistance for all activities of daily living",
        "1 person extensive assistance for toileting",
        "1 person extensive assistance for all meals and activities",
        "1 person extensive assistance for bathing once weekly",
        "1 person extensive assistance for transfers and walking"
      ]
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
              Our <span className="text-primary-600">Services</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Though new to this field, we bring fresh dedication and genuine care to senior living.
              Our comprehensive services are designed with heart to promote independence, dignity, and quality of life.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Caring Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We may be new to this field, but our commitment to doing noble work for senior people drives every service we offer
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const colors = [
                  { bg: 'from-accent-50 to-accent-100', icon: 'bg-gradient-to-br from-accent-500 to-accent-600', hover: 'group-hover:text-accent-600', border: 'border-accent-200 hover:border-accent-400', dot: 'bg-accent-600' },
                  { bg: 'from-primary-50 to-primary-100', icon: 'bg-gradient-to-br from-primary-500 to-primary-600', hover: 'group-hover:text-primary-600', border: 'border-primary-200 hover:border-primary-400', dot: 'bg-primary-600' },
                  { bg: 'from-warm-50 to-warm-100', icon: 'bg-gradient-to-br from-warm-500 to-warm-600', hover: 'group-hover:text-warm-600', border: 'border-warm-200 hover:border-warm-400', dot: 'bg-warm-600' }
                ];
                const colorScheme = colors[index % colors.length];

                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`group bg-gradient-to-br ${colorScheme.bg} rounded-2xl shadow-lg border-2 ${colorScheme.border} p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer`}
                  >
                    <div className={`w-16 h-16 ${colorScheme.icon} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <service.icon className="text-white" size={32} />
                    </div>
                    <h3 className={`text-xl font-bold text-gray-900 ${colorScheme.hover} mb-3 transition-colors duration-300`}>{service.title}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className={`w-2 h-2 ${colorScheme.dot} rounded-full mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Care Levels */}
        <section id="care-levels" className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Levels of Care</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the level of support that's right for you or your loved one
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {levels.map((level, index) => {
                const tierColors = [
                  { bg: 'from-accent-50 to-accent-100', border: 'border-accent-300 hover:border-accent-500', badge: 'bg-gradient-to-r from-accent-500 to-accent-600', dot: 'bg-accent-600', title: 'group-hover:text-accent-600' },
                  { bg: 'from-primary-50 to-primary-100', border: 'border-primary-300 hover:border-primary-500', badge: 'bg-gradient-to-r from-primary-500 to-primary-600', dot: 'bg-primary-600', title: 'group-hover:text-primary-600' },
                  { bg: 'from-warm-50 to-warm-100', border: 'border-warm-300 hover:border-warm-500', badge: 'bg-gradient-to-r from-warm-500 to-warm-600', dot: 'bg-warm-600', title: 'group-hover:text-warm-600' }
                ];
                const colorScheme = tierColors[index % tierColors.length];

                return (
                  <motion.div
                    key={level.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className={`group bg-gradient-to-br ${colorScheme.bg} rounded-2xl shadow-lg border-2 ${colorScheme.border} p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer ${
                      index === 1 ? 'ring-2 ring-primary-200' : ''
                    }`}
                  >
                    {index === 1 && (
                      <div className={`${colorScheme.badge} text-white px-4 py-2 rounded-full text-sm font-semibold text-center mb-4 shadow-md`}>
                        Most Popular
                      </div>
                    )}
                    <h3 className={`text-2xl font-bold text-gray-900 ${colorScheme.title} mb-3 transition-colors duration-300`}>{level.title}</h3>
                    <p className="text-gray-700 mb-6">{level.description}</p>
                    <ul className="space-y-3">
                      {level.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className={`w-2 h-2 ${colorScheme.dot} rounded-full mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/contact"
                      className={`block w-full mt-6 ${colorScheme.badge} text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md text-center`}
                    >
                      Contact Us
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Services Section */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Services & Amenities</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Optional services available to enhance comfort and care
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">One-Time Services</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Move-in fee (non-refundable)</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Monthly Add-Ons</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Larger room upgrade</li>
                  <li>• Feeding assistance</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Supply Packages</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Sanitary supplies</li>
                  <li>• Toiletries package</li>
                  <li className="text-sm text-gray-500 mt-2">Includes: shampoo, soap, body wash, body lotion, laundry supplies, facial tissue, toilet paper</li>
                </ul>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg border-2 border-primary-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Standard Amenities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 24/7 security monitoring indoor and outdoor</li>
                  <li>• Furnished suite available on request</li>
                  <li>• Free Internet</li>
                  <li>• Free basic TV</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl shadow-lg border-2 border-accent-200 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Transparent Billing & Safety</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Monthly charges include everything based on tier - no surprises or extra billing at the end of month</li>
                  <li>• Individualized nurse call system (pendant) and access control</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="bg-gradient-to-br from-accent-50 via-primary-50 to-warm-50 rounded-3xl p-8 md:p-12 text-center border-2 border-accent-200 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-warm-600 bg-clip-text text-transparent mb-6">Ready to Learn More?</h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Schedule a personal tour to see our facilities and meet our caring team.
                We'll help you find the perfect care solution for your loved ones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/book-tour"
                  className="group bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 text-center transform"
                >
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">Schedule a Tour</span>
                </a>
                <a
                  href="/contact"
                  className="group border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-105 text-center shadow-md hover:shadow-xl transform"
                >
                  <span className="inline-block group-hover:scale-110 transition-transform duration-300">Contact Us</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}