'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { SciCard } from '@/components/ui/sci-card'
import { soundFx } from '@/lib/sound-effects'
import { Download, Shield, Award, Terminal, CheckCircle2, FileCode, Check, MapPin, Briefcase } from 'lucide-react'

export function AboutSection() {
  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleDownload = () => {
    soundFx.playScan()
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      setDownloadSuccess(true)
      soundFx.playSuccess()
      setTimeout(() => setDownloadSuccess(false), 4000)
    }, 1200)
  }

  const milestones = [
    {
      year: '2023 - PRESENT',
      role: 'Lead Systems Architect & Security Researcher',
      company: 'Distributed Systems & Security Labs',
      description: 'Architecting zero-trust enterprise platforms, distributed microservices in Go and Node.js, and conducting adversarial red-team penetration tests.',
    },
    {
      year: '2021 - 2023',
      role: 'Senior Full-Stack & DevOps Engineer',
      company: 'Cloud Scale Infrastructure',
      description: 'Orchestrated Kubernetes clusters, reduced p99 query latency by 45%, and automated CI/CD security scanning with automated OWASP vulnerability tests.',
    },
    {
      year: '2019 - 2021',
      role: 'Full-Stack Developer & Vulnerability Analyst',
      company: 'Digital Solutions Co.',
      description: 'Authored production-ready React and Python web systems, implemented strict role-based access control, and resolved critical zero-day surface exposures.',
    },
  ]

  const certifications = [
    'OSCP (Offensive Security Certified Professional - Training Complete)',
    'CompTIA Security+ Certified Analyst',
    'AWS Certified Solutions Architect (Associate)',
    'Certified Kubernetes Administrator (CKA Curriculum)',
  ]

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with smooth fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 border-b border-[#00f0ff]/20 pb-6 font-oxanium"
        >
          <div className="flex items-center gap-2 font-oxanium text-xs text-[#00f0ff] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-bold tracking-wider">[PERSONNEL_DOSSIER // JM-0237]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-oxanium text-[#e5e7eb] tracking-tight">
            ABOUT &amp; EXPERIENCE
          </h2>
          <p className="font-sans text-[#9ca3af] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Joshua Muli is a Full-Stack Engineer and Security Researcher focused on building resilient systems that hold up against real-world adversarial attacks.
          </p>
        </motion.div>

        {/* 2-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Operator Profile Window Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <SciCard
              title="OPERATOR_PROFILE"
              status="ACTIVE"
              statusType="white"
              version="v2.4"
              code="CLEARANCE: ALPHA"
              enableTilt={true}
              className="p-6 space-y-6 font-oxanium"
            >
              {/* Profile Image with subtle frame */}
              <div className="relative w-full aspect-square max-w-xs mx-auto overflow-hidden rounded-md border border-white/20 bg-black group">
                <Image
                  src="/albert-dera-ILip77SbmOE-unsplash.jpg"
                  alt="Joshua Muli"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top filter grayscale contrast-125 group-hover:contrast-110 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Cyberpunk Neon Viewport Brackets [ ] */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none z-10" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none z-10" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none z-10" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none z-10" />

                <div className="absolute bottom-2 left-4 px-2 py-0.5 rounded bg-[#05070a]/90 border border-[#00f0ff]/30 text-[10px] font-mono text-[#00f0ff] z-10">
                  BIOMETRIC: VERIFIED
                </div>
              </div>

              {/* Operator Specs Strip */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1.5 border-b border-[#00f0ff]/15">
                  <span className="text-[#9ca3af] flex items-center gap-1.5 font-oxanium">
                    <Briefcase className="w-3.5 h-3.5 text-[#00f0ff]" />
                    Specialization
                  </span>
                  <span className="text-[#e5e7eb] font-semibold font-oxanium">Full-Stack &amp; Security</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#00f0ff]/15">
                  <span className="text-[#9ca3af] flex items-center gap-1.5 font-oxanium">
                    <MapPin className="w-3.5 h-3.5 text-[#7c3aed]" />
                    Location
                  </span>
                  <span className="text-[#e5e7eb] font-semibold font-oxanium">Nairobi, Kenya / Remote</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#9ca3af] flex items-center gap-1.5 font-oxanium">
                    <Shield className="w-3.5 h-3.5 text-[#00ffa3]" />
                    Security Posture
                  </span>
                  <span className="text-[#00ffa3] font-semibold font-oxanium">Zero-Trust Architecture</span>
                </div>
              </div>

              {/* Download CV CTA */}
              <div className="pt-2">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full py-2.5 px-4 rounded bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] border border-[#00f0ff] font-oxanium text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,240,255,0.6)] hover:shadow-[0_0_24px_rgba(0,240,255,0.9)] disabled:opacity-50"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#0b1020]" />
                      <span className="text-[#0b1020]">CV_DOWNLOAD_READY.PDF</span>
                    </>
                  ) : downloading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#0b1020] border-t-transparent rounded-full animate-spin" />
                      <span>PREPARING_ENCRYPTED_CV...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#0b1020]" />
                      <span>DOWNLOAD_FULL_RESUME.PDF</span>
                    </>
                  )}
                </button>
              </div>
            </SciCard>
          </motion.div>

          {/* Right Column: Narrative Biography & Operational Chronology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Biography Card */}
            <SciCard
              title="MISSION_STATEMENT"
              status="VERIFIED"
              statusType="white"
              version="v2.4"
              enableTilt={true}
              className="p-6 font-oxanium"
            >
              <div className="font-sans text-[#e5e7eb] text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  As both a full-stack engineer and an offensive cybersecurity researcher, I approach software engineering from a dual perspective: how to craft blazing-fast, delightful user experiences, and how an adversary would dismantle the underlying architecture.
                </p>
                <p className="text-[#9ca3af]">
                  My work spans the complete lifecycle of mission-critical software—from designing microsecond-latency microservices and event-driven data pipelines to conducting invasive penetration testing, Docker sandboxing, and Kubernetes orchestrations.
                </p>
              </div>
            </SciCard>

            {/* Experience Timeline */}
            <SciCard
              title="OPERATIONAL_CHRONOLOGY"
              status="HISTORY"
              statusType="white"
              version="v2.4"
              enableTilt={true}
              className="p-6 font-oxanium"
            >
              <div className="space-y-6">
                {milestones.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 border-l border-[#00f0ff]/30 last:border-l-transparent pb-4 last:pb-0"
                  >
                    {/* Timeline Node Dot with Cyan Glow */}
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#00f0ff] border-2 border-[#0b1020] shadow-[0_0_8px_rgba(0,240,255,0.8)]" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h4 className="font-oxanium font-bold text-[#e5e7eb] text-sm">
                        {item.role}
                      </h4>
                      <span className="font-mono text-[11px] text-[#00f0ff] px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                        {item.year}
                      </span>
                    </div>

                    <div className="font-oxanium text-xs text-[#7c3aed] font-semibold mb-2">
                      {item.company}
                    </div>

                    <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </SciCard>

            {/* Certifications Card */}
            <SciCard
              title="CREDENTIALS_&_CERTIFICATIONS"
              status="VERIFIED"
              statusType="white"
              version="v2.4"
              enableTilt={true}
              className="p-6 font-oxanium"
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 p-2.5 bg-[#0b1020] border border-[#00f0ff]/20 rounded-md font-sans text-xs text-[#e5e7eb] hover:border-[#00f0ff]/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00ffa3] shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </SciCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
