# 🚀 Development Guide

This guide explains how to work with the separated frontend builder and nginx setup.

## Architecture

- **backend**: Go backend API server
- **frontend-builder**: Node.js container where you can run npm commands (build, install, etc.)
- **nginx**: Serves the built frontend files and proxies API requests

## Quick Start

### 1. Start all containers

```bash
docker-compose up -d
```

This will start:
- Backend on port `8060`
- Frontend builder (running in background)
- Nginx serving frontend on port `8098`

### 2. Build the frontend

After starting containers, build the frontend inside the builder container:

```bash
# Using Makefile (recommended)
make frontend-build

# Or directly with docker-compose
docker-compose exec frontend-builder npm run build
```

The built files will be in the `frontend-build` volume, which is mounted to nginx.

### 3. Access the site

- Frontend: http://localhost:8098
- Backend API: http://localhost:8060/api/v1

## Common Commands

### Build Frontend

```bash
make frontend-build
# or
docker-compose exec frontend-builder npm run build
```

### Open Shell in Frontend Container

```bash
make frontend-shell
# or
docker-compose exec frontend-builder sh
```

Once inside, you can run any npm command:
```bash
npm install
npm run build
npm run test
```

### View Logs

```bash
# All services
make docker-logs

# Specific service
docker-compose logs -f nginx
docker-compose logs -f backend
docker-compose logs -f frontend-builder
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart nginx
docker-compose restart backend
```

### Stop Everything

```bash
make docker-down
# or
docker-compose down
```

## Workflow

### Making Frontend Changes

1. **Edit files** in `frontend/src/` on your host machine
2. **Rebuild** frontend:
   ```bash
   make frontend-build
   ```
3. **Refresh browser** - Nginx will serve the new build automatically

### Adding New npm Packages

1. **Open shell** in frontend-builder:
   ```bash
   make frontend-shell
   ```
2. **Install package**:
   ```bash
   npm install <package-name> --legacy-peer-deps
   ```
3. **Exit** and rebuild:
   ```bash
   exit
   make frontend-build
   ```

### Backend Changes

Backend code is mounted as a volume, so you need to **restart the backend** container:

```bash
docker-compose restart backend
```

## Volumes

- `./frontend` → `/app` in frontend-builder (source code)
- `frontend-build` → `/app/build` in frontend-builder AND `/usr/share/nginx/html` in nginx (built files)
- `frontend-node-modules` → `/app/node_modules` in frontend-builder (dependencies)

## Troubleshooting

### Frontend build fails

1. Check logs:
   ```bash
   docker-compose logs frontend-builder
   ```
2. Try rebuilding from scratch:
   ```bash
   docker-compose exec frontend-builder npm install --legacy-peer-deps
   docker-compose exec frontend-builder npm run build
   ```

### Nginx shows old content

1. Rebuild frontend:
   ```bash
   make frontend-build
   ```
2. Restart nginx:
   ```bash
   docker-compose restart nginx
   ```

### Port already in use

Change ports in `docker-compose.yml`:
```yaml
ports:
  - "8099:80"  # Change 8098 to 8099
```

## Summary

| Task | Command |
|------|---------|
| Start containers | `docker-compose up -d` |
| Build frontend | `make frontend-build` |
| Open frontend shell | `make frontend-shell` |
| View logs | `make docker-logs` |
| Stop containers | `docker-compose down` |

