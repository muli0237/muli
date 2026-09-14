# Contributing Guide

Thank you for considering contributing to this portfolio project! This guide will help you get started.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Our Standards
- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what is best for the community
- ✅ Show empathy towards others

### Unacceptable Behavior
- ❌ Harassment or discriminatory language
- ❌ Trolling or insulting comments
- ❌ Public or private harassment
- ❌ Publishing others' private information

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm
- Git
- Code editor (VS Code recommended)

### Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio/joshua-portfolio

# Add upstream remote
git remote add upstream https://github.com/joshuamuli/portfolio.git
```

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Workflow

### 1. Create a Branch
```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style changes (formatting, etc.)
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

Examples:
- `feature/add-blog-section`
- `fix/carousel-mobile-bug`
- `docs/update-readme`

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run linter
pnpm lint

# Build to check for errors
pnpm build

# Test in browser
pnpm dev
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add blog section"
```

See [Commit Guidelines](#commit-guidelines) for commit message format.

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request
1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit for review

---

## Coding Standards

### TypeScript
- ✅ Use TypeScript for all new files
- ✅ Define proper types/interfaces
- ✅ Avoid `any` type
- ✅ Use type inference when possible

```typescript
// Good
interface Project {
  id: number
  title: string
  tech: string[]
}

const project: Project = {
  id: 1,
  title: "My Project",
  tech: ["React", "TypeScript"],
}

// Bad
const project: any = {
  id: 1,
  title: "My Project",
}
```

### React Components
- ✅ Use functional components with hooks
- ✅ Use descriptive component names
- ✅ Keep components focused and small
- ✅ Extract reusable logic into custom hooks

```typescript
// Good
export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Card onMouseEnter={() => setIsHovered(true)}>
      {/* ... */}
    </Card>
  )
}

// Bad
export default function Card1(props: any) {
  // ...
}
```

### Styling
- ✅ Use Tailwind CSS utility classes
- ✅ Use `cn()` utility for conditional classes
- ✅ Follow existing color scheme
- ✅ Ensure responsive design

```typescript
// Good
<div className={cn(
  "flex items-center gap-4",
  isActive && "bg-primary text-primary-foreground"
)}>

// Bad
<div style={{ display: "flex", gap: "16px" }}>
```

### File Organization
```
components/
├── feature-name/
│   ├── index.tsx          # Main component
│   ├── feature-card.tsx   # Sub-component
│   └── use-feature.ts     # Custom hook
```

### Naming Conventions
- **Components**: PascalCase (`ProjectCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useProjects.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **Types/Interfaces**: PascalCase (`ProjectData`)

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes

### Examples
```bash
# Feature
git commit -m "feat(carousel): add auto-play functionality"

# Bug fix
git commit -m "fix(navigation): resolve scroll detection on mobile"

# Documentation
git commit -m "docs(readme): add deployment instructions"

# Style
git commit -m "style(hero): format code with prettier"

# Refactor
git commit -m "refactor(contact): extract form validation logic"

# Performance
git commit -m "perf(gradient): optimize canvas rendering"

# Test
git commit -m "test(carousel): add unit tests for navigation"

# Chore
git commit -m "chore(deps): update dependencies"
```

### Commit Message Rules
- ✅ Use present tense ("add" not "added")
- ✅ Use imperative mood ("move" not "moves")
- ✅ Keep subject line under 72 characters
- ✅ Capitalize first letter of subject
- ✅ No period at end of subject
- ✅ Separate subject from body with blank line
- ✅ Wrap body at 72 characters
- ✅ Use body to explain what and why, not how

---

## Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Build succeeds (`pnpm build`)
- [ ] Linter passes (`pnpm lint`)

### PR Title Format
Follow same format as commit messages:
```
feat(carousel): add keyboard navigation
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added X feature
- Fixed Y bug
- Updated Z documentation

## Screenshots (if applicable)
[Add screenshots here]

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address any requested changes
4. **Approval**: PR is approved
5. **Merge**: PR is merged to main branch

### After Merge
```bash
# Update your local main branch
git checkout main
git pull upstream main

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## Testing

### Manual Testing
1. **Visual Testing**
   - Check all sections render correctly
   - Verify animations work smoothly
   - Test responsive design
   - Check dark theme

2. **Interaction Testing**
   - Click all buttons and links
   - Test form submission
   - Verify navigation works
   - Test keyboard navigation

3. **Browser Testing**
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari
   - Mobile browsers

### Automated Testing (To Be Implemented)
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

### Performance Testing
```bash
# Lighthouse
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

---

## Component Development

### Creating New Components

1. **Create component file**
```typescript
// components/my-component.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MyComponentProps {
  title: string
  onAction?: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="p-4">
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

2. **Add to page**
```typescript
// app/page.tsx
import { MyComponent } from "@/components/my-component"

export default function Home() {
  return (
    <>
      <MyComponent title="Hello" />
    </>
  )
}
```

3. **Document component**
Add to `docs/COMPONENTS.md`

---

## Adding New Sections

### 1. Create Section Component
```typescript
// components/new-section.tsx
"use client"

export function NewSection() {
  return (
    <section id="new-section" className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">
          New Section
        </h2>
        {/* Content */}
      </div>
    </section>
  )
}
```

### 2. Add to Main Page
```typescript
// app/page.tsx
import { NewSection } from "@/components/new-section"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Existing sections */}
        <NewSection />
      </main>
    </>
  )
}
```

### 3. Update Navigation
```typescript
// components/navigation.tsx
const navItems = [
  // Existing items
  { id: "new-section", label: "New Section" },
]
```

---

## Style Guide

### Colors
Use CSS variables from theme:
```typescript
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground"
```

### Spacing
Use Tailwind spacing scale:
```typescript
className="p-4"      // 1rem (16px)
className="mb-8"     // 2rem (32px)
className="gap-6"    // 1.5rem (24px)
```

### Typography
```typescript
className="text-5xl font-bold"           // Headings
className="text-lg text-muted-foreground" // Body text
className="font-mono"                     // Code/terminal
```

### Animations
```typescript
className="animate-fade-in"
className="transition-all duration-300"
className="hover:scale-105"
```

---

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Questions?
- Open an issue on GitHub
- Check existing issues and PRs
- Review documentation in `/docs`

---

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Project README (for significant contributions)
- Release notes

Thank you for contributing! 🎉

