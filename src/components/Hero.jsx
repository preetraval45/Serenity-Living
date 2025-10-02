'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef(null)
  const confettiCanvasRef = useRef(null)

  useEffect(() => {
    // Hero canvas animation (simplified floating particles)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Simple floating particles animation
    const particles = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#2563eb' // primary-600
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      {/* Confetti Canvas (placeholder for special effects) */}
      <canvas
        ref={confettiCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Logo Side */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="animate-float">
              <Image
                src="/logo.jpg"
                alt="Serenity Living logo"
                width={250}
                height={250}
                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-2xl shadow-2xl object-contain"
                priority
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 animate-slide-up"
                aria-label="Serenity Living"
              >
                Serenity Living
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 mb-2 animate-slide-up [animation-delay:0.1s]">
                Assisted Living Facility
              </h2>
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-white/80 mb-4 sm:mb-6 animate-slide-up [animation-delay:0.2s] italic">
                "Your Home Away From Home"
              </h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 animate-slide-up [animation-delay:0.3s]">
                <p className="text-base sm:text-lg md:text-xl text-white font-semibold">
                  Now Open & Accepting Residents
                </p>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 leading-relaxed animate-slide-up [animation-delay:0.4s]">
                Where compassionate care meets comfortable living. Experience the warmth of family in a community designed for dignity, independence, and joy. We&apos;re creating more than just a facility - we&apos;re building your new home.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-slide-up [animation-delay:0.6s]">
                <Link
                  href="/about"
                  className="btn btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-center"
                >
                  Learn More
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-outline text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white text-white hover:bg-white hover:text-primary-600 w-full sm:w-auto text-center"
                >
                  Get Updates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Link
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-white/80 transition-all duration-300 animate-bounce-soft"
        aria-label="Scroll to About section"
      >
        <ChevronDown className="h-8 w-8" />
      </Link>
    </section>
  )
}