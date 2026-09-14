'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { SciCard } from '@/components/ui/sci-card'
import { soundFx } from '@/lib/sound-effects'
import { ExternalLink, Github, Eye, Shield, Activity, X, Terminal, Cpu, Database, CheckCircle2 } from 'lucide-react'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
  coordinates: string
  sector: string
  securityRating: string
  throughput: string
  encryption: string
  architecture: string
  highlights: string[]
}

const projects: Project[] = [
  {
    id: 'PRJ-01',
    title: 'Pen-Testing & Cyber Defense Center',
    subtitle: 'OFFENSIVE SECURITY & VULNERABILITY RADAR',
    description:
      'Real-time automated network reconnaissance, vulnerability detection engine, WebSocket telemetry streaming, and attack vector visualization.',
    tech: ['React', 'Node.js', 'WebSocket', 'Nmap', 'Kali Linux', 'Docker'],
    github: 'https://github.com/muli0237',
    demo: 'https://github.com/muli0237',
    image: '/cybersecurity-penetration-testing-dashboard.jpg',
    coordinates: 'LAT: 37.7749°N | LON: 122.4194°W',
    sector: 'SEC-09 // CYBER_COMMAND',
    securityRating: 'CLASS-A+ CERTIFIED',
    throughput: '45,000 SCANS/MIN',
    encryption: 'TLS 1.3 / E2EE',
    architecture: 'Microservices with isolated Kali worker containers & Redis queue',
    highlights: [
      'Automated Nmap and Nikto port and vulnerability scanner',
      'Real-time WebSocket event streaming with sub-5ms socket latency',
      'Interactive vector graph and CVE threat intelligence correlation',
    ],
  },
  {
    id: 'PRJ-02',
    title: 'High-Throughput E-Commerce Platform',
    subtitle: 'DISTRIBUTED COMMERCE & PAYMENTS',
    description:
      'Mission-critical e-commerce platform with distributed inventory locks, Stripe payment orchestration, real-time order lifecycle tracking, and fraud defense.',
    tech: ['Next.js', 'Node.js', 'Stripe', 'Docker', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/muli0237',
    demo: 'https://github.com/muli0237',
    image: '/modern-ecommerce-dashboard.png',
    coordinates: 'LAT: 40.7128°N | LON: 74.0060°W',
    sector: 'SEC-04 // COMMERCE_CORE',
    securityRating: 'PCI-DSS LEVEL 1 COMPLIANT',
    throughput: '12,500 RPS BENCHMARK',
    encryption: 'AES-256-GCM AT REST',
    architecture: 'Containerized Next.js App Router with Redis lock caching and ACID transactions',
    highlights: [
      'Distributed Redis mutex locks preventing stock race conditions',
      'Stripe webhook signature validation with idempotency keys',
      'Dockerized staging & production CI/CD automation pipeline',
    ],
  },
  {
    id: 'PRJ-03',
    title: 'Real-Time Data Analytics Platform',
    subtitle: 'STREAM PROCESSING & D3 VISUALIZATION',
    description:
      'High-velocity data processing pipeline with real-time aggregation, Celery background workers, and interactive D3.js multidimensional telemetry charts.',
    tech: ['Django', 'Python', 'Pandas', 'D3.js', 'Celery', 'PostgreSQL'],
    github: 'https://github.com/muli0237',
    demo: 'https://github.com/muli0237',
    image: '/data-analytics-dashboard.png',
    coordinates: 'LAT: 51.5074°N | LON: 0.1278°W',
    sector: 'SEC-12 // TELEMETRY_ARRAY',
    securityRating: 'SOC-2 TYPE II READY',
    throughput: '2.8M DATA POINTS/SEC',
    encryption: 'HMAC-SHA256 SIGNED',
    architecture: 'Django Async Workers + Celery cluster reading from partitioned PostgreSQL',
    highlights: [
      'Interactive D3.js real-time streaming radar and time-series histograms',
      'Pandas vector computations yielding 10x throughput gains',
      'Role-based granular data access tokens with audit logging',
    ],
  },
  {
    id: 'PRJ-04',
    title: 'Headless Enterprise CMS',
    subtitle: 'GRAPHQL API & ASSET ORCHESTRATION',
    description:
      'High-performance headless CMS with GraphQL query batching, granular Role-Based Access Control (RBAC), and automated media processing on AWS S3.',
    tech: ['NestJS', 'GraphQL', 'PostgreSQL', 'AWS S3', 'TypeScript', 'Docker'],
    github: 'https://github.com/muli0237',
    demo: 'https://github.com/muli0237',
    image: '/cms-content-management-interface.jpg',
    coordinates: 'LAT: 35.6762°N | LON: 139.6503°E',
    sector: 'SEC-07 // CONTENT_GRID',
    securityRating: 'ISO 27001 AUDITED',
    throughput: '8,200 REQ/SEC',
    encryption: 'KMS MANAGED ENCRYPTION',
    architecture: 'Modular NestJS micro-gateway with GraphQL DataLoader and AWS S3 presigned URLs',
    highlights: [
      'Granular hierarchical RBAC policies with attribute-based access control',
      'Zero N+1 query overhead via DataLoader batching algorithms',
      'Encrypted presigned file upload pipelines with malware pre-scanning',
    ],
  },
  {
    id: 'PRJ-05',
    title: 'School Management Ecosystem',
    subtitle: 'CAMPUS TELEMETRY & GRADE TRACKING',
    description:
      'Comprehensive institutional governance platform with student identity tracking, academic transcript encryption, and parent/faculty communication portals.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'RBAC', 'Tailwind', 'Docker'],
    github: 'https://github.com/muli0237',
    demo: 'https://github.com/muli0237',
    image: '/school-management-dashboard.png',
    coordinates: 'LAT: -1.2921°S | LON: 36.8219°E',
    sector: 'SEC-02 // INSTITUTION_NET',
    securityRating: 'FERPA & GDPR ALIGNED',
    throughput: '5,000 ACTIVE SESSIONS',
    encryption: 'BCRYPT 12-ROUNDS + AES',
    architecture: 'React SPA backed by Node.js REST API with Redis session clustering',
    highlights: [
      'Multi-tenant database schema isolation per department',
      'Automated grading calculation engine with tamper-evident audit logs',
      'Granular parent, student, and administrator capability tokens',
    ],
  },
]

export function ProjectsCarousel() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('ALL')

  const openLightbox = (project: Project) => {
    soundFx.playScan()
    setSelectedProject(project)
  }

  const closeLightbox = () => {
    soundFx.playClick()
    setSelectedProject(null)
  }

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : activeFilter === 'SECURITY'
      ? projects.filter((p) => p.tech.includes('Kali Linux') || p.tech.includes('Nmap'))
      : activeFilter === 'FULLSTACK'
      ? projects.filter((p) => p.tech.includes('Next.js') || p.tech.includes('React'))
      : projects

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with smooth fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#00f0ff]/20 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 font-oxanium text-xs text-[#00f0ff] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-bold tracking-wider">[SECTION // 02] SHOWCASES</span>
            </div>
            {/* Crisp static title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-oxanium text-[#e5e7eb] tracking-tight">
              FEATURED PROJECTS
            </h2>
            <p className="font-sans text-[#9ca3af] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Production-grade systems and offensive security architectures engineered for high throughput, sub-millisecond edge resolution, and zero-trust data integrity.
            </p>
          </div>

          {/* Cyberpunk Filter Tabs in Oxanium */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 font-oxanium text-xs">
            {['ALL', 'SECURITY', 'FULLSTACK'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  soundFx.playClick()
                  setActiveFilter(filter)
                }}
                className={`px-3 py-1.5 border transition-all duration-150 rounded-[3px] ${
                  activeFilter === filter
                    ? 'border-[#00f0ff] bg-[#00f0ff] text-[#0b1020] font-bold shadow-[0_0_16px_rgba(0,240,255,0.6)]'
                    : 'border-[#00f0ff]/20 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 bg-[#0b1020]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Clean Multi-Column Layout Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <SciCard
              key={project.id}
              title={project.id}
              status="PROD_READY"
              statusType="white"
              version="v2.4"
              code={project.sector.split(' ')[0]}
              enableTilt={true}
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Sleek Framed Project Viewport with Stark White Bracketed Corners & Crosshairs */}
              <div
                onClick={() => openLightbox(project)}
                className="relative h-48 sm:h-52 w-full overflow-hidden bg-black cursor-pointer group/frame border-b border-white/10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top opacity-85 group-hover/frame:opacity-100 group-hover/frame:scale-[1.03] transition-all duration-300 filter grayscale contrast-115"
                  referrerPolicy="no-referrer"
                />

                {/* Cyberpunk Neon Viewport Brackets [ ] */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none z-20 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none z-20 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none z-20 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none z-20 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />

                {/* Center Crosshair Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 group-hover/frame:opacity-80 transition-opacity z-10">
                  <div className="w-5 h-[1px] bg-[#00f0ff]" />
                  <div className="h-5 w-[1px] bg-[#00f0ff] -ml-2.5" />
                </div>

                {/* Subtle dark frame overlay on hover with inspect prompt */}
                <div className="absolute inset-0 bg-[#05070a]/75 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10">
                  <span className="px-3.5 py-1.5 rounded bg-[#00f0ff] text-[#0b1020] font-oxanium text-xs font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,240,255,0.7)]">
                    <Eye className="w-3.5 h-3.5 text-[#0b1020]" />
                    Inspect Architecture
                  </span>
                </div>

                {/* Faint coordinate label */}
                <div className="absolute bottom-2 left-4 px-2 py-0.5 bg-[#05070a]/90 text-[9px] font-mono text-[#00f0ff] border border-[#00f0ff]/30 pointer-events-none z-20">
                  {project.coordinates}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 font-oxanium">
                <div>
                  <div className="text-[11px] font-oxanium text-[#7c3aed] font-bold tracking-wider mb-1 uppercase">
                    {project.subtitle}
                  </div>
                  <h3 className="text-lg font-bold font-oxanium text-[#e5e7eb] tracking-tight group-hover:text-[#00f0ff] transition-colors">
                    {project.title}
                  </h3>
                  {/* Clean Sans-Serif Body for readability */}
                  <p className="font-sans text-xs text-[#9ca3af] mt-2.5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Metrics Strip */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#0b1020] border border-[#00f0ff]/20 rounded text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">SECURITY:</span>
                    <span className="text-[#00ffa3] font-bold text-[11px]">{project.securityRating}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block">THROUGHPUT:</span>
                    <span className="text-[#00f0ff] font-bold text-[11px]">{project.throughput}</span>
                  </div>
                </div>

                {/* Interactive Tech Stack Badges styled as sharp rectangular pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-[10px] font-oxanium font-medium bg-[#0b1020] text-[#e5e7eb] border border-[#00f0ff]/25 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all cursor-default select-none rounded-[2px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Quick Action Links */}
                <div className="pt-3 flex items-center gap-2 border-t border-[#00f0ff]/15 font-oxanium">
                  <button
                    onClick={() => openLightbox(project)}
                    className="flex-1 px-3 py-2 rounded bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] font-oxanium text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_14px_rgba(0,240,255,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>CASE VIEW</span>
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-2 rounded bg-[#0b1020] hover:bg-[#111827] text-zinc-300 hover:text-[#00f0ff] border border-[#00f0ff]/25 hover:border-[#00f0ff]/60 transition-colors"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-2 rounded bg-[#0b1020] hover:bg-[#111827] text-zinc-300 hover:text-[#00ffa3] border border-[#00f0ff]/25 hover:border-[#00ffa3]/60 transition-colors"
                    title="Open Live Deployment"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SciCard>
          ))}
        </motion.div>
      </div>

      {/* Modern Window Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[rgba(11,16,32,0.95)] backdrop-blur-2xl border border-[#00f0ff]/40 shadow-[0_0_40px_rgba(0,240,255,0.25)] rounded-lg overflow-hidden flex flex-col font-oxanium text-white"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#05070a] border-b border-[#00f0ff]/20 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ffa3]" />
                  </div>
                  <span className="font-bold text-[#e5e7eb] tracking-wide">
                    {selectedProject.title}
                  </span>
                  <span className="text-[#00f0ff] hidden sm:inline font-mono">[{selectedProject.id}]</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#00ffa3] font-bold text-[11px] hidden sm:inline px-2 py-0.5 rounded bg-[#00ffa3]/10 border border-[#00ffa3]/30">
                    STATUS: PRODUCTION
                  </span>
                  <button
                    onClick={closeLightbox}
                    className="p-1 text-zinc-400 hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 space-y-6 flex-1">
                {/* Screenshot Frame */}
                <div className="relative h-60 sm:h-80 w-full rounded-md border border-[#00f0ff]/30 overflow-hidden bg-[#05070a]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1000px"
                    className="object-contain filter grayscale contrast-115"
                    referrerPolicy="no-referrer"
                  />
                  {/* High tech bracket overlay */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none" />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#05070a] border border-[#00f0ff]/15 rounded-md">
                    <div className="text-xs font-oxanium text-[#00f0ff] font-bold mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>ARCHITECTURE</span>
                    </div>
                    <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                      {selectedProject.architecture}
                    </p>
                  </div>

                  <div className="p-4 bg-[#05070a] border border-[#7c3aed]/25 rounded-md">
                    <div className="text-xs font-oxanium text-[#7c3aed] font-bold mb-2 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#7c3aed]" />
                      <span>SECURITY PROFILE</span>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Rating:</span>
                        <span className="text-[#00ffa3] font-bold">{selectedProject.securityRating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Encryption:</span>
                        <span className="text-zinc-300">{selectedProject.encryption}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Throughput:</span>
                        <span className="text-[#00f0ff]">{selectedProject.throughput}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#05070a] border border-[#00ffa3]/20 rounded-md">
                    <div className="text-xs font-oxanium text-[#00ffa3] font-bold mb-2 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#00ffa3]" />
                      <span>TECHNOLOGY STACK</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-oxanium bg-[#0b1020] border border-[#00f0ff]/25 text-[#00f0ff] rounded-none"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Highlights Checklist */}
                <div className="p-4 bg-[#05070a] border border-[#00f0ff]/15 rounded-md">
                  <div className="text-xs font-oxanium text-[#e5e7eb] font-bold mb-3">
                    KEY ENGINEERING HIGHLIGHTS
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-sans text-[#9ca3af]">
                        <CheckCircle2 className="w-4 h-4 text-[#00ffa3] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer with Actions */}
              <div className="px-6 py-3 bg-[#05070a] border-t border-[#00f0ff]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-zinc-500 text-[11px] font-mono">
                  ID: {selectedProject.id} {'//'} HASH: SHA-256: 9f8a7e4c
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b1020] hover:bg-[#111827] text-white border border-[#00f0ff]/30 rounded font-oxanium transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>

                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] border border-[#00f0ff] rounded font-oxanium font-bold transition-all shadow-[0_0_16px_rgba(0,240,255,0.6)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#0b1020]" />
                    <span>Live Deployment</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
