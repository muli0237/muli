"use client"

import { useEffect, useRef } from "react"

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedMotion.current = mediaQuery.matches

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse movement handler with throttling
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        mouseRef.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        }
        rafId = 0
      })
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Animation variables
    let time = 0
    const colors = [
      { r: 99, g: 102, b: 241 }, // Indigo #6366f1
      { r: 34, g: 211, b: 238 }, // Cyan #22d3ee
      { r: 245, g: 158, b: 11 }, // Amber #f59e0b
    ]

    // Gradient mesh animation
    const animate = () => {
      if (!prefersReducedMotion.current) {
        time += 0.005
      }

      const { x: mouseX, y: mouseY } = mouseRef.current

      // Create gradient
      const gradient = ctx.createRadialGradient(
        window.innerWidth * (0.5 + mouseX * 0.1),
        window.innerHeight * (0.5 + mouseY * 0.1),
        0,
        window.innerWidth * 0.5,
        window.innerHeight * 0.5,
        window.innerWidth * 0.8,
      )

      // Animate colors
      const color1 = colors[0]
      const color2 = colors[1]
      const color3 = colors[2]

      const alpha1 = prefersReducedMotion.current ? 0.15 : 0.15 + Math.sin(time) * 0.05
      const alpha2 = prefersReducedMotion.current ? 0.1 : 0.1 + Math.cos(time * 1.3) * 0.05
      const alpha3 = prefersReducedMotion.current ? 0.08 : 0.08 + Math.sin(time * 0.7) * 0.03

      gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${alpha1})`)
      gradient.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${alpha2})`)
      gradient.addColorStop(1, `rgba(${color3.r}, ${color3.g}, ${color3.b}, ${alpha3})`)

      // Clear and draw
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Add subtle noise texture (skip on low-end devices)
      if (window.devicePixelRatio <= 2) {
        const imageData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 40) {
          // Sample every 10th pixel for performance
          const noise = Math.random() * 10
          data[i] += noise
          data[i + 1] += noise
          data[i + 2] += noise
        }
        ctx.putImageData(imageData, 0, 0)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
