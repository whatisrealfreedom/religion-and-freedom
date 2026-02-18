package repository

import (
	"fmt"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
)

// DBType represents the database type
type DBType string

const (
	DBTypeSQLite   DBType = "sqlite"
	DBTypeMySQL    DBType = "mysql"
	DBTypePostgres DBType = "postgres"
)

// DBDialect provides database-specific SQL syntax
type DBDialect interface {
	// GetDBType returns the database type
	GetDBType() DBType
	
	// AutoIncrement returns the auto-increment syntax for primary keys
	AutoIncrement() string
	
	// TextType returns the TEXT type for the database
	TextType() string
	
	// BooleanType returns the boolean type for the database
	BooleanType() string
	
	// DateTimeType returns the datetime type
	DateTimeType() string
	
	// InsertIgnore returns the INSERT IGNORE syntax
	InsertIgnore() string
	
	// Upsert returns the upsert syntax (INSERT ... ON CONFLICT / ON DUPLICATE KEY UPDATE)
	Upsert(table string, conflictColumns []string, updateColumns []string) string
	
	// LimitOffset formats LIMIT and OFFSET clauses
	LimitOffset(limit, offset int) string
	
	// QuoteIdentifier quotes an identifier (table/column name)
	QuoteIdentifier(name string) string
	
	// CurrentTimestamp returns the current timestamp function
	CurrentTimestamp() string
	
	// TriggerForEachRow returns the FOR EACH ROW clause (empty for SQLite, required for MySQL/Postgres)
	TriggerForEachRow() string
}

// sqliteDialect implements DBDialect for SQLite
type sqliteDialect struct{}

func (d *sqliteDialect) GetDBType() DBType { return DBTypeSQLite }
func (d *sqliteDialect) AutoIncrement() string { return "INTEGER PRIMARY KEY AUTOINCREMENT" }
func (d *sqliteDialect) TextType() string { return "TEXT" }
func (d *sqliteDialect) BooleanType() string { return "BOOLEAN" }
func (d *sqliteDialect) DateTimeType() string { return "DATETIME" }
func (d *sqliteDialect) InsertIgnore() string { return "INSERT OR IGNORE" }
func (d *sqliteDialect) Upsert(table string, conflictColumns []string, updateColumns []string) string {
	// SQLite: INSERT ... ON CONFLICT(columns) DO UPDATE SET ...
	conflict := ""
	for i, col := range conflictColumns {
		if i > 0 {
			conflict += ", "
		}
		conflict += col
	}
	updates := ""
	for i, col := range updateColumns {
		if i > 0 {
			updates += ", "
		}
		updates += fmt.Sprintf("%s = excluded.%s", col, col)
	}
	return fmt.Sprintf("ON CONFLICT(%s) DO UPDATE SET %s", conflict, updates)
}
func (d *sqliteDialect) LimitOffset(limit, offset int) string {
	if offset > 0 {
		return fmt.Sprintf("LIMIT %d OFFSET %d", limit, offset)
	}
	return fmt.Sprintf("LIMIT %d", limit)
}
func (d *sqliteDialect) QuoteIdentifier(name string) string {
	return `"` + name + `"`
}
func (d *sqliteDialect) CurrentTimestamp() string { return "CURRENT_TIMESTAMP" }
func (d *sqliteDialect) TriggerForEachRow() string { return "" }

// mysqlDialect implements DBDialect for MySQL
type mysqlDialect struct{}

func (d *mysqlDialect) GetDBType() DBType { return DBTypeMySQL }
func (d *mysqlDialect) AutoIncrement() string { return "INT AUTO_INCREMENT PRIMARY KEY" }
func (d *mysqlDialect) TextType() string { return "TEXT" }
func (d *mysqlDialect) BooleanType() string { return "TINYINT(1)" }
func (d *mysqlDialect) DateTimeType() string { return "DATETIME" }
func (d *mysqlDialect) InsertIgnore() string { return "INSERT IGNORE" }
func (d *mysqlDialect) Upsert(table string, conflictColumns []string, updateColumns []string) string {
	// MySQL: INSERT ... ON DUPLICATE KEY UPDATE ...
	conflict := ""
	for i, col := range conflictColumns {
		if i > 0 {
			conflict += ", "
		}
		conflict += col
	}
	updates := ""
	for i, col := range updateColumns {
		if i > 0 {
			updates += ", "
		}
		updates += fmt.Sprintf("%s = VALUES(%s)", col, col)
	}
	return fmt.Sprintf("ON DUPLICATE KEY UPDATE %s", updates)
}
func (d *mysqlDialect) LimitOffset(limit, offset int) string {
	if offset > 0 {
		return fmt.Sprintf("LIMIT %d OFFSET %d", limit, offset)
	}
	return fmt.Sprintf("LIMIT %d", limit)
}
func (d *mysqlDialect) QuoteIdentifier(name string) string {
	return "`" + name + "`"
}
func (d *mysqlDialect) CurrentTimestamp() string { return "CURRENT_TIMESTAMP" }
func (d *mysqlDialect) TriggerForEachRow() string { return "FOR EACH ROW" }

// postgresDialect implements DBDialect for PostgreSQL
type postgresDialect struct{}

func (d *postgresDialect) GetDBType() DBType { return DBTypePostgres }
func (d *postgresDialect) AutoIncrement() string { return "SERIAL PRIMARY KEY" }
func (d *postgresDialect) TextType() string { return "TEXT" }
func (d *postgresDialect) BooleanType() string { return "BOOLEAN" }
func (d *postgresDialect) DateTimeType() string { return "TIMESTAMP" }
func (d *postgresDialect) InsertIgnore() string {
	// PostgreSQL doesn't have INSERT IGNORE, use ON CONFLICT DO NOTHING
	return "INSERT"
}
func (d *postgresDialect) Upsert(table string, conflictColumns []string, updateColumns []string) string {
	// PostgreSQL: INSERT ... ON CONFLICT(columns) DO UPDATE SET ...
	conflict := ""
	for i, col := range conflictColumns {
		if i > 0 {
			conflict += ", "
		}
		conflict += col
	}
	updates := ""
	for i, col := range updateColumns {
		if i > 0 {
			updates += ", "
		}
		updates += fmt.Sprintf("%s = excluded.%s", col, col)
	}
	return fmt.Sprintf("ON CONFLICT(%s) DO UPDATE SET %s", conflict, updates)
}
func (d *postgresDialect) LimitOffset(limit, offset int) string {
	if offset > 0 {
		return fmt.Sprintf("LIMIT %d OFFSET %d", limit, offset)
	}
	return fmt.Sprintf("LIMIT %d", limit)
}
func (d *postgresDialect) QuoteIdentifier(name string) string {
	return `"` + name + `"`
}
func (d *postgresDialect) CurrentTimestamp() string { return "CURRENT_TIMESTAMP" }
func (d *postgresDialect) TriggerForEachRow() string { return "FOR EACH ROW" }

// getDialect returns the appropriate dialect for the database type
func getDialect(dbType string) DBDialect {
	switch dbType {
	case "mysql":
		return &mysqlDialect{}
	case "postgres", "postgresql":
		return &postgresDialect{}
	case "sqlite":
		fallthrough
	default:
		return &sqliteDialect{}
	}
}

// DatabaseWithDialect extends Database interface with dialect information
type DatabaseWithDialect interface {
	Database
	GetDialect() DBDialect
}

type databaseWithDialect struct {
	Database
	dialect DBDialect
}

func (d *databaseWithDialect) GetDialect() DBDialect {
	return d.dialect
}

// Note: NewDatabaseWithDialect is not needed - NewDatabase already sets globalDialect
// This interface is kept for potential future use if we need explicit dialect access
