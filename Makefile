.PHONY: help build run docker-up docker-down docker-logs clean

help:
	@echo "Available commands:"
	@echo "  make build      - Build backend and frontend"
	@echo "  make run        - Run backend server"
	@echo "  make docker-up  - Start with docker-compose"
	@echo "  make docker-down - Stop docker-compose"
	@echo "  make docker-logs - View docker logs"
	@echo "  make clean      - Clean build artifacts"

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

clean:
	rm -rf bin/
	rm -rf frontend/build/
	rm -rf frontend/node_modules/

