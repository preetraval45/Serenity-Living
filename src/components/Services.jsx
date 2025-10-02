'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, Heart, Brain, RotateCcw, Dumbbell, Utensils } from 'lucide-react'

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
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

  const services = [
    {
      icon: Home,
      title: 'Assisted Living',
      description: 'Our assisted living apartments feature spacious floor plans from 450-800 sq ft, with 24/7 support that promotes independence and dignity.',
      points: [
        'Personal care assistance with bathing, dressing, and grooming',
        'Medication management by licensed nurses',
        'Complimentary housekeeping, laundry, and linen service',
        'Emergency call system in every apartment',
        'Wellness monitoring and health assessments'
      ],
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      borderColor: 'border-primary-200'
    },
    {
      icon: Heart,
      title: 'Skilled Nursing',
      description: 'Our state-licensed skilled nursing facility provides comprehensive medical care with registered nurses on duty around the clock.',
      points: [
        'Post-acute and long-term care',
        'IV therapy and wound care management',
        'Cardiac monitoring and diabetes management',
        'Physical, occupational, and speech therapy',
        'Physician and specialist coordination'
      ],
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-600',
      borderColor: 'border-secondary-200'
    },
    {
      icon: Brain,
      title: 'Memory Care',
      description: 'Our secure 30-bed memory care neighborhood uses evidence-based approaches to support residents with Alzheimer&apos;s and dementia.',
      points: [
        'Structured daily routines with cognitive engagement',
        'Secure, wandering-friendly environment',
        'Specialized staff trained in dementia care',
        'Sensory gardens and therapeutic activities',
        'Family education and support groups'
      ],
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
      borderColor: 'border-accent-200'
    },
    {
      icon: RotateCcw,
      title: 'Respite Care',
      description: 'Flexible short-term stays from 3 days to 3 months, perfect for recovery periods or giving family caregivers a well-deserved break.',
      points: [
        'Flexible stays from 3 days to 90 days',
        'All levels of care available',
        'Social activities and meal services included',
        'Medicare and insurance accepted',
        'Seamless transition to long-term care if needed'
      ],
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      borderColor: 'border-primary-200'
    },
    {
      icon: Dumbbell,
      title: 'Rehabilitation & Therapy',
      description: 'Our on-site rehabilitation center features state-of-the-art equipment and licensed therapists helping residents achieve their highest level of independence.',
      points: [
        'Physical therapy with advanced equipment',
        'Occupational therapy for daily living skills',
        'Speech therapy for swallowing and communication',
        'Post-surgical and stroke recovery programs',
        'Medicare Part A and B accepted'
      ],
      bgColor: 'bg-secondary-50',
      iconColor: 'text-secondary-600',
      borderColor: 'border-secondary-200'
    },
    {
      icon: Utensils,
      title: 'Dining & Nutrition',
      description: 'Our award-winning culinary program features restaurant-style dining with menus created by our executive chef and registered dietitian.',
      points: [
        'Three chef-prepared meals plus snacks daily',
        'Special diets: diabetic, heart-healthy, pureed',
        'Private dining room for family celebrations',
        'Fresh salad bar and seasonal farm-to-table options',
        'Wine and beer service available'
      ],
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
      borderColor: 'border-accent-200'
    }
  ]

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="bg-white section"
    >
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="block mb-4 text-sm font-semibold tracking-wide uppercase text-primary-600">
            What We Offer
          </span>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our Services
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600">
            Comprehensive care options tailored to each residents needs, delivered with compassion and respect.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`card ${service.bgColor} border-2 ${service.borderColor} transition-all duration-1000 hover:shadow-xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Service Icon */}
                <div className={`inline-flex p-4 rounded-full ${service.bgColor} mb-6`}>
                  <Icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>

                {/* Service Title */}
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mb-6 leading-relaxed text-gray-600">
                  {service.description}
                </p>

                {/* Service Points */}
                <ul className="space-y-3">
                  {service.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                        service.iconColor.replace('text-', 'bg-')
                      }`}></div>
                      <span className="text-sm text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}