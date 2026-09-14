'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface SplashCursorProps {
  color?: string
  size?: number
  trailLength?: number
  particleCount?: number
  enabled?: boolean
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export const SplashCursor: React.FC<SplashCursorProps> = ({
  color = '#7df9ff',
  size = 20,
  trailLength = 20,
  particleCount = 5,
  enabled = true,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const trail = useRef<TrailPoint[]>([])
  const particles = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const lastClickTime = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Create particles on click
  const createParticles = useCallback(
    (x: number, y: number) => {
      if (prefersReducedMotion) return

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
        const speed = 2 + Math.random() * 3
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.5 + Math.random() * 0.5,
          size: 3 + Math.random() * 4,
          color,
        })
      }
    },
    [particleCount, color, prefersReducedMotion]
  )

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPos.current = { x: e.clientX, y: e.clientY }
    setIsVisible(true)

    // Add to trail
    trail.current.push({
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    })

    // Limit trail length
    if (trail.current.length > trailLength) {
      trail.current.shift()
    }
  }, [trailLength])

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setIsClicking(true)
      createParticles(e.clientX, e.clientY)
      lastClickTime.current = Date.now()
    },
    [createParticles]
  )

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return

    const canvas = canvasRef.current
    const cursor = cursorRef.current
    if (!canvas || !cursor) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const animate = () => {
      // Smooth cursor follow
      const dx = targetPos.current.x - mousePos.current.x
      const dy = targetPos.current.y - mousePos.current.y
      mousePos.current.x += dx * 0.15
      mousePos.current.y += dy * 0.15

      // Update cursor position
      cursor.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw trail
      if (trail.current.length > 1) {
        const now = Date.now()
        ctx.beginPath()
        trail.current.forEach((point, i) => {
          const age = now - point.timestamp
          const maxAge = 500 // 500ms trail
          const alpha = Math.max(0, 1 - age / maxAge)
          const trailSize = size * 0.3 * alpha

          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }

          ctx.strokeStyle = `${color}${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`
          ctx.lineWidth = trailSize
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
        })
        ctx.stroke()

        // Remove old trail points
        trail.current = trail.current.filter((point) => now - point.timestamp < 500)
      }

      // Update and draw particles
      particles.current = particles.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.15 // Gravity
        particle.life -= 0.02

        if (particle.life <= 0) return false

        const alpha = particle.life
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.fill()

        return true
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [enabled, size, color, prefersReducedMotion])

  // Event listeners
  useEffect(() => {
    if (!enabled) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave])

  if (!enabled || prefersReducedMotion) return null

  return (
    <>
      {/* Canvas for particles and trail */}
      <canvas
        ref={canvasRef}
        className={cn('fixed inset-0 pointer-events-none z-[9999]', className)}
        aria-hidden="true"
      />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={cn(
          'fixed pointer-events-none z-[10000] transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          left: -size / 2,
          top: -size / 2,
          width: size,
          height: size,
        }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-full border-2 transition-all duration-200',
            isClicking ? 'scale-75' : 'scale-100'
          )}
          style={{
            borderColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />

        {/* Inner dot */}
        <div
          className="absolute inset-0 m-auto rounded-full transition-all duration-200"
          style={{
            width: size * 0.3,
            height: size * 0.3,
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}`,
            transform: isClicking ? 'scale(1.5)' : 'scale(1)',
          }}
        />

        {/* Pulse effect on click */}
        {isClicking && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: color,
              opacity: 0.3,
            }}
          />
        )}
      </div>
    </>
  )
}

export default SplashCursor

