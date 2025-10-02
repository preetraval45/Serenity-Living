'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTourModal, setShowTourModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    message: '',
    consent: false
  })
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Show success message
    alert('Thank you! We\'ll be in touch soon.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiry: '',
      message: '',
      consent: false
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }))
  }

  const contactDetails = [
    {
      icon: Phone,
      title: 'Call Us',
      content: '(839) 329-6084',
      link: 'tel:+18393296084'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'serenitylivingoflexington@gmail.com',
      link: 'mailto:serenitylivingoflexington@gmail.com'
    },
    {
      icon: Clock,
      title: 'Facility Hours',
      content: '24/7 Facility',
      link: null
    }
  ]

  return (
    <>
      <section 
        id="contact" 
        ref={sectionRef}
        className="section bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Serenity Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to learn more about our compassionate care community? We're here to answer your questions and schedule your visit.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="card">
                <div className="flex items-center mb-6">
                  <MapPin className="h-8 w-8 text-primary-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Visit Us</h3>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">
                  120 Rice Dr, Gilbert, SC 29054
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=120+Rice+Dr,+Gilbert,+SC+29054"
                      target="_blank"
                      rel="noopener"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                    >
                      <span className="mr-2">🗺️</span>
                      Get Directions
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                    <a
                      href="https://maps.apple.com/?daddr=120+Rice+Dr,+Gilbert,+SC+29054"
                      target="_blank"
                      rel="noopener"
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                    >
                      <span className="mr-2">🍎</span>
                      Apple Maps
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                  <button
                    onClick={() => setShowTourModal(true)}
                    className="btn btn-primary w-full"
                  >
                    Schedule Tour
                  </button>
                </div>

                {/* Embedded Map */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    title="Serenity Living Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8!2d-81.3644217!3d34.0931128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f8b123456789ab%3A0x123456789abcdef0!2s120%20Rice%20Dr%2C%20Gilbert%2C%20SC%2029054!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="300"
                    allowFullScreen
                    loading="lazy"
                    className="border-0"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <form onSubmit={handleSubmit} className="card">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 555-5555"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select one...</option>
                      <option value="general">General Information</option>
                      <option value="tour">Schedule a Tour</option>
                      <option value="admissions">Admissions</option>
                      <option value="services">Services Questions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y"
                  />
                </div>

                <div className="mb-6">
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
                      I agree to be contacted about my inquiry. *
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Details */}
          <div className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon
                const content = detail.link ? (
                  <a 
                    href={detail.link}
                    className="text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {detail.content}
                  </a>
                ) : (
                  <span className="text-gray-600">{detail.content}</span>
                )

                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-primary-100 mb-4">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {detail.title}
                    </h4>
                    <div className="text-lg">{content}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Tour Modal */}
      {showTourModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule a Tour</h3>
            <p className="text-gray-600 mb-6">
              Call us at <a href="tel:+18393296084" className="text-primary-600 font-semibold">(839) 329-6084</a> to schedule your personalized tour of our facilities.
            </p>
            <div className="flex gap-4">
              <a href="tel:+18393296084" className="btn btn-primary flex-1">
                Call Now
              </a>
              <button
                onClick={() => setShowTourModal(false)}
                className="btn btn-outline flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}