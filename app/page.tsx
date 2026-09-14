'use client'

import { useState } from 'react'
import { SciFiBackground } from '@/components/scifi-background'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProjectsCarousel } from '@/components/projects-carousel'
import { TechStackMarquee } from '@/components/tech-stack-marquee'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { CommandPalette } from '@/components/command-palette'
import { CaseStudyModal } from '@/components/case-study-modal'
import { LandingPage } from '@/components/launch-sequence'
import { soundFx } from '@/lib/sound-effects'
import { ArrowUp } from 'lucide-react'

export default function Home() {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const scrollToTop = () => { soundFx.playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <LandingPage>
    <div className="min-h-screen bg-transparent text-[#e5e7eb] relative selection:bg-[#00f0ff] selection:text-[#0b1020] font-oxanium">
      <SciFiBackground />
      <Navigation onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} onOpenCaseStudy={() => setIsCaseStudyOpen(true)} />
      <main className="relative z-10">
        <section id="home"><HeroSection onOpenCaseStudy={() => setIsCaseStudyOpen(true)} /></section>
        <div className="max-w-7xl mx-auto px-4 -mt-4 mb-12"><CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} onOpenCaseStudy={() => setIsCaseStudyOpen(true)} /></div>
        <ProjectsCarousel />
        <TechStackMarquee />
        <AboutSection />
        <ContactSection />
      </main>
      <CaseStudyModal isOpen={isCaseStudyOpen} onClose={() => setIsCaseStudyOpen(false)} />
      <footer className="relative z-10 border-t border-[#00f0ff]/20 bg-[#05070a]/80 py-8 px-4 text-xs text-zinc-400 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div className="text-[#e5e7eb] font-bold tracking-wider">JOSHUA MULI {'//'} ARCHITECTURAL PORTFOLIO</div><div className="flex items-center gap-4"><span>© {new Date().getFullYear()} Joshua Muli</span><button onClick={scrollToTop} className="flex items-center gap-1.5 border border-[#00f0ff]/25 px-3 py-1.5 hover:text-[#00f0ff]"><ArrowUp className="size-3" /> Back to Top</button></div></div>
      </footer>
    </div>
  </LandingPage>
}
