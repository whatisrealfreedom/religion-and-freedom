.PHONY: help build run docker-up docker-down docker-logs clean frontend-build frontend-shell

help:
	@echo "Available commands:"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up      - Start all containers"
	@echo "  make docker-down    - Stop all containers"
	@echo "  make docker-logs    - View docker logs"
	@echo ""
	@echo "Frontend:"
	@echo "  make frontend-build - Build frontend inside container"
	@echo "  make frontend-shell - Open shell in frontend-builder container"
	@echo ""
	@echo "Build:"
	@echo "  make build          - Build backend and frontend"
	@echo "  make run            - Run backend server"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean          - Clean build artifacts"

build:
	@echo "Building backend..."
	cd backend && go build -o ../bin/server ./cmd/server
	@echo "Building frontend..."
	cd frontend && npm run build

run:
	@echo "Starting backend server..."
	cd backend && go run cmd/server/main.go

docker-up:
	docker-compose up --build -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

# Frontend commands
frontend-build:
	@echo "🔨 Building frontend inside container..."
	docker-compose exec frontend-builder npm run build

frontend-shell:
	@echo "🐚 Opening shell in frontend-builder container..."
	docker-compose exec frontend-builder sh

clean:
	rm -rf bin/
	rm -rf frontend/build/
	rm -rf frontend/node_modules/

