# Database Migrations

This directory contains SQL migration files that are executed in alphabetical order when the backend starts.

## Migration Files

- **001_initial.sql**: Creates the initial database schema (chapters, resources tables)
- **002_seed_data.sql**: Seeds initial data (chapters, PDF resources)
- **003_add_content.sql**: Adds content to chapters
- **004_add_ai_chapter.sql**: Adds AI chapter (chapter 10)
- **005_expand_chapter2_axioms_godel.sql**: Expands chapter 2 with Gödel content
- **006_add_english_content.sql**: Adds `content_en` column and English translations
- **007_create_users.sql**: Creates users and related tables (languages, currencies, countries)
- **009_refactor_to_i18n_standard.sql**: Creates `chapter_translations` table for future i18n refactoring (not currently used)

## Idempotent Migrations

All migrations are designed to be **idempotent** (can be run multiple times safely):

- ✅ **CREATE TABLE IF NOT EXISTS**: Tables won't be recreated if they exist
- ✅ **CREATE INDEX IF NOT EXISTS**: Indexes won't be recreated if they exist
- ✅ **INSERT OR REPLACE / INSERT OR IGNORE**: Prevents duplicate data
- ✅ **ALTER TABLE ADD COLUMN**: Migration runner handles "duplicate column" errors gracefully
- ✅ **Migration Runner**: Automatically skips migrations that have already been applied (based on error messages)

## Migration Runner

The migration runner (`backend/internal/repository/migrate.go`) includes error handling for common idempotent errors:

- `duplicate column`: Column already exists, skip
- `already exists`: Table/index already exists, skip
- `unique constraint failed`: Data already inserted, skip

## Adding New Migrations

1. Create a new file with format: `XXX_description.sql` (where XXX is a number)
2. Ensure the migration is idempotent (can be run multiple times safely)
3. Use `CREATE TABLE IF NOT EXISTS`, `INSERT OR IGNORE`, etc.
4. Test the migration locally before deploying

## Notes

- Migrations run in alphabetical order
- Each migration runs in a transaction (SQLite default)
- If a migration fails, the backend won't start
- The migration runner logs all executed migrations with ✅ or ⚠️

