# طرح بازطراحی به ساختار استاندارد i18n

## مشکل فعلی

در حال حاضر از ستون‌های جداگانه برای هر زبان استفاده می‌شود:
- `content` (فارسی)
- `content_en` (انگلیسی)
- `title`, `description`, `slug` فقط فارسی

**مشکلات:**
- برای هر زبان جدید باید ستون جدید اضافه کنیم
- مقیاس‌پذیر نیست
- Normalization درستی نیست
- همه فیلدها چندزبانه نیستند

## راه‌حل استاندارد (Best Practice)

### ساختار پیشنهادی:

```sql
-- جدول اصلی (فقط فیلدهای غیرقابل ترجمه)
chapters:
  - id
  - number (UNIQUE)
  - icon
  - pages
  - read_time
  - featured
  - order
  - created_at
  - updated_at

-- جدول ترجمه‌ها (هر ردیف = یک فصل در یک زبان)
chapter_translations:
  - id
  - chapter_id (FK -> chapters.id)
  - locale ('fa', 'en', 'ar', ...)
  - title
  - slug (UNIQUE per locale)
  - description
  - content
  - created_at
  - updated_at
  - UNIQUE(chapter_id, locale)
```

### مزایا:

✅ **مقیاس‌پذیر:** برای اضافه کردن زبان جدید، فقط INSERT می‌کنیم
✅ **Normalized:** ساختار استاندارد دیتابیس
✅ **انعطاف‌پذیر:** می‌توانیم فقط برای بعضی فیلدها ترجمه داشته باشیم
✅ **ساده برای Query:** 
```sql
SELECT c.*, ct.title, ct.description, ct.content
FROM chapters c
JOIN chapter_translations ct ON c.id = ct.chapter_id
WHERE ct.locale = 'fa'
ORDER BY c.order;
```

### تغییرات لازم در کد:

1. **Models (`backend/internal/models/chapter.go`)**:
```go
type Chapter struct {
    ID          int
    Number      int
    Icon        string
    Pages       int
    ReadTime    int
    Featured    bool
    Order       int
    Translations []ChapterTranslation
}

type ChapterTranslation struct {
    ID          int
    ChapterID   int
    Locale      string
    Title       string
    Slug        string
    Description string
    Content     string
}
```

2. **Repository (`backend/internal/repository/chapter_repository.go`)**:
```go
func (r *chapterRepository) GetByID(id int, locale string) (*Chapter, error) {
    query := `
        SELECT c.id, c.number, c.icon, c.pages, c.read_time, c.featured, c.order,
               ct.title, ct.slug, ct.description, ct.content
        FROM chapters c
        JOIN chapter_translations ct ON c.id = ct.chapter_id
        WHERE c.id = ? AND ct.locale = ?
    `
    // ...
}
```

3. **API Handler**: باید locale را به عنوان query parameter بگیرد

## مراحل اجرا:

1. ✅ Migration ایجاد شود (009_refactor_to_i18n_standard.sql)
2. ⬜ Migration را test کنیم
3. ⬜ Models را تغییر دهیم
4. ⬜ Repository را refactor کنیم
5. ⬜ Handlers را update کنیم
6. ⬜ Frontend را test کنیم
7. ⬜ Old columns را drop کنیم

## جایگزین‌های دیگر:

### گزینه 2: JSON Column (Modern Approach)
```sql
chapters:
  - id
  - number
  - translations JSON  -- {"fa": {...}, "en": {...}}
```

**مزایا:** ساده‌تر، نیازی به JOIN نیست
**معایب:** Harder to query, less normalized

### گزینه 3: Separate Tables per Language
```sql
chapters_fa
chapters_en
```

**معایب:** خیلی بد است! Don't do this!

---

**نتیجه:** گزینه 1 (جدول translations جداگانه) بهترین روش استاندارد است.

