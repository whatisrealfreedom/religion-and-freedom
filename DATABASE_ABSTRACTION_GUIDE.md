# Database Abstraction Guide

## Overview

All SQL operations are now **completely database-agnostic**. The codebase supports SQLite, MySQL, and PostgreSQL without any database-specific code in repositories or handlers.

## Architecture

### 1. Database Dialect System

A `DBDialect` interface provides database-specific SQL syntax:

```go
type DBDialect interface {
    GetDBType() DBType
    AutoIncrement() string
    TextType() string
    BooleanType() string
    InsertIgnore() string
    Upsert(...) string
    QuoteIdentifier(name string) string
    TriggerForEachRow() string
    // ... more methods
}
```

**Implemented dialects:**
- `sqliteDialect` - SQLite syntax
- `mysqlDialect` - MySQL syntax  
- `postgresDialect` - PostgreSQL syntax

### 2. Global Dialect

The `globalDialect` variable is set when the database connection is established:

```go
// In newSQLiteDB()
globalDialect = &sqliteDialect{}

// In newMySQLDB()
globalDialect = &mysqlDialect{}

// In newPostgresDB()
globalDialect = &postgresDialect{}
```

### 3. Database-Aware Migrations

Migrations are organized by database type:

```
backend/migrations/
  sqlite/
    001_initial.sql
    011_create_content_comments.sql
  mysql/
    001_initial.sql
    011_create_content_comments.sql
  postgres/
    001_initial.sql
    011_create_content_comments.sql
```

The migration runner automatically detects the database type and uses the appropriate directory.

## Usage Examples

### Insert IGNORE (Database-Agnostic)

```go
// OLD (SQLite-specific):
INSERT OR IGNORE INTO table ...

// NEW (Database-agnostic):
dialect := getDialectFromDB(db)
query := fmt.Sprintf(`%s INTO table ...`, dialect.InsertIgnore())
// SQLite: INSERT OR IGNORE
// MySQL: INSERT IGNORE
// PostgreSQL: INSERT ... ON CONFLICT DO NOTHING
```

### Auto-Increment Syntax

```go
dialect := getDialectFromDB(db)
autoInc := dialect.AutoIncrement()
// SQLite: INTEGER PRIMARY KEY AUTOINCREMENT
// MySQL: INT AUTO_INCREMENT PRIMARY KEY
// PostgreSQL: SERIAL PRIMARY KEY
```

### Quote Identifiers (Reserved Words)

```go
dialect := getDialectFromDB(db)
orderCol := dialect.QuoteIdentifier("order")
// SQLite: "order"
// MySQL: `order`
// PostgreSQL: "order"
```

## Key Features

### ✅ Complete Abstraction

- **No database-specific SQL** in repository code
- **Automatic dialect detection** from global variable
- **Fallback to SQLite** if dialect not set (for backward compatibility)

### ✅ Migration System

- **Database-specific migrations** in separate directories
- **Automatic detection** of database type
- **Fallback to generic migrations** directory if DB-specific not found

### ✅ PRAGMA Statements

SQLite-specific `PRAGMA` statements are now conditional:

```go
// Only runs for SQLite
if globalDialect != nil && globalDialect.GetDBType() == DBTypeSQLite {
    db.Exec("PRAGMA wal_checkpoint(TRUNCATE)")
}
```

## Supported Databases

### SQLite ✅
- Fully supported
- Uses `migrations/sqlite/` directory
- PRAGMA statements enabled

### MySQL ✅
- Fully supported
- Uses `migrations/mysql/` directory
- Requires: `go get github.com/go-sql-driver/mysql`

### PostgreSQL ✅
- Fully supported
- Uses `migrations/postgres/` directory
- Requires: `go get github.com/lib/pq`

## Configuration

Set database type in `.env`:

```env
# SQLite (default)
DB_TYPE=sqlite
DB_PATH=./data/freedom.db

# MySQL
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=freedom
DB_USER=user
DB_PASSWORD=password

# PostgreSQL
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=freedom
DB_USER=user
DB_PASSWORD=password
```

## Migration Differences

### SQLite Migrations
- `INTEGER PRIMARY KEY AUTOINCREMENT`
- `TEXT` type
- `BOOLEAN` type
- `INSERT OR IGNORE`
- No `FOR EACH ROW` in triggers

### MySQL Migrations
- `INT AUTO_INCREMENT PRIMARY KEY`
- `TEXT` or `VARCHAR(255)` type
- `TINYINT(1)` for boolean
- `INSERT IGNORE`
- `FOR EACH ROW` in triggers
- Backticks for identifiers: `` `order` ``

### PostgreSQL Migrations
- `SERIAL PRIMARY KEY`
- `TEXT` type
- `BOOLEAN` type
- `INSERT ... ON CONFLICT DO NOTHING`
- `FOR EACH ROW` in triggers
- Double quotes for identifiers: `"order"`

## Best Practices

1. **Always use dialect methods** for database-specific syntax
2. **Never hardcode SQL syntax** that differs between databases
3. **Use `getDialectFromDB()`** to get the current dialect
4. **Test with all databases** before deploying
5. **Keep migrations in sync** across all database directories

## Adding New Database Support

1. Create new dialect struct implementing `DBDialect`
2. Add case in `getDialect()` function
3. Create `new<DB>DB()` function
4. Add case in `NewDatabase()` switch
5. Create migration directory: `migrations/<dbtype>/`
6. Convert all migration files

## Troubleshooting

### "Dialect not set" errors
- Ensure `globalDialect` is set in `newSQLiteDB()`/`newMySQLDB()`/`newPostgresDB()`
- Check that database connection is established before repository operations

### Migration directory not found
- Ensure migrations exist in `migrations/<dbtype>/` directory
- Check that `DB_TYPE` matches directory name (sqlite/mysql/postgres)

### SQL syntax errors
- Verify you're using dialect methods, not hardcoded SQL
- Check that migration files match the database type
