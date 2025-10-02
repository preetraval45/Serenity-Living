'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, ExternalLink, Facebook, Instagram, Send, Users, Heart } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ThreeBackground from '@/components/ThreeBackground'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We\'ll contact you soon.'
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiry: '',
          message: '',
          consent: false
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'There was an error sending your message. Please try again or call us directly.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again or call us directly at (839) 329-6084.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Your Future Home',
      content: ['120 Rice Dr', 'Gilbert, SC 29054'],
      action: 'Get Directions',
      link: 'https://www.google.com/maps/dir/?api=1&destination=120+Rice+Dr,+Gilbert,+SC+29054'
    },
    {
      icon: Phone,
      title: 'Call Us Today',
      content: ['(839) 329-6084'],
      action: 'Call Now',
      link: 'tel:+18393296084'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: ['serenitylivingoflexington@gmail.com'],
      action: 'Send Email',
      link: 'mailto:serenitylivingoflexington@gmail.com'
    },
    {
      icon: Clock,
      title: 'Facility Hours',
      content: ['Open 24/7', '365 Days a Year'],
      action: 'Learn More',
      link: '/about'
    }
  ]

  const socialMedia = [
    {
      name: 'Facebook',
      icon: Facebook,
      link: 'https://facebook.com/serenitylivingoflexington',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      link: 'https://www.instagram.com/serenity_living_2025',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Email',
      icon: Mail,
      link: 'mailto:serenitylivingoflexington@gmail.com',
      color: 'hover:text-primary-600'
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
              Get in <span className="text-primary-600">Touch</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-primary-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're building something special at Serenity Living. Connect with us to learn more 
              about our upcoming senior living community and how you can be part of our story.
            </p>
          </motion.div>
        </section>

        {/* Contact Information Grid */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {contactInfo.map((info, index) => {
                const colors = [
                  { bg: 'from-accent-50 to-accent-100', icon: 'bg-gradient-to-br from-accent-500 to-accent-600', border: 'border-accent-200 hover:border-accent-400', title: 'group-hover:text-accent-600', button: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' },
                  { bg: 'from-primary-50 to-primary-100', icon: 'bg-gradient-to-br from-primary-500 to-primary-600', border: 'border-primary-200 hover:border-primary-400', title: 'group-hover:text-primary-600', button: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700' },
                  { bg: 'from-warm-50 to-warm-100', icon: 'bg-gradient-to-br from-warm-500 to-warm-600', border: 'border-warm-200 hover:border-warm-400', title: 'group-hover:text-warm-600', button: 'bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700' },
                  { bg: 'from-coral-50 to-coral-100', icon: 'bg-gradient-to-br from-coral-400 to-coral-500', border: 'border-coral-200 hover:border-coral-400', title: 'group-hover:text-coral-500', button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' }
                ];
                const colorScheme = colors[index % colors.length];

                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`group bg-gradient-to-br ${colorScheme.bg} rounded-2xl shadow-lg border-2 ${colorScheme.border} p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 min-h-[280px] flex flex-col justify-between cursor-pointer`}
                  >
                    <div className="flex-1">
                      <div className={`w-16 h-16 ${colorScheme.icon} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <info.icon className="text-white" size={32} />
                      </div>
                      <h3 className={`text-xl font-bold text-gray-900 ${colorScheme.title} mb-4 transition-colors duration-300`}>{info.title}</h3>
                      <div className="space-y-1 mb-6">
                        {info.content.map((line, idx) => (
                          <p key={idx} className={`text-gray-700 ${line.includes('@') ? 'text-xs break-all leading-relaxed' : ''}`}>{line}</p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto">
                      {info.link ? (
                        <a
                          href={info.link}
                          className={`inline-block ${colorScheme.button} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110`}
                        >
                          {info.action}
                        </a>
                      ) : (
                        <button className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:scale-105">
                          {info.action}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <Send className="h-8 w-8 text-primary-600 mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                </div>
                
                {submitStatus.message && (
                  <div className={`p-4 rounded-xl ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select inquiry type...</option>
                      <option value="general">General Information</option>
                      <option value="tour">Schedule a Tour</option>
                      <option value="admissions">Future Admissions</option>
                      <option value="employment">Employment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your interest in Serenity Living..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="mt-1 rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to be contacted about my inquiry regarding Serenity Living services. *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>

                {/* Social Media Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Follow Our Journey</h3>
                  <div className="flex justify-center space-x-6">
                    {socialMedia.map((social) => (
                      <a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-lg ${social.color}`}
                        aria-label={social.name}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Map and Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
              >
                {/* Map */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">Our Future Location</h3>
                    </div>
                  </div>
                  <iframe
                    title="Serenity Living Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8!2d-81.3644217!3d34.0931128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f8b123456789ab%3A0x123456789abcdef0!2s120%20Rice%20Dr%2C%20Gilbert%2C%20SC%2029054!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="300"
                    allowFullScreen
                    loading="lazy"
                    className="border-0"
                  />
                  <div className="p-6">
                    <div className="flex space-x-4">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=120+Rice+Dr,+Gilbert,+SC+29054"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300 text-center flex items-center justify-center space-x-2"
                      >
                        <span>🗺️</span>
                        <span>Google Maps</span>
                      </a>
                      <a
                        href="https://maps.apple.com/?daddr=120+Rice+Dr,+Gilbert,+SC+29054"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-primary-600 text-primary-600 px-4 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-colors duration-300 text-center flex items-center justify-center space-x-2"
                      >
                        <span>🍎</span>
                        <span>Apple Maps</span>
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}