# 🔍 Deployment Verification Guide

راهنمای کامل برای بررسی صحت deployment پروژه.

## 🚀 Quick Verification

### روی سرور:

```bash
# SSH to server
ssh deploy@138.199.149.138

# Run verification script
cd ~/freedom-website
./scripts/verify-deployment.sh
```

یا manual checks:

```bash
# 1. Check containers
docker ps | grep freedom

# 2. Check logs
docker-compose -f docker-compose.prod.yml logs -f

# 3. Check Traefik routes
curl http://localhost:8080/api/http/routers | jq '.[] | select(.name | contains("freedom"))'
```

## ✅ Checklist

### 1. DNS Configuration

**در Cloudflare:**
- ✅ A record: `whatisreadfreedom.com` → `138.199.149.138`
- ✅ A record: `www.whatisreadfreedom.com` → `138.199.149.138`
- ✅ Proxy status: Proxied (orange cloud)

**بررسی DNS:**
```bash
# از local machine
dig +short whatisreadfreedom.com A

# باید ببینید: 138.199.149.138
```

**نکته:** تغییرات DNS ممکن است تا 48 ساعت طول بکشد تا به صورت global propagate شود.

### 2. Docker Containers

```bash
# روی سرور
docker ps | grep freedom

# باید ببینید:
# freedom-backend   (Up)
# freedom-frontend  (Up)
```

**اگر containers running نیستند:**
```bash
cd ~/freedom-website
source .env  # یا export DOMAIN_FREEDOM=...
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Traefik Configuration

**بررسی در Traefik Dashboard:**
- URL: `http://138.199.149.138:8080` یا `http://traefik.verzav.ir:8080`
- بروید به: HTTP → HTTP Routers
- باید router با نام `freedom-frontend@docker` را ببینید
- Rule: `Host(\`whatisreadfreedom.com\`)`
- Status: Success (green checkmark)

**بررسی با command:**
```bash
docker inspect freedom-frontend | grep -A 10 "Labels"
```

**باید ببینید:**
- `traefik.enable=true`
- `traefik.http.routers.freedom-frontend.rule=Host(\`whatisreadfreedom.com\`)`
- `traefik.http.routers.freedom-frontend.entrypoints=websecure`
- `traefik.http.routers.freedom-frontend.tls.certresolver=letsencrypt`

### 4. Network Configuration

```bash
# بررسی network
docker network inspect traefik-network | grep freedom

# باید containers در network باشند
```

### 5. Environment Variables

```bash
# بررسی .env file
cat ~/freedom-website/.env

# باید شامل:
# DOMAIN_FREEDOM=whatisreadfreedom.com
# TRAEFIK_NETWORK=traefik-network
```

### 6. SSL Certificate

**بررسی در Traefik Dashboard:**
- بروید به: HTTP → HTTP Routers → freedom-frontend
- در بخش TLS:
  - TLS: True
  - Certificate Resolver: letsencrypt

**بررسی با command:**
```bash
# Test SSL
openssl s_client -servername whatisreadfreedom.com -connect whatisreadfreedom.com:443

# یا
curl -I https://whatisreadfreedom.com
```

### 7. Application Access

**Test endpoints:**
```bash
# Frontend (via Traefik)
curl -I https://whatisreadfreedom.com

# Backend API (via frontend proxy)
curl https://whatisreadfreedom.com/api/v1/health

# باید ببینید: {"status":"ok","message":"Freedom API is running"}
```

### 8. Logs

```bash
# Backend logs
docker logs freedom-backend

# Frontend logs
docker logs freedom-frontend

# Traefik logs
docker logs traefik | grep freedom

# All logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 🐛 Troubleshooting

### مشکل: DNS کار نمی‌کند

```bash
# بررسی DNS از سرور
dig +short whatisreadfreedom.com A

# اگر IP درست نیست:
# 1. در Cloudflare بررسی کنید
# 2. منتظر DNS propagation بمانید (تا 48 ساعت)
# 3. DNS cache را clear کنید
```

### مشکل: Containers running نیستند

```bash
# بررسی وضعیت
docker ps -a | grep freedom

# بررسی logs
docker logs freedom-backend
docker logs freedom-frontend

# Restart
cd ~/freedom-website
docker-compose -f docker-compose.prod.yml restart
```

### مشکل: Traefik router پیدا نمی‌شود

```bash
# بررسی labels
docker inspect freedom-frontend | grep -A 20 Labels

# بررسی network
docker network inspect traefik-network

# Restart frontend
docker restart freedom-frontend

# بررسی Traefik logs
docker logs traefik | grep -i freedom
```

### مشکل: SSL certificate نمی‌گیرد

```bash
# بررسی Traefik logs
docker logs traefik | grep -i acme
docker logs traefik | grep -i certificate

# بررسی Let's Encrypt rate limits
# https://letsencrypt.org/docs/rate-limits/

# اگر مشکل داشتید:
# 1. بررسی کنید port 80 و 443 باز هستند
# 2. DNS باید به IP سرور resolve شود
# 3. منتظر بمانید (ممکن است چند دقیقه طول بکشد)
```

### مشکل: 502 Bad Gateway

```bash
# بررسی backend
docker exec freedom-frontend wget -qO- http://backend:8080/api/v1/health

# اگر کار نمی‌کند:
# 1. Backend running است؟
docker ps | grep backend

# 2. Network درست است؟
docker network inspect freedom-network

# 3. Backend logs
docker logs freedom-backend
```

### مشکل: 404 Not Found

```bash
# بررسی Traefik router rule
docker inspect freedom-frontend | grep "traefik.http.routers.freedom-frontend.rule"

# باید باشد: Host(`whatisreadfreedom.com`)

# بررسی domain در request
curl -H "Host: whatisreadfreedom.com" http://localhost

# بررسی Traefik routes
curl http://localhost:8080/api/http/routers | jq '.[] | select(.name | contains("freedom"))'
```

## 📊 Expected Results

### ✅ همه چیز درست است اگر:

1. **DNS:**
   ```bash
   dig +short whatisreadfreedom.com A
   # Returns: 138.199.149.138
   ```

2. **Containers:**
   ```bash
   docker ps | grep freedom
   # Shows: freedom-backend (Up) and freedom-frontend (Up)
   ```

3. **Traefik:**
   - Router visible in dashboard
   - Status: Success
   - TLS: Enabled

4. **Application:**
   ```bash
   curl https://whatisreadfreedom.com
   # Returns: HTML content (200 OK)
   
   curl https://whatisreadfreedom.com/api/v1/health
   # Returns: {"status":"ok","message":"Freedom API is running"}
   ```

5. **SSL:**
   ```bash
   curl -I https://whatisreadfreedom.com
   # Returns: HTTP/2 200 (with valid SSL)
   ```

## 🎯 Quick Test Commands

```bash
# روی سرور - همه checks را یکجا انجام دهید
cd ~/freedom-website && \
echo "DNS:" && dig +short whatisreadfreedom.com A && \
echo -e "\nContainers:" && docker ps | grep freedom && \
echo -e "\nHealth:" && curl -s http://localhost/api/v1/health && \
echo -e "\nTraefik Router:" && curl -s http://localhost:8080/api/http/routers | grep -o "freedom-frontend" | head -1
```

---

**اگر همه چیز درست است اما domain کار نمی‌کند:**
1. منتظر DNS propagation بمانید (تا 48 ساعت)
2. Browser cache را clear کنید
3. از incognito mode استفاده کنید
4. DNS را از location های مختلف تست کنید

