# Quick Reference Guide

Fast reference for common tasks and commands.

## 📋 Table of Contents
- [Commands](#commands)
- [File Locations](#file-locations)
- [Component Patterns](#component-patterns)
- [Styling](#styling)
- [Animations](#animations)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Commands

### Development
```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Update from main
git checkout main
git pull upstream main
```

### Deployment
```bash
# Deploy to Vercel
vercel deploy --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

---

## File Locations

### Core Files
```
app/
├── layout.tsx          # Root layout, fonts, metadata
├── page.tsx            # Main page composition
└── globals.css         # Global styles, animations

components/
├── navigation.tsx      # Sticky nav
├── hero-section.tsx    # Landing section
├── projects-carousel.tsx  # 3D carousel
├── tech-stack-marquee.tsx # Tech stack
├── about-section.tsx   # About me
├── security-terminal.tsx  # Terminal
├── contact-section.tsx # Contact form
└── gradient-mesh.tsx   # WebGL background

docs/
├── README.md           # Documentation index
├── ARCHITECTURE.md     # System design
├── COMPONENTS.md       # Component docs
├── ANIMATIONS.md       # Animation guide
├── API_INTEGRATION.md  # Backend guide
└── DEPLOYMENT.md       # Deploy guide
```

### Configuration
```
next.config.mjs         # Next.js config
tsconfig.json           # TypeScript config
components.json         # shadcn/ui config
postcss.config.mjs      # PostCSS config
package.json            # Dependencies
```

---

## Component Patterns

### Basic Component
```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <section id="my-section" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">
          {title}
        </h2>
        <Button onClick={() => setIsActive(!isActive)}>
          Toggle
        </Button>
      </div>
    </section>
  )
}
```

### With Intersection Observer
```typescript
const [isVisible, setIsVisible] = useState(false)
const sectionRef = useRef<HTMLElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    },
    { threshold: 0.2 }
  )

  if (sectionRef.current) {
    observer.observe(sectionRef.current)
  }

  return () => observer.disconnect()
}, [])
```

### With Animation
```typescript
<div
  className={cn(
    "transition-all duration-1000",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  )}
>
  Content
</div>
```

---

## Styling

### Tailwind Classes
```typescript
// Layout
className="flex items-center justify-center gap-4"
className="grid grid-cols-1 md:grid-cols-2 gap-8"
className="container mx-auto px-4"

// Spacing
className="p-4 m-8"           // padding, margin
className="py-20 px-4"        // vertical, horizontal
className="space-y-6"         // gap between children

// Typography
className="text-5xl font-bold"
className="text-lg text-muted-foreground"
className="font-mono"

// Colors
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="border border-border"

// Effects
className="rounded-xl shadow-lg"
className="backdrop-blur-md"
className="hover:scale-105 transition-all"
```

### Conditional Classes
```typescript
import { cn } from "@/lib/utils"

className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}
```

### Custom Colors
```css
/* In globals.css */
.dark {
  --primary: oklch(0.985 0 0);
  --secondary: oklch(0.269 0 0);
}
```

---

## Animations

### CSS Animations
```typescript
// Fade in
className="animate-fade-in"

// Fade in from bottom
className="animate-fade-in-up"

// Typing effect
className="animate-typing"

// Scale in
className="animate-scale-in"

// Marquee scroll
className="animate-marquee"

// Spin
className="animate-spin-slow"
```

### Custom Animation
```css
/* In globals.css */
@keyframes my-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-my-animation {
  animation: my-animation 1s ease-out;
}
```

### JavaScript Animation
```typescript
const animationRef = useRef<number>()

useEffect(() => {
  const animate = () => {
    // Animation logic
    animationRef.current = requestAnimationFrame(animate)
  }
  
  animate()
  
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }
}, [])
```

---

## API Routes

### Create API Route
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process request
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed' },
      { status: 500 }
    )
  }
}
```

### Call API from Frontend
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

if (!response.ok) {
  throw new Error('Failed')
}

const result = await response.json()
```

---

## Environment Variables

### Local Development
```bash
# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
SENDGRID_API_KEY=your_key
```

### Access in Code
```typescript
// Client-side (must start with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Server-side only
const apiKey = process.env.SENDGRID_API_KEY
```

### Production (Vercel)
```bash
# Via CLI
vercel env add SENDGRID_API_KEY

# Or in dashboard
# Settings → Environment Variables
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
pnpm install
pnpm build
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Fix auto-fixable issues
pnpm lint --fix
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -p 3001
```

### Images Not Loading
```typescript
// Check next.config.mjs
images: {
  unoptimized: true,  // For static export
  domains: ['your-domain.com'],  // For external images
}
```

### Fonts Not Loading
```typescript
// Verify font path in layout.tsx
const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      // ...
    },
  ],
})
```

### Animations Not Working
```typescript
// Check for reduced motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches

// Disable animations if preferred
if (prefersReducedMotion) {
  // Skip animations
}
```

---

## Common Tasks

### Add New Section
1. Create component: `components/my-section.tsx`
2. Import in `app/page.tsx`
3. Add to navigation: `components/navigation.tsx`
4. Add section ID: `<section id="my-section">`

### Add New Project
```typescript
// In components/projects-carousel.tsx
const projects = [
  {
    id: 6,
    title: "New Project",
    description: "Description",
    tech: ["React", "Node.js"],
    github: "https://github.com/...",
    demo: "https://demo.com",
    image: "/new-project.png",
  },
]
```

### Add New Tech
```typescript
// In components/tech-stack-marquee.tsx
const techStack = [
  { name: "New Tech", icon: "🚀" },
]
```

### Update Colors
```css
/* In app/globals.css */
.dark {
  --primary: oklch(0.985 0 0);  /* Your color */
}
```

### Add shadcn/ui Component
```bash
# Install component
npx shadcn-ui@latest add button

# Use in code
import { Button } from "@/components/ui/button"
```

---

## Keyboard Shortcuts (VS Code)

```
Ctrl/Cmd + P        # Quick file open
Ctrl/Cmd + Shift + P # Command palette
Ctrl/Cmd + B        # Toggle sidebar
Ctrl/Cmd + `        # Toggle terminal
Ctrl/Cmd + /        # Toggle comment
Alt + Up/Down       # Move line up/down
Shift + Alt + F     # Format document
F2                  # Rename symbol
```

---

## Useful Links

### Documentation
- [Main README](../README.md)
- [Architecture](./ARCHITECTURE.md)
- [Components](./COMPONENTS.md)
- [Animations](./ANIMATIONS.md)
- [API Integration](./API_INTEGRATION.md)
- [Deployment](./DEPLOYMENT.md)

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)

---

## Performance Tips

1. **Use Next.js Image component**
   ```typescript
   import Image from "next/image"
   <Image src="/image.png" width={500} height={300} alt="..." />
   ```

2. **Lazy load components**
   ```typescript
   const MyComponent = dynamic(() => import('./my-component'))
   ```

3. **Optimize animations**
   ```typescript
   // Use transform and opacity (GPU accelerated)
   className="transform translate-x-0 opacity-100"
   ```

4. **Debounce expensive operations**
   ```typescript
   const debouncedFn = useMemo(
     () => debounce(expensiveFn, 300),
     []
   )
   ```

---

## Security Checklist

- [ ] Environment variables secured
- [ ] API routes have validation
- [ ] Rate limiting implemented
- [ ] CORS configured properly
- [ ] Input sanitized
- [ ] HTTPS enabled
- [ ] Dependencies updated
- [ ] No exposed secrets

---

## Git Commit Types

```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code restructuring
perf:     Performance improvement
test:     Adding tests
chore:    Maintenance
```

---

## Need Help?

1. Check [Documentation](./README.md)
2. Search [GitHub Issues](https://github.com/joshuamuli/portfolio/issues)
3. Review [Troubleshooting](#troubleshooting)
4. Ask in GitHub Discussions

---

**Last Updated**: 2025-01-XX

