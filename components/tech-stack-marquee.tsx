'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { SciCard } from '@/components/ui/sci-card'
import { soundFx } from '@/lib/sound-effects'
import { Shield, Cpu, Server, Database, Cloud, Terminal, Layers, CheckCircle2 } from 'lucide-react'

interface TechModule {
  id: string
  name: string
  category: 'SEC' | 'CLOUD' | 'BACKEND' | 'FRONTEND'
  proficiency: number
  status: 'ONLINE' | 'ACTIVE' | 'DEPLOYED'
  port: string
  description: string
  icon: string
}

const modules: TechModule[] = [
  {
    id: 'SKL-01',
    name: 'Kali Linux & Offensive Security',
    category: 'SEC',
    proficiency: 95,
    status: 'ONLINE',
    port: 'PORT: 4444',
    description: 'Nmap reconnaissance, Metasploit, Wireshark packet capture, Burp Suite vulnerability analysis, and zero-day patch validation.',
    icon: '🛡️',
  },
  {
    id: 'SKL-02',
    name: 'Kubernetes & Docker',
    category: 'CLOUD',
    proficiency: 92,
    status: 'ONLINE',
    port: 'PORT: 6443',
    description: 'Multi-node cluster management, Helm charts, pod horizontal autoscaling, declarative GitOps, and isolated container sandboxes.',
    icon: '☸️',
  },
  {
    id: 'SKL-03',
    name: 'Go (Golang)',
    category: 'BACKEND',
    proficiency: 88,
    status: 'DEPLOYED',
    port: 'PORT: 8080',
    description: 'High-throughput microservices, concurrent goroutine worker pools, low-latency gRPC communications, and memory-safe binaries.',
    icon: '⚡',
  },
  {
    id: 'SKL-04',
    name: 'Python & FastAPI/Django',
    category: 'BACKEND',
    proficiency: 90,
    status: 'ONLINE',
    port: 'PORT: 5000',
    description: 'Asynchronous event processors, Celery distributed queue pipelines, automated security scripts, and data manipulation with Pandas.',
    icon: '🐍',
  },
  {
    id: 'SKL-05',
    name: 'React & Next.js 15',
    category: 'FRONTEND',
    proficiency: 96,
    status: 'ONLINE',
    port: 'PORT: 3000',
    description: 'Next.js App Router architecture, Server Actions, streaming SSR, motion transitions, and accessible UI component design.',
    icon: '⚛️',
  },
  {
    id: 'SKL-06',
    name: 'Node.js & NestJS',
    category: 'BACKEND',
    proficiency: 94,
    status: 'ONLINE',
    port: 'PORT: 4000',
    description: 'Modular enterprise backends, RESTful and GraphQL APIs, JWT/OAuth auth filters, and strict role-based access control (RBAC).',
    icon: '🟢',
  },
  {
    id: 'SKL-07',
    name: 'TypeScript & Strict Typing',
    category: 'FRONTEND',
    proficiency: 95,
    status: 'ONLINE',
    port: 'COMPILER: STRICT',
    description: 'Zero-any strict schemas, generic type utilities, runtime Zod validation, and bulletproof frontend/backend interface contracts.',
    icon: '📘',
  },
  {
    id: 'SKL-08',
    name: 'PostgreSQL & Database Hardening',
    category: 'BACKEND',
    proficiency: 91,
    status: 'DEPLOYED',
    port: 'PORT: 5432',
    description: 'Relational data modeling, connection pooling, write-ahead log replication, encryption at rest, and ACID query optimization.',
    icon: '🐘',
  },
  {
    id: 'SKL-09',
    name: 'Redis In-Memory Cache',
    category: 'BACKEND',
    proficiency: 89,
    status: 'ONLINE',
    port: 'PORT: 6379',
    description: 'Distributed mutex locks, pub/sub realtime message broadcasting, session storage, and token bucket API rate-limiting.',
    icon: '🔴',
  },
  {
    id: 'SKL-10',
    name: 'AWS & Cloud Architecture',
    category: 'CLOUD',
    proficiency: 87,
    status: 'ONLINE',
    port: 'INFRA: VPC',
    description: 'IAM zero-trust policies, S3 presigned asset pipelines, EC2 auto-scaling groups, and CloudWatch audit metrics.',
    icon: '☁️',
  },
  {
    id: 'SKL-11',
    name: 'Penetration Testing & OWASP Mitigation',
    category: 'SEC',
    proficiency: 93,
    status: 'ACTIVE',
    port: 'AUDIT: VERIFIED',
    description: 'OWASP Top 10 defenses, cross-site scripting (XSS) prevention, SQL injection neutralization, and automated threat hunting.',
    icon: '🔐',
  },
  {
    id: 'SKL-12',
    name: 'Tailwind CSS & UI Systems',
    category: 'FRONTEND',
    proficiency: 97,
    status: 'ONLINE',
    port: 'DESIGN: SYSTEM',
    description: 'Atomic utility styling, dark mode tokens, responsive layout grids, and hardware-accelerated micro-interactions.',
    icon: '🎨',
  },
]

export function TechStackMarquee() {
  const [activeTab, setActiveTab] = useState<string>('ALL')

  const filteredModules =
    activeTab === 'ALL'
      ? modules
      : modules.filter((m) => m.category === activeTab)

  return (
    <section id="tech-stack" className="relative py-24 px-4 border-y border-[#00f0ff]/15 bg-[#05070a]/80 backdrop-blur-sm font-oxanium">
      <div className="max-w-7xl mx-auto">
        {/* Header with smooth fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 font-oxanium text-xs text-[#00f0ff] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-bold tracking-wider">[SECTION // 03] COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-oxanium text-[#e5e7eb] tracking-tight">
              TECHNICAL COMPETENCIES
            </h2>
            <p className="font-sans text-[#9ca3af] text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              A practical toolkit spanning product interfaces, backend services, cloud infrastructure, and security-minded delivery.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 font-oxanium text-xs">
            {[
              { key: 'ALL', label: 'All Disciplines' },
              { key: 'SEC', label: 'Security' },
              { key: 'CLOUD', label: 'Cloud & K8s' },
              { key: 'BACKEND', label: 'Backend' },
              { key: 'FRONTEND', label: 'Frontend' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  soundFx.playClick()
                  setActiveTab(tab.key)
                }}
                className={`px-3 py-1.5 border transition-all duration-200 rounded-[3px] ${
                  activeTab === tab.key
                    ? 'border-[#00f0ff] bg-[#00f0ff] text-[#0b1020] font-bold shadow-[0_0_16px_rgba(0,240,255,0.6)]'
                    : 'border-[#00f0ff]/20 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 bg-[#0b1020]'
                }`}
              >
                {tab.label}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredModules.map((item) => (
            <SciCard
              key={item.id}
              title={item.id}
              status={item.status}
              statusType="white"
              version="v2.4"
              code={item.port}
              enableTilt={true}
              className="p-5"
            >
              <div className="space-y-3 font-oxanium">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 bg-[#05070a] border border-[#00f0ff]/25 rounded-md">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-oxanium font-bold text-[#e5e7eb] text-sm tracking-wide group-hover:text-[#00f0ff] transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono text-[#00ffa3] font-medium">
                        DOMAIN: {item.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00f0ff]">{item.proficiency}%</span>
                </div>

                {/* Readability-first body text */}
                <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                  {item.description}
                </p>

                {/* Minimalist, Clean Neon Progress Bar */}
                <div className="pt-1">
                  <div className="w-full h-1.5 bg-[#05070a] rounded-full overflow-hidden flex border border-[#00f0ff]/20">
                    <div
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ffa3] shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                      style={{ width: `${item.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </SciCard>
          ))}
        </motion.div>

        {/* Subtle Marquee Ticker at the bottom */}
        <div className="mt-12 pt-6 border-t border-[#00f0ff]/15 overflow-hidden">
          <div className="flex gap-3 items-center animate-tech-marquee w-max">
            {[...modules, ...modules].map((tech, idx) => (
              <div
                key={`${tech.id}-${idx}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#0b1020] border border-[#00f0ff]/20 rounded-[3px] font-oxanium text-xs text-zinc-300 shrink-0 select-none hover:border-[#00f0ff] hover:text-[#00f0ff] transition-colors shadow-sm"
              >
                <span>{tech.icon}</span>
                <span className="font-medium text-[#e5e7eb]">{tech.name.split(' ')[0]}</span>
                <span className="text-[10px] text-[#00f0ff] font-mono">{tech.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
