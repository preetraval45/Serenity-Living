"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Heart,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Book a Tour", href: "/book-tour" },
  ];

  const services = [
    "Assisted Living",
    "Skilled Nursing",
    "Respite Care",
    "Rehabilitation & Therapy",
    "Dining & Nutrition",
  ];

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed z-40 p-2 text-white transition-all duration-300 rounded-full shadow-lg bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 sm:p-3 hover:shadow-xl"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 sm:h-6 sm:w-6" />
      </button>

      {/* Footer */}
      <footer className="text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Main Footer Content */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 sm:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6 space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-white shadow-md rounded-xl">
                  <Image
                    src="/logo.jpg"
                    alt="Serenity Living Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    Serenity Living
                  </div>
                  <div className="text-sm text-gray-400">of Lexington</div>
                </div>
              </div>
              <p className="mb-6 leading-relaxed text-gray-300">
                Where Compassionate Care Meets Comfortable Living. Experience
                the warmth of family in a community designed for dignity,
                independence, and joy.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/17kDDcJher/"
                  className="flex items-center justify-center w-10 h-10 transition-all duration-300 transform bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-600 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/serenity_living_2025"
                  className="flex items-center justify-center w-10 h-10 transition-all duration-300 transform bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-accent-500 hover:to-accent-600 hover:scale-110"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="mailto:serenitylivingoflexington@gmail.com"
                  className="flex items-center justify-center w-10 h-10 transition-all duration-300 transform bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-secondary-500 hover:to-secondary-600 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center text-gray-300 transition-colors duration-300 hover:text-primary-400 group"
                    >
                      <span className="w-2 h-2 mr-3 transition-opacity duration-300 rounded-full opacity-0 bg-primary-600 group-hover:opacity-100"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/contact"
                      className="flex items-center text-gray-300 transition-colors duration-300 hover:text-primary-400 group"
                    >
                      <span className="w-2 h-2 mr-3 transition-opacity duration-300 rounded-full opacity-100 bg-primary-600 group-hover:opacity-100"></span>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin
                    className="flex-shrink-0 mt-1 text-primary-500"
                    size={20}
                  />
                  <div>
                    <p className="text-gray-300">120 Rice Dr</p>
                    <p className="text-gray-300">Gilbert, SC 29054</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="flex-shrink-0 text-primary-500" size={20} />
                  <a
                    href="tel:+18393296084"
                    className="text-gray-300 transition-colors duration-300 hover:text-primary-400"
                  >
                    (839) 329-6084
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail
                    className="flex-shrink-0 mt-1 text-primary-500"
                    size={20}
                  />
                  <a
                    href="mailto:serenitylivingoflexington@gmail.com"
                    className="text-sm text-gray-300 break-words transition-colors duration-300 hover:text-primary-400"
                  >
                    serenitylivingoflexington@gmail.com
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <Link
                  href="/book-tour"
                  className="inline-block px-6 py-3 font-semibold text-white transition-colors duration-300 shadow-lg bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-xl"
                >
                  Schedule a Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="px-4 py-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>
                  &copy; {currentYear} Serenity Living of Lexington. All rights
                  reserved.
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <Heart className="text-primary-500" size={16} />
                <span>for our community</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-2 text-sm text-gray-500 md:flex-row md:space-y-0 md:space-x-6">
              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-primary-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-primary-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="transition-colors duration-300 hover:text-primary-400"
              >
                Accessibility
              </Link>
            </div>
            <div className="mt-4 text-sm text-center text-gray-500">
              Designed, Developed & Maintained by{" "}
              <a
                href="https://www.linkedin.com/in/preet-raval-5a5807206/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors duration-300 text-primary-400 hover:text-primary-300 hover:underline"
              >
                Preet Raval
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
