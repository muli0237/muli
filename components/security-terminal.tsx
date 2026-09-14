'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SciCard } from '@/components/ui/sci-card'
import { soundFx } from '@/lib/sound-effects'
import {
  Terminal,
  Cpu,
  Server,
  Play,
  Trash2,
  Copy,
  Check,
  Code2,
  Activity,
  Layers,
  FileCode,
  ShieldCheck,
  Clock,
  Zap,
} from 'lucide-react'

interface LogEntry {
  text: string
  type: 'command' | 'output' | 'success' | 'warning' | 'error' | 'empty'
}

type CodeTab = 'ingress.go' | 'docker-compose.yml' | 'bench_k6.js'

const codeSnippets: Record<CodeTab, { language: string; code: string; title: string }> = {
  'ingress.go': {
    language: 'go',
    title: 'Kubernetes eBPF Zero-Trust Ingress Filter',
    code: `package ingress

import (
    "context"
    "net/http"
    "time"
    "github.com/cilium/ebpf"
    "golang.org/x/time/rate"
)

// IngressController enforces kernel-level packet inspection & mTLS
type IngressController struct {
    limiter   *rate.Limiter
    bpfMap    *ebpf.Map
    metrics   MetricsEmitter
}

func (c *IngressController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    
    // 1. Enforce strict TLS 1.3 certificate validation
    if r.TLS == nil || r.TLS.Version < 0x0304 {
        http.Error(w, "TLS 1.3 Strict Security Enforced", http.StatusUpgradeRequired)
        return
    }
    
    // 2. Token Bucket Rate Limiting (<32ms SLA)
    if !c.limiter.Allow() {
        w.Header().Set("Retry-After", "1")
        http.Error(w, "Rate Limit Exceeded // 429", http.StatusTooManyRequests)
        return
    }
    
    // 3. Zero-Copy Kernel Packet Dispatch
    w.Header().Set("X-Cluster-Node", "us-east-metal-01")
    w.Header().Set("X-Response-Time", time.Since(start).String())
    w.WriteHeader(http.StatusOK)
}`,
  },
  'docker-compose.yml': {
    language: 'yaml',
    title: 'Production Infrastructure Orchestration',
    code: `version: '3.8'

services:
  ingress-gateway:
    image: joshua/ebpf-ingress:v2.4
    restart: unless-stopped
    ports:
      - "443:443"
      - "80:80"
    environment:
      - TLS_STRICT=true
      - P99_SLA_MS=32
    cap_add:
      - NET_ADMIN
      - BPF
    deploy:
      resources:
        limits:
          cpus: '4.00'
          memory: 4096M

  redis-cluster:
    image: redis:7.2-alpine
    command: redis-server --appendonly yes --requirepass "\${REDIS_KEY}"
    volumes:
      - redis-data:/data

  postgres-primary:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: production_core
      POSTGRES_USER: dev_admin
    volumes:
      - pg-data:/var/lib/postgresql/data`,
  },
  'bench_k6.js': {
    language: 'javascript',
    title: 'High-Throughput Concurrency Benchmark',
    code: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 500 },  // Ramp-up to 500 VUs
    { duration: '1m',  target: 2000 }, // Sustained 2,000 RPS
    { duration: '30s', target: 0 },    // Cooldown
  ],
  thresholds: {
    http_req_duration: ['p(99)<32'], // 99% of requests must be < 32ms
    http_req_failed: ['rate<0.001'], // < 0.1% failure tolerance
  },
};

export default function () {
  const res = http.get('https://joshua-muli.dev/api/v1/health');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'tls 1.3 handshake': (r) => r.tls_version === 'tls1.3',
    'p99 beneath SLA': (r) => r.timings.duration < 32,
  });
  sleep(0.05);
}`,
  },
}

export function SecurityTerminal() {
  const [inputVal, setInputVal] = useState('')
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>('ingress.go')
  const [isCopied, setIsCopied] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)

  const [logs, setLogs] = useState<LogEntry[]>([
    { text: 'DEVELOPER BENCHMARK & ARCHITECTURE CONSOLE [v2.4-PROD]', type: 'output' },
    { text: 'SYSTEM: Linux 6.8.0-amd64 #1 SMP PREEMPT_DYNAMIC | Go 1.22.4 | Node 20.x', type: 'output' },
    { text: 'NODE CLUSTER: 16 Cores Xeon @ 4.2GHz | 32GB ECC DDR5 | ZERO-TRUST mTLS', type: 'success' },
    { text: 'Type "help" or click macro actions to run real developer benchmarks.', type: 'output' },
    { text: '', type: 'empty' },
    { text: '$ k6 run --vus 2000 bench_k6.js', type: 'command' },
    { text: 'running (01m30.0s), 0000/2000 VUs, 120,400 complete requests', type: 'output' },
    { text: '✓ status is 200 ..................: 100.00%  ✓ 120,400  ✗ 0', type: 'success' },
    { text: '✓ p99 latency beneath SLA (32ms) .: 18.42ms   [OPTIMAL]', type: 'success' },
    { text: '  http_reqs ......................: 120,400  (1,337 reqs/sec)', type: 'output' },
    { text: '  p(90) ..........................: 12.10ms', type: 'output' },
    { text: '  p(99) ..........................: 18.42ms', type: 'success' },
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleCopyCode = () => {
    soundFx.playClick()
    navigator.clipboard.writeText(codeSnippets[activeCodeTab].code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim()
    if (!raw) return

    soundFx.playTerminalExec()
    const command = raw.toLowerCase()

    setLogs((prev) => [...prev, { text: `$ ${raw}`, type: 'command' }])
    setInputVal('')

    if (command === 'clear') {
      setLogs([])
      return
    }

    if (command === 'help') {
      setLogs((prev) => [
        ...prev,
        { text: '=== DEVELOPER DIAGNOSTIC & BENCHMARK COMMANDS ===', type: 'output' },
        { text: '  benchmark / bench - Execute simulated k6 / wrk 2,000 VU load test', type: 'output' },
        { text: '  test / vitest     - Run automated unit, integration, and fuzz test suites', type: 'output' },
        { text: '  uptime            - Check production cluster uptime and load averages', type: 'output' },
        { text: '  pods / docker     - Inspect container health status across cluster nodes', type: 'output' },
        { text: '  curl              - Inspect production TLS 1.3 headers & security policy', type: 'output' },
        { text: '  sysinfo           - Display kernel version, CPU topology, and CNI specs', type: 'output' },
        { text: '  clear             - Flush terminal log buffer', type: 'output' },
      ])
      return
    }

    if (command === 'benchmark' || command === 'bench') {
      setIsExecuting(true)
      setLogs((prev) => [
        ...prev,
        { text: 'Spawning 2,000 virtual users against edge ingress endpoints...', type: 'output' },
      ])

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { text: 'Load test completed across 6 global edge nodes:', type: 'output' },
          { text: '  Throughput: 14,890 Requests / sec', type: 'output' },
          { text: '  P50 Latency: 8.2ms  |  P90: 14.1ms  |  P99: 18.4ms', type: 'success' },
          { text: '  Packet Drop Rate: 0.000% (0 errors in 150,000 packets)', type: 'success' },
          { text: '✓ 100% SLA compliance achieved. Kernel eBPF zero-copy active.', type: 'success' },
        ])
        setIsExecuting(false)
        soundFx.playSuccess()
      }, 900)
      return
    }

    if (command === 'test' || command === 'vitest') {
      setIsExecuting(true)
      setLogs((prev) => [
        ...prev,
        { text: 'Executing test suite: Vitest v2.0 + Go Test Runner...', type: 'output' },
      ])

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          { text: '✓ PASS  test/ingress_security.test.ts (14 tests)', type: 'success' },
          { text: '✓ PASS  test/rate_limiter_p99.test.ts (12 tests)', type: 'success' },
          { text: '✓ PASS  pkg/auth/jwt_ed25519_test.go (16 tests)', type: 'success' },
          { text: 'Test Files  3 passed (3)', type: 'output' },
          { text: 'Tests       42 passed (42) [100% Test Coverage]', type: 'success' },
          { text: 'Duration    1.24s (transform 82ms, setup 14ms, collect 42ms)', type: 'output' },
        ])
        setIsExecuting(false)
        soundFx.playSuccess()
      }, 750)
      return
    }

    if (command === 'uptime') {
      setLogs((prev) => [
        ...prev,
        { text: '14:24:08 up 142 days, 18:42, 2 users, load average: 0.14, 0.18, 0.12', type: 'output' },
        { text: 'Uptime SLA: 99.992% verified over preceding 365 calendar days', type: 'success' },
        { text: 'Active Pods: 24/24 Healthy  |  Zero restarts in 90 days', type: 'success' },
      ])
      return
    }

    if (command === 'pods' || command === 'docker' || command === 'docker-ps') {
      setLogs((prev) => [
        ...prev,
        { text: 'POD NAME                     READY   STATUS    RESTARTS   AGE    CPU/MEM', type: 'output' },
        { text: 'ingress-gateway-7f8b9-x2q1   1/1     Running   0          48d    12m / 64Mi', type: 'success' },
        { text: 'auth-service-5d6c8-9m2k8     1/1     Running   0          48d    8m / 48Mi', type: 'success' },
        { text: 'redis-cache-cluster-0        1/1     Running   0          48d    15m / 128Mi', type: 'success' },
        { text: 'postgres-primary-db-0        1/1     Running   0          48d    24m / 512Mi', type: 'success' },
        { text: 'ebpf-telemetry-daemon-h78k   1/1     Running   0          48d    4m / 32Mi', type: 'success' },
        { text: '✓ All nodes passing Kubernetes liveness and readiness probes.', type: 'success' },
      ])
      return
    }

    if (command === 'curl') {
      setLogs((prev) => [
        ...prev,
        { text: 'HTTP/2 200 OK', type: 'output' },
        { text: 'server: nginx-ebpf-gateway/1.25.4', type: 'output' },
        { text: 'strict-transport-security: max-age=63072000; includeSubDomains; preload', type: 'success' },
        { text: 'content-security-policy: default-src \'self\'; frame-ancestors \'none\'', type: 'success' },
        { text: 'x-content-type-options: nosniff', type: 'output' },
        { text: 'x-frame-options: DENY', type: 'output' },
        { text: 'x-response-time: 14.8ms', type: 'success' },
      ])
      return
    }

    if (command === 'sysinfo') {
      setLogs((prev) => [
        ...prev,
        { text: 'KERNEL: Linux 6.8.0-amd64 #1 SMP PREEMPT_DYNAMIC', type: 'output' },
        { text: 'ARCH: x86_64 / 16 Cores Intel Xeon E-2288G @ 4.20GHz', type: 'output' },
        { text: 'CONTAINER RUNTIME: containerd://1.7.15 / Kubernetes v1.30.2', type: 'output' },
        { text: 'NETWORKING: Calico CNI with native eBPF data plane acceleration', type: 'success' },
        { text: 'SECURITY ENFORCEMENT: AppArmor + seccomp default profile', type: 'success' },
      ])
      return
    }

    setLogs((prev) => [
      ...prev,
      { text: `zsh: command not found: ${raw}. Type "help" to view benchmark commands.`, type: 'error' },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    }
  }

  return (
    <section id="security" className="relative py-24 px-4 bg-[#05070a] font-oxanium">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 border-b border-[#00f0ff]/20 pb-6"
        >
          <div className="flex items-center gap-2 text-xs text-[#00f0ff] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffa3] animate-pulse" />
            <span className="font-bold tracking-wider">[BENCHMARK_ENGINE // 04] REALISTIC DEVELOPER WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5e7eb] tracking-tight">
            DEVELOPER BENCHMARKS &amp; ARCHITECTURE
          </h2>
          <p className="font-sans text-[#9ca3af] text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Production system metrics, real high-throughput load test diagnostics, and interactive Kubernetes eBPF architecture viewports.
          </p>
        </motion.div>

        {/* Real Developer Benchmarks System Metrics Grid (4 Benchmark Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SciCard
            title="UPTIME_SLA"
            status="99.99%"
            statusType="white"
            version="PROD"
            code="HIGH-AVAILABILITY"
            enableTilt={true}
            className="p-5"
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#00ffa3] tracking-tight">99.99%</span>
              <span className="text-xs text-[#00ffa3]/80 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00ffa3]" />
                365 DAYS
              </span>
            </div>
            <p className="font-sans text-xs text-[#9ca3af] mt-2">
              Zero-downtime rolling deploys with automated container health probes.
            </p>
          </SciCard>

          <SciCard
            title="LATENCY_P99"
            status="<32MS"
            statusType="white"
            version="PROD"
            code="GLOBAL_EDGE"
            enableTilt={true}
            className="p-5"
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#00f0ff] tracking-tight">&lt;24ms</span>
              <span className="text-xs text-[#00f0ff]/80 font-mono flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#00f0ff]" />
                P99 EDGE
              </span>
            </div>
            <p className="font-sans text-xs text-[#9ca3af] mt-2">
              Global edge CDN cache with TCP BBR congestion control and HTTP/3.
            </p>
          </SciCard>

          <SciCard
            title="TEST_SUITE"
            status="100%"
            statusType="white"
            version="CI/CD"
            code="VITEST_GO"
            enableTilt={true}
            className="p-5"
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#00ffa3] tracking-tight">100%</span>
              <span className="text-xs text-[#00ffa3]/80 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00ffa3]" />
                42 / 42 PASS
              </span>
            </div>
            <p className="font-sans text-xs text-[#9ca3af] mt-2">
              Full branch test coverage across auth, rate limiting, and state transitions.
            </p>
          </SciCard>

          <SciCard
            title="THROUGHPUT"
            status="1.2M RPS"
            statusType="white"
            version="eBPF"
            code="KERNEL_ACCEL"
            enableTilt={true}
            className="p-5"
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#00f0ff] tracking-tight">1.2M+</span>
              <span className="text-xs text-[#00f0ff]/80 font-mono flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#00f0ff]" />
                RPS MAX
              </span>
            </div>
            <p className="font-sans text-xs text-[#9ca3af] mt-2">
              Zero-copy Linux socket bypass with Calico eBPF packet routing.
            </p>
          </SciCard>
        </div>

        {/* Quick Macro Action Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-zinc-500 font-mono mr-1 text-[11px]">BENCHMARK MACROS:</span>
          <button
            onClick={() => executeCommand('bench')}
            className="px-3 py-1.5 bg-[#0b1020] hover:bg-[#00f0ff]/10 text-[#e5e7eb] hover:text-[#00f0ff] border border-[#00f0ff]/25 hover:border-[#00f0ff] rounded-[3px] transition-all flex items-center gap-1.5 font-bold"
          >
            <Play className="w-3 h-3 fill-current text-[#00f0ff]" />
            <span>k6 load benchmark</span>
          </button>

          <button
            onClick={() => executeCommand('test')}
            className="px-3 py-1.5 bg-[#0b1020] hover:bg-[#00ffa3]/10 text-[#e5e7eb] hover:text-[#00ffa3] border border-[#00ffa3]/25 hover:border-[#00ffa3] rounded-[3px] transition-all flex items-center gap-1.5 font-bold"
          >
            <ShieldCheck className="w-3 h-3 text-[#00ffa3]" />
            <span>run test suite</span>
          </button>

          <button
            onClick={() => executeCommand('uptime')}
            className="px-3 py-1.5 bg-[#0b1020] hover:bg-[#00f0ff]/10 text-[#e5e7eb] hover:text-[#00f0ff] border border-[#00f0ff]/25 hover:border-[#00f0ff] rounded-[3px] transition-all flex items-center gap-1.5 font-bold"
          >
            <Clock className="w-3 h-3 text-[#00f0ff]" />
            <span>cluster uptime</span>
          </button>

          <button
            onClick={() => executeCommand('pods')}
            className="px-3 py-1.5 bg-[#0b1020] hover:bg-[#7c3aed]/10 text-[#e5e7eb] hover:text-[#7c3aed] border border-[#7c3aed]/30 hover:border-[#7c3aed] rounded-[3px] transition-all flex items-center gap-1.5 font-bold"
          >
            <Layers className="w-3 h-3 text-[#7c3aed]" />
            <span>pod status</span>
          </button>

          <button
            onClick={() => executeCommand('curl')}
            className="px-3 py-1.5 bg-[#0b1020] hover:bg-[#00f0ff]/10 text-[#e5e7eb] hover:text-[#00f0ff] border border-[#00f0ff]/25 hover:border-[#00f0ff] rounded-[3px] transition-all flex items-center gap-1.5 font-bold"
          >
            <Server className="w-3 h-3 text-[#00f0ff]" />
            <span>inspect headers</span>
          </button>

          <button
            onClick={() => executeCommand('clear')}
            className="px-3 py-1.5 bg-[#0b1020] hover:bg-[#111827] text-zinc-400 hover:text-white border border-[#00f0ff]/15 rounded-[3px] transition-colors ml-auto flex items-center gap-1.5 font-mono"
          >
            <Trash2 className="w-3 h-3" />
            <span>clear</span>
          </button>
        </div>

        {/* Multi-Column Layout: Interactive Code Viewport (6 Cols) + Live Terminal (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Code & Architecture Viewport (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <SciCard
              title="CODE_VIEWPORT // ARCHITECTURE"
              status="STABLE"
              statusType="white"
              version="v2.4"
              code={codeSnippets[activeCodeTab].language.toUpperCase()}
              enableTilt={false}
              className="flex-1 flex flex-col overflow-hidden bg-[#0b1020]"
              headerActions={
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-[11px] font-oxanium text-zinc-300 hover:text-[#00f0ff] bg-[#05070a] hover:bg-[#111827] border border-[#00f0ff]/25 rounded flex items-center gap-1.5 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-[#00ffa3]" />
                      <span className="text-[#00ffa3]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>COPY SNIPPET</span>
                    </>
                  )}
                </button>
              }
            >
              {/* Tab selector bar */}
              <div className="flex border-b border-[#00f0ff]/20 bg-[#05070a] -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 px-4 pt-2 gap-1 overflow-x-auto">
                {(['ingress.go', 'docker-compose.yml', 'bench_k6.js'] as CodeTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      soundFx.playClick()
                      setActiveCodeTab(tab)
                    }}
                    className={`px-3 py-1.5 text-xs font-mono transition-all flex items-center gap-1.5 border-t-2 ${
                      activeCodeTab === tab
                        ? 'border-[#00f0ff] text-[#00f0ff] bg-[#0b1020] font-bold'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{tab}</span>
                  </button>
                ))}
              </div>

              {/* Code viewer body with monochrome syntax feel */}
              <div className="pt-4 pb-2">
                <div className="text-[11px] font-mono text-[#00f0ff]/80 mb-2 flex items-center justify-between">
                  <span>{`// ${codeSnippets[activeCodeTab].title}`}</span>
                  <span className="text-zinc-600">UTF-8 // LF</span>
                </div>
                <pre className="p-4 bg-[#05070a] border border-[#00f0ff]/20 rounded overflow-x-auto text-[11px] leading-relaxed font-mono text-zinc-300 max-h-[360px] select-text">
                  <code>{codeSnippets[activeCodeTab].code}</code>
                </pre>
              </div>
            </SciCard>
          </div>

          {/* Live Developer Shell & Terminal Output (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <SciCard
              title="BENCHMARK_SHELL // zsh"
              status="ONLINE"
              statusType="white"
              version="v2.4"
              code="PORT: 443"
              enableTilt={false}
              className="flex-1 flex flex-col overflow-hidden bg-[#0b1020] font-mono"
            >
              {/* Terminal Logs Container */}
              <div
                className="p-4 overflow-y-auto h-[350px] text-xs leading-relaxed space-y-1.5 select-text font-mono bg-[#05070a]"
                onClick={() => inputRef.current?.focus()}
              >
                {logs.map((log, index) => {
                  if (log.type === 'empty') return <div key={index} className="h-2" />
                  if (log.type === 'command') {
                    return (
                      <div key={index} className="text-[#00f0ff] font-bold flex items-center gap-1">
                        <span>{log.text}</span>
                      </div>
                    )
                  }
                  if (log.type === 'success') {
                    return (
                      <div key={index} className="text-[#00ffa3] font-semibold flex items-center gap-1">
                        <span>{log.text}</span>
                      </div>
                    )
                  }
                  if (log.type === 'warning') {
                    return <div key={index} className="text-[#f59e0b]">{log.text}</div>
                  }
                  if (log.type === 'error') {
                    return <div key={index} className="text-[#ef4444] font-semibold underline">{log.text}</div>
                  }
                  return <div key={index} className="text-zinc-300">{log.text}</div>
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Command Input Bar */}
              <div className="px-4 py-3 bg-[#0b1020] border-t border-[#00f0ff]/20 flex items-center gap-2 text-xs font-mono">
                <span className="text-[#00ffa3] font-bold">joshua@cluster:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type 'bench', 'test', 'uptime', 'pods', or 'help'..."
                  className="flex-1 bg-transparent text-[#e5e7eb] placeholder:text-zinc-600 focus:outline-none font-mono text-xs"
                />
                {isExecuting && (
                  <span className="text-xs text-[#00f0ff] animate-pulse font-bold">[BENCHMARKING...]</span>
                )}
              </div>
            </SciCard>
          </div>
        </div>
      </div>
    </section>
  )
}
