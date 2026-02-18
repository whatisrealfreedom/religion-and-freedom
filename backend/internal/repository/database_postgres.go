//go:build postgres || all
// +build postgres all

package repository

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
)

// newPostgresDB creates a PostgreSQL database connection
func newPostgresDB(cfg *config.Config) (Database, error) {
	// Build DSN (Data Source Name) for PostgreSQL
	// sslmode=disable: For development (use require/prefer in production)
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBName,
	)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to open postgres database: %w", err)
	}

	// PostgreSQL connection pool settings
	db.SetMaxOpenConns(25)        // PostgreSQL can handle many connections
	db.SetMaxIdleConns(5)         // Keep some idle connections ready
	db.SetConnMaxLifetime(5 * time.Minute) // Recycle connections

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Run migrations after connection is established
	if err := RunMigrationsOnDB(db); err != nil {
		return nil, fmt.Errorf("migration failed: %w", err)
	}

	return &database{db: db}, nil
}
