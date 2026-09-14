# 🚀 DevOps Quick Start Guide

Get your portfolio running with Docker and Kubernetes in minutes!

---

## 📋 Prerequisites

- Docker & Docker Compose
- kubectl (for Kubernetes)
- Git

---

## 🐳 Docker Quick Start

### 1. Build Docker Image

```bash
# Build locally
docker build -t joshua-portfolio:latest .

# Or use the helper script
./scripts/docker-build.sh latest
```

### 2. Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Access Application

- **App**: http://localhost:3000
- **Nginx**: http://localhost:80

---

## ☸️ Kubernetes Quick Start

### 1. Setup DevOps Environment

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run setup script
./scripts/setup-devops.sh
```

### 2. Deploy to Kubernetes

```bash
# Deploy all manifests
./scripts/k8s-deploy.sh joshua-portfolio apply

# Check status
./scripts/k8s-deploy.sh joshua-portfolio status
```

### 3. Verify Deployment

```bash
# Check pods
kubectl get pods -n joshua-portfolio

# Check services
kubectl get svc -n joshua-portfolio

# View logs
kubectl logs -n joshua-portfolio -l app=joshua-portfolio
```

### 4. Access Application

```bash
# Port forward
kubectl port-forward svc/joshua-portfolio-service 3000:80 -n joshua-portfolio

# Access at http://localhost:3000
```

---

## 🔄 CI/CD Setup

### GitHub Actions

1. **Docker Build** (`.github/workflows/docker-build.yml`)
   - Builds and pushes Docker image
   - Runs security scans
   - Triggered on push/PR

2. **Kubernetes Deploy** (`.github/workflows/k8s-deploy.yml`)
   - Deploys to cluster
   - Validates manifests
   - Triggered on main branch

3. **Tests** (`.github/workflows/tests.yml`)
   - Linting, type checking
   - Build verification
   - Security scanning

### Setup Secrets

```bash
# Add to GitHub repository settings:
KUBE_CONFIG          # Base64 encoded kubeconfig
SLACK_WEBHOOK_URL    # For notifications
SNYK_TOKEN           # For security scanning
```

---

## 📊 Common Commands

### Docker

```bash
# Build
docker build -t joshua-portfolio:latest .

# Run
docker run -p 3000:3000 joshua-portfolio:latest

# Compose
docker-compose up -d
docker-compose logs -f
docker-compose down
```

### Kubernetes

```bash
# Deploy
kubectl apply -f k8s/

# Status
kubectl get pods -n joshua-portfolio
kubectl get svc -n joshua-portfolio

# Logs
kubectl logs -n joshua-portfolio -l app=joshua-portfolio

# Scale
kubectl scale deployment joshua-portfolio-app --replicas=5 -n joshua-portfolio

# Update
kubectl set image deployment/joshua-portfolio-app app=joshua-portfolio:v1.0.1 -n joshua-portfolio

# Rollback
kubectl rollout undo deployment/joshua-portfolio-app -n joshua-portfolio
```

---

## 🔒 Security Features

✅ Non-root user (UID 1001)
✅ Read-only root filesystem
✅ Network policies
✅ RBAC configured
✅ Health checks
✅ Resource limits
✅ Pod security standards

---

## 📈 Scaling

### Horizontal Pod Autoscaler (HPA)

```bash
# Check HPA status
kubectl get hpa -n joshua-portfolio

# Manual scaling
kubectl scale deployment joshua-portfolio-app --replicas=5 -n joshua-portfolio
```

**Auto-scaling Configuration**:
- Min replicas: 3
- Max replicas: 10
- CPU threshold: 70%
- Memory threshold: 80%

---

## 🔧 Troubleshooting

### Pod not starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n joshua-portfolio

# View logs
kubectl logs <pod-name> -n joshua-portfolio
```

### Image pull errors

```bash
# Check image
docker pull joshua-portfolio:latest

# Verify registry
kubectl get secrets -n joshua-portfolio
```

### Service not accessible

```bash
# Port forward
kubectl port-forward svc/joshua-portfolio-service 3000:80 -n joshua-portfolio

# Check service
kubectl get svc -n joshua-portfolio
```

---

## 📚 Full Documentation

For comprehensive guides, see:
- [DEVOPS.md](./DEVOPS.md) - Complete DevOps documentation
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Full project documentation
- [README.md](./README.md) - Quick start guide

---

## 🎯 Next Steps

1. ✅ Build Docker image
2. ✅ Test with Docker Compose
3. ✅ Deploy to Kubernetes
4. ✅ Setup CI/CD pipelines
5. ✅ Configure monitoring
6. ✅ Setup SSL/TLS

---

**Happy Deploying! 🚀**

