# اجرای خودکار مایگریشن‌ها در سرور

## ✅ بله، مایگریشن‌ها به صورت خودکار اجرا می‌شوند!

### نحوه کار

1. **در Docker Container:**
   - مایگریشن‌ها در `backend.Dockerfile` به `/root/migrations` کپی می‌شوند
   - وقتی backend شروع می‌شود، در `database.go` خط 72 تابع `RunMigrationsOnDB(db)` صدا زده می‌شود
   - این تابع به صورت خودکار تمام فایل‌های `.sql` را پیدا می‌کند و اجرا می‌کند

2. **مسیرهای جستجو:**
   ```go
   possiblePaths := []string{
       "migrations/sqlite",      // برای SQLite
       "migrations/mysql",        // برای MySQL  
       "migrations/postgres",     // برای PostgreSQL
       "migrations",              // Fallback
       "/app/migrations",
       "./migrations",
       "backend/migrations",
       "./backend/migrations",
       "/root/migrations",        // در Docker container
   }
   ```

3. **در Docker:**
   - مایگریشن‌ها در `/root/migrations` قرار دارند
   - سیستم به صورت خودکار این مسیر را پیدا می‌کند
   - تمام مایگریشن‌ها به ترتیب الفبایی اجرا می‌شوند

### بررسی Dockerfile

```dockerfile
# در backend.Dockerfile:
COPY backend/migrations /root/migrations  # خط 36

# وقتی container شروع می‌شود:
CMD ["./server"]  # این backend را اجرا می‌کند
```

### در کد Backend

```go
// در database.go خط 70-72:
// Run migrations after connection is established
if err := RunMigrationsOnDB(db); err != nil {
    // Log error but continue
}
```

### نتیجه

✅ **مایگریشن‌ها به صورت خودکار اجرا می‌شوند**
✅ **نیازی به اجرای دستی نیست**
✅ **وقتی container شروع می‌شود، تمام مایگریشن‌های جدید اجرا می‌شوند**

### نکات مهم

1. **مایگریشن‌ها باید idempotent باشند** (قابل اجرای چندباره)
   - از `CREATE TABLE IF NOT EXISTS` استفاده کنید
   - از `CREATE INDEX IF NOT EXISTS` استفاده کنید

2. **اگر مایگریشن fail شود:**
   - Backend لاگ می‌زند ولی ادامه می‌دهد (برای جلوگیری از 502)
   - فقط در صورت خطای critical (مثل database locked) متوقف می‌شود

3. **برای اضافه کردن مایگریشن جدید:**
   - فایل را در `backend/migrations/` اضافه کنید
   - نام فایل باید به ترتیب الفبایی باشد (مثلاً `012_new_feature.sql`)
   - بعد از push و rebuild container، به صورت خودکار اجرا می‌شود

### تست محلی

```bash
# Build و run container
docker-compose build backend
docker-compose up backend

# لاگ‌ها را ببینید:
docker-compose logs backend | grep -i migration
```

باید ببینید:
```
✅ Migration executed: 001_initial.sql
✅ Migration executed: 002_seed_data.sql
...
✅ Migration executed: 011_create_content_comments.sql
```

### خلاصه

**بله، مایگریشن‌ها به صورت خودکار اجرا می‌شوند!** 

وقتی شما:
1. کد را push می‌کنید
2. Container را rebuild می‌کنید
3. Container شروع می‌شود

تمام مایگریشن‌های جدید به صورت خودکار اجرا می‌شوند و جدول‌های جدید ساخته می‌شوند.

**نیازی به اجرای دستی نیست!** 🎉
