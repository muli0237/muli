'use client'

import { useState } from 'react'
import { ElectricBorder } from '@/components/ui/electric-border'
import { ProfileCard } from '@/components/ui/profile-card'
import { GooeyNav } from '@/components/ui/gooey-nav'
import { GooeyFilter } from '@/components/ui/gooey-filter'
import { StaggeredMenu } from '@/components/ui/staggered-menu'
import { CursorProvider } from '@/components/cursor-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Components', href: '#components' },
  { label: 'Demo', href: '#demo' },
]

const menuItems = [
  { label: 'Home', ariaLabel: 'Navigate to home', link: '#home' },
  { label: 'About', ariaLabel: 'Navigate to about', link: '#about' },
  { label: 'Projects', ariaLabel: 'Navigate to projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Navigate to contact', link: '#contact' },
]

const socialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
]

export default function DemoPage() {
  const [showStaggeredMenu, setShowStaggeredMenu] = useState(false)
  const [cursorEnabled, setCursorEnabled] = useState(true)

  return (
    <CursorProvider enabled={cursorEnabled} color="#7df9ff" size={24} trailLength={20} particleCount={8}>
      <GooeyFilter />
      
      {showStaggeredMenu && (
        <StaggeredMenu
          position="right"
          colors={['#6366f1', '#8b5cf6', '#ec4899']}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          logoUrl="/placeholder-logo.svg"
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          accentColor="#7df9ff"
          changeMenuColorOnOpen={true}
          isFixed={true}
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      )}

      <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#7df9ff] via-[#a78bfa] to-[#ec4899] bg-clip-text text-transparent">
              Component Showcase
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Interactive UI Components with Advanced Animations
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-sm text-muted-foreground">Custom Cursor:</span>
              <ElectricBorder color="#10b981" speed={0.8} chaos={0.3} thickness={2}>
                <Button
                  size="sm"
                  variant={cursorEnabled ? 'default' : 'outline'}
                  onClick={() => setCursorEnabled(!cursorEnabled)}
                  className="border-0"
                >
                  {cursorEnabled ? 'Enabled ✓' : 'Disabled'}
                </Button>
              </ElectricBorder>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5} thickness={3}>
                <Button size="lg" className="px-8 py-6 text-lg">
                  Get Started
                </Button>
              </ElectricBorder>
              
              <ElectricBorder color="#ec4899" speed={1.0} chaos={0.5} thickness={3}>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-0">
                  Learn More
                </Button>
              </ElectricBorder>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Amazing Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <ElectricBorder color="#6366f1" speed={0.8} chaos={0.3} thickness={2}>
                <Card className="p-8 bg-card/30 backdrop-blur-sm border-0">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold mb-3">Electric Border</h3>
                  <p className="text-muted-foreground">
                    Animated glowing borders with customizable colors, speed, and chaos
                  </p>
                </Card>
              </ElectricBorder>

              <ElectricBorder color="#8b5cf6" speed={0.9} chaos={0.3} thickness={2}>
                <Card className="p-8 bg-card/30 backdrop-blur-sm border-0">
                  <div className="text-4xl mb-4">🎴</div>
                  <h3 className="text-2xl font-bold mb-3">Profile Card</h3>
                  <p className="text-muted-foreground">
                    3D interactive cards with tilt effects and device orientation support
                  </p>
                </Card>
              </ElectricBorder>

              <ElectricBorder color="#ec4899" speed={1.0} chaos={0.3} thickness={2}>
                <Card className="p-8 bg-card/30 backdrop-blur-sm border-0">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold mb-3">Gooey Nav</h3>
                  <p className="text-muted-foreground">
                    Particle burst navigation with smooth gooey blob effects
                  </p>
                </Card>
              </ElectricBorder>

              <ElectricBorder color="#10b981" speed={1.1} chaos={0.3} thickness={2}>
                <Card className="p-8 bg-card/30 backdrop-blur-sm border-0">
                  <div className="text-4xl mb-4">🖱️</div>
                  <h3 className="text-2xl font-bold mb-3">Splash Cursor</h3>
                  <p className="text-muted-foreground">
                    Custom animated cursor with particle trails and click effects
                  </p>
                </Card>
              </ElectricBorder>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Component Gallery
            </h2>

            {/* Profile Card Demo */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-8">Profile Card</h3>
              <div className="flex justify-center">
                <ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5} thickness={3}>
                  <ProfileCard
                    avatarUrl="/albert-dera-ILip77SbmOE-unsplash.jpg"
                    name="Joshua Muli"
                    title="Full-Stack Engineer & Security Researcher"
                    handle="joshuamuli"
                    status="Available for Work"
                    contactText="Get In Touch"
                    onContactClick={() => alert('Contact clicked!')}
                    enableTilt={true}
                    enableMobileTilt={true}
                    className="w-full max-w-sm"
                  />
                </ElectricBorder>
              </div>
            </div>

            {/* Gooey Nav Demo */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-8">Gooey Navigation</h3>
              <div className="flex justify-center">
                <GooeyNav
                  items={navItems}
                  animationTime={600}
                  particleCount={15}
                  particleDistances={[90, 10]}
                  particleR={100}
                  timeVariance={300}
                  colors={[1, 2, 3, 4]}
                  className="max-w-2xl"
                />
              </div>
            </div>

            {/* Staggered Menu Demo */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-8">Staggered Menu</h3>
              <div className="flex justify-center">
                <ElectricBorder color="#a78bfa" speed={1.0} chaos={0.5} thickness={3}>
                  <Button
                    size="lg"
                    onClick={() => setShowStaggeredMenu(!showStaggeredMenu)}
                    className="px-8 py-6 text-lg"
                  >
                    {showStaggeredMenu ? 'Hide' : 'Show'} Staggered Menu
                  </Button>
                </ElectricBorder>
              </div>
              <p className="text-center text-muted-foreground mt-4">
                Click to toggle the full-screen animated menu
              </p>
            </div>

            {/* Splash Cursor Demo */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-8">Splash Cursor</h3>
              <div className="flex flex-col items-center gap-6">
                <ElectricBorder color="#10b981" speed={1.0} chaos={0.5} thickness={3}>
                  <Card className="p-12 bg-card/30 backdrop-blur-sm border-0 text-center">
                    <div className="text-6xl mb-6">🖱️</div>
                    <h4 className="text-2xl font-bold mb-4">Move Your Mouse Here</h4>
                    <p className="text-muted-foreground mb-6">
                      Experience the custom cursor with particle trails
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button size="lg" onClick={() => alert('Click detected!')}>
                        Click Me
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => setCursorEnabled(!cursorEnabled)}>
                        {cursorEnabled ? 'Disable' : 'Enable'} Cursor
                      </Button>
                    </div>
                  </Card>
                </ElectricBorder>
                <p className="text-center text-muted-foreground max-w-2xl">
                  The custom cursor features smooth following, particle trails, and click effects.
                  It automatically disables on mobile devices and respects reduced motion preferences.
                </p>
              </div>
            </div>

            {/* Electric Border Variations */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-8">Electric Border Variations</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <ElectricBorder color="#7df9ff" speed={0.5} chaos={0.2} thickness={2}>
                  <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg text-center">
                    <p className="font-semibold mb-2">Calm</p>
                    <p className="text-sm text-muted-foreground">Low chaos</p>
                  </div>
                </ElectricBorder>

                <ElectricBorder color="#10b981" speed={1.0} chaos={0.5} thickness={2}>
                  <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg text-center">
                    <p className="font-semibold mb-2">Balanced</p>
                    <p className="text-sm text-muted-foreground">Medium chaos</p>
                  </div>
                </ElectricBorder>

                <ElectricBorder color="#f59e0b" speed={1.5} chaos={0.8} thickness={3}>
                  <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg text-center">
                    <p className="font-semibold mb-2">Energetic</p>
                    <p className="text-sm text-muted-foreground">High chaos</p>
                  </div>
                </ElectricBorder>

                <ElectricBorder color="#ef4444" speed={2.0} chaos={1.0} thickness={4}>
                  <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg text-center">
                    <p className="font-semibold mb-2">Extreme</p>
                    <p className="text-sm text-muted-foreground">Max chaos</p>
                  </div>
                </ElectricBorder>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to Use
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              All components are production-ready with TypeScript support, accessibility features, and performance optimizations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ElectricBorder color="#6366f1" speed={1.0} chaos={0.4} thickness={2}>
                <Card className="p-8 bg-card/30 backdrop-blur-sm border-0 text-left">
                  <h3 className="text-2xl font-bold mb-4">✅ Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• TypeScript support</li>
                    <li>• Accessibility-first</li>
                    <li>• Reduced motion support</li>
                    <li>• Mobile responsive</li>
                    <li>• Performance optimized</li>
                  </ul>
                </Card>
              </ElectricBorder>

              <ElectricBorder color="#ec4899" speed={1.0} chaos={0.4} thickness={2}>
                <Card className="p-8 bg-card/30 backdrop-blur-sm border-0 text-left">
                  <h3 className="text-2xl font-bold mb-4">🎨 Customizable</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Custom colors</li>
                    <li>• Adjustable timing</li>
                    <li>• Flexible layouts</li>
                    <li>• Theme support</li>
                    <li>• Easy integration</li>
                  </ul>
                </Card>
              </ElectricBorder>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-muted-foreground border-t border-border/20">
          <p>© 2025 Joshua Muli. All components built with React, TypeScript, and GSAP.</p>
        </footer>
      </main>
    </CursorProvider>
  )
}

