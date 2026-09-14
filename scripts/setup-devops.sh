#!/bin/bash

# DevOps Setup Script
# Initializes Docker and Kubernetes setup

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 DevOps Setup Script${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Docker
if command -v docker &> /dev/null; then
  DOCKER_VERSION=$(docker --version)
  echo -e "${GREEN}✓ Docker: $DOCKER_VERSION${NC}"
else
  echo -e "${RED}✗ Docker not found${NC}"
  echo "Install from: https://docs.docker.com/get-docker/"
  exit 1
fi

# Docker Compose
if command -v docker-compose &> /dev/null; then
  COMPOSE_VERSION=$(docker-compose --version)
  echo -e "${GREEN}✓ Docker Compose: $COMPOSE_VERSION${NC}"
else
  echo -e "${YELLOW}⚠ Docker Compose not found${NC}"
fi

# kubectl
if command -v kubectl &> /dev/null; then
  KUBECTL_VERSION=$(kubectl version --client --short 2>/dev/null || echo "unknown")
  echo -e "${GREEN}✓ kubectl: $KUBECTL_VERSION${NC}"
else
  echo -e "${YELLOW}⚠ kubectl not found (optional)${NC}"
fi

# Trivy
if command -v trivy &> /dev/null; then
  TRIVY_VERSION=$(trivy --version)
  echo -e "${GREEN}✓ Trivy: $TRIVY_VERSION${NC}"
else
  echo -e "${YELLOW}⚠ Trivy not found (optional)${NC}"
fi

echo ""
echo -e "${YELLOW}Setting up directories...${NC}"

# Create directories
mkdir -p k8s
mkdir -p scripts
mkdir -p .github/workflows
mkdir -p ssl

echo -e "${GREEN}✓ Directories created${NC}"

echo ""
echo -e "${YELLOW}Making scripts executable...${NC}"

# Make scripts executable
chmod +x scripts/docker-build.sh 2>/dev/null || true
chmod +x scripts/k8s-deploy.sh 2>/dev/null || true
chmod +x scripts/setup-devops.sh 2>/dev/null || true

echo -e "${GREEN}✓ Scripts executable${NC}"

echo ""
echo -e "${YELLOW}Generating SSL certificates (self-signed)...${NC}"

# Generate self-signed certificates
if [ ! -f ssl/cert.pem ] || [ ! -f ssl/key.pem ]; then
  openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem \
    -days 365 -nodes -subj "/CN=localhost" 2>/dev/null
  echo -e "${GREEN}✓ SSL certificates generated${NC}"
else
  echo -e "${YELLOW}⚠ SSL certificates already exist${NC}"
fi

echo ""
echo -e "${YELLOW}Checking Docker image...${NC}"

# Build Docker image
if docker build -t joshua-portfolio:latest . > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Docker image built${NC}"
else
  echo -e "${RED}✗ Docker build failed${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}Testing Docker Compose...${NC}"

# Test docker-compose
if docker-compose config > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Docker Compose configuration valid${NC}"
else
  echo -e "${RED}✗ Docker Compose configuration invalid${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✓ DevOps setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Start services: docker-compose up -d"
echo "2. View logs: docker-compose logs -f"
echo "3. Deploy to K8s: ./scripts/k8s-deploy.sh"
echo "4. Read documentation: cat DEVOPS.md"
echo ""

