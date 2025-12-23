# 🚀 Deploy to GitHub Pages

این پروژه می‌تواند به دو روش deploy شود:

## 1️⃣ روش Full-Stack (با Backend)

برای استفاده از Go backend و قابلیت‌های کامل:

```bash
# با Docker
docker-compose up -d

# یا manual
cd backend && go run cmd/server/main.go
cd frontend && npm start
```

**مزایا:**
- ✅ API کامل با Go backend
- ✅ Database (SQLite) برای ذخیره داده
- ✅ قابلیت admin panel (آینده)
- ✅ Real-time updates

## 2️⃣ روش GitHub Pages (Static Site)

برای deploy روی GitHub Pages (فقط frontend):

### مراحل:

#### 1. Generate Static API Data

```bash
# Make script executable
chmod +x scripts/generate-static-api.sh

# Generate static JSON files
./scripts/generate-static-api.sh
```

این دستور فایل‌های JSON زیر را می‌سازد:
- `frontend/public/api/v1/chapters.json`
- `frontend/public/api/v1/resources-pdfs.json`
- `frontend/public/api/v1/health.json`

#### 2. Build Frontend

```bash
cd frontend
export REACT_APP_API_URL=/api/v1
export PUBLIC_URL=/religion-and-freedom  # یا نام repository شما
npm run build
```

#### 3. Configure GitHub Pages

1. به Settings > Pages بروید
2. Source را روی "GitHub Actions" تنظیم کنید
3. GitHub Action workflow به صورت خودکار build و deploy می‌کند

#### 4. Manual Deploy (اگر Action ندارید)

```bash
# Build
cd frontend
npm run build

# Copy build folder to gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r build/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### محدودیت‌های GitHub Pages

- ❌ Backend API کار نمی‌کند (فقط static files)
- ❌ Database نداریم (داده‌ها از JSON files خوانده می‌شوند)
- ❌ PDF files باید در repository commit شوند (یا از CDN استفاده کنید)
- ✅ Frontend کاملاً کار می‌کند
- ✅ Progress tracking در localStorage کار می‌کند

### تنظیمات Repository

در `package.json` یا environment variables:

```json
{
  "homepage": "https://yourusername.github.io/religion-and-freedom"
}
```

یا:

```bash
export PUBLIC_URL=/religion-and-freedom
```

### Update Static Data

هر وقت database رو update کردید:

```bash
# Re-generate static files
./scripts/generate-static-api.sh

# Commit changes
git add frontend/public/api/v1/
git commit -m "Update static API data"
git push
```

## 🔄 GitHub Actions Workflow

فایل `.github/workflows/gh-pages.yml` به صورت خودکار:
1. Static API data را از database می‌سازد
2. React app را build می‌کند
3. به GitHub Pages deploy می‌کند

## 📝 نکات مهم

1. **PDF Files**: اگر PDF files بزرگ هستند، بهتر است از CDN استفاده کنید
2. **API Routes**: Frontend به صورت خودکار بین live API و static JSON switch می‌کند
3. **Base URL**: مطمئن شوید `PUBLIC_URL` درست تنظیم شده

## 🆚 مقایسه

| Feature | Full-Stack (Docker) | GitHub Pages |
|---------|---------------------|--------------|
| Backend API | ✅ | ❌ |
| Database | ✅ | ❌ |
| Static Content | ✅ | ✅ |
| Progress Tracking | ✅ | ✅ (localStorage) |
| Deploy Complexity | Medium | Easy |
| Cost | Free (self-hosted) | Free |
| Updates | Real-time | Manual rebuild |

---

**پیشنهاد**: برای production از Vercel, Netlify یا Railway استفاده کنید که هم frontend و هم backend را ساپورت می‌کنند.

