# Component Documentation

Detailed documentation for all custom components in the portfolio.

## Table of Contents
- [Navigation](#navigation)
- [Hero Section](#hero-section)
- [Gradient Mesh](#gradient-mesh)
- [Projects Carousel](#projects-carousel)
- [Tech Stack Marquee](#tech-stack-marquee)
- [About Section](#about-section)
- [Security Terminal](#security-terminal)
- [Contact Section](#contact-section)

---

## Navigation

**File**: `components/navigation.tsx`

### Purpose
Sticky navigation bar with auto-hide on scroll, active section tracking, and smooth scrolling.

### Features
- ✅ Auto-hide on scroll down, show on scroll up
- ✅ Active section tracking with Intersection Observer
- ✅ Smooth scroll to sections
- ✅ Glassmorphism design
- ✅ Animated underline indicator

### State
```typescript
const [activeSection, setActiveSection] = useState("home")
const [isVisible, setIsVisible] = useState(true)
const [lastScrollY, setLastScrollY] = useState(0)
```

### Key Functions
```typescript
// Scroll to section with smooth behavior
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
```

### Intersection Observer Configuration
```typescript
const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -50% 0px", // Trigger when section is centered
  threshold: 0,
}
```

### Customization
To add/remove navigation items, edit the `navItems` array:
```typescript
const navItems = [
  { id: "home", label: "Home" },
  { id: "your-section", label: "Your Section" },
  // ...
]
```

### Accessibility
- `aria-label="Main navigation"`
- `aria-current="page"` on active item
- Keyboard navigation support
- Focus visible states

---

## Hero Section

**File**: `components/hero-section.tsx`

### Purpose
Landing section with kinetic typography, terminal-style subtitle, and interactive background.

### Features
- ✅ Staggered letter animations
- ✅ Terminal typing effect
- ✅ WebGL gradient background
- ✅ Smooth scroll indicator
- ✅ CTA button with hover effects

### State
```typescript
const [displayedText, setDisplayedText] = useState("")
const [showSubtitle, setShowSubtitle] = useState(false)
const [showCTA, setShowCTA] = useState(false)
```

### Animation Sequence
1. **Name appears** (200ms per letter)
2. **Subtitle types** (after 300ms delay)
3. **CTA fades in** (after subtitle completes)
4. **Scroll indicator bounces** (continuous)

### Key Functions
```typescript
// Scroll to projects section
const scrollToProjects = () => {
  const projectsSection = document.getElementById("projects")
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}
```

### Customization
```typescript
const name = "Your Name"
const subtitle = "Your Title"
```

### Performance
- Uses `requestAnimationFrame` for smooth animations
- Respects `prefers-reduced-motion`
- GPU-accelerated transforms

---

## Gradient Mesh

**File**: `components/gradient-mesh.tsx`

### Purpose
WebGL-powered animated gradient background with mouse interaction.

### Features
- ✅ Canvas-based gradient animation
- ✅ Mouse-responsive colors
- ✅ Subtle noise texture
- ✅ Performance optimizations
- ✅ Reduced motion support

### Key Variables
```typescript
const colors = [
  { r: 99, g: 102, b: 241 },   // Indigo
  { r: 34, g: 211, b: 238 },   // Cyan
  { r: 245, g: 158, b: 11 },   // Amber
]
```

### Animation Loop
```typescript
const animate = () => {
  time += 0.005 // Animation speed
  
  // Create radial gradient
  const gradient = ctx.createRadialGradient(...)
  
  // Animate alpha values
  const alpha1 = 0.15 + Math.sin(time) * 0.05
  
  // Draw gradient
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  requestAnimationFrame(animate)
}
```

### Performance Optimizations
1. **Device Pixel Ratio**: Handles high-DPI displays
2. **Throttled Mouse Events**: Uses `requestAnimationFrame`
3. **Conditional Noise**: Skips on high-DPR devices
4. **Alpha Channel**: Disabled for better performance

### Customization
To change colors:
```typescript
const colors = [
  { r: 255, g: 0, b: 0 },    // Red
  { r: 0, g: 255, b: 0 },    // Green
  { r: 0, g: 0, b: 255 },    // Blue
]
```

---

## Projects Carousel

**File**: `components/projects-carousel.tsx`

### Purpose
3D carousel showcasing featured projects with modal details.

### Features
- ✅ 3D perspective transforms
- ✅ Mouse-tracking tilt effect
- ✅ Auto-play with pause on interaction
- ✅ Full-screen modal
- ✅ Keyboard navigation
- ✅ Accessibility support

### State
```typescript
const [currentIndex, setCurrentIndex] = useState(0)
const [selectedProject, setSelectedProject] = useState(null)
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
```

### Project Data Structure
```typescript
interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
}
```

### 3D Transform Calculation
```typescript
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

### Auto-Play Logic
```typescript
// Auto-advance every 7 seconds of inactivity
const checkAutoPlay = () => {
  const timeSinceInteraction = Date.now() - lastInteractionRef.current
  if (timeSinceInteraction >= 7000) {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }
}
```

### Adding Projects
```typescript
const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Description here",
    tech: ["React", "Node.js"],
    github: "https://github.com/...",
    demo: "https://demo.com",
    image: "/your-image.png",
  },
]
```

### Accessibility
- ARIA labels on buttons
- Keyboard navigation (arrow keys)
- Focus management in modal
- Screen reader announcements

---

## Tech Stack Marquee

**File**: `components/tech-stack-marquee.tsx`

### Purpose
Infinite scrolling marquee displaying technologies.

### Features
- ✅ Seamless infinite scroll
- ✅ Pause on hover
- ✅ Animated grid background
- ✅ Gradient overlays
- ✅ Hover effects on items

### State
```typescript
const [isPaused, setIsPaused] = useState(false)
```

### Tech Stack Data
```typescript
const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  // ...
]
```

### Animation
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### Customization
To add technologies:
```typescript
const techStack = [
  { name: "Your Tech", icon: "🚀" },
  // ...
]
```

To change scroll speed:
```css
animation: marquee 20s linear infinite; /* Faster */
```

---

## About Section

**File**: `components/about-section.tsx`

### Purpose
Personal introduction with animated 3D avatar and resume download.

### Features
- ✅ Intersection Observer for scroll animations
- ✅ Animated 3D avatar placeholder
- ✅ Split-screen layout
- ✅ Resume download button
- ✅ Staggered entrance animations

### State
```typescript
const [isVisible, setIsVisible] = useState(false)
const [isDownloaded, setIsDownloaded] = useState(false)
```

### Intersection Observer
```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
    }
  },
  { threshold: 0.2 } // Trigger when 20% visible
)
```

### Resume Download
```typescript
const handleDownloadResume = () => {
  setIsDownloaded(true)
  setTimeout(() => setIsDownloaded(false), 3000)
  
  // Actual download (to be implemented)
  window.open('/resume.pdf', '_blank')
}
```

### Customization
Update the text content:
```typescript
<p className="text-pretty">
  Your custom bio text here...
</p>
```

### 3D Avatar
Currently uses a placeholder. To integrate Spline 3D:
```typescript
import Spline from '@splinetool/react-spline'

<Spline scene="https://prod.spline.design/your-scene-id/scene.splinecode" />
```

---

## Security Terminal

**File**: `components/security-terminal.tsx`

### Purpose
Interactive terminal emulator with Matrix rain effect and security scan simulation.

### Features
- ✅ Matrix rain canvas animation
- ✅ Simulated Nmap scan
- ✅ Typing animation with delays
- ✅ Easter egg on close button
- ✅ Syntax highlighting

### State
```typescript
const [visibleLines, setVisibleLines] = useState(0)
const [easterEggTriggered, setEasterEggTriggered] = useState(false)
```

### Terminal Lines Data
```typescript
const terminalLines = [
  { text: "$ nmap -sV -sC joshua-muli.dev", delay: 0 },
  { text: "Starting Nmap 7.94...", delay: 800 },
  { text: "✓ 0 vulnerabilities found", delay: 6800, highlight: true },
  // ...
]
```

### Matrix Rain Effect
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
    drops[i]++
  }
}
```

### Customization
To change terminal commands:
```typescript
const terminalLines = [
  { text: "$ your-command", delay: 0 },
  { text: "Output line", delay: 500 },
  // ...
]
```

### Easter Egg
Triggered by clicking the red close button:
```typescript
const handleEasterEgg = () => {
  setEasterEggTriggered(true)
  setTimeout(() => setEasterEggTriggered(false), 5000)
}
```

---

## Contact Section

**File**: `components/contact-section.tsx`

### Purpose
Contact form with animated labels, validation, and social links.

### Features
- ✅ Floating label animations
- ✅ Form validation (React Hook Form + Zod)
- ✅ Confetti animation on success
- ✅ Social media links
- ✅ Loading states

### State
```typescript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
})
const [isSubmitting, setIsSubmitting] = useState(false)
const [isSuccess, setIsSuccess] = useState(false)
const [focusedField, setFocusedField] = useState(null)
```

### Form Submission
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  // TODO: Send to API endpoint
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  
  setIsSubmitting(false)
  setIsSuccess(true)
}
```

### Floating Labels
```typescript
<Label
  className={cn(
    "absolute left-3 transition-all duration-200",
    focusedField === "name" || formData.name
      ? "-top-2 text-xs bg-[#0a0a0a] px-2 text-primary"
      : "top-3 text-muted-foreground"
  )}
>
  Your Name
</Label>
```

### Confetti Animation
```typescript
{isSuccess && (
  <div className="fixed inset-0 pointer-events-none z-50">
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

### Validation (To Be Implemented)
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const form = useForm({
  resolver: zodResolver(formSchema),
})
```

### Customization
Update social links:
```typescript
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourprofile" ...>
<a href="https://twitter.com/yourhandle" ...>
```

---

## Common Patterns

### Intersection Observer Pattern
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Trigger animation
      }
    },
    { threshold: 0.2 }
  )
  
  if (ref.current) {
    observer.observe(ref.current)
  }
  
  return () => observer.disconnect()
}, [])
```

### Animation Pattern
```typescript
// CSS-based
className="animate-fade-in"

// JS-based
useEffect(() => {
  const animate = () => {
    // Animation logic
    requestAnimationFrame(animate)
  }
  animate()
  
  return () => cancelAnimationFrame(animationId)
}, [])
```

### Reduced Motion Pattern
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

---

## Best Practices

1. **Always clean up effects**: Remove event listeners, cancel animations
2. **Use refs for DOM access**: Avoid direct DOM manipulation
3. **Respect user preferences**: Check for reduced motion
4. **Add ARIA labels**: Make components accessible
5. **Optimize performance**: Use `requestAnimationFrame`, throttle events
6. **Type everything**: Use TypeScript for all props and state
7. **Handle errors**: Add error boundaries and fallbacks

