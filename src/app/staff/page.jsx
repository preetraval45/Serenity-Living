'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Users, Heart, Shield, Stethoscope, UserCheck, ChefHat, Activity, Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function StaffPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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

  const staff = [
    {
      name: "Dr. Sarah Mitchell",
      position: "Executive Director",
      department: "Administration",
      email: "sarah.mitchell@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 101",
      icon: UserCheck,
      bio: "With over 15 years in senior care administration, Dr. Mitchell ensures our facility operates with the highest standards of care and compassion.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Maria Rodriguez, RN",
      position: "Director of Nursing",
      department: "Medical Care",
      email: "maria.rodriguez@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 102",
      icon: Stethoscope,
      bio: "Maria brings 12 years of nursing experience and specializes in geriatric care. She oversees all medical services and ensures 24/7 quality care.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "James Thompson",
      position: "Activities Director",
      department: "Recreation & Wellness",
      email: "james.thompson@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 103",
      icon: Activity,
      bio: "James creates engaging activities and wellness programs that keep our residents active, social, and fulfilled every day.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Lisa Chen",
      position: "Social Services Coordinator",
      department: "Resident Services",
      email: "lisa.chen@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 104",
      icon: Heart,
      bio: "Lisa works closely with families and residents to ensure smooth transitions and ongoing support throughout their stay with us.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b865?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Michael Davis",
      position: "Maintenance Director",
      department: "Facilities",
      email: "michael.davis@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 105",
      icon: Shield,
      bio: "Michael ensures our facility is safe, clean, and comfortable. He manages all maintenance and security operations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Chef Antonio Rossi",
      position: "Executive Chef",
      department: "Culinary Services",
      email: "antonio.rossi@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 106",
      icon: ChefHat,
      bio: "Chef Rossi brings fine dining experience to senior care, creating nutritious and delicious meals that residents love.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Jennifer Wilson, CNA",
      position: "Lead Certified Nursing Assistant",
      department: "Direct Care",
      email: "jennifer.wilson@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 107",
      icon: Users,
      bio: "Jennifer leads our CNA team with compassion and expertise, ensuring each resident receives personalized daily care.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Robert Kim",
      position: "Admissions Coordinator",
      department: "Admissions",
      email: "robert.kim@serenitylivingoflexington.com",
      phone: "(839) 329-6084 ext. 108",
      icon: Calendar,
      bio: "Robert guides families through the admission process and helps match our services to each resident's unique needs.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Meet Our Staff
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Dedicated professionals committed to providing exceptional care and creating a warm, welcoming home for our residents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {staff.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <member.icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{member.position}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.department}</p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{member.bio}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-primary-600" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary-600 transition-colors">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-primary-600" />
                      <a href={`tel:${member.phone}`} className="hover:text-primary-600 transition-colors">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Meet Our Staff?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule a tour to meet our caring staff and see how we can make Serenity Living your new home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book-tour"
                className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Schedule a Tour
              </a>
              <a
                href="/contact"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}