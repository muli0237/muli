'use client'

import React, { useEffect, useState } from 'react'

interface TypewriterGreetingProps {
  words?: string[]
  prefix?: string
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseTime?: number
}

export function TypewriterGreeting({
  words = [
    "Full-Stack Architect & Security Researcher",
    "Distributed Systems & Cloud Orchestration",
    "Offensive Security & Penetration Testing",
  ],
  prefix = "> ",
  className = "",
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseTime = 2200,
}: TypewriterGreetingProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const fullText = words[currentWordIndex]

    if (!isDeleting) {
      // Typing forward
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing word, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, pauseTime)
      }
    } else {
      // Deleting backward
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1))
        }, deletingSpeed)
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return (
    <span className={`font-mono inline-flex items-center ${className}`}>
      {prefix && <span className="text-emerald-400 mr-2 select-none">{prefix}</span>}
      <span className="text-cyan-300 font-semibold">{currentText}</span>
      <span className="inline-block w-2.5 h-5 ml-1 bg-[#00f0ff] animate-pulse align-middle" />
    </span>
  )
}
