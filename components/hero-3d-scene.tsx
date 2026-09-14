'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useMotionPreference } from '@/components/motion-context'

interface Hero3DSceneProps {
  className?: string
  fullBackground?: boolean
}

export function Hero3DScene({ className = '', fullBackground = false }: Hero3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const [fpsDisplay, setFpsDisplay] = useState(60)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const isVisibleRef = useRef(true)
  const { reduceMotion } = useMotionPreference()

  useEffect(() => {
    const container = containerRef.current
    if (!container || reduceMotion) return

    const isMobile = window.innerWidth < 768
    const width = container.clientWidth || (fullBackground ? window.innerWidth : 480)
    const height = container.clientHeight || (fullBackground ? window.innerHeight : 420)

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene()
    const initialZ = fullBackground ? 7.5 : 6.5
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, initialZ)

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // 3. Cyberpunk Lighting Setup: Cyan & Violet Specular
    // Key Light - Vibrant Cyber Cyan (#00f0ff)
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.8)
    keyLight.position.set(5, 6, 7)
    scene.add(keyLight)

    // Secondary Rim - Neon Violet (#7c3aed)
    const violetLight = new THREE.DirectionalLight(0x7c3aed, 2.4)
    violetLight.position.set(-6, -4, 4)
    scene.add(violetLight)

    // Teal Accent
    const tealPointLight = new THREE.PointLight(0x00ffa3, 2.0, 15)
    tealPointLight.position.set(0, 3, 2)
    scene.add(tealPointLight)

    // Subtle Ambient
    const ambientLight = new THREE.AmbientLight(0x0b1020, 0.6)
    scene.add(ambientLight)

    // 4. Central 3D Geometry Core Group
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Low-poly abstract cyber globe / crystalline octahedron core
    const coreGeo = new THREE.OctahedronGeometry(fullBackground ? 1.5 : 1.3, isMobile ? 1 : 2)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.15,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      flatShading: true,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    mainGroup.add(coreMesh)

    // Wireframe Icosahedron Hyper-Lattice with Cyan Glow
    const wireframeGeo = new THREE.WireframeGeometry(
      new THREE.IcosahedronGeometry(fullBackground ? 2.2 : 1.9, 1)
    )
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    })
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat)
    mainGroup.add(wireframeMesh)

    // Orbital Ring 1: Cyan Data Lathe
    const ringGeo1 = new THREE.TorusGeometry(
      fullBackground ? 2.9 : 2.5,
      0.02,
      12,
      isMobile ? 48 : 96
    )
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.35,
    })
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1)
    ringMesh1.rotation.x = Math.PI / 2.6
    ringMesh1.rotation.y = Math.PI / 6
    mainGroup.add(ringMesh1)

    // Orbital Ring 2: Violet Data Lathe
    const ringGeo2 = new THREE.TorusGeometry(
      fullBackground ? 3.3 : 2.85,
      0.015,
      12,
      isMobile ? 48 : 96
    )
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.55,
    })
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2)
    ringMesh2.rotation.x = -Math.PI / 3
    ringMesh2.rotation.y = Math.PI / 4
    mainGroup.add(ringMesh2)

    // Circumference Node Clusters (Micro Hardware Blocks)
    const nodeCount = isMobile ? 6 : 10
    const nodeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12)
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x00ffa3,
      emissive: 0x00ffa3,
      emissiveIntensity: 0.6,
    })
    const nodesGroup = new THREE.Group()
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const node = new THREE.Mesh(nodeGeo, nodeMat)
      const radius = fullBackground ? 2.9 : 2.5
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
      nodesGroup.add(node)
    }
    ringMesh1.add(nodesGroup)

    // 5. Lightweight Particle Nebula / Starfield Node Cluster
    // Mix of --accent-primary (#00f0ff) and --accent-secondary (#7c3aed) with low opacity
    const particleCount = isMobile ? 80 : (fullBackground ? 320 : 180)
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCyan = new THREE.Color(0x00f0ff)
    const colorViolet = new THREE.Color(0x7c3aed)
    const colorTeal = new THREE.Color(0x00ffa3)

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution around nebula core
      const r = (fullBackground ? 2.5 : 2.0) + Math.random() * (fullBackground ? 4.5 : 3.0)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      particlePositions[i * 3 + 2] = r * Math.cos(phi)

      // Alternating Cyberpunk Palette
      const chosenColor = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorViolet : colorTeal
      particleColors[i * 3] = chosenColor.r
      particleColors[i * 3 + 1] = chosenColor.g
      particleColors[i * 3 + 2] = chosenColor.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: fullBackground ? 0.055 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })
    const particleNebula = new THREE.Points(particleGeo, particleMat)
    mainGroup.add(particleNebula)

    // 6. Interactive Parallax via Pointer Movement
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouseRef.current.targetX = x * 0.75
      mouseRef.current.targetY = y * 0.75
    }

    const handlePointerEnter = () => setIsInteracting(true)
    const handlePointerLeave = () => {
      setIsInteracting(false)
      mouseRef.current.targetX = 0
      mouseRef.current.targetY = 0
    }

    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerenter', handlePointerEnter)
    container.addEventListener('pointerleave', handlePointerLeave)

    // 7. Scroll Interaction: Camera pulls back smoothly as user scrolls toward About section
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollProgress = Math.min(scrollY / 750, 1)
      // Camera smoothly pulls back and rises slightly
      camera.position.z = initialZ + scrollProgress * 3.2
      camera.position.y = -scrollProgress * 1.2
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight
          camera.updateProjectionMatrix()
          renderer.setSize(newWidth, newHeight)
        }
      }
    })
    resizeObserver.observe(container)

    // 9. Intersection Observer (Freeze RAF when off-screen for maximum efficiency)
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisibleRef.current = entries[0].isIntersecting
        }
      },
      { threshold: 0.1 }
    )
    intersectionObserver.observe(container)

    // 10. Render Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    let frameCounter = 0
    let lastFpsTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      const elapsedTime = clock.getElapsedTime()

      // FPS tracking for authentic telemetry
      frameCounter++
      const now = performance.now()
      if (now - lastFpsTime >= 1000) {
        setFpsDisplay(Math.round((frameCounter * 1000) / (now - lastFpsTime)))
        frameCounter = 0
        lastFpsTime = now
      }

      // Smooth lerped cursor parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.055
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.055

      // Base rotation + interactive tilt
      mainGroup.rotation.y = elapsedTime * 0.18 + mouseRef.current.x * 0.8
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.12) * 0.12 + mouseRef.current.y * 0.45

      // Orbital rings counter-rotation
      ringMesh1.rotation.z = elapsedTime * 0.22
      ringMesh2.rotation.z = -elapsedTime * 0.16

      // Nebula gentle pulsing drift
      particleNebula.rotation.y = -elapsedTime * 0.08

      // Floating micro oscillation
      mainGroup.position.y = Math.sin(elapsedTime * 0.75) * 0.08

      renderer.render(scene, camera)
    }

    animate()

    // 11. Resource Disposals & Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerenter', handlePointerEnter)
      container.removeEventListener('pointerleave', handlePointerLeave)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      renderer.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      wireframeGeo.dispose()
      wireframeMat.dispose()
      ringGeo1.dispose()
      ringMat1.dispose()
      ringGeo2.dispose()
      ringMat2.dispose()
      nodeGeo.dispose()
      nodeMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [fullBackground, reduceMotion])

  // Reduced Motion Fallback: High-Tech Static Blueprint with --overlay-dark
  if (reduceMotion) {
    return (
      <div
        className={`relative w-full h-full min-h-[300px] flex items-center justify-center font-oxanium overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-[#05070a]/90 backdrop-blur-sm border border-[#00f0ff]/20 rounded flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#00f0ff]/50 flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff] flex items-center justify-center">
              <span className="text-xs font-mono text-[#00f0ff] font-bold">CORE</span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#00f0ff] tracking-wider uppercase">
            3D STATIC BLUEPRINT ACTIVE
          </span>
          <span className="text-[11px] text-zinc-400 mt-1">
            Motion reduced per user preference. Click [MOTION] in header to resume full 3D.
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full h-[360px] sm:h-[420px] flex items-center justify-center font-oxanium ${className}`}
    >
      {/* Three.js Canvas mount target */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Cyberpunk HUD Viewport Overlay Indicators */}
      <div className="absolute top-3 left-3 text-[10px] text-zinc-400 flex items-center gap-1.5 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
        <span className="text-[#00f0ff] font-bold">[NODE_CLUSTER // 3D]</span>
        <span className="font-mono text-zinc-400 hidden xs:inline">NEBULA_PBR</span>
      </div>

      <div className="absolute top-3 right-3 text-[10px] text-[#00f0ff]/80 pointer-events-none select-none font-mono">
        RENDER: {fpsDisplay} FPS // R3F_ENGINE
      </div>

      <div className="absolute bottom-3 left-3 text-[10px] text-zinc-400 pointer-events-none select-none">
        PARALLAX: {isInteracting ? (
          <span className="text-[#00ffa3] font-bold">PHYSICAL LERP ACTIVE</span>
        ) : (
          <span className="text-zinc-400">PASSIVE ORBIT</span>
        )}
      </div>

      <div className="absolute bottom-3 right-3 text-[10px] text-[#7c3aed] pointer-events-none select-none font-mono">
        SPECTRUM: #00F0FF // #7C3AED
      </div>

      {/* Cyberpunk Neon Bracketed Corners [ ] */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
    </div>
  )
}
