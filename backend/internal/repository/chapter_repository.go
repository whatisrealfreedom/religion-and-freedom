package repository

import (
	"database/sql"
	"fmt"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type ChapterRepository interface {
	GetAll() ([]models.ChapterSummary, error)
	GetByID(id int) (*models.Chapter, error)
	GetBySlug(slug string) (*models.Chapter, error)
}

type chapterRepository struct {
	db *sql.DB
}

func NewChapterRepository(db *sql.DB) ChapterRepository {
	return &chapterRepository{db: db}
}

func (r *chapterRepository) GetAll() ([]models.ChapterSummary, error) {
	query := `
		SELECT id, number, title, slug, description, icon, pages, read_time, featured
		FROM chapters
		ORDER BY "order" ASC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query chapters: %w", err)
	}
	defer rows.Close()

	var chapters []models.ChapterSummary
	for rows.Next() {
		var c models.ChapterSummary
		err := rows.Scan(
			&c.ID,
			&c.Number,
			&c.Title,
			&c.Slug,
			&c.Description,
			&c.Icon,
			&c.Pages,
			&c.ReadTime,
			&c.Featured,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan chapter: %w", err)
		}
		chapters = append(chapters, c)
	}

	return chapters, nil
}

func (r *chapterRepository) GetByID(id int) (*models.Chapter, error) {
	query := `
		SELECT id, number, title, slug, description, content, icon, pages, read_time, featured, "order", created_at, updated_at
		FROM chapters
		WHERE id = ?
	`

	var c models.Chapter
	err := r.db.QueryRow(query, id).Scan(
		&c.ID,
		&c.Number,
		&c.Title,
		&c.Slug,
		&c.Description,
		&c.Content,
		&c.Icon,
		&c.Pages,
		&c.ReadTime,
		&c.Featured,
		&c.Order,
		&c.CreatedAt,
		&c.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("chapter not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get chapter: %w", err)
	}

	return &c, nil
}

func (r *chapterRepository) GetBySlug(slug string) (*models.Chapter, error) {
	query := `
		SELECT id, number, title, slug, description, content, icon, pages, read_time, featured, "order", created_at, updated_at
		FROM chapters
		WHERE slug = ?
	`

	var c models.Chapter
	err := r.db.QueryRow(query, slug).Scan(
		&c.ID,
		&c.Number,
		&c.Title,
		&c.Slug,
		&c.Description,
		&c.Content,
		&c.Icon,
		&c.Pages,
		&c.ReadTime,
		&c.Featured,
		&c.Order,
		&c.CreatedAt,
		&c.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("chapter not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get chapter: %w", err)
	}

	return &c, nil
}
