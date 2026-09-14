'use client'

import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { TypewriterGreeting } from '@/components/ui/typewriter-greeting'
import { soundFx } from '@/lib/sound-effects'
import { ExternalLink, FolderGit2, Mail, Phone, Terminal } from 'lucide-react'

const LazyHero3DScene = dynamic(() => import('@/components/hero-3d-scene').then((m) => m.Hero3DScene), { ssr: false, loading: () => <div className="flex h-56 items-center justify-center bg-[#05070a]/70 text-xs tracking-widest text-[#00f0ff]">INITIALIZING VISUAL…</div> })

export function HeroSection({ onOpenCaseStudy }: { onOpenCaseStudy?: () => void }) {
  const scrollToSection = (id: string) => { soundFx.playClick(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return <section className="relative flex min-h-[92vh] items-center px-4 pb-16 pt-28 font-oxanium">
    <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="lg:col-span-7">
        <div className="glass-card relative space-y-6 overflow-hidden rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,.6)] sm:p-8">
          <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#00f0ff]" /><span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#00f0ff]" />
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00f0ff]/30 bg-[#0b1020]/90 px-3 py-1 text-xs"><span className="size-2 animate-pulse rounded-full bg-[#00ffa3]" /><span className="text-zinc-400">AVAILABLE FOR</span><span className="font-bold tracking-wider text-[#00f0ff]">NEW OPPORTUNITIES</span></div>
          <div><h1 className="mb-3 text-4xl font-bold tracking-tight text-[#e5e7eb] sm:text-6xl md:text-7xl">JOSHUA MULI</h1><div className="flex min-h-8 items-center"><TypewriterGreeting words={['Full-Stack Engineer', 'Cloud Systems Builder', 'Security-Minded Developer']} prefix=">" className="text-base font-medium text-[#00f0ff] sm:text-xl" /></div></div>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-[#9ca3af] sm:text-lg">I build resilient digital products and distributed systems with a thoughtful approach to performance, usability, and security.</p>
          <div className="flex flex-wrap gap-2 text-xs"><span className="border border-[#00f0ff]/30 bg-[#0b1020] px-2.5 py-1">Next.js / TypeScript</span><span className="border border-[#7c3aed]/40 bg-[#0b1020] px-2.5 py-1">Go / Microservices</span><span className="border border-[#00ffa3]/35 bg-[#0b1020] px-2.5 py-1">Cloud Architecture</span></div>
          <div className="flex flex-wrap gap-3 pt-2"><button onClick={() => scrollToSection('projects')} className="flex items-center gap-2 rounded-[3px] bg-[#00f0ff] px-5 py-2.5 text-sm font-bold text-[#0b1020] shadow-[0_0_16px_rgba(0,240,255,.6)]"><Terminal className="size-4" /> VIEW PROJECTS</button>{onOpenCaseStudy && <button onClick={() => { soundFx.playClick(); onOpenCaseStudy() }} className="flex items-center gap-2 rounded-[3px] border border-[#7c3aed]/50 px-5 py-2.5 text-sm font-bold text-white"><FolderGit2 className="size-4 text-[#7c3aed]" /> CASE STUDY</button>}<button onClick={() => scrollToSection('contact')} className="flex items-center gap-2 rounded-[3px] border border-white/20 px-5 py-2.5 text-sm text-zinc-300"><ExternalLink className="size-4" /> GET IN TOUCH</button></div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .15 }} className="space-y-4 lg:col-span-5">
        <div className="glass-card rounded-xl p-5"><div className="mb-4 flex items-center justify-between"><span className="text-xs tracking-widest text-[#00f0ff]">PROFILE // JOSHUA MULI</span><span className="text-xs text-[#00ffa3]">OPEN TO WORK</span></div><div className="grid gap-3 border-t border-white/10 pt-4 text-sm"><div className="flex items-center gap-3 text-zinc-300"><Phone className="size-4 text-[#00f0ff]" /> Available on request</div><div className="flex items-center gap-3 text-zinc-300"><Mail className="size-4 text-[#00f0ff]" /> hello@joshuamuli.dev</div></div></div>
        <div className="overflow-hidden rounded-xl border border-[#00f0ff]/30 bg-[#05070a]/80"><div className="relative h-56"><LazyHero3DScene /><span className="absolute left-3 top-3 text-[9px] text-[#00f0ff]/70">[VISUAL // PERSONAL NODE]</span></div></div>
      </motion.div>
    </div>
  </section>
}
