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

-- Step 3: Migrate existing data
-- Copy Persian (fa) data from chapters table
INSERT INTO chapter_translations (chapter_id, locale, title, slug, description, content)
SELECT id, 'fa', title, slug, description, content
FROM chapters
WHERE content IS NOT NULL OR title IS NOT NULL;

-- Copy English (en) data from chapters table (if content_en exists)
INSERT INTO chapter_translations (chapter_id, locale, title, slug, description, content)
SELECT id, 'en', 
    title || ' (English)',  -- Temporary title, should be updated manually
    slug || '-en',          -- Temporary slug
    description || ' (English)', -- Temporary description
    content_en
FROM chapters
WHERE content_en IS NOT NULL AND content_en != '';

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

