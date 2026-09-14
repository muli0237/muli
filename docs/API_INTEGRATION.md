# API Integration Guide

Guide for implementing backend functionality and API integrations.

## Table of Contents
- [Contact Form API](#contact-form-api)
- [Newsletter Subscription](#newsletter-subscription)
- [Analytics Events](#analytics-events)
- [Resume Download](#resume-download)
- [Blog API (Future)](#blog-api-future)

---

## Contact Form API

### Overview
The contact form needs a backend endpoint to handle form submissions and send emails.

### Implementation Options

#### Option 1: Next.js API Route (Recommended)

**File**: `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate data
    const validatedData = contactSchema.parse(body)
    
    // Send email (using your preferred service)
    await sendEmail({
      to: 'joshua@joshua-muli.dev',
      from: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.name}`,
      text: validatedData.message,
    })
    
    // Return success response
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
```

#### Option 2: Serverless Function (Vercel)

**File**: `api/contact.ts`

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const validatedData = contactSchema.parse(req.body)
    
    // Send email
    await sendEmail(validatedData)
    
    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    return res.status(400).json({ error: 'Validation failed' })
  }
}
```

#### Option 3: Third-Party Service

**Services**:
- [Formspree](https://formspree.io/)
- [Getform](https://getform.io/)
- [FormSubmit](https://formsubmit.co/)
- [Web3Forms](https://web3forms.com/)

**Example with Formspree**:
```typescript
const handleSubmit = async (data: FormData) => {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
  
  return response.json()
}
```

### Email Services

#### SendGrid
```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

async function sendEmail(data: ContactData) {
  const msg = {
    to: 'joshua@joshua-muli.dev',
    from: 'noreply@joshua-muli.dev',
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.name}`,
    text: data.message,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  }
  
  await sgMail.send(msg)
}
```

#### Resend
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail(data: ContactData) {
  await resend.emails.send({
    from: 'noreply@joshua-muli.dev',
    to: 'joshua@joshua-muli.dev',
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  })
}
```

#### Nodemailer (SMTP)
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT!),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendEmail(data: ContactData) {
  await transporter.sendMail({
    from: 'noreply@joshua-muli.dev',
    to: 'joshua@joshua-muli.dev',
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.name}`,
    text: data.message,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  })
}
```

### Frontend Integration

**Update**: `components/contact-section.tsx`

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    setIsSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  } catch (error) {
    console.error('Error:', error)
    // Show error toast
    toast.error('Failed to send message. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
```

### Rate Limiting

Protect your API from abuse:

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
})

export async function POST(request: NextRequest) {
  // Get IP address
  const ip = request.ip ?? '127.0.0.1'
  
  // Check rate limit
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  // Process request...
}
```

### Spam Protection

#### reCAPTCHA v3
```typescript
// Frontend
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Get reCAPTCHA token
  const token = await grecaptcha.execute(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    { action: 'submit' }
  )
  
  // Send with form data
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ ...formData, recaptchaToken: token }),
  })
}

// Backend
async function verifyRecaptcha(token: string) {
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  )
  
  const data = await response.json()
  return data.success && data.score > 0.5
}
```

---

## Newsletter Subscription

### Implementation

**File**: `app/api/newsletter/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = emailSchema.parse(body)
    
    // Add to mailing list (e.g., Mailchimp, ConvertKit)
    await addToMailingList(email)
    
    return NextResponse.json({ message: 'Subscribed successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 400 }
    )
  }
}
```

### Mailchimp Integration
```typescript
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

async function addToMailingList(email: string) {
  await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
    email_address: email,
    status: 'subscribed',
  })
}
```

---

## Analytics Events

### Custom Event Tracking

**File**: `lib/analytics.ts`

```typescript
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', eventName, properties)
  }
  
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

// Usage
trackEvent('project_viewed', { projectId: 1, projectName: 'E-Commerce' })
trackEvent('resume_downloaded')
trackEvent('contact_form_submitted')
```

### Track Component Interactions

```typescript
// In components
import { trackEvent } from '@/lib/analytics'

const handleProjectClick = (project: Project) => {
  trackEvent('project_clicked', {
    projectId: project.id,
    projectTitle: project.title,
  })
  setSelectedProject(project)
}

const handleResumeDownload = () => {
  trackEvent('resume_downloaded')
  window.open('/resume.pdf', '_blank')
}
```

---

## Resume Download

### Static File Approach

1. **Add PDF to public folder**
   ```
   public/
   └── resume.pdf
   ```

2. **Update component**
   ```typescript
   const handleDownloadResume = () => {
     trackEvent('resume_downloaded')
     window.open('/resume.pdf', '_blank')
   }
   ```

### Dynamic Generation

**File**: `app/api/resume/route.ts`

```typescript
import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function GET() {
  // Create PDF
  const doc = new PDFDocument()
  const chunks: Buffer[] = []
  
  doc.on('data', (chunk) => chunks.push(chunk))
  
  // Add content
  doc.fontSize(25).text('Joshua Muli', 100, 100)
  doc.fontSize(12).text('Full-Stack Engineer & Security Researcher', 100, 130)
  // ... more content
  
  doc.end()
  
  // Wait for PDF to finish
  await new Promise((resolve) => doc.on('end', resolve))
  
  // Combine chunks
  const pdfBuffer = Buffer.concat(chunks)
  
  // Return PDF
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="joshua-muli-resume.pdf"',
    },
  })
}
```

---

## Blog API (Future)

### File-Based (Markdown)

**Structure**:
```
content/
└── blog/
    ├── post-1.md
    ├── post-2.md
    └── post-3.md
```

**API Route**: `app/api/blog/route.ts`

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
    }
  })
  
  return NextResponse.json(posts)
}
```

### Database-Based (PostgreSQL + Prisma)

**Schema**: `prisma/schema.prisma`

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String
  excerpt   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**API Route**: `app/api/blog/route.ts`

```typescript
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json(posts)
}
```

---

## Environment Variables

### Required Variables

```env
# Email Service
SENDGRID_API_KEY=your_sendgrid_key
# or
RESEND_API_KEY=your_resend_key
# or
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Rate Limiting (optional)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Spam Protection (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Newsletter (optional)
MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_list_id

# Database (future)
DATABASE_URL=postgresql://user:pass@host:5432/db
```

---

## Testing APIs

### Using curl
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello World"}'
```

### Using Postman
1. Create new request
2. Set method to POST
3. Set URL to `http://localhost:3000/api/contact`
4. Add JSON body
5. Send request

---

## Security Best Practices

1. ✅ Validate all input data
2. ✅ Use rate limiting
3. ✅ Implement CORS properly
4. ✅ Sanitize user input
5. ✅ Use environment variables for secrets
6. ✅ Add spam protection
7. ✅ Log errors securely
8. ✅ Use HTTPS in production

---

**Last Updated**: 2025-01-XX

