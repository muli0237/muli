#!/bin/bash

# Docker Build Script
# Usage: ./scripts/docker-build.sh [tag] [push]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="joshua-portfolio"
REGISTRY="ghcr.io"
GITHUB_REPO="${GITHUB_REPO:-joshuamuli/portfolio}"
TAG="${1:-latest}"
PUSH="${2:-false}"

# Full image name
FULL_IMAGE="${REGISTRY}/${GITHUB_REPO}/${IMAGE_NAME}:${TAG}"

echo -e "${YELLOW}🐳 Docker Build Script${NC}"
echo "Image: $FULL_IMAGE"
echo "Push: $PUSH"
echo ""

# Build image
echo -e "${YELLOW}Building Docker image...${NC}"
DOCKER_BUILDKIT=1 docker build \
  -t "${IMAGE_NAME}:${TAG}" \
  -t "${IMAGE_NAME}:latest" \
  -t "${FULL_IMAGE}" \
  .

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Build successful${NC}"
else
  echo -e "${RED}✗ Build failed${NC}"
  exit 1
fi

# Scan image
echo ""
echo -e "${YELLOW}Scanning image for vulnerabilities...${NC}"
if command -v trivy &> /dev/null; then
  trivy image "${IMAGE_NAME}:${TAG}"
else
  echo -e "${YELLOW}⚠ Trivy not installed, skipping scan${NC}"
fi

# Push image
if [ "$PUSH" = "true" ]; then
  echo ""
  echo -e "${YELLOW}Pushing image to registry...${NC}"
  docker push "${FULL_IMAGE}"
  docker push "${REGISTRY}/${GITHUB_REPO}/${IMAGE_NAME}:latest"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Push successful${NC}"
  else
    echo -e "${RED}✗ Push failed${NC}"
    exit 1
  fi
fi

echo ""
echo -e "${GREEN}✓ Done!${NC}"
echo "Image: ${IMAGE_NAME}:${TAG}"

