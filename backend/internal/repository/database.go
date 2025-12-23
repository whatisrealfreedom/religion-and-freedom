package repository

import (
	"database/sql"
	"fmt"

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
	// Open database first
	db, err := sql.Open("sqlite3", cfg.DBPath+"?_foreign_keys=1&_journal_mode=WAL")
	if err != nil {
		return nil, fmt.Errorf("failed to open sqlite database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Run migrations after connection is established
	if err := RunMigrationsOnDB(db); err != nil {
		return nil, fmt.Errorf("failed to run migrations: %w", err)
	}

	return &database{db: db}, nil
}

func (d *database) Close() error {
	return d.db.Close()
}

func (d *database) GetDB() *sql.DB {
	return d.db
}
