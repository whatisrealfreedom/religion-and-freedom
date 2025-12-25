# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git gcc musl-dev

# Set GOTOOLCHAIN to auto to allow downloading required Go version
ENV GOTOOLCHAIN=auto

# Copy go mod files
COPY backend/go.mod backend/go.sum* ./
RUN go mod download

# Copy source code
COPY backend/ ./

# Copy migrations to working directory for runtime
COPY backend/migrations ./migrations

# Build the application
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o server ./cmd/server

# Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata
WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/server .

# Create data directory for SQLite and copy migrations
RUN mkdir -p /data /root/migrations
COPY backend/migrations /root/migrations

EXPOSE 8080

CMD ["./server"]
