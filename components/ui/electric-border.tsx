'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ElectricBorderProps {
  children: React.ReactNode
  color?: string
  speed?: number
  chaos?: number
  thickness?: number
  className?: string
  style?: React.CSSProperties
}

export function ElectricBorder({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.5,
  thickness = 2,
  className,
  style,
}: ElectricBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        setDimensions({ width: offsetWidth, height: offsetHeight })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Electric border animation
  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0
    const points: Array<{ x: number; y: number; offset: number }> = []
    const numPoints = 100

    // Initialize points around the perimeter
    const initPoints = () => {
      points.length = 0
      const perimeter = 2 * (dimensions.width + dimensions.height)
      
      for (let i = 0; i < numPoints; i++) {
        const distance = (i / numPoints) * perimeter
        let x = 0
        let y = 0

        if (distance < dimensions.width) {
          // Top edge
          x = distance
          y = 0
        } else if (distance < dimensions.width + dimensions.height) {
          // Right edge
          x = dimensions.width
          y = distance - dimensions.width
        } else if (distance < 2 * dimensions.width + dimensions.height) {
          // Bottom edge
          x = dimensions.width - (distance - dimensions.width - dimensions.height)
          y = dimensions.height
        } else {
          // Left edge
          x = 0
          y = dimensions.height - (distance - 2 * dimensions.width - dimensions.height)
        }

        points.push({
          x,
          y,
          offset: Math.random() * Math.PI * 2,
        })
      }
    }

    initPoints()

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      time += 0.01 * speed

      // Draw the electric border
      ctx.strokeStyle = color
      ctx.lineWidth = thickness
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Create gradient for glow effect
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height)
      gradient.addColorStop(0, color)
      gradient.addColorStop(0.5, color)
      gradient.addColorStop(1, color)

      ctx.shadowBlur = 10
      ctx.shadowColor = color

      ctx.beginPath()

      points.forEach((point, i) => {
        // Calculate electric distortion
        const distortion =
          Math.sin(time + point.offset) * chaos * 5 +
          Math.cos(time * 2 + point.offset * 0.5) * chaos * 3

        let x = point.x
        let y = point.y

        // Apply distortion perpendicular to the edge
        if (point.y === 0) {
          // Top edge
          y += distortion
        } else if (point.x === dimensions.width) {
          // Right edge
          x += distortion
        } else if (point.y === dimensions.height) {
          // Bottom edge
          y += distortion
        } else if (point.x === 0) {
          // Left edge
          x += distortion
        }

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.closePath()
      ctx.stroke()

      // Add extra glow layers
      ctx.shadowBlur = 20
      ctx.globalAlpha = 0.5
      ctx.stroke()

      ctx.shadowBlur = 30
      ctx.globalAlpha = 0.3
      ctx.stroke()

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (dimensions.width > 0 && dimensions.height > 0) {
      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, color, speed, chaos, thickness, prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default ElectricBorder

