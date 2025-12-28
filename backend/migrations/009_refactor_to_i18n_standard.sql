-- Migration: Refactor to standard i18n structure (best practice)
-- This creates a separate translations table instead of adding columns for each language

-- Step 1: Create chapter_translations table
CREATE TABLE IF NOT EXISTS chapter_translations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_id INTEGER NOT NULL,
    locale VARCHAR(10) NOT NULL, -- 'fa', 'en', 'ar', etc.
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE(chapter_id, locale)
);

-- Step 2: Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_chapter_translations_chapter_id ON chapter_translations(chapter_id);
CREATE INDEX IF NOT EXISTS idx_chapter_translations_locale ON chapter_translations(locale);
CREATE INDEX IF NOT EXISTS idx_chapter_translations_slug ON chapter_translations(slug);

-- Step 3: Migrate existing data (idempotent - only insert if doesn't exist)
-- Copy Persian (fa) data from chapters table
INSERT OR IGNORE INTO chapter_translations (chapter_id, locale, title, slug, description, content)
SELECT id, 'fa', title, slug, description, content
FROM chapters
WHERE (content IS NOT NULL OR title IS NOT NULL)
  AND NOT EXISTS (
    SELECT 1 FROM chapter_translations ct 
    WHERE ct.chapter_id = chapters.id AND ct.locale = 'fa'
  );

-- Copy English (en) data from chapters table (if content_en exists)
-- Note: This assumes content_en column exists (added in migration 006)
INSERT OR IGNORE INTO chapter_translations (chapter_id, locale, title, slug, description, content)
SELECT id, 'en', 
    title || ' (English)',  -- Temporary title, should be updated manually
    slug || '-en',          -- Temporary slug
    description || ' (English)', -- Temporary description
    content_en
FROM chapters
WHERE content_en IS NOT NULL AND content_en != ''
  AND NOT EXISTS (
    SELECT 1 FROM chapter_translations ct 
    WHERE ct.chapter_id = chapters.id AND ct.locale = 'en'
  );

-- Step 4: Remove old columns (commented out - uncomment after verifying data migration)
-- ALTER TABLE chapters DROP COLUMN title;
-- ALTER TABLE chapters DROP COLUMN slug;
-- ALTER TABLE chapters DROP COLUMN description;
-- ALTER TABLE chapters DROP COLUMN content;
-- ALTER TABLE chapters DROP COLUMN content_en;

-- Note: After migration, you would need to:
-- 1. Update the Go models to use the translations table
-- 2. Update repository methods to JOIN with translations table
-- 3. Update API handlers to accept locale parameter
-- 4. Keep chapters table only for non-translatable fields (id, number, icon, pages, read_time, featured, order)

