"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Send,
  Users,
  Heart,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Thank you! Your message has been sent successfully. We'll contact you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          inquiry: "",
          message: "",
          consent: false,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message ||
            "There was an error sending your message. Please try again or call us directly at (839) 329-6084.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "There was an error sending your message. Please try again or call us directly at (839) 329-6084.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Your Future Home",
      content: ["120 Rice Dr", "Gilbert, SC 29054"],
      action: "Get Directions",
      link: "https://www.google.com/maps/dir/?api=1&destination=120+Rice+Dr,+Gilbert,+SC+29054",
    },
    {
      icon: Phone,
      title: "Call Us Today",
      content: ["(839) 329-6084"],
      action: "Call Now",
      link: "tel:+18393296084",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: ["serenitylivingoflexington@gmail.com"],
      action: "Send Email",
      link: "mailto:serenitylivingoflexington@gmail.com",
    },
    {
      icon: Clock,
      title: "Facility Hours",
      content: ["Open 24/7", "365 Days a Year"],
      action: "Learn More",
      link: "/about",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: Facebook,
      link: "https://www.facebook.com/share/17kDDcJher/",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "https://www.instagram.com/serenity_living_2025",
      color: "hover:text-pink-600",
    },
    {
      name: "Email",
      icon: Mail,
      link: "mailto:serenitylivingoflexington@gmail.com",
      color: "hover:text-primary-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ThreeBackground />
      <Navigation />

      {/* Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M50 12.5a37.5 37.5 0 1 0 0 75 37.5 37.5 0 0 0 0-75zm0 6.25a31.25 31.25 0 1 1 0 62.5 31.25 31.25 0 0 1 0-62.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
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
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Get in <span className="text-primary-600">Touch</span>
            </h1>
            <div className="w-32 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"></div>
            <p className="text-xl leading-relaxed text-gray-600">
              We're building something special at Serenity Living. Connect with
              us to learn more about our upcoming senior living community and
              how you can be part of our story.
            </p>
          </motion.div>
        </section>

        {/* Contact Information Grid */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 xl:grid-cols-4 max-w-7xl">
              {contactInfo.map((info, index) => {
                const colors = [
                  {
                    bg: "from-primary-50 to-primary-100",
                    icon: "bg-gradient-to-br from-primary-500 to-primary-600",
                    border: "border-primary-200 hover:border-primary-400",
                    title: "group-hover:text-primary-600",
                    button:
                      "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
                  },
                  {
                    bg: "from-secondary-50 to-secondary-100",
                    icon: "bg-gradient-to-br from-secondary-500 to-secondary-600",
                    border: "border-secondary-200 hover:border-secondary-400",
                    title: "group-hover:text-secondary-600",
                    button:
                      "bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700",
                  },
                  {
                    bg: "from-accent-50 to-accent-100",
                    icon: "bg-gradient-to-br from-accent-500 to-accent-600",
                    border: "border-accent-200 hover:border-accent-400",
                    title: "group-hover:text-accent-600",
                    button:
                      "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700",
                  },
                  {
                    bg: "from-warm-50 to-warm-100",
                    icon: "bg-gradient-to-br from-warm-500 to-warm-600",
                    border: "border-warm-200 hover:border-warm-400",
                    title: "group-hover:text-warm-600",
                    button:
                      "bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700",
                  },
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
                      <div
                        className={`w-16 h-16 ${colorScheme.icon} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                      >
                        <info.icon className="text-white" size={32} />
                      </div>
                      <h3
                        className={`text-xl font-bold text-gray-900 ${colorScheme.title} mb-4 transition-colors duration-300`}
                      >
                        {info.title}
                      </h3>
                      <div className="mb-6 space-y-1">
                        {info.content.map((line, idx) => (
                          <p
                            key={idx}
                            className={`text-gray-700 ${
                              line.includes("@")
                                ? "text-xs break-all leading-relaxed"
                                : ""
                            }`}
                          >
                            {line}
                          </p>
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
                        <button className="inline-block px-6 py-3 font-semibold text-gray-700 transition-all duration-300 bg-gray-200 rounded-xl hover:bg-gray-300 hover:scale-105">
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
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-8 bg-white shadow-xl rounded-3xl"
              >
                <div className="flex items-center mb-6">
                  <Send className="w-8 h-8 mr-4 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Send Us a Message
                  </h2>
                </div>

                {submitStatus.message && (
                  <div
                    className={`p-4 rounded-xl ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-semibold text-gray-700"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-semibold text-gray-700"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="(555) 555-5555"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry"
                      className="block mb-2 text-sm font-semibold text-gray-700"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      value={formData.inquiry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-semibold text-gray-700"
                    >
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
                      className="w-full px-4 py-3 transition-colors border border-gray-300 resize-none rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                        className="mt-1 border-gray-300 rounded shadow-sm text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        I agree to be contacted about my inquiry regarding
                        Serenity Living services. *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full py-4 space-x-2 font-semibold text-white transition-colors duration-300 shadow-lg bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>

                {/* Social Media Links */}
                <div className="pt-8 mt-8 border-t border-gray-200">
                  <h3 className="mb-4 text-lg font-semibold text-center text-gray-900">
                    Follow Our Journey
                  </h3>
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
                <div className="overflow-hidden bg-white shadow-xl rounded-3xl">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 mr-3 text-primary-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Our Future Location
                      </h3>
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
                        className="flex items-center justify-center flex-1 px-4 py-3 space-x-2 font-semibold text-center text-white transition-colors duration-300 bg-primary-600 rounded-xl hover:bg-primary-700"
                      >
                        <span>🗺️</span>
                        <span>Google Maps</span>
                      </a>
                      <a
                        href="https://maps.apple.com/?daddr=120+Rice+Dr,+Gilbert,+SC+29054"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center flex-1 px-4 py-3 space-x-2 font-semibold text-center transition-colors duration-300 border border-primary-600 text-primary-600 rounded-xl hover:bg-primary-600 hover:text-white"
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
  );
}
