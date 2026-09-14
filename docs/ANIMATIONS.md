# Animation Documentation

Complete guide to all animations used in the portfolio.

## Table of Contents
- [CSS Animations](#css-animations)
- [JavaScript Animations](#javascript-animations)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)

---

## CSS Animations

All CSS animations are defined in `app/globals.css` under the `@layer utilities` section.

### 1. Fade In
**Usage**: General entrance animations

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
```

**Where Used**:
- Hero section letters
- Terminal lines
- Modal overlays

**Example**:
```tsx
<div className="animate-fade-in">Content</div>
```

---

### 2. Fade In Up
**Usage**: Entrance from bottom

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}
```

**Where Used**:
- CTA buttons
- Section content

**Example**:
```tsx
<Button className="animate-fade-in-up">Click Me</Button>
```

---

### 3. Typing Effect
**Usage**: Terminal-style text reveal

```css
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.animate-typing {
  animation: typing 3s steps(50, end);
  overflow: hidden;
  whitespace: nowrap;
  border-right: 2px solid var(--secondary);
}
```

**Where Used**:
- Hero subtitle
- Terminal commands

**Example**:
```tsx
<p className="animate-typing">Full-Stack Engineer</p>
```

---

### 4. Scroll Down Indicator
**Usage**: Animated scroll hint

```css
@keyframes scroll-down {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(12px);
  }
}

.animate-scroll-down {
  animation: scroll-down 2s ease-in-out infinite;
}
```

**Where Used**:
- Hero section scroll indicator

**Example**:
```tsx
<div className="animate-scroll-down">↓</div>
```

---

### 5. Slide In
**Usage**: Navigation underline

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
```

**Where Used**:
- Navigation active indicator

---

### 6. Scale In
**Usage**: Modal entrance

```css
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
```

**Where Used**:
- Project modal
- Easter egg alert
- Success icons

**Example**:
```tsx
<Dialog className="animate-scale-in">
  <DialogContent>...</DialogContent>
</Dialog>
```

---

### 7. Marquee
**Usage**: Infinite horizontal scroll

```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

**Where Used**:
- Tech stack marquee

**How It Works**:
- Content is duplicated 3 times
- Animates by -33.333% (one full set)
- Creates seamless loop

**Example**:
```tsx
<div className="animate-marquee">
  {[...items, ...items, ...items].map(...)}
</div>
```

---

### 8. Spin Animations
**Usage**: Rotating elements

```css
/* Slow clockwise spin */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

/* Slow counter-clockwise spin */
@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.animate-spin-reverse {
  animation: spin-reverse 15s linear infinite;
}
```

**Where Used**:
- About section 3D avatar rings

**Example**:
```tsx
<div className="animate-spin-slow">🌟</div>
```

---

### 9. Ping Slow
**Usage**: Pulsing effect

```css
@keyframes ping-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.2;
  }
}

.animate-ping-slow {
  animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

**Where Used**:
- About section avatar rings

---

### 10. Confetti
**Usage**: Celebration effect

```css
@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.animate-confetti {
  animation: confetti 3s ease-out forwards;
}
```

**Where Used**:
- Contact form success

**Example**:
```tsx
{isSuccess && (
  <div className="fixed inset-0 pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-primary rounded-full animate-confetti"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 0.5}s`,
        }}
      />
    ))}
  </div>
)}
```

---

## JavaScript Animations

### 1. Kinetic Typography (Hero Section)

**File**: `components/hero-section.tsx`

```typescript
useEffect(() => {
  const letters = name.split("")
  let currentIndex = 0

  const interval = setInterval(() => {
    if (currentIndex < letters.length) {
      setDisplayedText((prev) => prev + letters[currentIndex])
      currentIndex++
    } else {
      clearInterval(interval)
      setTimeout(() => setShowSubtitle(true), 300)
    }
  }, 200) // 200ms per letter

  return () => clearInterval(interval)
}, [])
```

**How It Works**:
1. Split name into letters
2. Add one letter every 200ms
3. Each letter has staggered CSS animation
4. Trigger subtitle after completion

---

### 2. WebGL Gradient Mesh

**File**: `components/gradient-mesh.tsx`

```typescript
const animate = () => {
  time += 0.005 // Animation speed

  const { x: mouseX, y: mouseY } = mouseRef.current

  // Create radial gradient
  const gradient = ctx.createRadialGradient(
    window.innerWidth * (0.5 + mouseX * 0.1),
    window.innerHeight * (0.5 + mouseY * 0.1),
    0,
    window.innerWidth * 0.5,
    window.innerHeight * 0.5,
    window.innerWidth * 0.8
  )

  // Animate alpha values
  const alpha1 = 0.15 + Math.sin(time) * 0.05
  const alpha2 = 0.1 + Math.cos(time * 1.3) * 0.05
  const alpha3 = 0.08 + Math.sin(time * 0.7) * 0.03

  gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${alpha1})`)
  gradient.addColorStop(0.5, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${alpha2})`)
  gradient.addColorStop(1, `rgba(${color3.r}, ${color3.g}, ${color3.b}, ${alpha3})`)

  // Draw
  ctx.fillStyle = "#0a0a0a"
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

  animationRef.current = requestAnimationFrame(animate)
}
```

**Performance Tips**:
- Use `requestAnimationFrame` for 60fps
- Disable alpha channel: `getContext("2d", { alpha: false })`
- Throttle mouse events
- Skip noise on high-DPR devices

---

### 3. Matrix Rain Effect

**File**: `components/security-terminal.tsx`

```typescript
const draw = () => {
  // Fade effect
  ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw characters
  ctx.fillStyle = "#22d3ee"
  ctx.font = "15px monospace"

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)]
    ctx.fillText(text, i * 20, drops[i] * 20)

    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
      drops[i] = 0
    }
    drops[i]++
  }
}

const interval = setInterval(draw, 50) // 20fps
```

**Character Set**:
```typescript
const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
```

---

### 4. 3D Carousel Transform

**File**: `components/projects-carousel.tsx`

```typescript
const offset = index - currentIndex
const isActive = offset === 0
const absOffset = Math.abs(offset)

style={{
  transform: `
    translateX(${offset * 300}px)
    translateZ(${isActive ? 0 : -absOffset * 200}px)
    rotateY(${offset * -15}deg)
    scale(${isActive ? 1 : 0.8 - absOffset * 0.1})
  `,
  opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
}}
```

**Mouse Tilt Effect**:
```typescript
const handleMouseMove = (e: React.MouseEvent, index: number) => {
  if (index !== currentIndex) return

  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  
  setMousePosition({ x, y })
}

// Apply to active card
style={{
  transform: `
    rotateX(${mousePosition.y * 10}deg)
    rotateY(${mousePosition.x * 10}deg)
  `,
}}
```

---

### 5. Terminal Typing Animation

**File**: `components/security-terminal.tsx`

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && visibleLines === 0) {
        terminalLines.forEach((line, index) => {
          setTimeout(() => {
            setVisibleLines(index + 1)
          }, line.delay)
        })
      }
    },
    { threshold: 0.3 }
  )

  if (sectionRef.current) {
    observer.observe(sectionRef.current)
  }

  return () => observer.disconnect()
}, [visibleLines])
```

---

## Performance Optimization

### 1. GPU Acceleration

Force GPU acceleration for smooth animations:

```css
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

Use on animated elements:
```tsx
<div className="gpu-accelerated animate-fade-in">...</div>
```

---

### 2. Will-Change Property

Hint browser about upcoming changes:

```css
.will-change-transform {
  will-change: transform;
}
```

**Warning**: Don't overuse! Only on actively animating elements.

---

### 3. RequestAnimationFrame

Always use RAF for JS animations:

```typescript
const animate = () => {
  // Animation logic
  animationRef.current = requestAnimationFrame(animate)
}

animate()

// Cleanup
return () => {
  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current)
  }
}
```

---

### 4. Event Throttling

Throttle expensive event handlers:

```typescript
let rafId: number
const handleMouseMove = (e: MouseEvent) => {
  if (rafId) return
  
  rafId = requestAnimationFrame(() => {
    // Handle event
    rafId = 0
  })
}
```

---

### 5. Intersection Observer

Trigger animations only when visible:

```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
    }
  },
  { threshold: 0.2 }
)
```

---

## Accessibility

### 1. Reduced Motion Support

Always respect user preferences:

```typescript
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  setPrefersReducedMotion(mediaQuery.matches)
  
  const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
  mediaQuery.addEventListener("change", handleChange)
  
  return () => mediaQuery.removeEventListener("change", handleChange)
}, [])
```

**CSS Approach**:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 2. ARIA Live Regions

Announce dynamic content:

```tsx
<div role="log" aria-live="polite" aria-atomic="false">
  {terminalLines.map((line) => (
    <div>{line.text}</div>
  ))}
</div>
```

---

### 3. Skip Animations

Provide option to skip long animations:

```tsx
{isAnimating && (
  <button onClick={() => setIsAnimating(false)}>
    Skip Animation
  </button>
)}
```

---

## Animation Timing Reference

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| fade-in | 0.6s | ease-out | General entrance |
| fade-in-up | 0.8s | ease-out | Bottom entrance |
| typing | 3s | steps(50) | Terminal text |
| scroll-down | 2s | ease-in-out | Scroll hint |
| slide-in | 0.3s | ease-out | Quick reveal |
| scale-in | 0.3s | ease-out | Modal entrance |
| marquee | 30s | linear | Infinite scroll |
| spin-slow | 20s | linear | Slow rotation |
| ping-slow | 3s | cubic-bezier | Pulse effect |
| confetti | 3s | ease-out | Celebration |

---

## Best Practices

1. ✅ **Use CSS for simple animations** (better performance)
2. ✅ **Use JS for complex/interactive animations**
3. ✅ **Always clean up animations** (prevent memory leaks)
4. ✅ **Respect reduced motion preferences**
5. ✅ **Use GPU acceleration** (transform, opacity)
6. ✅ **Throttle event handlers** (mouse, scroll)
7. ✅ **Use Intersection Observer** (trigger on visibility)
8. ✅ **Test on low-end devices**
9. ✅ **Provide skip options** for long animations
10. ✅ **Add ARIA labels** for screen readers

