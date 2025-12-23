# 🚀 Production Deployment Guide

راهنمای کامل deploy پروژه freedom-website روی سرور production با Traefik.

## 📋 Prerequisites

- ✅ سرور با Docker و Docker Compose
- ✅ Traefik v3.0 در حال اجرا
- ✅ دسترسی SSH به سرور
- ✅ DNS تنظیم شده

## 🔧 GitHub Secrets (Required)

در GitHub repository → **Settings → Secrets and variables → Actions**، این secrets را اضافه کنید:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `SERVER_HOST` | `138.199.149.138` | IP address سرور |
| `SERVER_USERNAME` | `deploy` | SSH username |
| `SERVER_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Private SSH key |

### نحوه گرفتن SSH Key:

```bash
# نمایش private key
cat ~/.ssh/id_rsa

# یا اگر از key خاص استفاده می‌کنید:
cat ~/.ssh/id_ed25519
```

**⚠️ مهم:** کل محتوای private key را کپی کنید (شامل `-----BEGIN...` و `-----END...`)

### Setup SSH Key روی سرور (اگر قبلاً انجام نشده):

```bash
# روی کامپیوتر محلی
ssh-copy-id deploy@138.199.149.138

# یا manual:
cat ~/.ssh/id_rsa.pub | ssh deploy@138.199.149.138 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

## 🔧 Step 1: تنظیم Environment Variables روی سرور

```bash
# SSH to server
ssh deploy@138.199.149.138

# Create project directory
mkdir -p ~/freedom-website
cd ~/freedom-website

# Create .env.prod (از GitHub Actions یا manual)
cat > .env.prod <<EOF
DOMAIN_FREEDOM=freedom.verzav.ir
TRAEFIK_NETWORK=traefik-network
EOF
```

## 🔧 Step 2: تنظیم DNS

```dns
freedom.verzav.ir  →  A record  →  138.199.149.138
```

## 🚀 Step 3: Deploy

### روش 1: با GitHub Actions (Recommended)

1. **Push code به branch `main`:**
   ```bash
   git push origin main
   ```

2. **GitHub Actions به صورت خودکار:**
   - Code را به سرور copy می‌کند
   - Docker images را build می‌کند
   - Containers را start می‌کند

3. **Check workflow:**
   - GitHub → Actions → Deploy to Production

### روش 2: Manual Deploy

```bash
# SSH to server
ssh deploy@138.199.149.138

# Clone project (if not exists)
cd ~
git clone <your-repo-url> freedom-website
cd freedom-website

# Create .env.prod
cat > .env.prod <<EOF
DOMAIN_FREEDOM=freedom.verzav.ir
TRAEFIK_NETWORK=traefik-network
EOF

# Load environment variables
export $(cat .env.prod | xargs)

# Build and start
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

## 🔍 Verification

```bash
# Check containers
docker ps | grep freedom

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Test website
curl -I https://freedom.verzav.ir

# Test API (via frontend proxy)
curl https://freedom.verzav.ir/api/v1/health
```

## 📝 Environment Variables Reference

### .env.prod (روی سرور)

```bash
# Required
DOMAIN_FREEDOM=freedom.verzav.ir          # Domain شما

# Optional (default: traefik-network)
TRAEFIK_NETWORK=traefik-network           # نام شبکه Traefik
```

### GitHub Secrets

- `SERVER_HOST`: IP سرور (`138.199.149.138`)
- `SERVER_USERNAME`: SSH username (`deploy`)
- `SERVER_SSH_KEY`: Private SSH key (کامل با BEGIN/END)

## 🔄 Update Process

### با GitHub Actions:

```bash
git add .
git commit -m "Update..."
git push origin main
# GitHub Actions automatically deploys
```

### Manual Update:

```bash
ssh deploy@138.199.149.138
cd ~/freedom-website
git pull
export $(cat .env.prod | xargs)
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

## 🐛 Troubleshooting

### مشکل: SSH Connection Failed

```bash
# Test SSH connection
ssh deploy@138.199.149.138

# Check SSH key format in GitHub Secrets
# باید شامل -----BEGIN... و -----END... باشد
```

### مشکل: Containers نمی‌توانند به Traefik وصل شوند

```bash
# Check Traefik network exists
docker network ls | grep traefik-network

# Check container is in network
docker network inspect traefik-network | grep freedom

# If not connected, manual connect:
docker network connect traefik-network freedom-frontend
```

### مشکل: Domain کار نمی‌کند

1. **Check DNS:**
   ```bash
   dig freedom.verzav.ir
   nslookup freedom.verzav.ir
   ```

2. **Check Traefik logs:**
   ```bash
   docker logs traefik | grep freedom
   ```

3. **Check container labels:**
   ```bash
   docker inspect freedom-frontend | grep -A 20 Labels
   ```

4. **Check Traefik dashboard:**
   - Go to: `http://138.199.149.138:8080`
   - Check HTTP routers → freedom-frontend

### مشکل: Build Failed

```bash
# Check build logs
docker-compose -f docker-compose.prod.yml build --no-cache

# Check Docker daemon
docker info

# Check disk space
df -h
```

## 📊 Monitoring

```bash
# Container logs
docker-compose -f docker-compose.prod.yml logs -f

# Specific service logs
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend

# Resource usage
docker stats freedom-backend freedom-frontend

# Container status
docker-compose -f docker-compose.prod.yml ps

# Traefik dashboard
# http://traefik.verzav.ir:8080
# یا http://138.199.149.138:8080
```

## 🛑 Stop/Remove

```bash
# Stop containers
docker-compose -f docker-compose.prod.yml stop

# Remove containers (data preserved)
docker-compose -f docker-compose.prod.yml down

# Remove everything including volumes
docker-compose -f docker-compose.prod.yml down -v
```

## ✅ Checklist

قبل از deploy:

- [ ] GitHub Secrets تنظیم شده (`SERVER_HOST`, `SERVER_USERNAME`, `SERVER_SSH_KEY`)
- [ ] SSH connection تست شده
- [ ] DNS تنظیم شده
- [ ] `.env.prod` روی سرور ایجاد شده
- [ ] Traefik در حال اجرا است

بعد از deploy:

- [ ] Containers running هستند
- [ ] Website در دسترس است
- [ ] API کار می‌کند
- [ ] SSL certificate گرفته شده
- [ ] Logs خطایی ندارند

---

**Ready to deploy?** Just push to `main` branch! 🚀
