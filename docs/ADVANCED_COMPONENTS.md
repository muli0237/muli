# Advanced Interactive Components

## 🎉 Overview

This portfolio now includes **five premium interactive components** with advanced animations:

1. **ElectricBorder** - Animated glowing borders
2. **ProfileCard** - 3D interactive profile cards
3. **GooeyNav** - Particle burst navigation
4. **StaggeredMenu** - Full-screen animated menu
5. **SplashCursor** - Custom animated cursor with particle effects

---

## 📦 Installation

All components are already integrated. Dependencies:

```bash
npm install gsap  # For StaggeredMenu
```

---

## 🌟 Component Summary

| Component | Animation Library | Bundle Size | Complexity | Use Case |
|-----------|------------------|-------------|------------|----------|
| ElectricBorder | Canvas API | ~3KB | Low | Borders, wrappers |
| ProfileCard | Canvas + RAF | ~5KB | Medium | Profile displays |
| GooeyNav | CSS + DOM | ~4KB | Medium | Navigation bars |
| StaggeredMenu | GSAP | ~8KB | High | Full-screen menus |
| SplashCursor | Canvas + RAF | ~5KB | Medium | Custom cursor |

---

## ⚡ ElectricBorder

### Quick Start

```tsx
import { ElectricBorder } from '@/components/ui/electric-border'

<ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5} thickness={3}>
  <YourComponent />
</ElectricBorder>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `#7df9ff` | Border color (hex) |
| `speed` | `number` | `1` | Animation speed (0.1-2.0) |
| `chaos` | `number` | `0.5` | Distortion intensity (0-1) |
| `thickness` | `number` | `2` | Border thickness (px) |

### Examples

```tsx
// Calm border
<ElectricBorder color="#6366f1" speed={0.5} chaos={0.2} thickness={2}>

// Energetic border
<ElectricBorder color="#ef4444" speed={2.0} chaos={1.0} thickness={4}>
```

---

## 🎴 ProfileCard

### Quick Start

```tsx
import { ProfileCard } from '@/components/ui/profile-card'

<ProfileCard
  avatarUrl="/your-photo.jpg"
  name="Your Name"
  title="Your Title"
  handle="yourhandle"
  onContactClick={() => console.log('Contact!')}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarUrl` | `string` | required | Main avatar image |
| `name` | `string` | required | Display name |
| `title` | `string` | required | Job title/role |
| `handle` | `string` | required | Social handle |
| `enableTilt` | `boolean` | `true` | Enable 3D tilt |
| `enableMobileTilt` | `boolean` | `false` | Enable gyroscope |
| `onContactClick` | `() => void` | - | Contact handler |

### Features

- ✅ 3D tilt effect following mouse
- ✅ Device orientation support (mobile)
- ✅ Shine and glare effects
- ✅ Customizable gradients
- ✅ Image loading states

---

## 🎨 GooeyNav

### Quick Start

```tsx
import { GooeyNav } from '@/components/ui/gooey-nav'
import { GooeyFilter } from '@/components/ui/gooey-filter'

<GooeyFilter />
<GooeyNav
  items={[
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
  ]}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `GooeyNavItem[]` | required | Navigation items |
| `animationTime` | `number` | `600` | Animation duration (ms) |
| `particleCount` | `number` | `15` | Number of particles |
| `particleDistances` | `[number, number]` | `[90, 10]` | Start/end radius |
| `colors` | `number[]` | `[1,2,3,4]` | Color indices |

### Features

- ✅ Particle burst animation
- ✅ Gooey blob effect (SVG filter)
- ✅ Smooth transitions
- ✅ Keyboard navigation
- ✅ Responsive design

---

## 🎭 StaggeredMenu

### Quick Start

```tsx
import { StaggeredMenu } from '@/components/ui/staggered-menu'

<StaggeredMenu
  position="right"
  items={[
    { label: 'Home', ariaLabel: 'Go to home', link: '#home' },
  ]}
  socialItems={[
    { label: 'GitHub', link: 'https://github.com' },
  ]}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'left' \| 'right'` | `'right'` | Menu position |
| `items` | `StaggeredMenuItem[]` | `[]` | Menu items |
| `socialItems` | `StaggeredMenuSocialItem[]` | `[]` | Social links |
| `colors` | `string[]` | `['#B19EEF', '#5227FF']` | Layer colors |
| `displaySocials` | `boolean` | `true` | Show social links |
| `displayItemNumbering` | `boolean` | `true` | Show item numbers |
| `isFixed` | `boolean` | `false` | Fixed positioning |

### Features

- ✅ GSAP-powered animations
- ✅ Staggered layer reveals
- ✅ Text cycling effect
- ✅ Icon rotation
- ✅ Escape key support
- ✅ Reduced motion support

---

## 🖱️ SplashCursor

### Quick Start

```tsx
import { CursorProvider } from '@/components/cursor-provider'

<CursorProvider enabled={true} color="#7df9ff" size={24}>
  <YourApp />
</CursorProvider>
```

### Props (CursorProvider)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Enable/disable cursor |
| `color` | `string` | `#7df9ff` | Cursor color (hex) |
| `size` | `number` | `20` | Cursor size (px) |
| `trailLength` | `number` | `20` | Trail point count |
| `particleCount` | `number` | `5` | Particles per click |

### Features

- ✅ Smooth cursor following with easing
- ✅ Particle trail effects
- ✅ Click burst animations
- ✅ Automatic mobile detection
- ✅ Reduced motion support
- ✅ Canvas-based rendering

---

## 🎯 Usage Examples

### Combining Components

```tsx
// Profile card with electric border
<ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5}>
  <ProfileCard
    avatarUrl="/photo.jpg"
    name="Joshua Muli"
    title="Full-Stack Engineer"
    enableTilt={true}
  />
</ElectricBorder>

// Button with electric border
<ElectricBorder color="#ec4899" speed={1.0} chaos={0.5}>
  <Button size="lg">Click Me</Button>
</ElectricBorder>

// Card with electric border
<ElectricBorder color="#6366f1" speed={0.8} chaos={0.3}>
  <Card className="p-8">
    <h3>Amazing Content</h3>
  </Card>
</ElectricBorder>
```

### Navigation Setup

```tsx
// Option 1: Gooey Navigation
<GooeyFilter />
<GooeyNav items={navItems} />

// Option 2: Staggered Menu
<StaggeredMenu
  position="right"
  items={menuItems}
  socialItems={socialItems}
  isFixed={true}
/>
```

---

## ♿ Accessibility

All components follow accessibility best practices:

- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ `prefers-reduced-motion` support
- ✅ Semantic HTML
- ✅ Screen reader friendly

---

## 🎨 Customization

### Color Schemes

```tsx
// Cyan theme
<ElectricBorder color="#7df9ff" />

// Purple theme
<ElectricBorder color="#a78bfa" />

// Pink theme
<ElectricBorder color="#ec4899" />

// Green theme
<ElectricBorder color="#10b981" />
```

### Animation Speeds

```tsx
// Slow and calm
<ElectricBorder speed={0.5} chaos={0.2} />

// Medium energy
<ElectricBorder speed={1.0} chaos={0.5} />

// Fast and chaotic
<ElectricBorder speed={2.0} chaos={1.0} />
```

---

## 📱 Responsive Design

All components are fully responsive:

- **Desktop**: Full features enabled
- **Tablet**: Optimized layouts
- **Mobile**: Touch-friendly, optional gyroscope

---

## 🚀 Performance

### Optimizations

- ✅ `requestAnimationFrame` for smooth 60fps
- ✅ Canvas rendering for ElectricBorder
- ✅ Memoization with `React.memo`
- ✅ `useCallback` for stable references
- ✅ Proper cleanup on unmount
- ✅ Lazy loading for images

### Bundle Sizes

```
ElectricBorder:  ~3KB (gzipped)
ProfileCard:     ~5KB (gzipped)
GooeyNav:        ~4KB (gzipped)
StaggeredMenu:   ~8KB + GSAP (~50KB)
SplashCursor:    ~5KB (gzipped)
```

---

## 🧪 Testing

Visit the demo page to test all components:

```
http://localhost:3000/demo
```

---

## 📚 Related Documentation

- [Electric Border & Profile Card](./ELECTRIC_BORDER_AND_PROFILE_CARD.md)
- [Components Overview](./COMPONENTS.md)
- [Animations Guide](./ANIMATIONS.md)

---

## 🎉 Credits

- **ElectricBorder**: Custom implementation
- **ProfileCard**: Inspired by [@BalintFerenczy](https://codepen.io/BalintFerenczy/pen/KwdoyEN)
- **GooeyNav**: Custom implementation with SVG filters
- **StaggeredMenu**: GSAP-powered custom implementation

---

## 🐛 Troubleshooting

### ElectricBorder not animating
- Check `prefers-reduced-motion` setting
- Verify canvas support in browser

### ProfileCard not tilting
- Ensure `enableTilt={true}`
- Check for CSS `pointer-events: none`

### GooeyNav particles not showing
- Verify `GooeyFilter` is rendered
- Check SVG filter support

### StaggeredMenu not opening
- Check GSAP installation
- Verify no z-index conflicts

---

## 📞 Support

For issues or questions, check the documentation or create an issue in the repository.

