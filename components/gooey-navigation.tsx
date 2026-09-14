'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { GooeyNav } from '@/components/ui/gooey-nav'
import { GooeyFilter } from '@/components/ui/gooey-filter'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'About', href: '#about' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
]

export function GooeyNavigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    // Intersection Observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          const index = navItems.findIndex((item) => item.href === `#${sectionId}`)
          if (index !== -1) {
            setActiveIndex(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navItems.forEach((item) => {
      const sectionId = item.href.replace('#', '')
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Scroll behavior for auto-hide/show
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <GooeyFilter />
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-4xl px-4 py-4">
          <GooeyNav
            items={navItems}
            initialActiveIndex={activeIndex}
            animationTime={600}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            timeVariance={300}
            colors={[1, 2, 3, 4]}
            onItemChange={(index) => setActiveIndex(index)}
          />
        </div>
      </nav>
    </>
  )
}

