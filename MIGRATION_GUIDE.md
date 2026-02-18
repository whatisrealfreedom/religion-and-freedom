# Migration Guide

## How Migrations Work

Migrations run **automatically** when the backend starts. The migration system:

1. **Finds migration files** in `backend/migrations/` directory
2. **Sorts them alphabetically** (so `001_*.sql` runs before `011_*.sql`)
3. **Executes each migration** in order
4. **Handles idempotent errors** gracefully (if a table/column already exists, it skips)

## Creating New Migrations

### Step 1: Create the Migration File

Create a new file in `backend/migrations/` with the format:
```
XXX_description.sql
```

Where `XXX` is a number (e.g., `012_add_new_feature.sql`)

**Example:**
```sql
-- Migration 012: Add new feature table
CREATE TABLE IF NOT EXISTS new_feature (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_new_feature_name ON new_feature(name);
```

### Step 2: Make it Idempotent

Always use:
- ✅ `CREATE TABLE IF NOT EXISTS` (not `CREATE TABLE`)
- ✅ `CREATE INDEX IF NOT EXISTS` (not `CREATE INDEX`)
- ✅ `DROP TRIGGER IF EXISTS` before creating triggers
- ✅ `INSERT OR IGNORE` or `INSERT OR REPLACE` for data inserts

**Bad Example:**
```sql
CREATE TABLE users (...);  -- ❌ Will fail if table exists
```

**Good Example:**
```sql
CREATE TABLE IF NOT EXISTS users (...);  -- ✅ Safe to run multiple times
```

### Step 3: Test Locally

```bash
# Test the migration manually
sqlite3 data/freedom.db < backend/migrations/012_add_new_feature.sql

# Or use the helper script
cd backend
./scripts/run_migration.sh 012_add_new_feature.sql
```

### Step 4: Restart Backend

The migration will run automatically when the backend starts. Check the logs for:
- ✅ `Migration executed: 012_add_new_feature.sql` (success)
- ⚠️ `Migration 012_add_new_feature.sql already applied` (idempotent, safe)

## Manual Migration Execution

### Option 1: Restart Backend (Recommended)
Simply restart the backend - migrations run automatically.

### Option 2: SQLite Command Line
```bash
sqlite3 data/freedom.db < backend/migrations/011_create_content_comments.sql
```

### Option 3: Helper Script
```bash
cd backend
./scripts/run_migration.sh                    # Run all migrations
./scripts/run_migration.sh 011_create_content_comments.sql  # Run specific migration
```

## Common Issues

### Issue: "no such table: content_comments"
**Solution:** The migration hasn't run yet. Restart the backend or run it manually:
```bash
sqlite3 data/freedom.db < backend/migrations/011_create_content_comments.sql
```

### Issue: "duplicate column name"
**Solution:** This is normal - the migration was already applied. The migration runner handles this gracefully.

### Issue: "syntax error" in trigger
**Solution:** SQLite doesn't support `AFTER INSERT OR UPDATE OR DELETE`. Use separate triggers:
```sql
-- ❌ Bad
CREATE TRIGGER my_trigger AFTER INSERT OR UPDATE OR DELETE ON table...

-- ✅ Good
CREATE TRIGGER my_trigger_insert AFTER INSERT ON table...
CREATE TRIGGER my_trigger_update AFTER UPDATE ON table...
CREATE TRIGGER my_trigger_delete AFTER DELETE ON table...
```

## Migration File Checklist

Before committing a migration:

- [ ] File named `XXX_description.sql` (numbered sequentially)
- [ ] Uses `CREATE TABLE IF NOT EXISTS`
- [ ] Uses `CREATE INDEX IF NOT EXISTS`
- [ ] Uses `DROP TRIGGER IF EXISTS` before creating triggers
- [ ] Tested locally with `sqlite3 data/freedom.db < migration.sql`
- [ ] No syntax errors
- [ ] Idempotent (can run multiple times safely)

## Current Migrations

- `001_initial.sql` - Initial schema
- `002_seed_data.sql` - Seed data
- `003_add_content.sql` - Chapter content
- `004_add_ai_chapter.sql` - AI chapter
- `005_expand_chapter2_axioms_godel.sql` - Chapter 2 expansion
- `006_add_english_content.sql` - English translations
- `007_create_users.sql` - User system
- `009_refactor_to_i18n_standard.sql` - i18n refactoring
- `010_create_discussions.sql` - Discussions system
- `011_create_content_comments.sql` - Polymorphic comments
