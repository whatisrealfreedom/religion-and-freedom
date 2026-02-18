package repository

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
)

// newMySQLDB creates a MySQL database connection
func newMySQLDB(cfg *config.Config) (Database, error) {
	// Build DSN (Data Source Name)
	// parseTime=true: Parse DATETIME/DATE/TIME to time.Time
	// charset=utf8mb4: Full UTF-8 support (including emojis)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&charset=utf8mb4&collation=utf8mb4_unicode_ci",
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBName,
	)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open mysql database: %w", err)
	}

	// MySQL connection pool settings (different from SQLite)
	db.SetMaxOpenConns(25)        // MySQL can handle many connections
	db.SetMaxIdleConns(5)         // Keep some idle connections ready
	db.SetConnMaxLifetime(5 * time.Minute) // Recycle connections

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Run migrations after connection is established
	if err := RunMigrationsOnDB(db); err != nil {
		// For MySQL, we might want to fail hard on migration errors
		// Unlike SQLite, MySQL migrations are usually more critical
		return nil, fmt.Errorf("migration failed: %w", err)
	}

	return &database{db: db}, nil
}
