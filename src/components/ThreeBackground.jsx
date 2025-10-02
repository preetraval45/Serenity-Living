'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)
  const sceneRef = useRef()
  const rendererRef = useRef()
  const frameRef = useRef()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create floating geometric shapes
    const shapes = []
    const geometries = [
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.ConeGeometry(0.3, 0.6, 8),
      new THREE.OctahedronGeometry(0.4),
    ]

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x2563eb, 
        transparent: true, 
        opacity: 0.4,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6, 
        transparent: true, 
        opacity: 0.3,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x60a5fa, 
        transparent: true, 
        opacity: 0.5,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x0ea5e9, 
        transparent: true, 
        opacity: 0.3,
        wireframe: true 
      }),
    ]

    // Create multiple shapes
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      // Random position
      mesh.position.x = (Math.random() - 0.5) * 20
      mesh.position.y = (Math.random() - 0.5) * 20
      mesh.position.z = (Math.random() - 0.5) * 20

      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI * 2
      mesh.rotation.y = Math.random() * Math.PI * 2

      scene.add(mesh)
      shapes.push(mesh)
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.001
        shape.rotation.y += 0.005 + index * 0.001
        
        // Floating motion
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01
        shape.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.005
      })

      // Camera movement
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2
      camera.position.y = Math.cos(Date.now() * 0.0003) * 1
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      
      // Dispose geometries and materials
      geometries.forEach(geo => geo.dispose())
      materials.forEach(mat => mat.dispose())
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  )
}