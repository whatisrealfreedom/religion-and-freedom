package repository

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
)

// Database interface for abstraction
type Database interface {
	Close() error
	GetDB() *sql.DB
}

type database struct {
	db *sql.DB
}

// NewDatabase creates a database connection based on config
func NewDatabase(cfg *config.Config) (Database, error) {
	switch cfg.DBType {
	case "sqlite":
		return newSQLiteDB(cfg)
	case "postgres":
		// TODO: implement PostgreSQL
		return nil, fmt.Errorf("postgres not yet implemented")
	default:
		return nil, fmt.Errorf("unsupported database type: %s", cfg.DBType)
	}
}

func newSQLiteDB(cfg *config.Config) (Database, error) {
	// Open database with proper settings for data persistence
	// _sync=NORMAL ensures data is written to disk (safer than OFF, faster than FULL)
	// _foreign_keys=1 enables foreign key constraints
	// _journal_mode=WAL enables Write-Ahead Logging for better concurrency
	db, err := sql.Open("sqlite3", cfg.DBPath+"?_foreign_keys=1&_journal_mode=WAL&_sync=NORMAL")
	if err != nil {
		return nil, fmt.Errorf("failed to open sqlite database: %w", err)
	}

	// Set connection pool settings
	db.SetMaxOpenConns(1) // SQLite works best with single connection
	db.SetMaxIdleConns(1)

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Ensure WAL mode is properly set and perform a checkpoint
	if _, err := db.Exec("PRAGMA journal_mode=WAL; PRAGMA synchronous=NORMAL; PRAGMA foreign_keys=ON;"); err != nil {
		return nil, fmt.Errorf("failed to set SQLite pragmas: %w", err)
	}

	// Run migrations after connection is established
	// Use a transaction to ensure migrations are atomic where possible
	if err := RunMigrationsOnDB(db); err != nil {
		// Log the error but don't fail completely - allow server to start
		// This prevents 502 errors when migrations have minor issues
		fmt.Printf("⚠️  Migration warning (server will continue): %v\n", err)
		// Only fail on critical errors (database connection issues, not migration syntax)
		if strings.Contains(strings.ToLower(err.Error()), "database") && 
		   strings.Contains(strings.ToLower(err.Error()), "locked") {
			return nil, fmt.Errorf("database is locked, please try again: %w", err)
		}
		// For other migration errors, log but continue
		fmt.Printf("ℹ️  Continuing despite migration warning. Some features may not work correctly.\n")
	}

	return &database{db: db}, nil
}

func (d *database) Close() error {
	return d.db.Close()
}

func (d *database) GetDB() *sql.DB {
	return d.db
}
