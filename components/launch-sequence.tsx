'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const phases = [
  ['BOOTING PORTFOLIO CORE', 'Loading interface modules…'],
  ['IDENTITY CONFIRMED', 'Joshua Muli · Full-Stack Engineer'],
  ['SYSTEMS ONLINE', 'Ready to explore selected work'],
] as const

export function LaunchSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { onComplete(); return }
    const timers = [setTimeout(() => setPhase(1), 8000), setTimeout(() => setPhase(2), 16000), setTimeout(() => { setVisible(false); onComplete() }, 30000)]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  if (!visible) return null
  return (
    <AnimatePresence>
      <motion.div className="launch-sequence" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="launch-sequence__grid" />
        <div className="relative z-10 max-w-xl px-6 text-center font-oxanium">
          <div className="mb-8 text-xs tracking-[0.4em] text-[#00f0ff]">JM // PORTFOLIO SYSTEM</div>
          <div className="mb-6 flex items-center justify-center gap-3 text-xs text-[#00ffa3]"><span className="size-2 animate-pulse rounded-full bg-[#00ffa3]" /> CONNECTION ESTABLISHED</div>
          <AnimatePresence mode="wait">
            <motion.div key={phase} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6 }}>
              <h1 className="text-2xl font-bold tracking-widest text-white sm:text-4xl">{phases[phase][0]}</h1>
              <p className="mt-4 font-sans text-sm text-zinc-400">{phases[phase][1]}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mx-auto mt-12 h-px max-w-sm overflow-hidden bg-white/10"><motion.div className="h-full bg-[#00f0ff]" animate={{ width: `${((phase + 1) / phases.length) * 100}%` }} transition={{ duration: 0.8 }} /></div>
          <button onClick={() => { setVisible(false); onComplete() }} className="mt-10 border border-white/20 px-4 py-2 text-[10px] tracking-[0.25em] text-zinc-400 transition hover:border-[#00f0ff] hover:text-[#00f0ff]">SKIP INTRO</button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function useLaunchIntro() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null)
  useEffect(() => { setShowIntro(window.localStorage.getItem('portfolio_intro_seen') !== 'true') }, [])
  const complete = () => { window.localStorage.setItem('portfolio_intro_seen', 'true'); setShowIntro(false) }
  return { showIntro, complete }
}

export function LandingPage({ children }: { children: React.ReactNode }) {
  const { showIntro, complete } = useLaunchIntro()
  if (showIntro === null) return <div className="min-h-screen bg-[#05070a]" />
  return <>{showIntro && <LaunchSequence onComplete={complete} />}{children}</>
}

import type React from 'react'

export default LaunchSequence
