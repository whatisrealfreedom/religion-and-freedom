# Freedom Website - Go Backend + React Frontend

## 🚀 پروژه حرفه‌ای با Go + React + TailwindCSS

این پروژه یک سایت کامل برای نظریه آزادی جنت‌خواه است که با:
- **Backend:** Go (Golang)
- **Frontend:** React + TailwindCSS
- **Database:** SQLite (با قابلیت تغییر به PostgreSQL/MariaDB)
- **Containerization:** Docker & Docker Compose

## 📁 ساختار پروژه

```
freedom-website/
├── backend/              # Go API Server
│   ├── cmd/server/       # Entry point
│   ├── internal/         # Private packages
│   │   ├── handlers/     # HTTP handlers
│   │   ├── services/     # Business logic
│   │   ├── repository/   # Data access (database abstraction)
│   │   ├── models/       # Domain models
│   │   └── config/       # Configuration
│   └── migrations/       # DB migrations
│
├── frontend/             # React + TailwindCSS
│   ├── src/
│   └── public/
│
└── docker/               # Docker configs
```

## 🐳 اجرا با Docker

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

## 🔧 Development

```bash
# Backend
cd backend
go run cmd/server/main.go

# Frontend
cd frontend
npm install
npm start
```

## 📝 مراحل بعدی

- [ ] Setup Go dependencies
- [ ] Create database abstraction layer
- [ ] Setup React + TailwindCSS
- [ ] Create API endpoints
- [ ] Migrate existing content

