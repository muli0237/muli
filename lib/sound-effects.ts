// High-tech sci-fi audio synthesizer using Web Audio API (zero external assets)
'use client'

class SciFiAudioEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (enabled) {
      this.initContext()
      this.playBeep(880, 0.04, 'sine', 0.05)
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  // Play subtle high-tech click
  public playClick() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.03)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.035)
    } catch {
      // Audio playback fails gracefully if blocked by browser policy
    }
  }

  // Play command terminal execution blip
  public playTerminalExec() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(520, now)
      osc1.frequency.setValueAtTime(1040, now + 0.03)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1200, now)
      osc2.frequency.exponentialRampToValueAtTime(400, now + 0.08)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.09)
      osc2.stop(now + 0.09)
    } catch {
      // Ignore
    }
  }

  // Play subtle scan / radar tone
  public playScan() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(2200, now)
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.12)

      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.13)
    } catch {
      // Ignore
    }
  }

  // Play access granted chirp
  public playSuccess() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const notes = [659.25, 880, 1318.51] // E5, A5, E6
      notes.forEach((freq, index) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        const start = this.ctx.currentTime + index * 0.04

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, start)

        gain.gain.setValueAtTime(0.03, start)
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.08)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(start)
        osc.stop(start + 0.09)
      })
    } catch {
      // Ignore
    }
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.04) {
    if (!this.ctx) return
    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      gain.gain.setValueAtTime(vol, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + duration + 0.01)
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SciFiAudioEngine()
