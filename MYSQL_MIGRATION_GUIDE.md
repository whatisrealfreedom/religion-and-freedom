# MySQL Migration Guide

## Current Status: ⚠️ Partially Compatible

Your codebase is **mostly compatible** with MySQL, but there are some SQLite-specific features that need to be addressed.

## What Needs to Change

### 1. Migration Files (SQL Syntax)

#### ✅ Already Compatible
- `CREATE TABLE IF NOT EXISTS` ✅
- `CREATE INDEX IF NOT EXISTS` ✅
- `FOREIGN KEY` constraints ✅
- `COALESCE()` function ✅
- `CURRENT_TIMESTAMP` ✅
- `UNIQUE` constraints ✅
- `CHECK` constraints ✅

#### ❌ SQLite-Specific (Needs Changes)

**1. Auto-increment syntax:**
```sql
-- SQLite (current)
id INTEGER PRIMARY KEY AUTOINCREMENT

-- MySQL (needed)
id INT AUTO_INCREMENT PRIMARY KEY
```

**2. Data types:**
```sql
-- SQLite (current)
TEXT
BOOLEAN DEFAULT 0
INTEGER

-- MySQL (needed)
TEXT or VARCHAR(255) or LONGTEXT
TINYINT(1) DEFAULT 0
INT
```

**3. Trigger syntax:**
```sql
-- SQLite (current)
CREATE TRIGGER name AFTER INSERT ON table
BEGIN
    -- statements
END;

-- MySQL (needed)
CREATE TRIGGER name AFTER INSERT ON table
FOR EACH ROW
BEGIN
    -- statements
END;
```

**4. Reserved words:**
```sql
-- SQLite allows "order" as column name with quotes
"order" INTEGER

-- MySQL needs backticks
`order` INT
```

### 2. Repository Code

#### ❌ SQLite-Specific Queries

**1. `INSERT OR IGNORE` (found in `content_comment_repository.go`):**
```go
// SQLite (current)
INSERT OR IGNORE INTO content_comment_reactions ...

// MySQL (needed)
INSERT IGNORE INTO content_comment_reactions ...
```

**2. `PRAGMA` statements (found in `database.go` and `user_repository.go`):**
```go
// SQLite only - remove or make conditional
PRAGMA journal_mode=WAL;
PRAGMA wal_checkpoint(TRUNCATE);
```

### 3. Database Connection Code

The `database.go` file already has a switch statement for different database types, but MySQL implementation is missing.

## Migration Strategy

### Option 1: Database-Agnostic Migrations (Recommended)

Create migration files that work for both SQLite and MySQL:

```sql
-- migrations/011_create_content_comments.sql
-- Works for both SQLite and MySQL

CREATE TABLE IF NOT EXISTS content_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- MySQL
    -- id INTEGER PRIMARY KEY AUTOINCREMENT,  -- SQLite (commented)
    commentable_type VARCHAR(255) NOT NULL,  -- MySQL
    -- commentable_type TEXT NOT NULL,  -- SQLite (commented)
    ...
);
```

**Problem:** This requires maintaining two versions or using a migration tool that supports multiple databases.

### Option 2: Separate Migration Files (Better)

Create separate migration directories:
```
backend/migrations/
  sqlite/
    011_create_content_comments.sql
  mysql/
    011_create_content_comments.sql
```

Then update `migrate.go` to use the appropriate directory based on `DB_TYPE`.

### Option 3: Use a Migration Tool (Best)

Use a tool like:
- **golang-migrate** (https://github.com/golang-migrate/migrate)
- **sql-migrate** (https://github.com/rubenv/sql-migrate)

These tools handle database-specific syntax automatically.

## Step-by-Step Migration Plan

### Phase 1: Make Code Database-Agnostic

1. **Update `database.go`** to support MySQL:
```go
case "mysql":
    return newMySQLDB(cfg)
```

2. **Create `newMySQLDB` function:**
```go
func newMySQLDB(cfg *config.Config) (Database, error) {
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4",
        cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName)
    
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        return nil, fmt.Errorf("failed to open mysql database: %w", err)
    }
    
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)
    
    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("failed to ping database: %w", err)
    }
    
    if err := RunMigrationsOnDB(db); err != nil {
        return nil, fmt.Errorf("migration failed: %w", err)
    }
    
    return &database{db: db}, nil
}
```

3. **Fix `INSERT OR IGNORE` in repositories:**
```go
// Make it database-aware
func (r *contentCommentRepository) React(commentID, userID int64, reactionType string) error {
    var query string
    if r.dbType == "sqlite" {
        query = `INSERT OR IGNORE INTO content_comment_reactions ...`
    } else {
        query = `INSERT IGNORE INTO content_comment_reactions ...`
    }
    // ...
}
```

4. **Remove or conditionally execute PRAGMA statements:**
```go
// Only run PRAGMA for SQLite
if cfg.DBType == "sqlite" {
    db.Exec("PRAGMA journal_mode=WAL; ...")
}
```

### Phase 2: Create MySQL Migrations

1. **Convert migration files:**
   - `INTEGER PRIMARY KEY AUTOINCREMENT` → `INT AUTO_INCREMENT PRIMARY KEY`
   - `TEXT` → `VARCHAR(255)` or `TEXT` (depending on size)
   - `BOOLEAN` → `TINYINT(1)`
   - `DATETIME` → `DATETIME` (same, but MySQL is stricter)
   - `"order"` → `` `order` ``

2. **Update trigger syntax:**
   - Add `FOR EACH ROW` after `AFTER INSERT/UPDATE/DELETE`
   - MySQL requires `DELIMITER` for multi-statement triggers

### Phase 3: Data Migration

1. **Export data from SQLite:**
```bash
sqlite3 data/freedom.db .dump > dump.sql
```

2. **Convert SQLite dump to MySQL format:**
   - Replace `INTEGER PRIMARY KEY AUTOINCREMENT` → `INT AUTO_INCREMENT PRIMARY KEY`
   - Replace `TEXT` → `VARCHAR(255)` or `TEXT`
   - Replace `BOOLEAN` → `TINYINT(1)`
   - Remove PRAGMA statements
   - Fix trigger syntax

3. **Import into MySQL:**
```bash
mysql -u user -p database_name < converted_dump.sql
```

## Quick Compatibility Checklist

### ✅ Already Compatible
- [x] Database interface abstraction (`Database` interface)
- [x] Repository pattern (all queries use `?` placeholders)
- [x] Most SQL syntax (CREATE TABLE, INSERT, SELECT, UPDATE, DELETE)
- [x] Foreign keys
- [x] Indexes
- [x] Transactions

### ⚠️ Needs Changes
- [ ] Migration files (SQL syntax differences)
- [ ] `INSERT OR IGNORE` → `INSERT IGNORE`
- [ ] PRAGMA statements (remove or make conditional)
- [ ] Auto-increment syntax
- [ ] Data types (TEXT → VARCHAR/TEXT, BOOLEAN → TINYINT)
- [ ] Trigger syntax
- [ ] Reserved word handling (`"order"` → `` `order` ``)

### 🔧 Implementation Needed
- [ ] `newMySQLDB()` function in `database.go`
- [ ] MySQL driver import (`github.com/go-sql-driver/mysql`)
- [ ] Database type detection in repository methods
- [ ] MySQL-specific migration directory or tool

## Recommended Approach

**Use `golang-migrate`** - it's the most popular Go migration tool and handles database differences automatically:

```bash
go get -u github.com/golang-migrate/migrate/v4
go get -u github.com/golang-migrate/migrate/v4/database/mysql
go get -u github.com/golang-migrate/migrate/v4/database/sqlite3
```

Then migrations can be written in a database-agnostic way, and the tool handles the differences.

## Estimated Effort

- **Small changes:** 2-4 hours (fix INSERT OR IGNORE, add MySQL connection)
- **Medium changes:** 1-2 days (convert all migrations, fix triggers)
- **Full migration:** 3-5 days (including testing, data migration, deployment)

## Conclusion

**Yes, migration is possible and relatively straightforward**, but requires:
1. Updating migration files for MySQL syntax
2. Adding MySQL connection code
3. Fixing SQLite-specific queries
4. Testing thoroughly

The codebase is well-structured with good abstraction, making the migration easier than it could be.
