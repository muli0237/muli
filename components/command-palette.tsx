'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Terminal, ArrowRight, X, Cpu, Shield, Code, Sparkles, FolderGit2 } from 'lucide-react'
import { soundFx } from '@/lib/sound-effects'

interface CommandPaletteProps {
  onSelectProject?: (projectId: string) => void
  onOpenCaseStudy?: (caseStudyId: string) => void
  isOpen?: boolean
  onClose?: () => void
  hideTriggerBar?: boolean
}

export function CommandPalette({
  onSelectProject,
  onOpenCaseStudy,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  hideTriggerBar = false,
}: CommandPaletteProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const closeModal = React.useCallback(() => {
    if (controlledOnClose) {
      controlledOnClose()
    } else {
      setInternalIsOpen(false)
    }
  }, [controlledOnClose])

  const openModal = React.useCallback(() => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(true)
    }
  }, [controlledIsOpen])

  // Keyboard shortcut: '/' or 'cmd+k'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault()
        soundFx.playClick()
        if (isModalOpen) {
          closeModal()
        } else {
          openModal()
        }
      } else if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal, openModal])

  const commands = [
    {
      id: 'case-study',
      title: 'OPEN_CASE_STUDY // Distributed Ingress Controller',
      category: 'CASE STUDY',
      icon: FolderGit2,
      action: () => {
        if (onOpenCaseStudy) onOpenCaseStudy('distributed-ingress')
        closeModal()
      },
    },
    {
      id: 'projects',
      title: 'NAVIGATE // Featured System Showcases',
      category: 'NAVIGATION',
      icon: Code,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        closeModal()
      },
    },
    {
      id: 'terminal',
      title: 'EXECUTE // Security Research Terminal (nmap / sysinfo)',
      category: 'TERMINAL',
      icon: Terminal,
      action: () => {
        document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' })
        closeModal()
      },
    },
    {
      id: 'skills',
      title: 'TELEMETRY // Technical Competencies & Cloud Stacks',
      category: 'SYSTEM',
      icon: Cpu,
      action: () => {
        document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' })
        closeModal()
      },
    },
    {
      id: 'contact',
      title: 'TRANSMIT // Encrypted Dispatch & PGP Block',
      category: 'UPLINK',
      icon: Shield,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        closeModal()
      },
    },
  ]

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      {/* High-Tech In-Page Command / Prompt Bar */}
      {!hideTriggerBar && (
        <div className="w-full max-w-2xl mx-auto my-6">
          <div
            onClick={() => {
              soundFx.playClick()
              openModal()
            }}
            className="relative group cursor-pointer rounded-md bg-[#0b1020] border border-[#00f0ff]/30 hover:border-[#00f0ff] px-4 py-3 flex items-center justify-between transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]"
          >
            {/* Corner brackets */}
            <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#00f0ff]/70 pointer-events-none" />
            <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-[#00f0ff]/70 pointer-events-none" />
            <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-[#00f0ff]/70 pointer-events-none" />
            <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#00f0ff]/70 pointer-events-none" />

            <div className="flex items-center gap-3 w-full font-oxanium text-sm">
              <Search className="w-4 h-4 text-[#00f0ff] group-hover:text-white transition-colors" />
              <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                Type command or search project tags...
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#00f0ff] bg-[#05070a] border border-[#00f0ff]/30 px-2 py-0.5 rounded">
              <span>PRESS</span>
              <kbd className="text-[#00ffa3] font-bold">/</kbd>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Command Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-[#05070a]/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-[#0b1020] border border-[#00f0ff]/40 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.25)] overflow-hidden font-oxanium z-10"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#00f0ff]/20 bg-[#05070a] text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00ffa3]" />
                  <span className="font-bold tracking-wider text-[#00f0ff]">[COMMAND_PALETTE // PROMPT_v2]</span>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1 rounded hover:bg-[#111827] text-zinc-400 hover:text-[#00f0ff]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Input Field with Active Focus Glow */}
              <div className="p-4 border-b border-[#00f0ff]/20 bg-[#05070a]/60">
                <div className="flex items-center gap-3 bg-[#05070a] border border-[#00f0ff]/30 focus-within:border-[#00f0ff] focus-within:shadow-[0_0_20px_rgba(0,240,255,0.35)] rounded px-3.5 py-2.5 transition-all">
                  <Search className="w-4 h-4 text-[#00f0ff]" />
                  <input
                    type="text"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type command or search project tags..."
                    className="w-full bg-transparent text-[#e5e7eb] font-oxanium text-sm focus:outline-none placeholder:text-zinc-600"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="text-xs text-zinc-500 hover:text-[#00f0ff]"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
              </div>

              {/* Command Items List */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => {
                    const Icon = cmd.icon
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => {
                          soundFx.playClick()
                          cmd.action()
                        }}
                        className="w-full px-3 py-2.5 rounded-md hover:bg-[#00f0ff] hover:text-[#0b1020] group text-left transition-all duration-150 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded bg-[#05070a] group-hover:bg-[#0b1020] text-[#00f0ff] group-hover:text-[#00ffa3] transition-colors border border-[#00f0ff]/20">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[#e5e7eb] group-hover:text-[#0b1020]">
                              {cmd.title}
                            </div>
                            <div className="text-[10px] text-zinc-400 group-hover:text-[#0b1020]/80 uppercase font-mono">
                              TAG: {cmd.category}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#0b1020] group-hover:translate-x-1 transition-transform" />
                      </button>
                    )
                  })
                ) : (
                  <div className="p-8 text-center text-zinc-500 text-sm">
                    No commands matching &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>

              {/* Footer status */}
              <div className="px-4 py-2 border-t border-[#00f0ff]/20 bg-[#05070a] text-[11px] text-zinc-500 flex justify-between font-mono">
                <span>PRESS ESC TO CLOSE</span>
                <span className="text-[#00ffa3]">CYBERPUNK // COMMAND MATRIX</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
