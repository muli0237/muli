# Architecture Documentation

## Overview

This portfolio website is built using a modern, component-based architecture with Next.js 14 App Router. The application follows a single-page application (SPA) pattern with smooth scrolling between sections.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App Router                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Root Layout (layout.tsx)              │  │  │
│  │  │  - Font Loading (Satoshi, JetBrains Mono)      │  │  │
│  │  │  - Metadata & SEO                               │  │  │
│  │  │  - Analytics Integration                        │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                        ↓                               │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Main Page (page.tsx)                  │  │  │
│  │  │  - Section Composition                          │  │  │
│  │  │  - Navigation Component                         │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Navigation   │  │ Hero Section │  │ Projects     │      │
│  │ - Scroll     │  │ - Animations │  │ - 3D Carousel│      │
│  │ - Tracking   │  │ - WebGL BG   │  │ - Modal      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Tech Stack   │  │ About        │  │ Security     │      │
│  │ - Marquee    │  │ - 3D Avatar  │  │ - Terminal   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐                                           │
│  │ Contact      │                                           │
│  │ - Form       │                                           │
│  │ - Social     │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    UI Component Layer                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         shadcn/ui Components (50+)                   │   │
│  │  Button, Card, Input, Dialog, Carousel, etc.        │   │
│  │  - Built on Radix UI primitives                     │   │
│  │  - Styled with Tailwind CSS                         │   │
│  │  - Fully accessible (ARIA)                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    Utility Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Hooks        │  │ Utils        │  │ Styles       │      │
│  │ - useMobile  │  │ - cn()       │  │ - globals.css│      │
│  │ - useToast   │  │ - clsx       │  │ - animations │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Core Principles

### 1. Component-Based Architecture
- **Modular Design**: Each section is a self-contained component
- **Reusability**: UI components from shadcn/ui are reused throughout
- **Separation of Concerns**: Logic, styling, and markup are clearly separated

### 2. Performance First
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Images and components load on demand
- **GPU Acceleration**: Animations use `transform` and `opacity`
- **RequestAnimationFrame**: Smooth 60fps animations
- **Reduced Motion**: Respects user preferences

### 3. Accessibility
- **Semantic HTML**: Proper use of `<section>`, `<nav>`, `<button>`, etc.
- **ARIA Labels**: All interactive elements have labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper announcements and descriptions
- **Focus Management**: Visible focus indicators

### 4. Type Safety
- **TypeScript**: Full type coverage
- **Zod Schemas**: Runtime validation for forms
- **Type Inference**: Leveraging TypeScript's inference

## Data Flow

### Navigation State Management

```
User Scrolls
     ↓
Intersection Observer (navigation.tsx)
     ↓
Detects Active Section
     ↓
Updates activeSection State
     ↓
Re-renders Navigation with Active Indicator
```

### Animation Flow

```
Component Mounts
     ↓
Intersection Observer Detects Visibility
     ↓
Triggers Animation State
     ↓
CSS/JS Animations Execute
     ↓
RequestAnimationFrame Loop (for continuous animations)
```

### Form Submission Flow (To Be Implemented)

```
User Fills Form
     ↓
React Hook Form Validates
     ↓
Zod Schema Validation
     ↓
Submit to API Endpoint
     ↓
Show Success/Error State
     ↓
Reset Form
```

## Component Architecture

### Hero Section
```typescript
HeroSection
├── GradientMesh (WebGL Background)
├── Kinetic Typography
│   ├── Letter Animation Loop
│   └── Staggered Delays
├── Terminal Subtitle
│   └── Typing Animation
└── CTA Button
    └── Smooth Scroll Handler
```

### Projects Carousel
```typescript
ProjectsCarousel
├── 3D Carousel Container
│   ├── Project Cards (mapped)
│   │   ├── Image
│   │   ├── Title & Description
│   │   └── Tech Stack Badges
│   ├── Navigation Controls
│   │   ├── Previous Button
│   │   ├── Dot Indicators
│   │   └── Next Button
│   └── Auto-play Timer
└── Full-Screen Modal
    ├── Project Details
    ├── Tech Stack
    └── Action Buttons (GitHub, Demo)
```

### Security Terminal
```typescript
SecurityTerminal
├── Matrix Rain Canvas
│   └── Animation Loop
├── Terminal Window
│   ├── Header (with Easter Egg)
│   ├── Terminal Lines
│   │   └── Typing Animation
│   └── Cursor Blink
└── Easter Egg Modal
```

## State Management

### Local Component State
- **useState**: For simple component state (form inputs, visibility)
- **useRef**: For DOM references and mutable values (animation frames)
- **useEffect**: For side effects (observers, event listeners)

### No Global State Management
- Currently no Redux/Zustand/Context needed
- All state is local to components
- Future: May add Context for theme switching

## Styling Architecture

### Tailwind CSS Approach
```
Utility Classes (Tailwind)
     ↓
Component Variants (CVA)
     ↓
Conditional Classes (cn utility)
     ↓
Custom Animations (globals.css)
```

### CSS Custom Properties
```css
:root {
  --background: oklch(...);
  --foreground: oklch(...);
  --primary: oklch(...);
  /* ... more variables */
}

.dark {
  /* Override for dark theme */
}
```

### Animation System
1. **CSS Keyframes**: Defined in `globals.css`
2. **Tailwind Classes**: Applied via `animate-*` utilities
3. **JavaScript Animations**: Canvas-based (WebGL, Matrix rain)
4. **Intersection Observer**: Trigger animations on scroll

## Performance Optimizations

### 1. Image Optimization
```javascript
// next.config.mjs
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### 2. Font Loading
- **Variable Fonts**: Satoshi reduces file size
- **Font Display Swap**: Prevents FOIT (Flash of Invisible Text)
- **Preconnect**: Google Fonts preconnected

### 3. Animation Performance
```typescript
// GPU Acceleration
transform: translateZ(0);
backface-visibility: hidden;

// RequestAnimationFrame
const animate = () => {
  // Animation logic
  requestAnimationFrame(animate);
};
```

### 4. Event Throttling
```typescript
// Mouse move throttling
let rafId: number;
const handleMouseMove = (e: MouseEvent) => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    // Handle mouse move
    rafId = 0;
  });
};
```

## Security Considerations

### 1. External Links
```typescript
// Always use rel="noopener noreferrer"
<a href={url} target="_blank" rel="noopener noreferrer">
```

### 2. Form Validation
```typescript
// Client-side validation with Zod
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});
```

### 3. Environment Variables
```typescript
// Use NEXT_PUBLIC_ prefix for client-side vars
process.env.NEXT_PUBLIC_API_URL
```

### 4. Content Security Policy (To Be Implemented)
```javascript
// next.config.mjs
headers: [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; ..."
  }
]
```

## Build & Deployment

### Build Process
```
1. TypeScript Compilation
2. Next.js Build (SSG/SSR)
3. Tailwind CSS Processing
4. Image Optimization
5. Bundle Optimization
6. Static Export (if needed)
```

### Deployment (Vercel)
```
1. Git Push to Main Branch
2. Vercel Auto-Deploy Triggered
3. Build Process Runs
4. Preview URL Generated
5. Production Deployment (on approval)
6. Analytics Enabled
```

## Testing Strategy (To Be Implemented)

### Unit Tests
```typescript
// Component tests with React Testing Library
describe('HeroSection', () => {
  it('renders name with animation', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Joshua Muli/i)).toBeInTheDocument();
  });
});
```

### E2E Tests
```typescript
// Playwright/Cypress tests
test('navigation scrolls to sections', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Projects');
  await expect(page.locator('#projects')).toBeInViewport();
});
```

### Visual Regression Tests
```typescript
// Percy or Chromatic
test('hero section matches snapshot', async ({ page }) => {
  await page.goto('/');
  await percySnapshot(page, 'Hero Section');
});
```

## Future Architecture Considerations

### 1. Blog Section
```
/app/blog/
├── page.tsx (Blog list)
├── [slug]/
│   └── page.tsx (Blog post)
└── components/
    ├── blog-card.tsx
    └── blog-post.tsx
```

### 2. CMS Integration
- **Option 1**: Markdown files with gray-matter
- **Option 2**: Headless CMS (Contentful, Sanity)
- **Option 3**: Database (PostgreSQL + Prisma)

### 3. API Routes
```
/app/api/
├── contact/
│   └── route.ts (POST /api/contact)
├── newsletter/
│   └── route.ts (POST /api/newsletter)
└── analytics/
    └── route.ts (POST /api/analytics)
```

### 4. Authentication (If Needed)
- **NextAuth.js**: For admin dashboard
- **Protected Routes**: For content management
- **Role-Based Access**: Admin vs. public

## Monitoring & Analytics

### Current
- **Vercel Analytics**: Page views, performance metrics

### Future
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: Web Vitals tracking
- **User Behavior**: Hotjar or similar
- **A/B Testing**: Vercel Edge Config

## Conclusion

This architecture provides a solid foundation for a high-performance, accessible, and maintainable portfolio website. The modular design allows for easy updates and feature additions while maintaining code quality and performance.

