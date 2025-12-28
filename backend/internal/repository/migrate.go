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

	// List of deprecated migrations that should be skipped
	deprecatedMigrations := map[string]string{
		"008_add_iran_cradle_freedom_chapter.sql": "This migration has been merged into 002_seed_data.sql. The chapter is now seeded in the initial data.",
	}

	// Execute each migration
	for _, file := range migrationFiles {
		// Skip deprecated migrations
		if reason, isDeprecated := deprecatedMigrations[file]; isDeprecated {
			fmt.Printf("⏭️  Skipping deprecated migration %s: %s\n", file, reason)
			continue
		}

		path := filepath.Join(migrationsPath, file)
		sqlContent, err := os.ReadFile(path)
		if err != nil {
			return fmt.Errorf("failed to read migration %s: %w", file, err)
		}

		// Check if migration file starts with DEPRECATED comment
		contentStr := string(sqlContent)
		if strings.HasPrefix(strings.TrimSpace(contentStr), "-- DEPRECATED") ||
			strings.HasPrefix(strings.TrimSpace(contentStr), "-- SKIP") {
			fmt.Printf("⏭️  Skipping deprecated migration %s (marked in file)\n", file)
			continue
		}

		// Execute migration - we'll handle errors gracefully for idempotent migrations
		// SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so some migrations might fail
		// if they're run multiple times. We'll log but continue for certain errors.
		_, err = db.Exec(contentStr)
		if err != nil {
			// Check if error is about duplicate column/table/index (idempotent errors)
			// These errors indicate the migration was already applied
			errStr := strings.ToLower(err.Error())
			isIdempotentError :=
				// Duplicate column (ALTER TABLE ADD COLUMN when column exists)
				strings.Contains(errStr, "duplicate column name") ||
					strings.Contains(errStr, "duplicate column") ||
					// Table/index already exists (CREATE TABLE/INDEX IF NOT EXISTS already handled, but check anyway)
					(strings.Contains(errStr, "table") && strings.Contains(errStr, "already exists")) ||
					(strings.Contains(errStr, "index") && strings.Contains(errStr, "already exists")) ||
					// Trigger already exists
					(strings.Contains(errStr, "trigger") && strings.Contains(errStr, "already exists")) ||
					// Constraint already exists
					(strings.Contains(errStr, "constraint") && strings.Contains(errStr, "already exists")) ||
					// UNIQUE constraint violation (for idempotent inserts)
					(strings.Contains(errStr, "unique constraint") || strings.Contains(errStr, "unique constraint failed"))

			if isIdempotentError {
				// This is an idempotent error - migration already applied, continue
				fmt.Printf("⚠️  Migration %s already applied (idempotent): %v\n", file, err)
				continue
			}

			// Check for syntax errors - these might indicate deprecated/broken migrations
			isSyntaxError := strings.Contains(errStr, "syntax error") ||
				strings.Contains(errStr, "near") ||
				strings.Contains(errStr, "unrecognized token")

			if isSyntaxError && file == "008_add_iran_cradle_freedom_chapter.sql" {
				// This specific migration is known to be deprecated and has syntax errors in production
				fmt.Printf("⏭️  Skipping deprecated migration %s (syntax error - merged into 002_seed_data.sql)\n", file)
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
