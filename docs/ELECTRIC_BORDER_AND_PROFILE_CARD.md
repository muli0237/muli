# Electric Border & Profile Card Components

## Overview

This document covers two new interactive components added to the portfolio:

1. **ElectricBorder** - Animated, glowing border effect with canvas-based animation
2. **ProfileCard** - 3D interactive profile card with tilt effects and device orientation support

---

## 🌟 ElectricBorder Component

### Description
A dynamic, animated border component that creates an "electric" glowing effect around its children using HTML5 Canvas.

### Features
- ⚡ Canvas-based animation for smooth 60fps performance
- 🎨 Customizable color, speed, chaos, and thickness
- ♿ Respects `prefers-reduced-motion` accessibility setting
- 📱 Responsive and works on all screen sizes
- 🔄 Automatic cleanup to prevent memory leaks

### Usage

```tsx
import { ElectricBorder } from '@/components/ui/electric-border'

<ElectricBorder 
  color="#7df9ff"      // Hex color for the border
  speed={1.2}          // Animation speed (0.1 - 2.0)
  chaos={0.5}          // Distortion amount (0 - 1)
  thickness={3}        // Border thickness in pixels
  style={{ borderRadius: '1rem' }}
>
  <YourComponent />
</ElectricBorder>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Content to wrap |
| `color` | `string` | `#7df9ff` | Border color (hex) |
| `speed` | `number` | `1` | Animation speed multiplier |
| `chaos` | `number` | `0.5` | Electric distortion intensity |
| `thickness` | `number` | `2` | Border thickness in pixels |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Inline styles |

### Examples in Portfolio

#### Hero Section Stats
```tsx
<ElectricBorder color="#6366f1" speed={0.8} chaos={0.3} thickness={2}>
  <div className="stat-card">
    <h3>5+</h3>
    <p>Years Experience</p>
  </div>
</ElectricBorder>
```

#### CTA Buttons
```tsx
<ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5} thickness={3}>
  <Button>View My Work</Button>
</ElectricBorder>
```

#### Project Cards
```tsx
<ElectricBorder 
  color={isActive ? "#7df9ff" : "#6366f1"} 
  speed={isActive ? 1.5 : 0.8}
>
  <Card>Project Content</Card>
</ElectricBorder>
```

---

## 🎴 ProfileCard Component

### Description
An interactive 3D profile card with mouse tracking, tilt effects, and device orientation support. Perfect for showcasing personal information with a modern, engaging interface.

### Features
- 🎯 3D tilt effect following mouse movement
- 📱 Device orientation support (gyroscope on mobile)
- ✨ Shine and glare effects
- 🎨 Customizable gradients and textures
- ♿ Accessibility-first design
- 🖼️ Image loading states
- 🎭 Smooth animations with easing

### Usage

```tsx
import { ProfileCard } from '@/components/ui/profile-card'

<ProfileCard
  avatarUrl="/your-photo.jpg"
  name="Joshua Muli"
  title="Full-Stack Engineer"
  handle="joshuamuli"
  status="Available"
  onContactClick={() => console.log('Contact clicked')}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `avatarUrl` | `string` | `/placeholder.svg` | Main avatar image |
| `miniAvatarUrl` | `string` | `avatarUrl` | Small avatar in footer |
| `name` | `string` | `Joshua Muli` | Display name |
| `title` | `string` | `Full-Stack Engineer` | Job title/role |
| `handle` | `string` | `joshuamuli` | Social handle |
| `status` | `string` | `Available` | Current status |
| `contactText` | `string` | `Contact` | Button text |
| `showUserInfo` | `boolean` | `true` | Show footer info |
| `enableTilt` | `boolean` | `true` | Enable 3D tilt |
| `enableMobileTilt` | `boolean` | `false` | Enable gyroscope |
| `mobileTiltSensitivity` | `number` | `5` | Gyroscope sensitivity |
| `behindGradient` | `string` | default | Background gradient |
| `innerGradient` | `string` | default | Inner overlay gradient |
| `showBehindGradient` | `boolean` | `true` | Show background |
| `iconUrl` | `string` | - | Pattern icon URL |
| `grainUrl` | `string` | - | Grain texture URL |
| `className` | `string` | `''` | Additional classes |
| `onContactClick` | `() => void` | - | Contact button handler |

### Animation System

The ProfileCard uses a sophisticated animation system:

1. **Pointer Tracking**: Calculates mouse position relative to card
2. **3D Transform**: Applies rotation based on pointer position
3. **Smooth Transitions**: Uses `requestAnimationFrame` for 60fps
4. **Easing**: Cubic easing for natural movement
5. **Auto-center**: Returns to center position on mouse leave

### CSS Variables

The component sets these CSS variables dynamically:

- `--pointer-x`: Horizontal position (0-100%)
- `--pointer-y`: Vertical position (0-100%)
- `--rotate-x`: X-axis rotation (-10 to 10deg)
- `--rotate-y`: Y-axis rotation (-12.5 to 12.5deg)
- `--pointer-from-center`: Distance from center (0-1)

### Examples in Portfolio

#### About Section
```tsx
<ElectricBorder color="#7df9ff" speed={1.2} chaos={0.5}>
  <ProfileCard
    avatarUrl="/albert-dera-ILip77SbmOE-unsplash.jpg"
    name="Joshua Muli"
    title="Full-Stack Engineer & Security Researcher"
    handle="joshuamuli"
    status="Available for Work"
    onContactClick={handleContactClick}
    enableTilt={true}
  />
</ElectricBorder>
```

#### Contact Section
```tsx
<ElectricBorder color="#a78bfa" speed={1.0} chaos={0.6}>
  <ProfileCard
    avatarUrl="/albert-dera-ILip77SbmOE-unsplash.jpg"
    name="Joshua Muli"
    title="Full-Stack Engineer & Security Researcher"
    status="Open to Opportunities"
    contactText="Start a Conversation"
    onContactClick={scrollToForm}
    enableMobileTilt={true}
  />
</ElectricBorder>
```

---

## 🎨 Combining Both Components

The real magic happens when you combine ElectricBorder with ProfileCard:

```tsx
<ElectricBorder 
  color="#7df9ff" 
  speed={1.2} 
  chaos={0.5} 
  thickness={3}
  style={{ borderRadius: '1rem' }}
>
  <ProfileCard
    avatarUrl="/your-photo.jpg"
    name="Your Name"
    title="Your Title"
    enableTilt={true}
    enableMobileTilt={true}
    onContactClick={() => {
      // Handle contact action
    }}
  />
</ElectricBorder>
```

This creates a stunning effect with:
- Animated electric border
- 3D tilt on hover
- Shine and glare effects
- Smooth transitions

---

## 🎯 Performance Considerations

### ElectricBorder
- Uses single `requestAnimationFrame` loop
- Canvas is only redrawn when animating
- Respects `prefers-reduced-motion`
- Proper cleanup on unmount

### ProfileCard
- Memoized with `React.memo`
- `useCallback` for event handlers
- `useMemo` for expensive calculations
- Single RAF loop per card
- Lazy image loading

---

## ♿ Accessibility

Both components are built with accessibility in mind:

- ✅ Respects `prefers-reduced-motion`
- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Alt text on images
- ✅ Focus indicators
- ✅ Semantic HTML

---

## 📱 Mobile Support

### ElectricBorder
- Fully responsive
- Touch-friendly
- Optimized for mobile performance

### ProfileCard
- Touch events supported
- Optional gyroscope support (requires HTTPS)
- Permission request for device orientation
- Adjustable sensitivity

---

## 🎨 Customization

### Custom Gradients

```tsx
const customBehindGradient = `
  radial-gradient(circle at var(--pointer-x) var(--pointer-y),
    rgba(99, 102, 241, 0.8) 0%,
    transparent 60%
  )
`

const customInnerGradient = `
  linear-gradient(145deg, 
    rgba(10, 10, 10, 0.9) 0%, 
    rgba(99, 102, 241, 0.3) 100%
  )
`

<ProfileCard
  behindGradient={customBehindGradient}
  innerGradient={customInnerGradient}
/>
```

### Custom Colors

```tsx
// Cyan electric border
<ElectricBorder color="#00ffff" />

// Purple electric border
<ElectricBorder color="#a78bfa" />

// Green electric border
<ElectricBorder color="#10b981" />
```

---

## 🐛 Troubleshooting

### ElectricBorder not animating
- Check if `prefers-reduced-motion` is enabled
- Verify canvas is rendering (check browser console)
- Ensure parent has dimensions

### ProfileCard not tilting
- Check `enableTilt` prop is `true`
- Verify pointer events are not blocked
- Check for CSS `pointer-events: none`

### Mobile tilt not working
- Ensure HTTPS connection
- Check device orientation permission
- Verify `enableMobileTilt` is `true`

---

## 📚 Related Documentation

- [Components Overview](./COMPONENTS.md)
- [Animations Guide](./ANIMATIONS.md)
- [Architecture](./ARCHITECTURE.md)

---

## 🎉 Credits

- **ElectricBorder**: Custom implementation
- **ProfileCard**: Inspired by [@BalintFerenczy](https://codepen.io/BalintFerenczy/pen/KwdoyEN)

