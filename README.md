# Joshua Muli - Portfolio Website

A modern, high-performance portfolio website showcasing full-stack development and security research expertise. Built with Next.js 14, TypeScript, and advanced animations.

![Portfolio Preview](./docs/preview.png)

---

## 📚 **[→ View Complete Documentation](./DOCUMENTATION.md)**

**For comprehensive guides, component details, and implementation instructions, see [DOCUMENTATION.md](./DOCUMENTATION.md)**

---

## 🚀 Features

### Premium Interactive Components
- **⚡ ElectricBorder** - Animated glowing borders with Canvas API
- **🎴 ProfileCard** - 3D interactive profile card with tilt effects
- **🖱️ SplashCursor** - Custom cursor with particle trails
- **🔐 DecryptedText** - Text scrambling/decryption animation with auto-repeat
- **🌊 GooeyNav** - Navigation with particle burst effects
- **📱 StaggeredMenu** - Full-screen animated menu with GSAP

### Visual Effects & Animations
- **WebGL Gradient Mesh Background** - Interactive, mouse-responsive gradient animations
- **3D Project Carousel** - Perspective-based carousel with tilt effects
- **Kinetic Typography** - Staggered letter animations in hero section
- **Matrix Rain Effect** - Canvas-based security terminal with falling characters
- **Infinite Marquee** - Smooth scrolling tech stack display
- **Confetti Animations** - Success celebrations on form submission

### Sections
1. **Hero Section** - Animated name reveal with terminal-style subtitle
2. **Projects Carousel** - 3D showcase of featured projects with modal details
3. **Tech Stack Marquee** - Infinite scrolling display of technologies
4. **About Section** - Personal introduction with animated 3D avatar
5. **Security Terminal** - Interactive terminal demonstrating security expertise
6. **Contact Section** - Animated form with floating labels and social links

### Performance & Accessibility
- ⚡ Optimized animations with GPU acceleration
- ♿ Full accessibility support (ARIA labels, keyboard navigation)
- 📱 Fully responsive design
- 🎨 Reduced motion support for accessibility
- 🔍 SEO optimized with comprehensive metadata
- 📊 Vercel Analytics integration

## 🛠️ Technology Stack

### Core
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.9** - Utility-first styling

### Animation Libraries
- **Framer Motion (motion)** - Advanced animations for DecryptedText
- **GSAP** - Timeline animations for StaggeredMenu
- **Canvas API** - Native browser API for ElectricBorder & SplashCursor

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component system
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel functionality

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Validation integration

### Styling & Animation
- **class-variance-authority** - Component variants
- **tailwind-merge** - Conditional class merging
- **tailwindcss-animate** - Animation utilities

### Fonts
- **Geist** - Modern sans-serif
- **JetBrains Mono** - Monospace for code
- **Satoshi** - Custom variable font

## 📁 Project Structure

```
joshua-portfolio/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & custom animations
│   ├── layout.tsx               # Root layout with metadata & fonts
│   └── page.tsx                 # Main page composition
│
├── components/                   # React components
│   ├── about-section.tsx        # About section with 3D avatar
│   ├── contact-section.tsx      # Contact form with animations
│   ├── gradient-mesh.tsx        # WebGL gradient background
│   ├── hero-section.tsx         # Hero with kinetic typography
│   ├── navigation.tsx           # Sticky nav with scroll detection
│   ├── projects-carousel.tsx    # 3D carousel for projects
│   ├── security-terminal.tsx    # Terminal emulator with Matrix effect
│   ├── tech-stack-marquee.tsx   # Animated tech stack display
│   ├── theme-provider.tsx       # Theme management
│   └── ui/                      # shadcn/ui components (50+ files)
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── lib/                          # Utilities
│   └── utils.ts                 # Helper functions (cn)
│
├── public/                       # Static assets
│   ├── fonts/                   # Custom fonts
│   │   └── Satoshi-Variable.woff2
│   └── *.png, *.jpg             # Project screenshots
│
├── styles/                       # Additional styles
│   └── globals.css              # Legacy global styles
│
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd joshua-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
pnpm lint
```

## 📝 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Contact Form (to be implemented)
NEXT_PUBLIC_FORM_ENDPOINT=your_form_endpoint
```

### Next.js Configuration
Key settings in `next.config.mjs`:
- Image optimization with AVIF/WebP support
- Compression enabled
- React strict mode
- Custom device sizes for responsive images

### Tailwind Configuration
Custom theme in `app/globals.css`:
- Dark theme by default
- Custom color palette (indigo, cyan, amber)
- Custom animations (fade-in, typing, marquee, etc.)
- Reduced motion support

## 🎨 Customization

### Adding New Projects

Edit `components/projects-carousel.tsx`:

```typescript
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description",
    tech: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/yourusername/project",
    demo: "https://your-demo-url.com",
    image: "/your-project-image.png",
  },
  // Add more projects...
]
```

### Updating Tech Stack

Edit `components/tech-stack-marquee.tsx`:

```typescript
const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Your Tech", icon: "🚀" },
  // Add more technologies...
]
```

### Modifying Colors

Update CSS variables in `app/globals.css`:

```css
.dark {
  --primary: oklch(0.985 0 0); /* Your color */
  --secondary: oklch(0.269 0 0); /* Your color */
  /* ... more colors */
}
```

### Changing Fonts

Update `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google"

const yourFont = YourFont({
  subsets: ["latin"],
  variable: "--font-your-font",
})
```

## 🧩 Component Documentation

**📚 For detailed component documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)**

### Premium Interactive Components

#### **ElectricBorder** ⚡
Animated glowing borders using Canvas API. Used in Hero and About sections.

#### **ProfileCard** 🎴
3D interactive profile card with tilt effects and gyroscope support. Used in About section.

#### **SplashCursor** 🖱️
Custom cursor with particle trails and click burst effects. Active globally.

#### **DecryptedText** 🔐
Text scrambling/decryption animation with auto-repeat every 2 minutes. Used in About section.

#### **GooeyNav** 🌊
Navigation with particle burst and SVG gooey filter. Available in demo page.

#### **StaggeredMenu** 📱
Full-screen animated menu with GSAP timeline animations. Available in demo page.

### Standard Sections

#### **Hero Section**
Kinetic typography with staggered animations, terminal-style typing effect, and WebGL gradient background.

#### **Projects Carousel**
3D perspective carousel with mouse-tracking tilt effect and full-screen modal.

#### **Navigation**
Auto-hide on scroll, active section tracking, and smooth scroll to sections.

#### **Gradient Mesh**
WebGL-powered animations with mouse-interactive gradients and performance optimizations.

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Add ARIA labels for accessibility

### Performance
- Use `useCallback` and `useMemo` for expensive operations
- Implement lazy loading for images
- Use `requestAnimationFrame` for animations
- Respect `prefers-reduced-motion`
- Optimize bundle size

### Accessibility
- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Maintain proper heading hierarchy
- Test with screen readers
- Provide alternative text for images

## 📊 Performance Metrics

Target metrics:
- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🐛 Known Issues

1. **Build Warnings**: TypeScript and ESLint errors are currently ignored during builds
   - Location: `next.config.mjs`
   - Fix: Remove `ignoreBuildErrors` and `ignoreDuringBuilds` flags

2. **Placeholder Content**: Some links and content are placeholders
   - GitHub/social links need updating
   - Resume PDF needs to be added
   - Project demo links need real URLs

## 🗺️ Roadmap

### Phase 1: Core Improvements
- [ ] Fix build warnings and errors
- [ ] Add actual resume PDF
- [ ] Update social media links
- [ ] Connect contact form to backend

### Phase 2: Testing
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add visual regression tests

### Phase 3: Features
- [ ] Add blog section
- [ ] Implement dark/light theme toggle
- [ ] Add loading skeletons
- [ ] Add service worker for offline support

### Phase 4: Optimization
- [ ] Optimize bundle size
- [ ] Add image optimization
- [ ] Implement code splitting
- [ ] Add performance monitoring

## 📄 License

This project is private and proprietary.

## 👤 Author

**Joshua Muli**
- Full-Stack Engineer & Security Researcher
- Website: [joshua-muli.dev](https://joshua-muli.dev)
- GitHub: [@joshuamuli](https://github.com/joshuamuli)
- Twitter: [@joshuamuli](https://twitter.com/joshuamuli)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component system
- [Vercel](https://vercel.com/) - Hosting platform

