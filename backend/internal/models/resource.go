package models

// Resource represents a PDF or other resource
type Resource struct {
	ID          int    `json:"id" db:"id"`
	Type        string `json:"type" db:"type"` // pdf, audio, book
	Title       string `json:"title" db:"title"`
	Description string `json:"description" db:"description"`
	FileURL     string `json:"file_url" db:"file_url"`
	FileSize    int64  `json:"file_size" db:"file_size"` // in bytes
	Pages       int    `json:"pages" db:"pages"`
	Duration    int    `json:"duration" db:"duration"` // in minutes for audio
	Icon        string `json:"icon" db:"icon"`
	Order       int    `json:"order" db:"order"`
	CreatedAt   string `json:"created_at" db:"created_at"`
	UpdatedAt   string `json:"updated_at" db:"updated_at"`
}

// PDFResource is specific to PDF files
type PDFResource struct {
	ID          int    `json:"id"`
	Number      int    `json:"number"`
	Title       string `json:"title"`
	Description string `json:"description"`
	FileURL     string `json:"file_url"`
	FileSize    int64  `json:"file_size"`
	Pages       int    `json:"pages"`
	Icon        string `json:"icon"`
	Summary     string `json:"summary"`
}
