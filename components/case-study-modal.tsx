'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Copy, Check, Terminal, Cpu, ShieldCheck, Zap, Server, ExternalLink } from 'lucide-react'
import { soundFx } from '@/lib/sound-effects'

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
}

const SAMPLE_CODE = `// Kubernetes eBPF Ingress Filter & Zero-Trust Kernel Hook
package ingress

import (
	"context"
	"crypto/tls"
	"net/http"
	"time"
)

type IngressPipeline struct {
	MaxRPS          int
	RateLimiter     *TokenBucket
	TLSConfig       *tls.Config
	SecurityAuditLog chan SecurityEvent
}

func (p *IngressPipeline) HandleRequest(ctx context.Context, req *http.Request) (*http.Response, error) {
	// Zero-Trust verification & Mutual TLS Handshake
	if !p.validatePeerCertificate(req.TLS) {
		p.emitSecurityAlert(req, "UNVERIFIED_TLS_CLIENT_CERT")
		return nil, ErrUnauthorizedTLS
	}

	// Microsecond eBPF rate-limiting enforcement
	if err := p.RateLimiter.Take(req.RemoteAddr); err != nil {
		return &http.Response{StatusCode: http.StatusTooManyRequests}, nil
	}

	// Forward packet to distributed container cluster
	start := time.Now()
	resp, err := p.dispatchCluster(ctx, req)
	p.recordLatencyMetrics(time.Since(start))
	return resp, err
}`

export function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    soundFx.playClick()
    navigator.clipboard.writeText(SAMPLE_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#0b1020] border border-[#00f0ff]/40 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.3)] overflow-hidden font-oxanium text-white z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Window Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#00f0ff]/20 bg-[#05070a] text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ffa3] animate-pulse" />
              <span className="font-bold tracking-wider text-[#00f0ff]">
                [CASE_STUDY // ARCHITECTURAL_ANALYSIS]
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/40">
                PROD_VERIFIED
              </span>
            </div>
            <button
              onClick={() => {
                soundFx.playClick()
                onClose()
              }}
              className="p-1 rounded hover:bg-[#111827] text-zinc-400 hover:text-[#00f0ff] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Header: Hero title in bold Oxanium with meta info */}
            <div className="space-y-4 border-b border-[#00f0ff]/20 pb-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#05070a] border border-[#00f0ff]/30 text-xs font-mono text-[#00f0ff]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00ffa3]" />
                <span>CASE STUDY: DISTRIBUTED INGRESS CONTROLLER</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-oxanium tracking-tight text-[#e5e7eb]">
                High-Performance Zero-Trust eBPF Ingress Gateway
              </h2>

              {/* Meta information: Role, Timeline, System Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-[#05070a] border border-[#00f0ff]/20 rounded">
                  <span className="text-[10px] text-zinc-400 block uppercase">Role</span>
                  <span className="text-sm font-bold text-[#e5e7eb]">Lead Systems Architect &amp; Researcher</span>
                </div>
                <div className="p-3 bg-[#05070a] border border-[#00f0ff]/20 rounded">
                  <span className="text-[10px] text-zinc-400 block uppercase">Timeline</span>
                  <span className="text-sm font-bold text-[#e5e7eb]">2023 &ndash; 2024 (12 Months)</span>
                </div>
                <div className="p-3 bg-[#05070a] border border-[#00f0ff]/20 rounded">
                  <span className="text-[10px] text-zinc-400 block uppercase">System Architecture</span>
                  <span className="text-sm font-bold text-[#00f0ff]">eBPF + Go + Kubernetes Zero-Trust</span>
                </div>
              </div>

              <p className="font-sans text-[#9ca3af] text-sm sm:text-base leading-relaxed">
                Architected and deployed an edge ingress gateway capable of handling mission-critical traffic spikes with zero-trust token authentication and kernel-level network packet filtration. The architecture decoupled ingress routing from user-space overhead, achieving sub-millisecond edge response times under heavy volumetric DDoS simulation.
              </p>
            </div>

            {/* System Metrics Grid: High-contrast benchmark metric cards using large neon typography */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wider text-[#00f0ff]">
                <Zap className="w-4 h-4 text-[#00ffa3]" />
                <span>SYSTEM PERFORMANCE BENCHMARKS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-[#05070a] border border-[#00f0ff]/25 rounded hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#00f0ff] block mb-1">
                    +98%
                  </span>
                  <span className="text-xs font-semibold text-[#e5e7eb] block">FPS / Render Efficiency</span>
                  <span className="text-[10px] text-[#00ffa3] font-mono">VS USER-SPACE PROXY</span>
                </div>

                <div className="p-4 bg-[#05070a] border border-[#00f0ff]/25 rounded hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#00f0ff] block mb-1">
                    &lt;50ms
                  </span>
                  <span className="text-xs font-semibold text-[#e5e7eb] block">P99 Edge Latency</span>
                  <span className="text-[10px] text-[#00ffa3] font-mono">GLOBAL CLOUD ROUTING</span>
                </div>

                <div className="p-4 bg-[#05070a] border border-[#00f0ff]/25 rounded hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#00f0ff] block mb-1">
                    99.99%
                  </span>
                  <span className="text-xs font-semibold text-[#e5e7eb] block">High-Availability SLA</span>
                  <span className="text-[10px] text-[#00ffa3] font-mono">ZERO UNPLANNED DOWNTIME</span>
                </div>

                <div className="p-4 bg-[#05070a] border border-[#00f0ff]/25 rounded hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#00f0ff] block mb-1">
                    14.2K
                  </span>
                  <span className="text-xs font-semibold text-[#e5e7eb] block">Req/Sec / Node</span>
                  <span className="text-[10px] text-[#00ffa3] font-mono">STRESS TEST BENCHMARK</span>
                </div>
              </div>
            </div>

            {/* Architecture Pipeline Visualizer */}
            <div className="p-4 bg-[#05070a] border border-[#00f0ff]/20 rounded">
              <div className="text-xs font-bold text-[#00f0ff] mb-2 uppercase tracking-wider">
                Topology Execution Flow
              </div>
              <div className="font-mono text-xs text-[#e5e7eb] flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-[#111827] border border-[#00f0ff]/30 rounded text-[#00f0ff] font-bold">CLIENT TRAFFIC</span>
                <span className="text-[#00ffa3] font-bold">&rarr;</span>
                <span className="px-2.5 py-1 bg-[#111827] border border-[#00f0ff]/30 rounded text-[#00f0ff] font-bold">eBPF KERNEL FILTER</span>
                <span className="text-[#00ffa3] font-bold">&rarr;</span>
                <span className="px-2.5 py-1 bg-[#111827] border border-[#00f0ff]/30 rounded text-[#00f0ff] font-bold">MUTUAL TLS VALIDATION</span>
                <span className="text-[#00ffa3] font-bold">&rarr;</span>
                <span className="px-2.5 py-1 bg-[#111827] border border-[#00f0ff]/30 rounded text-[#00f0ff] font-bold">K8S MICROSERVICES</span>
              </div>
            </div>

            {/* Interactive Code Viewport: Monospaced dark code block with syntax styles & glowing cyan copy button */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e5e7eb]">
                  <Terminal className="w-4 h-4 text-[#00f0ff]" />
                  <span>INTERACTIVE CODE VIEWPORT: ingress_core.go</span>
                </div>

                {/* Cyberpunk Cyan Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] font-oxanium text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_16px_rgba(0,240,255,0.6)]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#0b1020]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#0b1020]" />
                      <span>COPY SNIPPET</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Panel */}
              <div className="relative rounded-md bg-[#05070a] border border-[#00f0ff]/25 p-4 font-mono text-xs text-[#00ffa3] overflow-x-auto shadow-inner">
                <pre className="leading-relaxed">
                  <code>{SAMPLE_CODE}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#00f0ff]/20 bg-[#05070a] flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">MUSEFLOW ARCHITECTURAL ARCHIVE // DOC_ID #0294</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-[#111827] hover:bg-[#1f293d] text-[#e5e7eb] border border-[#00f0ff]/30 hover:border-[#00f0ff] font-bold transition-all"
            >
              DISMISS
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
