'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface MotionContextType {
  reduceMotion: boolean
  toggleReduceMotion: () => void
  setReduceMotion: (val: boolean) => void
}

const MotionContext = createContext<MotionContextType>({
  reduceMotion: false,
  toggleReduceMotion: () => {},
  setReduceMotion: () => {},
})

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotionState] = useState<boolean>(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cyberpunk_reduce_motion')
      if (stored !== null) {
        const val = stored === 'true'
        setReduceMotionState(val)
        document.documentElement.classList.toggle('reduce-motion', val)
      } else {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (media.matches) {
          setReduceMotionState(true)
          document.documentElement.classList.add('reduce-motion')
        }
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, [])

  const setReduceMotion = (val: boolean) => {
    setReduceMotionState(val)
    try {
      localStorage.setItem('cyberpunk_reduce_motion', String(val))
    } catch {
      // Ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('reduce-motion', val)
    }
  }

  const toggleReduceMotion = () => {
    setReduceMotion(!reduceMotion)
  }

  return (
    <MotionContext.Provider value={{ reduceMotion, toggleReduceMotion, setReduceMotion }}>
      {children}
    </MotionContext.Provider>
  )
}

export function useMotionPreference() {
  return useContext(MotionContext)
}
