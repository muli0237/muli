# 🚀 DevOps Documentation

Complete DevOps setup for Joshua Portfolio with Docker and Kubernetes.

---

## 📋 Table of Contents

1. [Docker Setup](#docker-setup)
2. [Docker Compose](#docker-compose)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [CI/CD Pipelines](#cicd-pipelines)
5. [Monitoring & Logging](#monitoring--logging)
6. [Security](#security)
7. [Troubleshooting](#troubleshooting)

---

## 🐳 Docker Setup

### Build Docker Image

```bash
# Build image locally
docker build -t joshua-portfolio:latest .

# Build with specific tag
docker build -t joshua-portfolio:v1.0.0 .

# Build with BuildKit (faster)
DOCKER_BUILDKIT=1 docker build -t joshua-portfolio:latest .
```

### Run Docker Container

```bash
# Run container
docker run -p 3000:3000 joshua-portfolio:latest

# Run with environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=http://localhost:3000 \
  joshua-portfolio:latest

# Run in background
docker run -d -p 3000:3000 --name portfolio joshua-portfolio:latest

# View logs
docker logs -f portfolio

# Stop container
docker stop portfolio

# Remove container
docker rm portfolio
```

### Docker Image Details

- **Base Image**: `node:18-alpine`
- **Multi-stage Build**: 3 stages (deps, builder, runner)
- **Non-root User**: Runs as `nextjs` (UID 1001)
- **Health Check**: HTTP endpoint check every 30s
- **Size**: ~200MB (optimized)

---

## 🐳 Docker Compose

### Start Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v
```

### Services

1. **app** - Next.js application (port 3000)
2. **nginx** - Reverse proxy (port 80, 443)

### Environment Variables

Create `.env` file:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (1.24+)
- `kubectl` configured
- Docker image pushed to registry

### Deploy to Kubernetes

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Apply all manifests
kubectl apply -f k8s/

# Or apply individually
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/rbac.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/pdb.yaml
kubectl apply -f k8s/networkpolicy.yaml
kubectl apply -f k8s/ingress.yaml
```

### Verify Deployment

```bash
# Check pods
kubectl get pods -n joshua-portfolio

# Check services
kubectl get svc -n joshua-portfolio

# Check ingress
kubectl get ingress -n joshua-portfolio

# View pod logs
kubectl logs -n joshua-portfolio -l app=joshua-portfolio

# Describe deployment
kubectl describe deployment joshua-portfolio-app -n joshua-portfolio
```

### Scale Deployment

```bash
# Manual scaling
kubectl scale deployment joshua-portfolio-app \
  --replicas=5 \
  -n joshua-portfolio

# Check HPA status
kubectl get hpa -n joshua-portfolio
```

### Update Deployment

```bash
# Update image
kubectl set image deployment/joshua-portfolio-app \
  app=joshua-portfolio:v1.0.1 \
  -n joshua-portfolio

# Rollout status
kubectl rollout status deployment/joshua-portfolio-app -n joshua-portfolio

# Rollback if needed
kubectl rollout undo deployment/joshua-portfolio-app -n joshua-portfolio
```

---

## 🔄 CI/CD Pipelines

### GitHub Actions Workflows

#### 1. Docker Build & Push (`.github/workflows/docker-build.yml`)

- Builds Docker image on push/PR
- Pushes to GitHub Container Registry
- Runs Trivy vulnerability scan
- Caches layers for speed

**Triggers**:
- Push to `main` or `develop`
- Tags matching `v*`
- Pull requests

#### 2. Kubernetes Deploy (`.github/workflows/k8s-deploy.yml`)

- Validates K8s manifests
- Applies to cluster
- Waits for rollout
- Sends Slack notification

**Triggers**:
- Push to `main` with K8s changes
- Manual workflow dispatch

#### 3. Tests & Quality (`.github/workflows/tests.yml`)

- Linting (ESLint)
- Type checking (TypeScript)
- Build verification
- Security scanning (npm audit, Snyk)
- Docker build test

**Triggers**:
- Push to `main` or `develop`
- Pull requests

### Setup GitHub Secrets

```bash
# Required secrets
GITHUB_TOKEN          # Auto-provided
KUBE_CONFIG          # Base64 encoded kubeconfig
SLACK_WEBHOOK_URL    # For notifications
SNYK_TOKEN           # For security scanning
```

---

## 📊 Monitoring & Logging

### Kubernetes Monitoring

```bash
# View resource usage
kubectl top nodes
kubectl top pods -n joshua-portfolio

# Watch deployment
kubectl get pods -n joshua-portfolio -w

# Stream logs
kubectl logs -f deployment/joshua-portfolio-app -n joshua-portfolio
```

### Prometheus Integration

Add to deployment for Prometheus scraping:

```yaml
annotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "3000"
```

---

## 🔒 Security

### Security Features

- ✅ Non-root user (UID 1001)
- ✅ Read-only root filesystem
- ✅ No privilege escalation
- ✅ Network policies
- ✅ RBAC configured
- ✅ Pod security standards
- ✅ Health checks
- ✅ Resource limits

### SSL/TLS

- Cert-manager integration
- Let's Encrypt certificates
- Auto-renewal

---

## 🔧 Troubleshooting

### Pod not starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n joshua-portfolio

# View logs
kubectl logs <pod-name> -n joshua-portfolio

# Check events
kubectl get events -n joshua-portfolio
```

### Image pull errors

```bash
# Check image availability
docker pull joshua-portfolio:latest

# Verify registry credentials
kubectl get secrets -n joshua-portfolio
```

### Service not accessible

```bash
# Check service
kubectl get svc -n joshua-portfolio

# Port forward for testing
kubectl port-forward svc/joshua-portfolio-service 3000:80 -n joshua-portfolio
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)


