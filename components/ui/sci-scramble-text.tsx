'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'

interface SciScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  revealSpeed?: number
  characters?: string
  triggerOnView?: boolean
  triggerOnHover?: boolean
  delay?: number
}

export function SciScrambleText({
  text,
  className = '',
  scrambleSpeed = 30,
  revealSpeed = 40,
  characters = '0123456789ABCDEF_#@$*[]<>!~-%',
  triggerOnView = true,
  triggerOnHover = true,
  delay = 0,
}: SciScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text)
  const [isScrambling, setIsScrambling] = useState<boolean>(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasTriggeredRef = useRef<boolean>(false)

  const startScramble = useCallback(() => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const charList = characters.split('')
    const totalChars = text.length

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return charList[Math.floor(Math.random() * charList.length)]
          })
          .join('')
      })

      if (iteration >= totalChars) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setIsScrambling(false)
        setDisplayText(text)
      }

      iteration += 1 / (revealSpeed / scrambleSpeed)
    }, scrambleSpeed)
  }, [characters, isScrambling, revealSpeed, scrambleSpeed, text])

  useEffect(() => {
    if (!triggerOnView) {
      timeoutRef.current = setTimeout(() => {
        startScramble()
      }, delay)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true
          timeoutRef.current = setTimeout(() => {
            startScramble()
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [delay, startScramble, triggerOnView])

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => {
        if (triggerOnHover && !isScrambling) {
          startScramble()
        }
      }}
      className={`font-mono inline-block select-none cursor-default ${className} ${
        isScrambling ? 'text-[#00f0ff]' : ''
      }`}
    >
      {displayText}
    </span>
  )
}
