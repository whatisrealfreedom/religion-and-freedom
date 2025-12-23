# 🕊️ سفر آزادی - Freedom Website

یک سایت کامل و حرفه‌ای برای نظریه آزادی جنت‌خواه با:
- **Backend:** Go (Golang) + Gin
- **Frontend:** React + TypeScript + TailwindCSS
- **Database:** SQLite (با قابلیت تغییر به PostgreSQL/MariaDB)
- **Containerization:** Docker & Docker Compose

## 🚀 Quick Start

### با Docker (توصیه می‌شود)

```bash
# Build و Run همه چیز
docker-compose up --build

# در background اجرا کن
docker-compose up -d

# لاگ‌ها رو ببین
docker-compose logs -f

# متوقف کن
docker-compose down
```

سرویس‌ها:
- Frontend: http://localhost:8098
- Backend API: http://localhost:8060
- API Docs: http://localhost:8060/api/v1/health

### Development Mode

```bash
# Backend
cd backend
go run cmd/server/main.go

# Frontend (در ترمینال دیگر)
cd frontend
npm install
npm start
```

## 📁 ساختار پروژه

```
.
├── backend/              # Go API Server
│   ├── cmd/server/       # Entry point
│   ├── internal/
│   │   ├── handlers/     # HTTP handlers
│   │   ├── services/     # Business logic
│   │   ├── repository/   # Data access layer (database abstraction)
│   │   ├── models/       # Domain models
│   │   └── config/       # Configuration
│   └── migrations/       # SQL migrations
│
├── frontend/             # React + TailwindCSS
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # React components
│   │   └── services/     # API client
│   └── public/
│
├── docker/               # Docker configs
├── files/                # PDF files (served as static)
└── data/                 # SQLite database (auto-created)
```

## 🔧 API Endpoints

### Health Check
- `GET /api/v1/health` - بررسی سلامت API

### Chapters
- `GET /api/v1/chapters` - لیست تمام فصول
- `GET /api/v1/chapters/:id` - جزئیات یک فصل

### Resources
- `GET /api/v1/resources` - لیست تمام منابع
- `GET /api/v1/resources/pdfs` - لیست PDFها

## 🎨 UI/UX Features

- ✅ طراحی مدرن و منحصر به فرد
- ✅ کاملاً Responsive (موبایل، تبلت، دسکتاپ)
- ✅ انیمیشن‌های زیبا با Framer Motion
- ✅ فونت فارسی Vazirmatn
- ✅ Dark mode ready (آماده برای پیاده‌سازی)
- ✅ Loading states و Error handling
- ✅ Navigation با React Router

## 📊 Database

### SQLite (پیش‌فرض)
دیتابیس به صورت خودکار در `data/freedom.db` ساخته می‌شود.

### تغییر به PostgreSQL/MariaDB

1. متغیرهای محیط را در `.env` تنظیم کن:
```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=freedom
DB_USER=your_user
DB_PASSWORD=your_password
```

2. کد backend آماده است، فقط باید driver اضافه شود (آینده)

## 🛠️ Development

### Backend Dependencies
```bash
cd backend
go mod tidy
```

### Frontend Dependencies
```bash
cd frontend
npm install
```

### Run Tests
```bash
# Backend
cd backend
go test ./...

# Frontend
cd frontend
npm test
```

## 📝 Environment Variables

کپی کن `.env.example` به `.env` و مقادیر را تنظیم کن:

```env
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
ENV=development
DB_TYPE=sqlite
DB_PATH=./data/freedom.db
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8098
```

## 🐳 Docker

### Build Images
```bash
docker-compose build
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Clean Up
```bash
docker-compose down -v  # حذف volumes هم
```

## 📄 License

This project is dedicated to freedom and human rights.

---

**با عشق به آزادی و اراده آزاد انسان** 🕊️💜
