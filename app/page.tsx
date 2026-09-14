'use client'

import React, { useState } from 'react'
import { SciFiBackground } from '@/components/scifi-background'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProjectsCarousel } from '@/components/projects-carousel'
import { TechStackMarquee } from '@/components/tech-stack-marquee'
import { AboutSection } from '@/components/about-section'
import { SecurityTerminal } from '@/components/security-terminal'
import { ContactSection } from '@/components/contact-section'
import { CommandPalette } from '@/components/command-palette'
import { CaseStudyModal } from '@/components/case-study-modal'
import { MuseflowMediaPlayer } from '@/components/ui/museflow-media-player'
import { soundFx } from '@/lib/sound-effects'
import { ArrowUp, Radio, Shield, Terminal } from 'lucide-react'

export default function Home() {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const scrollToTop = () => {
    soundFx.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-[#e5e7eb] relative selection:bg-[#00f0ff] selection:text-[#0b1020] font-oxanium">
      {/* High-Contrast Architectural Grid & Specular Spotlight */}
      <SciFiBackground />

      {/* Top Mission Control HUD Header & Nav */}
      <Navigation
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
      />

      <main className="relative z-10">
        {/* Section 01: Hero / Overview with 3D WebGL Scene */}
        <section id="home">
          <HeroSection onOpenCaseStudy={() => setIsCaseStudyOpen(true)} />
        </section>

        {/* In-Page Quick Command / Prompt Trigger Bar */}
        <div className="max-w-7xl mx-auto px-4 -mt-4 mb-12">
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
          />
        </div>

        {/* Section 02: Projects Archives */}
        <ProjectsCarousel />

        {/* Section 03: Systems & Defense Matrix */}
        <TechStackMarquee />

        {/* Section 04: Classified Dossier */}
        <AboutSection />

        {/* Section 05: eDEx-UI Cyber Security Terminal */}
        <SecurityTerminal />

        {/* Section 06: MuseFlow Audio / Waveform Visualizer Module */}
        <section id="audio-stream" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-8 border-b border-[#00f0ff]/20 pb-4">
            <div className="flex items-center gap-2 text-xs text-[#00f0ff] mb-1.5 font-oxanium">
              <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-bold tracking-wider">[MODULE // 06] AUDIO TELEMETRY // REAL-TIME SYNTH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-oxanium text-[#e5e7eb] tracking-tight">
              MUSEFLOW AUDIO ENGINE
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mt-1 max-w-xl">
              Real-time Web Audio API ambient drone synthesizer paired with dynamic frequency response spectrum and procedural waveforms.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <MuseflowMediaPlayer />
          </div>
        </section>

        {/* Section 07: Transmission Uplink */}
        <ContactSection />
      </main>

      {/* Deep-Dive Case Study Architecture Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

      {/* Architectural Cyberpunk Footer */}
      <footer className="relative z-10 border-t border-[#00f0ff]/20 bg-[#05070a]/95 py-8 px-4 font-oxanium text-xs text-zinc-400 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
            <div className="text-[#e5e7eb] font-bold tracking-wider">
              JOSHUA MULI {'//'} ARCHITECTURAL PORTFOLIO
            </div>
            <span className="text-zinc-700">|</span>
            <span className="text-[#00f0ff] text-[11px] font-mono hidden sm:inline">
              SYS_VER: 2.4-RELEASE
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <span className="text-zinc-500 font-mono">
              © {new Date().getFullYear()} Joshua Muli. All rights reserved.
            </span>
            <span className="text-zinc-800">|</span>
            <span className="text-[#00ffa3] font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#00ffa3]" />
              ZERO-TRUST VERIFIED
            </span>
            <span className="text-zinc-800">|</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b1020] hover:bg-[#111827] text-zinc-300 hover:text-[#00f0ff] border border-[#00f0ff]/25 hover:border-[#00f0ff] font-oxanium transition-all rounded-[3px] shadow-sm"
            >
              <ArrowUp className="w-3 h-3 text-[#00f0ff]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
