'use client'

import { useEffect, useState } from 'react'
import { SplashCursor } from '@/components/ui/splash-cursor'

interface CursorProviderProps {
  children: React.ReactNode
  enabled?: boolean
  color?: string
  size?: number
  trailLength?: number
  particleCount?: number
}

export function CursorProvider({
  children,
  enabled = true,
  color = '#00f0ff',
  size = 20,
  trailLength = 20,
  particleCount = 5,
}: CursorProviderProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if device has hover capability (desktop)
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setIsDesktop(hasHover)
    
    // Add class to body when cursor is active
    if (enabled && hasHover) {
      document.body.classList.add('splash-cursor-active')
    }
    
    return () => {
      document.body.classList.remove('splash-cursor-active')
    }
  }, [enabled])

  const shouldShowCursor = isMounted && enabled && isDesktop

  return (
    <>
      {shouldShowCursor && (
        <SplashCursor
          color={color}
          size={size}
          trailLength={trailLength}
          particleCount={particleCount}
          enabled={true}
        />
      )}
      {children}
    </>
  )
}

