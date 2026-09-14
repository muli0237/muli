'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { SciCard } from '@/components/ui/sci-card'
import { soundFx } from '@/lib/sound-effects'
import { Send, Mail, Github, Linkedin, Shield, CheckCircle2, Lock, Copy, Check } from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    callsign: '',
    frequency: '',
    classification: 'PROJECT_INQUIRY',
    payload: '',
  })

  const [isTransmitting, setIsTransmitting] = useState(false)
  const [transmitted, setTransmitted] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)

  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v2.1.13
Comment: https://keybase.io/crypto

xsFNBF+R3Y0BEADW89j2gG3o8ZX9qK4m7vL0a1c...
=JM0237
-----END PGP PUBLIC KEY BLOCK-----`

  const handleCopyKey = () => {
    soundFx.playClick()
    navigator.clipboard.writeText(pgpKey)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.callsign || !formData.frequency || !formData.payload) return

    soundFx.playTerminalExec()
    setIsTransmitting(true)

    setTimeout(() => {
      setIsTransmitting(false)
      setTransmitted(true)
      soundFx.playSuccess()
      setFormData({
        callsign: '',
        frequency: '',
        classification: 'PROJECT_INQUIRY',
        payload: '',
      })
      setTimeout(() => setTransmitted(false), 6000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden font-oxanium">
      <div className="max-w-7xl mx-auto">
        {/* Header with smooth fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 border-b border-[#00f0ff]/20 pb-6 font-oxanium"
        >
          <div className="flex items-center gap-2 font-oxanium text-xs text-[#00f0ff] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-bold tracking-wider">[SECTION // 05] CONTACT // ENCRYPTED INBOX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-oxanium text-[#e5e7eb] tracking-tight">
            INITIATE CONTACT
          </h2>
          <p className="font-sans text-[#9ca3af] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            Have a project in mind, need infrastructure architecture guidance, or wish to schedule a security penetration audit? Send a direct transmission.
          </p>
        </motion.div>

        {/* Multi-Column Layout Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Modern Window Message Console (7 Cols) */}
          <div className="lg:col-span-7">
            <SciCard
              title="MESSAGE_DISPATCH"
              status={transmitted ? 'SENT_OK' : 'READY'}
              statusType="white"
              version="v2.4"
              code="PORT: 443"
              enableTilt={true}
              className="p-6 font-oxanium"
            >
              {transmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00ffa3]/15 border border-[#00ffa3] mx-auto flex items-center justify-center text-[#00ffa3] shadow-[0_0_20px_rgba(0,255,163,0.4)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-oxanium text-[#e5e7eb] tracking-wider">
                    TRANSMISSION DELIVERED
                  </h3>
                  <p className="font-sans text-xs text-[#9ca3af] max-w-md mx-auto leading-relaxed">
                    Your transmission has been logged and dispatched directly to Joshua Muli. You can expect a response within 24 hours.
                  </p>
                  <button
                    onClick={() => setTransmitted(false)}
                    className="px-4 py-2 bg-[#00f0ff] text-[#0b1020] font-bold border border-[#00f0ff] font-oxanium text-xs transition-all hover:bg-[#00f0ff]/90 shadow-[0_0_15px_rgba(0,240,255,0.4)] rounded-[3px]"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-oxanium text-zinc-400 mb-1.5">
                        NAME / CALLSIGN <span className="text-[#00f0ff]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.callsign}
                        onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-3.5 py-2.5 bg-[#0b1020] border border-[#00f0ff]/25 text-[#e5e7eb] placeholder:text-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/40 font-oxanium text-xs transition-colors rounded-[3px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-oxanium text-zinc-400 mb-1.5">
                        EMAIL / FREQUENCY <span className="text-[#00f0ff]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-[#0b1020] border border-[#00f0ff]/25 text-[#e5e7eb] placeholder:text-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/40 font-oxanium text-xs transition-colors rounded-[3px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-oxanium text-zinc-400 mb-1.5">
                      CLASSIFICATION
                    </label>
                    <select
                      value={formData.classification}
                      onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#0b1020] border border-[#00f0ff]/25 text-[#e5e7eb] focus:outline-none focus:border-[#00f0ff] font-oxanium text-xs transition-colors cursor-pointer rounded-[3px]"
                    >
                      <option value="PROJECT_INQUIRY">PROJECT_INQUIRY (Full-Stack &amp; Distributed Systems)</option>
                      <option value="SECURITY_AUDIT">SECURITY_AUDIT (Pen-Testing &amp; Vulnerability Assessment)</option>
                      <option value="CONSULTING">ARCHITECTURAL_CONSULTING (Kubernetes / DevOps)</option>
                      <option value="GENERAL_CONNECT">GENERAL_NETWORKING</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-oxanium text-zinc-400 mb-1.5">
                      PAYLOAD MESSAGE <span className="text-[#00f0ff]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.payload}
                      onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                      placeholder="Outline your application specifications, security requirements, or timeline..."
                      className="w-full px-3.5 py-2.5 bg-[#0b1020] border border-[#00f0ff]/25 text-[#e5e7eb] placeholder:text-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/40 font-sans text-xs transition-colors resize-none leading-relaxed rounded-[3px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-3 px-4 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] border border-[#00f0ff] font-oxanium text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.6)] hover:shadow-[0_0_24px_rgba(0,240,255,0.9)] disabled:opacity-50 rounded-[3px]"
                  >
                    {isTransmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-[#0b1020] border-t-transparent rounded-full animate-spin" />
                        <span>DISPATCHING_TRANSMISSION...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 fill-[#0b1020]" />
                        <span>DISPATCH_MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </SciCard>
          </div>

          {/* Right Column: Direct Channels & PGP Key (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels Card */}
            <SciCard
              title="DIRECT_CHANNELS"
              status="OPEN"
              statusType="white"
              version="v2.4"
              code="LINK_ACTIVE"
              enableTilt={true}
              className="p-5 font-oxanium space-y-3"
            >
              <a
                href="mailto:contact@joshua-muli.dev"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 bg-[#0b1020] border border-[#00f0ff]/20 hover:border-[#00f0ff] hover:bg-[#111827] rounded-[3px] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00f0ff]" />
                  <div className="text-xs">
                    <span className="text-zinc-400 block text-[10px] font-mono">DIRECT EMAIL</span>
                    <span className="text-[#e5e7eb] group-hover:text-[#00f0ff] font-semibold font-oxanium">
                      contact@joshua-muli.dev
                    </span>
                  </div>
                </div>
                <span className="text-zinc-400 group-hover:text-[#00f0ff] text-xs">→</span>
              </a>

              <a
                href="https://github.com/muli0237"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 bg-[#0b1020] border border-[#00f0ff]/20 hover:border-[#00f0ff] hover:bg-[#111827] rounded-[3px] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-[#7c3aed]" />
                  <div className="text-xs">
                    <span className="text-zinc-400 block text-[10px] font-mono">GITHUB REPOSITORIES</span>
                    <span className="text-[#e5e7eb] group-hover:text-[#7c3aed] font-semibold font-oxanium">
                      github.com/muli0237
                    </span>
                  </div>
                </div>
                <span className="text-zinc-400 group-hover:text-[#7c3aed] text-xs">→</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 bg-[#0b1020] border border-[#00f0ff]/20 hover:border-[#00ffa3] hover:bg-[#111827] rounded-[3px] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#00ffa3]" />
                  <div className="text-xs">
                    <span className="text-zinc-400 block text-[10px] font-mono">PROFESSIONAL NETWORK</span>
                    <span className="text-[#e5e7eb] group-hover:text-[#00ffa3] font-semibold font-oxanium">
                      linkedin.com/in/joshuamuli
                    </span>
                  </div>
                </div>
                <span className="text-zinc-400 group-hover:text-[#00ffa3] text-xs">→</span>
              </a>
            </SciCard>

            {/* PGP Public Key Card */}
            <SciCard
              title="PUBLIC_KEY_CIPHER"
              status="4096-BIT"
              statusType="white"
              version="v2.4"
              code="PGP"
              enableTilt={true}
              className="p-5 font-oxanium space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1.5 font-oxanium">
                  <Lock className="w-3.5 h-3.5 text-[#00f0ff]" />
                  PGP Fingerprint
                </span>
                <button
                  onClick={handleCopyKey}
                  className="flex items-center gap-1 text-[11px] text-[#00f0ff] hover:text-[#00ffa3] transition-colors font-mono"
                >
                  {copiedKey ? (
                    <>
                      <Check className="w-3 h-3 text-[#00ffa3]" />
                      <span className="text-[#00ffa3] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>COPY KEY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-[#05070a] border border-[#00f0ff]/20 font-mono text-[10px] text-[#00ffa3]/80 leading-relaxed overflow-x-auto whitespace-pre select-all rounded-[3px]">
                {pgpKey}
              </div>
            </SciCard>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
