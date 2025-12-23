package repository

import (
	"database/sql"
	"fmt"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type ResourceRepository interface {
	GetAll() ([]models.Resource, error)
	GetPDFs() ([]models.PDFResource, error)
	GetByID(id int) (*models.Resource, error)
}

type resourceRepository struct {
	db *sql.DB
}

func NewResourceRepository(db *sql.DB) ResourceRepository {
	return &resourceRepository{db: db}
}

func (r *resourceRepository) GetAll() ([]models.Resource, error) {
	query := `
		SELECT id, type, title, description, file_url, file_size, pages, duration, icon, "order", created_at, updated_at
		FROM resources
		ORDER BY "order" ASC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query resources: %w", err)
	}
	defer rows.Close()

	var resources []models.Resource
	for rows.Next() {
		var res models.Resource
		err := rows.Scan(
			&res.ID,
			&res.Type,
			&res.Title,
			&res.Description,
			&res.FileURL,
			&res.FileSize,
			&res.Pages,
			&res.Duration,
			&res.Icon,
			&res.Order,
			&res.CreatedAt,
			&res.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan resource: %w", err)
		}
		resources = append(resources, res)
	}

	return resources, nil
}

func (r *resourceRepository) GetPDFs() ([]models.PDFResource, error) {
	query := `
		SELECT id, number, title, description, file_url, file_size, pages, icon
		FROM resources
		WHERE type = 'pdf'
		ORDER BY number ASC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query PDFs: %w", err)
	}
	defer rows.Close()

	var pdfs []models.PDFResource
	for rows.Next() {
		var pdf models.PDFResource
		err := rows.Scan(
			&pdf.ID,
			&pdf.Number,
			&pdf.Title,
			&pdf.Description,
			&pdf.FileURL,
			&pdf.FileSize,
			&pdf.Pages,
			&pdf.Icon,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan PDF: %w", err)
		}
		pdfs = append(pdfs, pdf)
	}

	return pdfs, nil
}

func (r *resourceRepository) GetByID(id int) (*models.Resource, error) {
	query := `
		SELECT id, type, title, description, file_url, file_size, pages, duration, icon, "order", created_at, updated_at
		FROM resources
		WHERE id = ?
	`

	var res models.Resource
	err := r.db.QueryRow(query, id).Scan(
		&res.ID,
		&res.Type,
		&res.Title,
		&res.Description,
		&res.FileURL,
		&res.FileSize,
		&res.Pages,
		&res.Duration,
		&res.Icon,
		&res.Order,
		&res.CreatedAt,
		&res.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("resource not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get resource: %w", err)
	}

	return &res, nil
}
