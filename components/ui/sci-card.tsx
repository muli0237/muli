'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { soundFx } from '@/lib/sound-effects'

interface SciCardProps {
  children: React.ReactNode
  title?: string
  status?: string
  statusType?: 'normal' | 'alert' | 'warning' | 'white'
  code?: string
  className?: string
  enableTilt?: boolean
  enableLift?: boolean
  onClick?: () => void
  headerActions?: React.ReactNode
  version?: string
}

export function SciCard({
  children,
  title,
  status = 'ONLINE',
  statusType = 'white',
  code,
  className = '',
  enableTilt = true,
  enableLift = true,
  onClick,
  headerActions,
  version = 'v2.4',
}: SciCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // 3D Parallax Tilt Motion Values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  // Dynamic white specular glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    soundFx.playClick()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
      }}
      whileHover={enableLift ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative group rounded-lg bg-[rgba(17,24,39,0.75)] backdrop-blur-md border transition-all duration-300 ${
        isHovered
          ? 'border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)] z-20'
          : 'border-[rgba(0,240,255,0.2)] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
      } ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Dynamic Specular Glare Reflection on Hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(400px circle at ${glareX} ${glareY}, rgba(0, 240, 255, 0.08), transparent 70%)`,
        }}
      />

      {/* Cyberpunk Neon Bracketed Corners [ ] */}
      <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]/60 pointer-events-none transition-colors group-hover:border-[#00f0ff]" />
      <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#00f0ff]/60 pointer-events-none transition-colors group-hover:border-[#00f0ff]" />
      <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#00f0ff]/60 pointer-events-none transition-colors group-hover:border-[#00f0ff]" />
      <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]/60 pointer-events-none transition-colors group-hover:border-[#00f0ff]" />

      {/* Top Window Header in Oxanium Font */}
      {(title || status || code || headerActions) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(0,240,255,0.15)] bg-[#0b1020]/90 rounded-t-lg font-oxanium text-xs select-none">
          <div className="flex items-center gap-3">
            {/* Window Action Dots with Cyberpunk Colors */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <span className="w-2 h-2 rounded-full bg-[#00ffa3]" />
            </div>

            {title && (
              <span className="font-semibold text-[#e5e7eb] tracking-wider text-[11px] flex items-center gap-1.5 uppercase group-hover:text-[#00f0ff] transition-colors">
                <span className="text-[#00f0ff] font-bold">/</span>
                {title}
              </span>
            )}
            {version && (
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#05070a] border border-[#00f0ff]/25 text-[#00f0ff] font-mono">
                {version}
              </span>
            )}
            {code && <span className="text-zinc-400 text-[10px] hidden sm:inline font-mono">[{code}]</span>}
          </div>

          <div className="flex items-center gap-2">
            {headerActions}
            {status && (
              <div className="px-2 py-0.5 text-[10px] font-oxanium tracking-wider border rounded-[3px] font-bold text-[#00f0ff] bg-[#00f0ff]/10 border-[#00f0ff]/40 shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                {status}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card Content with 3D Depth */}
      <div className="relative z-10 p-4 sm:p-5" style={{ transform: 'translateZ(15px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
