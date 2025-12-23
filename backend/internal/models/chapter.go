package models

// Chapter represents a chapter in the freedom theory
type Chapter struct {
	ID          int    `json:"id" db:"id"`
	Number      int    `json:"number" db:"number"`
	Title       string `json:"title" db:"title"`
	Slug        string `json:"slug" db:"slug"`
	Description string `json:"description" db:"description"`
	Content     string `json:"content" db:"content"`
	Icon        string `json:"icon" db:"icon"`
	Pages       int    `json:"pages" db:"pages"`
	ReadTime    int    `json:"read_time" db:"read_time"` // in minutes
	Featured    bool   `json:"featured" db:"featured"`
	Order       int    `json:"order" db:"order"`
	CreatedAt   string `json:"created_at" db:"created_at"`
	UpdatedAt   string `json:"updated_at" db:"updated_at"`
}

// ChapterSummary is a lightweight version for listing
type ChapterSummary struct {
	ID          int    `json:"id"`
	Number      int    `json:"number"`
	Title       string `json:"title"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
	Pages       int    `json:"pages"`
	ReadTime    int    `json:"read_time"`
	Featured    bool   `json:"featured"`
}
