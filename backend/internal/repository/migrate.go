package repository

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// RunMigrations runs all SQL migration files in order
func RunMigrations(db *sql.DB, migrationsPath string) error {
	files, err := os.ReadDir(migrationsPath)
	if err != nil {
		return fmt.Errorf("failed to read migrations directory: %w", err)
	}

	// Filter and sort migration files
	var migrationFiles []string
	for _, file := range files {
		if strings.HasSuffix(file.Name(), ".sql") {
			migrationFiles = append(migrationFiles, file.Name())
		}
	}
	sort.Strings(migrationFiles)

	// Execute each migration
	for _, file := range migrationFiles {
		path := filepath.Join(migrationsPath, file)
		sqlContent, err := os.ReadFile(path)
		if err != nil {
			return fmt.Errorf("failed to read migration %s: %w", file, err)
		}

		// Execute migration - we'll handle errors gracefully for idempotent migrations
		// SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so some migrations might fail
		// if they're run multiple times. We'll log but continue for certain errors.
		_, err = db.Exec(string(sqlContent))
		if err != nil {
			// Check if error is about duplicate column/table/index (idempotent errors)
			errStr := strings.ToLower(err.Error())
			if strings.Contains(errStr, "duplicate column") ||
				strings.Contains(errStr, "already exists") ||
				strings.Contains(errStr, "table already exists") ||
				strings.Contains(errStr, "index already exists") ||
				strings.Contains(errStr, "unique constraint failed") {
				// This is an idempotent error - migration already applied, continue
				fmt.Printf("⚠️  Migration %s already applied (idempotent): %v\n", file, err)
				continue
			}
			// For other errors, fail the migration
			return fmt.Errorf("failed to execute migration %s: %w", file, err)
		}

		fmt.Printf("✅ Migration executed: %s\n", file)
	}

	return nil
}

// RunMigrationsOnDB runs migrations on an existing database connection
func RunMigrationsOnDB(db *sql.DB) error {
	// Try multiple paths for migrations
	possiblePaths := []string{
		"migrations",
		"/app/migrations",
		"./migrations",
		"backend/migrations",
		"./backend/migrations",
	}

	var migrationsPath string
	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			migrationsPath = path
			break
		}
	}

	if migrationsPath == "" {
		return fmt.Errorf("migrations directory not found (tried: %v)", possiblePaths)
	}

	if err := RunMigrations(db, migrationsPath); err != nil {
		return err
	}

	return nil
}
