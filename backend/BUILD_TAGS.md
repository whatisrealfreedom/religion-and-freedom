# Build Tags برای Database Drivers

## وضعیت فعلی: فقط SQLite

به صورت پیش‌فرض، فقط SQLite compile می‌شود. MySQL و PostgreSQL با build tags قابل استفاده هستند.

## Build عادی (SQLite فقط)

```bash
go build ./cmd/server
# یا
docker-compose build
```

این build فقط SQLite رو شامل می‌شه و نیازی به MySQL/PostgreSQL drivers نداره.

## Build با MySQL

```bash
go build -tags mysql ./cmd/server
```

یا در Dockerfile:
```dockerfile
RUN CGO_ENABLED=1 GOOS=linux go build -tags mysql -a -installsuffix cgo -o server ./cmd/server
```

بعد باید MySQL driver رو اضافه کنید:
```bash
go get github.com/go-sql-driver/mysql
```

## Build با PostgreSQL

```bash
go build -tags postgres ./cmd/server
```

یا در Dockerfile:
```dockerfile
RUN CGO_ENABLED=1 GOOS=linux go build -tags postgres -a -installsuffix cgo -o server ./cmd/server
```

بعد باید PostgreSQL driver رو اضافه کنید:
```bash
go get github.com/lib/pq
```

## Build با همه (SQLite + MySQL + PostgreSQL)

```bash
go build -tags "mysql postgres" ./cmd/server
```

یا:
```bash
go build -tags all ./cmd/server
```

## فایل‌های مربوطه

- `database_mysql.go` - فقط با build tag `mysql` یا `all` compile می‌شه
- `database_postgres.go` - فقط با build tag `postgres` یا `all` compile می‌شه
- `database_mysql_stub.go` - وقتی MySQL compile نشده (default)
- `database_postgres_stub.go` - وقتی PostgreSQL compile نشده (default)

## مزایا

✅ **بدون build tag**: فقط SQLite، بدون dependency اضافی
✅ **با build tag**: MySQL/PostgreSQL آماده برای استفاده
✅ **کد آماده برای آینده**: وقتی بخواید migrate کنید، فقط build tag اضافه کنید
