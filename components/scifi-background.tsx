'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useMotionPreference } from '@/components/motion-context'

export function SciFiBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const { reduceMotion } = useMotionPreference()

  useEffect(() => {
    if (reduceMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [reduceMotion])

  // Generate subtle random data stream nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 7) % 94}%`,
      top: `${(i * 23 + 11) % 88}%`,
      color: i % 2 === 0 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(124, 58, 237, 0.35)',
      size: (i % 3) + 2,
      delay: (i * 0.4) % 4,
    }))
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070a]"
      aria-hidden="true"
    >
      {/* Deep Cyberpunk Gradient Base: from --bg-primary to --bg-secondary */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-[#080e1c] to-[#0b1020]"
      />

      {/* Cyberpunk Circuit Matrix Grid: Subtle Cyan & Violet Lines */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(124, 58, 237, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Secondary Micro-Dotted Tech Matrix for Depth */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Radial Neon Glow Corner Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00f0ff]/5 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#7c3aed]/5 blur-[140px]" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#00ffa3]/3 blur-[140px]" />

      {/* Interactive Cyberpunk Cyan/Violet Spotlight Following Cursor (Disabled in Reduce Motion) */}
      {!reduceMotion && (
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-80"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.06), rgba(124, 58, 237, 0.03) 45%, transparent 75%)`,
          }}
        />
      )}

      {/* Animated Data Flow Nodes (Static or Hidden when Reduce Motion is Active) */}
      {!reduceMotion &&
        nodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: node.left,
              top: node.top,
              width: `${node.size}px`,
              height: `${node.size}px`,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
              animationDuration: `${3 + node.delay}s`,
              animationDelay: `${node.delay}s`,
            }}
          />
        ))}

      {/* Overlay Dark layer for reduced motion or ambient contrast */}
      {reduceMotion && (
        <div className="absolute inset-0 bg-[#05070a]/60 backdrop-blur-[1px]" />
      )}

      {/* Geometric Perimeter Crosshairs & Cyberpunk Telemetry */}
      <div className="absolute top-8 left-8 text-[#00f0ff]/30 font-mono text-[10px] select-none flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-[#00f0ff] animate-ping" />
        <span>+ SYS.NODE [37.77.49]</span>
      </div>
      <div className="absolute top-8 right-8 text-[#7c3aed]/40 font-mono text-[10px] select-none">
        [NEO_GRID // ACTIVE] +
      </div>
      <div className="absolute bottom-8 left-8 text-[#00ffa3]/30 font-mono text-[10px] select-none">
        + TELEMETRY: TLS_1.3 // eBPF
      </div>
      <div className="absolute bottom-8 right-8 text-[#00f0ff]/30 font-mono text-[10px] select-none">
        OBSIDIAN_VOID // 0x00F0FF +
      </div>
    </div>
  )
}
