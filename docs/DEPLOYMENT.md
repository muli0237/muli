# Deployment Guide

Complete guide for deploying the portfolio to various platforms.

## Table of Contents
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [AWS Amplify](#aws-amplify)
- [Docker](#docker)
- [Self-Hosted](#self-hosted)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)

---

## Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and offers the best integration.

### Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available)

### Deployment Steps

#### 1. Push to Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

#### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `joshua-portfolio`
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `.next`

#### 3. Environment Variables
Add in Vercel dashboard under "Settings" → "Environment Variables":
```env
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_FORM_ENDPOINT=your_form_endpoint
```

#### 4. Deploy
Click "Deploy" and wait for build to complete.

### Automatic Deployments
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Custom Domain
1. Go to "Settings" → "Domains"
2. Add your domain (e.g., `joshua-muli.dev`)
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Performance Optimization
Vercel automatically provides:
- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Compression

---

## Netlify

Alternative platform with similar features.

### Deployment Steps

#### 1. Create `netlify.toml`
```toml
[build]
  command = "cd joshua-portfolio && pnpm build"
  publish = "joshua-portfolio/.next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy via CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

#### 3. Or Deploy via Git
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect repository
4. Configure build settings:
   - **Base directory**: `joshua-portfolio`
   - **Build command**: `pnpm build`
   - **Publish directory**: `joshua-portfolio/.next`

### Environment Variables
Add in Netlify dashboard under "Site settings" → "Environment variables"

---

## AWS Amplify

Deploy to AWS infrastructure.

### Deployment Steps

#### 1. Install Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

#### 2. Initialize Amplify
```bash
cd joshua-portfolio
amplify init
```

#### 3. Add Hosting
```bash
amplify add hosting
# Choose: Hosting with Amplify Console
```

#### 4. Deploy
```bash
amplify publish
```

### Build Settings
Create `amplify.yml`:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd joshua-portfolio
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: joshua-portfolio/.next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## Docker

Containerize the application for any platform.

### Create Dockerfile

**File**: `joshua-portfolio/Dockerfile`

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start application
CMD ["pnpm", "start"]
```

### Create .dockerignore

**File**: `joshua-portfolio/.dockerignore`

```
node_modules
.next
.git
.gitignore
README.md
docs
*.log
.env*.local
```

### Build and Run

```bash
# Build image
docker build -t joshua-portfolio .

# Run container
docker run -p 3000:3000 joshua-portfolio

# Or with environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_FORM_ENDPOINT=your_endpoint \
  joshua-portfolio
```

### Docker Compose

**File**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  portfolio:
    build:
      context: ./joshua-portfolio
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_FORM_ENDPOINT=${FORM_ENDPOINT}
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Self-Hosted

Deploy on your own server (VPS, dedicated server, etc.).

### Prerequisites
- Ubuntu/Debian server
- Node.js 18+
- Nginx
- PM2 (process manager)

### Setup Steps

#### 1. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### 2. Clone and Build
```bash
# Clone repository
git clone <your-repo-url> /var/www/portfolio
cd /var/www/portfolio/joshua-portfolio

# Install dependencies
pnpm install

# Build application
pnpm build
```

#### 3. Configure PM2

**File**: `ecosystem.config.js`

```javascript
module.exports = {
  apps: [{
    name: 'joshua-portfolio',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/portfolio/joshua-portfolio',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
}
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Configure Nginx

**File**: `/etc/nginx/sites-available/portfolio`

```nginx
server {
    listen 80;
    server_name joshua-muli.dev www.joshua-muli.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. SSL with Let's Encrypt
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d joshua-muli.dev -d www.joshua-muli.dev
```

---

## Environment Variables

### Required Variables
```env
# Analytics (optional but recommended)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Contact Form (to be implemented)
NEXT_PUBLIC_FORM_ENDPOINT=https://api.example.com/contact

# API Keys (if needed)
NEXT_PUBLIC_API_KEY=your_api_key
```

### Setting Variables

**Vercel**:
```bash
vercel env add NEXT_PUBLIC_FORM_ENDPOINT
```

**Netlify**:
```bash
netlify env:set NEXT_PUBLIC_FORM_ENDPOINT your_value
```

**Docker**:
```bash
docker run -e NEXT_PUBLIC_FORM_ENDPOINT=your_value ...
```

**Self-Hosted**:
```bash
# Add to ecosystem.config.js
env: {
  NEXT_PUBLIC_FORM_ENDPOINT: 'your_value',
}
```

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Site loads correctly
- [ ] All sections visible
- [ ] Animations working
- [ ] Forms functional
- [ ] Images loading
- [ ] No console errors

### 2. Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --collect.url=https://your-site.com
```

### 3. SEO Verification
- [ ] Meta tags present
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Sitemap accessible
- [ ] Robots.txt configured

### 4. Analytics Setup
1. Verify Vercel Analytics working
2. Add Google Analytics (optional)
3. Set up error tracking (Sentry)

### 5. Monitoring
```bash
# PM2 monitoring (self-hosted)
pm2 monit

# View logs
pm2 logs joshua-portfolio
```

### 6. Backup Strategy
```bash
# Automated backups (self-hosted)
0 2 * * * /usr/bin/tar -czf /backups/portfolio-$(date +\%Y\%m\%d).tar.gz /var/www/portfolio
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

### Images Not Loading
- Check `next.config.mjs` image domains
- Verify image paths are correct
- Ensure images are in `public/` folder

### Fonts Not Loading
- Verify font files in `public/fonts/`
- Check font paths in `layout.tsx`
- Ensure CORS headers if using external fonts

### Performance Issues
- Enable compression (Gzip/Brotli)
- Optimize images (use AVIF/WebP)
- Enable caching headers
- Use CDN for static assets

---

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-url>
```

### Self-Hosted
```bash
# Using Git
git log --oneline
git checkout <commit-hash>
pnpm install
pnpm build
pm2 restart joshua-portfolio
```

---

## Continuous Deployment

### GitHub Actions

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: cd joshua-portfolio && pnpm install
      
      - name: Build
        run: cd joshua-portfolio && pnpm build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Dependencies updated
- [ ] No exposed API keys
- [ ] CORS configured properly
- [ ] Rate limiting on API routes
- [ ] Input validation on forms

---

## Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Test locally first
4. Check platform status pages
5. Contact platform support

---

**Last Updated**: 2025-01-XX

