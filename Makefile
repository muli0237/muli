.PHONY: help docker-build docker-run docker-stop docker-logs docker-compose-up docker-compose-down setup lint build dev test

# Colors
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

help:
	@echo "$(BLUE)Joshua Portfolio - DevOps Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Docker Commands:$(NC)"
	@echo "  make docker-build          Build Docker image"
	@echo "  make docker-run            Run Docker container"
	@echo "  make docker-stop           Stop Docker container"
	@echo "  make docker-logs           View Docker logs"
	@echo "  make docker-compose-up     Start Docker Compose services"
	@echo "  make docker-compose-down   Stop Docker Compose services"
	@echo ""
	@echo "$(YELLOW)Development Commands:$(NC)"
	@echo "  make install               Install dependencies"
	@echo "  make lint                  Run linter"
	@echo "  make build                 Build application"
	@echo "  make dev                   Start development server"
	@echo "  make test                  Run tests"
	@echo ""

# Docker Commands
docker-build:
	@echo "$(BLUE)Building Docker image...$(NC)"
	docker build -t joshua-portfolio:latest .
	@echo "$(GREEN)✓ Build complete$(NC)"

docker-run:
	@echo "$(BLUE)Running Docker container...$(NC)"
	docker run -p 3000:3000 joshua-portfolio:latest

docker-stop:
	@echo "$(BLUE)Stopping Docker container...$(NC)"
	docker stop joshua-portfolio-app || true
	docker rm joshua-portfolio-app || true
	@echo "$(GREEN)✓ Container stopped$(NC)"

docker-logs:
	@echo "$(BLUE)Docker logs:$(NC)"
	docker logs -f joshua-portfolio-app

docker-compose-up:
	@echo "$(BLUE)Starting Docker Compose services...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Services started$(NC)"
	@echo "App: http://localhost:3000"

docker-compose-down:
	@echo "$(BLUE)Stopping Docker Compose services...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Services stopped$(NC)"

# Development Commands
install:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

lint:
	@echo "$(BLUE)Running linter...$(NC)"
	npm run lint

build:
	@echo "$(BLUE)Building application...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

dev:
	@echo "$(BLUE)Starting development server...$(NC)"
	npm run dev

test:
	@echo "$(BLUE)Running tests...$(NC)"
	npm run lint
	npm run build
	@echo "$(GREEN)✓ Tests complete$(NC)"

# Utility Commands
.PHONY: clean
clean:
	@echo "$(BLUE)Cleaning up...$(NC)"
	rm -rf .next
	rm -rf node_modules
	rm -rf dist
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

.PHONY: all
all: install build docker-build
	@echo "$(GREEN)✓ All tasks complete$(NC)"

