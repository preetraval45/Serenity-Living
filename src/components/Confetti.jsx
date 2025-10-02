'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState([])

  useEffect(() => {
    const pieces = []
    const colors = [
      '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', // Blues
      '#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2', // Reds
      '#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7', // Yellows
      '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', // Greens
      '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', // Purples
      '#ec4899', '#f472b6', '#f9a8d4', '#fbb6ce', '#fce7f3', // Pinks
      '#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8'  // Whites/Grays
    ]
    
    for (let i = 0; i < 150; i++) {
      pieces.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        initialY: -20,
        size: Math.random() * 12 + 6,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
        shape: Math.random() > 0.5 ? (Math.random() > 0.5 ? 'square' : 'diamond') : 'circle',
        drift: (Math.random() - 0.5) * 300
      })
    }
    
    setConfettiPieces(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          initial={{
            x: piece.initialX,
            y: piece.initialY,
            rotate: piece.rotation,
            opacity: 1,
            scale: 0.5
          }}
          animate={{
            x: piece.initialX + piece.drift,
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
            rotate: piece.rotation + 1080,
            opacity: [1, 1, 0.7, 0],
            scale: [0.5, 1, 1, 0.3]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: piece.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 3
          }}
          style={{
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'diamond' ? '0%' : '20%',
            transform: piece.shape === 'diamond' ? 'rotate(45deg)' : 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            background: piece.shape === 'circle' ? `radial-gradient(circle, ${piece.color}, ${piece.color}dd)` : piece.color
          }}
        />
      ))}
    </div>
  )
}