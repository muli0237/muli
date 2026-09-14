'use client'

import React, { useEffect, useState } from 'react'
import { soundFx } from '@/lib/sound-effects'
import { Volume2, VolumeX, Shield, Terminal, Menu, X, Search, FolderGit2, Zap } from 'lucide-react'
import { useMotionPreference } from '@/components/motion-context'

const navItems = [
  { id: 'home', label: 'HERO', num: '01' },
  { id: 'about', label: 'ABOUT', num: '02' },
  { id: 'tech-stack', label: 'SKILLS', num: '03' },
  { id: 'projects', label: 'PROJECTS', num: '04' },
  { id: 'security', label: 'EXPERIENCE', num: '05' },
  { id: 'contact', label: 'CONTACT', num: '06' },
]

interface NavigationProps {
  onOpenCommandPalette?: () => void
  onOpenCaseStudy?: () => void
}

export function Navigation({ onOpenCommandPalette, onOpenCaseStudy }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home')
  const [timeUtc, setTimeUtc] = useState<string>('00:00:00 UTC')
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [ping, setPing] = useState(18)
  const { reduceMotion, toggleReduceMotion } = useMotionPreference()

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const utcString = now.toUTCString().split(' ')[4] + ' UTC'
      setTimeUtc(utcString)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fluctuating network telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(14 + Math.random() * 8))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Section observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleSoundToggle = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    soundFx.setEnabled(newState)
  }

  const scrollTo = (id: string) => {
    soundFx.playClick()
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 select-none font-oxanium">
      {/* Top Telemetry Strip */}
      <div className="bg-[#05070a]/95 border-b border-[#00f0ff]/15 px-3 py-1 font-mono text-[11px] text-zinc-400 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 font-oxanium">
            <span className="flex items-center gap-1.5 text-[#00f0ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-bold tracking-wider">[SYS.ONLINE]</span>
            </span>

            <span className="hidden sm:inline text-zinc-700">|</span>

            <span className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 font-oxanium">
              <Shield className="w-3 h-3 text-[#00f0ff]" />
              <span>DEFENSE:</span>
              <span className="text-[#00ffa3] font-bold">ZERO-TRUST ACTIVE</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-zinc-300 font-medium tracking-wide font-mono">{timeUtc}</span>

            <span className="text-zinc-800">|</span>

            <span className="hidden xs:inline text-zinc-400 text-[10px] font-mono">
              PING: <span className="text-[#00f0ff] font-semibold">{ping}ms</span>
            </span>

            <span className="hidden sm:inline text-zinc-800">|</span>

            {/* Reduce Motion Toggle in Header */}
            <button
              onClick={() => {
                soundFx.playClick()
                toggleReduceMotion()
              }}
              title={
                reduceMotion
                  ? 'Motion reduced: click to enable full 3D particle animation'
                  : 'Full motion: click to enable reduce-motion mode'
              }
              className={`flex items-center gap-1 px-2 py-0.5 border text-[10px] font-oxanium transition-all rounded-[2px] ${
                reduceMotion
                  ? 'border-[#f59e0b] bg-[#f59e0b]/15 text-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'border-[#00f0ff]/30 hover:border-[#00f0ff] text-zinc-300 hover:text-[#00f0ff]'
              }`}
            >
              <Zap className={`w-3 h-3 ${reduceMotion ? 'text-[#f59e0b]' : 'text-[#00f0ff]'}`} />
              <span className="font-bold hidden sm:inline">
                {reduceMotion ? 'MOTION: REDUCED' : 'MOTION: FULL'}
              </span>
              <span className="font-bold sm:hidden">
                {reduceMotion ? 'MIN-FX' : 'FX'}
              </span>
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interface Audio'}
              className="flex items-center gap-1 px-2 py-0.5 border border-[#00f0ff]/20 hover:border-[#00f0ff] text-zinc-400 hover:text-white transition-colors text-[10px] font-oxanium rounded-[2px]"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-[#00ffa3]" />
                  <span className="text-[#00ffa3] font-bold">AUDIO: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-zinc-500" />
                  <span className="text-zinc-500">AUDIO: OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Mission Command Navigation Bar */}
      <div className="bg-[rgba(17,24,39,0.75)] backdrop-blur-xl border-b border-[rgba(0,240,255,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Logo / Callsign */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-7 h-7 bg-[#00f0ff] text-[#0b1020] font-bold flex items-center justify-center font-oxanium text-xs group-hover:bg-white transition-all shadow-[0_0_14px_rgba(0,240,255,0.6)] rounded-[3px]">
              JM
            </div>
            <div>
              <div className="font-oxanium text-xs font-bold text-[#e5e7eb] tracking-wider flex items-center gap-1.5 group-hover:text-[#00f0ff] transition-colors">
                <span>JOSHUA MULI</span>
                <span className="text-[9px] px-1 py-0.2 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 rounded-[2px]">
                  OP_0237
                </span>
              </div>
              <div className="font-oxanium text-[10px] text-zinc-400">
                SYS_ARCHITECT {'//'} SEC_RESEARCH
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 font-oxanium text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 transition-all duration-200 flex items-center gap-1.5 rounded-[3px] ${
                    isActive
                      ? 'text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/50 font-bold shadow-[0_0_14px_rgba(0,240,255,0.35)]'
                      : 'text-[#e5e7eb] hover:text-[#00f0ff] hover:bg-[#00f0ff]/5 border border-transparent hover:border-[#00f0ff]/20'
                  }`}
                >
                  <span className="text-[10px] text-zinc-500 font-mono">{item.num}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Quick Action Tools */}
          <div className="hidden sm:flex items-center gap-2 font-oxanium">
            {/* Search Command Palette Trigger */}
            <button
              onClick={() => {
                soundFx.playClick()
                if (onOpenCommandPalette) onOpenCommandPalette()
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-[#111827]/80 border border-[rgba(0,240,255,0.25)] hover:border-[#00f0ff] text-zinc-300 hover:text-[#00f0ff] text-xs transition-all rounded-[3px]"
              title="Open Command Palette (/ or Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="text-xs">SEARCH</span>
              <kbd className="px-1 py-0.2 text-[9px] bg-[#05070a] border border-white/20 text-zinc-400 font-mono rounded">
                ⌘K
              </kbd>
            </button>

            {/* Case Study Trigger */}
            {onOpenCaseStudy && (
              <button
                onClick={() => {
                  soundFx.playClick()
                  onOpenCaseStudy()
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111827]/80 border border-[rgba(124,58,237,0.4)] hover:border-[#7c3aed] text-zinc-200 hover:text-white text-xs transition-all hover:shadow-[0_0_14px_rgba(124,58,237,0.35)] rounded-[3px]"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-[#7c3aed]" />
                <span>CASE STUDY</span>
              </button>
            )}

            {/* Transmit Message CTA - Primary Button */}
            <button
              onClick={() => scrollTo('contact')}
              className="font-oxanium text-xs font-bold px-3.5 py-1.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] border border-[#00f0ff] transition-all flex items-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.6)] hover:shadow-[0_0_24px_rgba(0,240,255,0.9)] rounded-[3px]"
            >
              <Terminal className="w-3.5 h-3.5 fill-[#0b1020]" />
              <span>TRANSMIT</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              soundFx.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="lg:hidden p-2 text-white border border-[#00f0ff]/30 bg-[#111827] rounded-[3px]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#00f0ff]" /> : <Menu className="w-5 h-5 text-[#00f0ff]" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b1020] border-b border-[#00f0ff]/30 px-4 py-4 font-oxanium text-sm space-y-2">
            <div className="text-[10px] text-[#00f0ff] uppercase tracking-wider pb-1 border-b border-white/10 flex items-center justify-between">
              <span>NAVIGATION MENU</span>
              <button
                onClick={toggleReduceMotion}
                className="text-[9px] px-2 py-0.5 border border-[#00f0ff]/40 text-[#00f0ff] rounded"
              >
                {reduceMotion ? 'REDUCE MOTION: ON' : 'REDUCE MOTION: OFF'}
              </button>
            </div>

            {/* Command Palette Trigger Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenCommandPalette) onOpenCommandPalette()
              }}
              className="w-full text-left px-3 py-2 border border-white/20 bg-[#111827] text-zinc-300 flex items-center justify-between rounded"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#00f0ff]" />
                <span>COMMAND PALETTE</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">⌘K</span>
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2 border transition-colors flex items-center justify-between rounded ${
                  activeSection === item.id
                    ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff] font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'border-white/10 text-zinc-300 hover:text-[#00f0ff] hover:bg-[#00f0ff]/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 font-mono">{item.num}</span>
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-[#00f0ff]">→</span>
              </button>
            ))}
            <div className="pt-2 space-y-2">
              {onOpenCaseStudy && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenCaseStudy()
                  }}
                  className="w-full text-center py-2 font-bold bg-[#111827] text-white border border-[#7c3aed]/50 uppercase tracking-wider rounded shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                >
                  VIEW CASE STUDY
                </button>
              )}
              <button
                onClick={() => scrollTo('contact')}
                className="w-full text-center py-2.5 font-bold bg-[#00f0ff] text-[#0b1020] border border-[#00f0ff] uppercase tracking-wider shadow-[0_0_16px_rgba(0,240,255,0.6)] rounded"
              >
                TRANSMIT MESSAGE
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
