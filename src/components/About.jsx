'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, UserCheck } from 'lucide-react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const features = [
    'Licensed, experienced caregivers on site 24/7 with 8:1 resident-to-staff ratio',
    'Personalized care plans and medication management by registered nurses',
    'Secure, 5-acre campus with specialized memory care wing',
    'Award-winning culinary program with dietitian-approved menus',
    '120+ monthly activitiesitness classes, arts, music therapy, and local outings',
    'Family portal app for real-time updates and communication',
    'On-site physical therapy, occupational therapy, and speech therapy',
    'Beauty salon, barber shop, and library with over 3,000 books',
  ]

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-4 block">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Serenity Living
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Serenity Living is Gilbert's premier senior living community, featuring 120 beautifully appointed apartments and suites across our 5-acre campus. With over 25 years of combined experience, our dedicated team creates a warm, welcoming environment where residents thrive.
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Mission Card */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="card h-full">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Home className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To provide a safe, engaging, and nurturing home where residents live with dignity and purpose. Since opening our doors in 1998, we've served over 2,500 families in the Gilbert and Lexington communities, creating lasting bonds and precious memories.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h4>
              <ul className="space-y-3">
                {[
                  'Compassion and respect in every interaction',
                  'Personalized care plans rooted in clinical excellence',
                  'Connection through community, activities, and family',
                  'Safety, comfort, and a sense of belonging'
                ].map((value, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-primary-200 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expectations Card */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="card h-full">
              <div className="flex items-center mb-6">
                <div className="bg-secondary-100 p-3 rounded-full mr-4">
                  <UserCheck className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What Families Can Expect</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Clear communication, thoughtful activities, and a professional team that treats your loved one like family. From medication support to daily enrichment, we attend to every detail.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Daily wellness checks and care coordination',
                  'Chef-prepared meals and nutrition support',
                  'Housekeeping, laundry, and maintenance'
                ].map((expectation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-secondary-200 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{expectation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What Sets Us Apart
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-primary-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}