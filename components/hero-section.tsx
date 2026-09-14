'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { SciCard } from '@/components/ui/sci-card'
import { TypewriterGreeting } from '@/components/ui/typewriter-greeting'
import { soundFx } from '@/lib/sound-effects'
import { Terminal, Shield, ExternalLink, Activity, Server, Lock, FolderGit2 } from 'lucide-react'

// Lazy-load the Three.js 3D canvas for performance
const LazyHero3DScene = dynamic(
  () => import('@/components/hero-3d-scene').then((m) => m.Hero3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-56 flex flex-col items-center justify-center gap-2 font-oxanium text-xs text-[#00f0ff] bg-[#05070a]/80 border border-[#00f0ff]/20 rounded">
        <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
        <span className="tracking-widest">INITIALIZING 3D NODE CLUSTER...</span>
      </div>
    ),
  }
)

interface HeroSectionProps {
  onOpenCaseStudy?: () => void
}

export function HeroSection({ onOpenCaseStudy }: HeroSectionProps) {
  const [packetCount, setPacketCount] = useState(48291)
  const [cpuUsage, setCpuUsage] = useState(14)
  const [memoryUsage, setMemoryUsage] = useState(38)

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 20 + 5))
      setCpuUsage(Math.floor(12 + Math.random() * 6))
      setMemoryUsage(Math.floor(36 + Math.random() * 4))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id: string) => {
    soundFx.playClick()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 px-4 flex flex-col justify-center font-oxanium"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Window Breadcrumb Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-6 flex flex-wrap items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#00f0ff]/20 pb-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-zinc-500">[DEV_NODE:</span>
            <span className="text-[#00f0ff] font-semibold">joshua-muli@production</span>
            <span className="text-zinc-500">]</span>
            <span className="hidden sm:inline text-zinc-500">~/workspace/portfolio</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-oxanium">
            <span className="text-zinc-500 hidden md:inline">SECURITY ARCHITECTURE:</span>
            <span className="text-[#00ffa3] font-bold hidden md:inline">[ZERO-TRUST ENFORCED]</span>
            <span className="text-zinc-800 hidden md:inline">|</span>
            <span className="text-[#00f0ff] font-mono">[SYS_VER: v2.4-CYBERPUNK]</span>
          </div>
        </motion.div>

        {/* Multi-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Information (7 Cols) wrapped in Glassmorphic Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-xl bg-[rgba(17,24,39,0.55)] backdrop-blur-xl border border-[rgba(0,240,255,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden">
              {/* Corner tech brackets */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]" />

              {/* Quick Status Indicators Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b1020]/90 border border-[#00f0ff]/30 text-xs font-oxanium">
                <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
                <span className="text-zinc-400">STATUS:</span>
                <span className="text-[#00f0ff] font-bold tracking-wider">
                  AVAILABLE FOR HIGH-IMPACT ROLES
                </span>
              </div>

              {/* Main Title & Typewriter Greeting */}
              <div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-oxanium tracking-tight text-[#e5e7eb] mb-3">
                  JOSHUA MULI
                </h1>

                {/* Light typing effect on the main header greeting */}
                <div className="min-h-[32px] flex items-center">
                  <TypewriterGreeting
                    words={[
                      'Full-Stack Engineer & Security Researcher',
                      'Distributed Systems & Cloud Architect',
                      'Offensive Security & Penetration Testing',
                    ]}
                    prefix=">"
                    className="text-base sm:text-xl font-medium font-oxanium text-[#00f0ff]"
                  />
                </div>
              </div>

              {/* Polished Body Paragraph */}
              <p className="font-sans text-[#9ca3af] text-base sm:text-lg leading-relaxed max-w-2xl">
                I architect resilient, high-performance web applications and distributed
                infrastructure with an offensive security mindset. Specialized in Next.js/TypeScript,
                Go, Python, and container orchestration—engineering scalable cloud systems backed by
                verified vulnerability audits.
              </p>

              {/* Capability Badges */}
              <div className="flex flex-wrap gap-2 pt-1 font-oxanium text-xs">
                <span className="px-2.5 py-1 bg-[#0b1020] border border-[#00f0ff]/30 text-[#e5e7eb] rounded-[3px]">
                  Next.js / TypeScript
                </span>
                <span className="px-2.5 py-1 bg-[#0b1020] border border-[#7c3aed]/40 text-[#e5e7eb] rounded-[3px]">
                  Go / Microservices
                </span>
                <span className="px-2.5 py-1 bg-[#0b1020] border border-[#00ffa3]/35 text-[#e5e7eb] rounded-[3px]">
                  Kubernetes &amp; eBPF
                </span>
                <span className="px-2.5 py-1 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] font-bold rounded-[3px] shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                  Ethical Hacking &amp; Audits
                </span>
              </div>

              {/* Primary Action CTAs */}
              <div className="flex flex-wrap gap-3 pt-3">
                {/* Primary CTA Button: --accent-primary background, --text-on-accent text, --glow-primary on hover */}
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-2.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] border border-[#00f0ff] font-oxanium text-sm font-bold transition-all duration-200 flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.6)] hover:shadow-[0_0_26px_rgba(0,240,255,0.95)] rounded-[3px]"
                >
                  <Terminal className="w-4 h-4 fill-[#0b1020]" />
                  <span>VIEW PROJECTS</span>
                </button>

                {onOpenCaseStudy && (
                  <button
                    onClick={() => {
                      soundFx.playClick()
                      onOpenCaseStudy()
                    }}
                    className="px-5 py-2.5 bg-transparent hover:bg-[#7c3aed]/15 text-[#e5e7eb] hover:text-[#7c3aed] border border-[#7c3aed]/50 hover:border-[#7c3aed] font-oxanium text-sm font-bold transition-all duration-200 flex items-center gap-2 hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] rounded-[3px]"
                  >
                    <FolderGit2 className="w-4 h-4 text-[#7c3aed]" />
                    <span>CASE STUDY</span>
                  </button>
                )}

                {/* Secondary CTA Button: transparent background, --accent-primary border and text, glow on hover */}
                <button
                  onClick={() => scrollToSection('security')}
                  className="px-5 py-2.5 bg-transparent hover:bg-[#00f0ff]/10 text-[#00f0ff] hover:text-[#00f0ff] border border-[#00f0ff]/50 hover:border-[#00f0ff] font-oxanium text-sm font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-[0_0_16px_rgba(0,240,255,0.45)] rounded-[3px]"
                >
                  <Shield className="w-4 h-4 text-[#00f0ff]" />
                  <span>TERMINAL AUDIT</span>
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-5 py-2.5 bg-transparent hover:bg-white/10 text-zinc-300 hover:text-white border border-white/20 hover:border-white/40 font-oxanium text-sm transition-all duration-200 flex items-center gap-2 rounded-[3px]"
                >
                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                  <span>GET IN TOUCH</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D WebGL Scene & System Telemetry Metrics (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <SciCard
              title="SYSTEM_CORE // 3D_TOPOLOGY"
              status="ONLINE"
              statusType="white"
              version="v2.4"
              code="NODE: US-EAST"
              enableTilt={true}
              className="p-5 font-oxanium"
            >
              <div className="space-y-4">
                {/* 3D WebGL Interactive Canvas Viewport (Lazy-Loaded) */}
                <div className="relative w-full h-56 rounded bg-[#05070a] border border-[#00f0ff]/30 overflow-hidden shadow-inner flex items-center justify-center group">
                  {/* Subtle grid backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(0,240,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* WebGL Three.js Scene */}
                  <LazyHero3DScene />

                  {/* Corner accents */}
                  <span className="absolute top-2 left-2 text-[9px] font-mono text-[#00f0ff]/70 pointer-events-none">
                    [MESH: ICOSAHEDRON_v2]
                  </span>
                  <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#00f0ff] pointer-events-none bg-[#05070a]/80 px-1.5 py-0.5 border border-[#00f0ff]/30 rounded">
                    INTERACTIVE 3D
                  </span>
                </div>

                {/* System Health Strip */}
                <div className="p-3 bg-[#0b1020] border border-[#00f0ff]/20 rounded">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[#9ca3af] font-medium">CLUSTER HEALTH</span>
                    <span className="text-[#00ffa3] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-ping" />
                      99.98% OPERATIONAL
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#05070a] overflow-hidden flex rounded-full">
                    <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ffa3] w-[96%]" />
                  </div>
                </div>

                {/* Quantitative Metric Counters */}
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2.5 bg-[#0b1020] border border-[#00f0ff]/20 rounded">
                    <span className="text-[10px] text-zinc-400 block">CPU LOAD</span>
                    <span className="text-sm font-bold text-[#00f0ff]">{cpuUsage}%</span>
                  </div>
                  <div className="p-2.5 bg-[#0b1020] border border-[#7c3aed]/30 rounded">
                    <span className="text-[10px] text-zinc-400 block">MEMORY</span>
                    <span className="text-sm font-bold text-[#7c3aed]">{memoryUsage}%</span>
                  </div>
                  <div className="p-2.5 bg-[#0b1020] border border-[#00ffa3]/25 rounded">
                    <span className="text-[10px] text-zinc-400 block">LATENCY</span>
                    <span className="text-sm font-bold text-[#00ffa3]">18ms</span>
                  </div>
                </div>

                {/* Hardware & Protocols Specifications */}
                <div className="space-y-2 text-xs font-mono pt-1">
                  <div className="flex items-center justify-between py-1 border-b border-[#00f0ff]/15">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#00f0ff]" />
                      Transport Protocol
                    </span>
                    <span className="text-[#e5e7eb] font-semibold">TLS 1.3 / Strict HSTS</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#00f0ff]/15">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-[#7c3aed]" />
                      Container Engine
                    </span>
                    <span className="text-[#e5e7eb] font-semibold">Kubernetes / Docker</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#9ca3af] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#00ffa3]" />
                      Packets Processed
                    </span>
                    <span className="text-[#00f0ff] font-bold">
                      {packetCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quick Directive Terminal Line */}
                <div className="px-3 py-2 bg-[#05070a] border border-[#00f0ff]/25 rounded font-mono text-[11px] text-zinc-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00ffa3] font-bold">$</span>
                    <span className="text-zinc-300">curl -I https://joshua-muli.dev</span>
                  </div>
                  <span className="text-[#00ffa3] font-bold bg-[#00ffa3]/10 px-1.5 py-0.2 border border-[#00ffa3]/30 rounded-[2px]">
                    200 OK
                  </span>
                </div>
              </div>
            </SciCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
