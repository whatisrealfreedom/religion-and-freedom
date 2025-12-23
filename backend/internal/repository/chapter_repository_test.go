package repository

import (
	"database/sql"
	"os"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupTestDB(t *testing.T) (*sql.DB, func()) {
	dbPath := ":memory:"
	db, err := sql.Open("sqlite3", dbPath)
	require.NoError(t, err)

	// Create tables
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS chapters (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			number INTEGER NOT NULL UNIQUE,
			title TEXT NOT NULL,
			slug TEXT NOT NULL UNIQUE,
			description TEXT NOT NULL,
			content TEXT,
			icon TEXT,
			pages INTEGER DEFAULT 0,
			read_time INTEGER DEFAULT 0,
			featured BOOLEAN DEFAULT 0,
			"order" INTEGER DEFAULT 0,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
	`)
	require.NoError(t, err)

	// Insert test data
	_, err = db.Exec(`
		INSERT INTO chapters (id, number, title, slug, description, icon, pages, read_time, "order")
		VALUES (1, 1, 'Test Chapter', 'test-chapter', 'Test Description', 'key', 10, 5, 1);
	`)
	require.NoError(t, err)

	cleanup := func() {
		db.Close()
	}

	return db, cleanup
}

func TestChapterRepository_GetAll(t *testing.T) {
	db, cleanup := setupTestDB(t)
	defer cleanup()

	repo := NewChapterRepository(db)
	chapters, err := repo.GetAll()

	assert.NoError(t, err)
	assert.Len(t, chapters, 1)
	assert.Equal(t, "Test Chapter", chapters[0].Title)
	assert.Equal(t, "test-chapter", chapters[0].Slug)
}

func TestChapterRepository_GetByID(t *testing.T) {
	db, cleanup := setupTestDB(t)
	defer cleanup()

	repo := NewChapterRepository(db)
	chapter, err := repo.GetByID(1)

	assert.NoError(t, err)
	assert.NotNil(t, chapter)
	assert.Equal(t, "Test Chapter", chapter.Title)
}

func TestChapterRepository_GetByID_NotFound(t *testing.T) {
	db, cleanup := setupTestDB(t)
	defer cleanup()

	repo := NewChapterRepository(db)
	chapter, err := repo.GetByID(999)

	assert.Error(t, err)
	assert.Nil(t, chapter)
	assert.Contains(t, err.Error(), "not found")
}

func TestChapterRepository_GetBySlug(t *testing.T) {
	db, cleanup := setupTestDB(t)
	defer cleanup()

	repo := NewChapterRepository(db)
	chapter, err := repo.GetBySlug("test-chapter")

	assert.NoError(t, err)
	assert.NotNil(t, chapter)
	assert.Equal(t, "test-chapter", chapter.Slug)
}

