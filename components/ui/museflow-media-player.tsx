'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, Radio } from 'lucide-react'
import { soundFx } from '@/lib/sound-effects'

interface Track {
  id: string
  title: string
  artist: string
  durationSec: number
  genre: string
  bpm: number
}

const WAVEFORM_BARS = Array.from({ length: 36 }, (_, i) => {
  const defaultHeight = Math.round(15 + Math.sin(i * 0.4) * 20 + (i % 3) * 8)
  const low = Math.round(Math.max(10, defaultHeight * 0.4))
  const high = Math.round(Math.min(95, defaultHeight * 1.6 + 10))
  const mid = Math.round(Math.max(15, defaultHeight * 0.7))
  const paused = Math.round(defaultHeight * 0.5)
  return {
    defaultHeight,
    low,
    high,
    mid,
    paused,
    duration: Number((0.35 + (i % 5) * 0.1).toFixed(2)),
  }
})

const PLAYLIST: Track[] = [
  { id: '1', title: 'OBSIDIAN_VOID // FREQ_01', artist: 'MUSEFLOW SYNTH', durationSec: 220, genre: 'DARK_AMBIENT', bpm: 124 },
  { id: '2', title: 'CYBERNETIC_PULSE // KERNEL', artist: 'AUDIO_EXP_v2', durationSec: 185, genre: 'MONOCHROME_TECH', bpm: 130 },
  { id: '3', title: 'SPECTRAL_WIRE // ZERO_TRUST', artist: 'SEC_NETWORKS', durationSec: 240, genre: 'NEO_IDM', bpm: 118 },
]

export function MuseflowMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(84) // 01:24 default as requested
  const [isMuted, setIsMuted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const currentTrack = PLAYLIST[currentTrackIndex]

  // Time format helper (01:24)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Synthesize ambient drone using Web Audio API
  const startSynth = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioContextRef.current = new AudioCtx()
      }
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      if (!oscillatorRef.current) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        
        // Deep warm ambient chord tone
        const baseFreq = currentTrackIndex === 0 ? 110 : currentTrackIndex === 1 ? 146.83 : 98.0
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)

        // Lowpass filter for smooth deep aesthetic
        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(320, ctx.currentTime)

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(isMuted ? 0.0001 : 0.04, ctx.currentTime + 0.5)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscillatorRef.current = osc
        gainNodeRef.current = gain
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  const stopSynth = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.3)
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop()
            oscillatorRef.current.disconnect()
            oscillatorRef.current = null
          }
        }, 350)
      } catch {
        // Fallback
        if (oscillatorRef.current) {
          oscillatorRef.current.stop()
          oscillatorRef.current = null
        }
      }
    }
  }

  const togglePlay = () => {
    soundFx.playClick()
    if (isPlaying) {
      setIsPlaying(false)
      stopSynth()
    } else {
      setIsPlaying(true)
      startSynth()
    }
  }

  const nextTrack = () => {
    soundFx.playClick()
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length
    setCurrentTrackIndex(nextIdx)
    setCurrentTime(0)
    if (isPlaying) {
      stopSynth()
      setTimeout(startSynth, 100)
    }
  }

  const prevTrack = () => {
    soundFx.playClick()
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    setCurrentTrackIndex(prevIdx)
    setCurrentTime(0)
    if (isPlaying) {
      stopSynth()
      setTimeout(startSynth, 100)
    }
  }

  const toggleMute = () => {
    soundFx.playClick()
    const nextMute = !isMuted
    setIsMuted(nextMute)
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMute ? 0.0001 : 0.04, audioContextRef.current.currentTime)
    }
  }

  // Keep latest nextTrack in a ref to avoid recreating the timer
  const nextTrackRef = useRef(nextTrack)
  nextTrackRef.current = nextTrack

  // Timer simulation when playing
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSec) {
            nextTrackRef.current()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack.durationSec])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch {}
      }
    }
  }, [])

  return (
    <div className="relative rounded-lg bg-[rgba(11,16,32,0.8)] backdrop-blur-xl border border-[#00f0ff]/30 p-5 font-oxanium text-white shadow-[0_4px_24px_rgba(0,0,0,0.8)] hover:border-[#00f0ff]/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] transition-all duration-300">
      {/* Top Media Header */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-3 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#00ffa3] animate-pulse' : 'text-zinc-500'}`} />
          <span className="font-bold tracking-wider text-[#00f0ff]">[MUSEFLOW // AUDIO_STREAM]</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/40">
            {currentTrack.genre}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
          <span className="text-[#00f0ff]">{currentTrack.bpm} BPM</span>
          <span>|</span>
          <span className="text-[#00ffa3]">320 KBPS</span>
        </div>
      </div>

      {/* Track Title & Meta */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10px] text-[#00f0ff]/70 tracking-wider">NOW PLAYING</div>
          <h4 className="text-base font-bold text-[#e5e7eb] tracking-wide">{currentTrack.title}</h4>
          <p className="text-xs text-[#9ca3af] font-sans">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#05070a] border border-[#00f0ff]/25 text-xs">
          <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-[#00f0ff]' : 'text-zinc-500'}`} />
          <span className="text-[10px] tracking-wider text-[#00ffa3]">
            {isPlaying ? 'STREAMING' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Real-time Animated Waveform Bars */}
      <div className="my-4 bg-[#05070a] rounded p-3 border border-[#00f0ff]/20 flex items-center justify-center gap-1 h-16 overflow-hidden">
        {WAVEFORM_BARS.map((bar, i) => (
          <motion.div
            key={i}
            className={`w-1 rounded-full transition-all ${
              isPlaying
                ? i % 2 === 0
                  ? 'bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                  : 'bg-[#7c3aed] shadow-[0_0_8px_rgba(124,58,237,0.8)]'
                : 'bg-zinc-800'
            }`}
            style={{
              height: `${bar.defaultHeight}%`,
            }}
            animate={
              isPlaying
                ? {
                    height: [`${bar.low}%`, `${bar.high}%`, `${bar.mid}%`],
                  }
                : { height: `${bar.paused}%` }
            }
            transition={
              isPlaying
                ? {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: bar.duration,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      {/* Timecodes & Scrub Progress Bar */}
      <div className="space-y-1.5 mb-5">
        <div className="w-full h-1.5 bg-[#05070a] rounded-full overflow-hidden flex border border-[#00f0ff]/20 cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#00ffa3] transition-all duration-300 relative shadow-[0_0_10px_rgba(0,240,255,0.6)]"
            style={{ width: `${(currentTime / currentTrack.durationSec) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-zinc-400">
          <span className="text-[#00f0ff] font-bold">{formatTime(currentTime)}</span>
          <span className="text-zinc-600">/</span>
          <span>{formatTime(currentTrack.durationSec)}</span>
        </div>
      </div>

      {/* Player Action Buttons */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            aria-label="Previous track"
            className="p-2 rounded bg-[#05070a] hover:bg-[#111827] text-zinc-300 hover:text-[#00f0ff] border border-[#00f0ff]/25 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause audio stream' : 'Play audio stream'}
            className="px-4 py-2 rounded bg-[#00f0ff] hover:bg-[#00f0ff]/90 text-[#0b1020] font-bold flex items-center gap-2 transition-all shadow-[0_0_16px_rgba(0,240,255,0.6)]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-[#0b1020]" />
                <span className="text-xs">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-[#0b1020] ml-0.5" />
                <span className="text-xs">STREAM</span>
              </>
            )}
          </button>

          <button
            onClick={nextTrack}
            aria-label="Next track"
            className="p-2 rounded bg-[#05070a] hover:bg-[#111827] text-zinc-300 hover:text-[#00f0ff] border border-[#00f0ff]/25 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="p-2 rounded bg-[#05070a] hover:bg-[#111827] text-zinc-300 hover:text-[#00ffa3] border border-[#00f0ff]/25 transition-colors flex items-center gap-1.5 text-xs font-mono"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-[#00ffa3]" />}
          <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'LIVE'}</span>
        </button>
      </div>
    </div>
  )
}
