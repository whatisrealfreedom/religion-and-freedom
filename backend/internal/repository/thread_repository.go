package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type ThreadRepository interface {
	Create(thread *models.Thread) error
	GetByID(id int64, userID *int64) (*models.Thread, error)
	GetAll(sortBy string, page, perPage int, userID *int64) ([]*models.Thread, int, error)
	Update(thread *models.Thread) error
	IncrementViewCount(threadID int64) error
	GetUserVote(threadID, userID int64) (*int, error)
	GetUserReactions(threadID, userID int64) ([]string, error)
	GetReactionSummary(threadID int64) ([]*models.ReactionSummary, error)
}

type threadRepository struct {
	db *sql.DB
}

func NewThreadRepository(db *sql.DB) ThreadRepository {
	return &threadRepository{db: db}
}

func (r *threadRepository) Create(thread *models.Thread) error {
	query := `
		INSERT INTO threads (user_id, title, content, score, comment_count, view_count, is_pinned, is_locked, created_at, updated_at)
		VALUES (?, ?, ?, 0, 0, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		RETURNING id, created_at, updated_at
	`
	
	var id int64
	var createdAt, updatedAt time.Time
	err := r.db.QueryRow(query, thread.UserID, thread.Title, thread.Content).Scan(&id, &createdAt, &updatedAt)
	if err != nil {
		return fmt.Errorf("failed to create thread: %w", err)
	}
	
	thread.ID = id
	thread.CreatedAt = createdAt
	thread.UpdatedAt = updatedAt
	thread.Score = 0
	thread.CommentCount = 0
	thread.ViewCount = 0
	
	return nil
}

func (r *threadRepository) GetByID(id int64, userID *int64) (*models.Thread, error) {
	query := `
		SELECT t.id, t.user_id, t.title, t.content, t.score, t.comment_count, t.view_count,
		       t.is_pinned, t.is_locked, t.created_at, t.updated_at, t.edited_at,
		       u.id, u.email, u.name, u.email_verified_at, u.photo_url, u.created_at
		FROM threads t
		LEFT JOIN users u ON t.user_id = u.id
		WHERE t.id = ?
	`
	
	thread := &models.Thread{}
	var authorID sql.NullInt64
	var authorEmail, authorName sql.NullString
	var authorEmailVerifiedAt sql.NullTime
	var authorPhotoURL sql.NullString
	var authorCreatedAt sql.NullTime
	var editedAt sql.NullTime
	
	err := r.db.QueryRow(query, id).Scan(
		&thread.ID, &thread.UserID, &thread.Title, &thread.Content,
		&thread.Score, &thread.CommentCount, &thread.ViewCount,
		&thread.IsPinned, &thread.IsLocked,
		&thread.CreatedAt, &thread.UpdatedAt, &editedAt,
		&authorID, &authorEmail, &authorName, &authorEmailVerifiedAt, &authorPhotoURL, &authorCreatedAt,
	)
	
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("thread not found")
		}
		return nil, fmt.Errorf("failed to get thread: %w", err)
	}
	
	if editedAt.Valid {
		thread.EditedAt = &editedAt.Time
	}
	
	// Set author if exists
	if authorID.Valid {
		thread.Author = &models.User{
			ID:              authorID.Int64,
			Email:           authorEmail.String,
			Name:            &authorName.String,
			EmailVerifiedAt: &authorEmailVerifiedAt.Time,
			PhotoURL:        &authorPhotoURL.String,
			CreatedAt:       authorCreatedAt.Time,
		}
		if !authorEmailVerifiedAt.Valid {
			thread.Author.EmailVerifiedAt = nil
		}
		if !authorPhotoURL.Valid {
			thread.Author.PhotoURL = nil
		}
	}
	
	// Get user vote if userID is provided
	if userID != nil {
		vote, err := r.GetUserVote(id, *userID)
		if err == nil {
			thread.UserVote = vote
		}
		
		reactions, err := r.GetUserReactions(id, *userID)
		if err == nil {
			thread.UserReactions = reactions
		}
	}
	
	return thread, nil
}

func (r *threadRepository) GetAll(sortBy string, page, perPage int, userID *int64) ([]*models.Thread, int, error) {
	// Validate sortBy
	orderBy := "t.created_at DESC"
	switch sortBy {
	case "newest":
		orderBy = "t.created_at DESC"
	case "oldest":
		orderBy = "t.created_at ASC"
	case "score":
		orderBy = "t.score DESC, t.created_at DESC"
	case "comments":
		orderBy = "t.comment_count DESC, t.created_at DESC"
	default:
		orderBy = "t.is_pinned DESC, t.created_at DESC"
	}
	
	// Get total count
	var total int
	err := r.db.QueryRow("SELECT COUNT(*) FROM threads").Scan(&total)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get thread count: %w", err)
	}
	
	// Get threads with pagination
	offset := (page - 1) * perPage
	query := fmt.Sprintf(`
		SELECT t.id, t.user_id, t.title, t.content, t.score, t.comment_count, t.view_count,
		       t.is_pinned, t.is_locked, t.created_at, t.updated_at, t.edited_at,
		       u.id, u.email, u.name, u.email_verified_at, u.photo_url, u.created_at
		FROM threads t
		LEFT JOIN users u ON t.user_id = u.id
		ORDER BY %s
		LIMIT ? OFFSET ?
	`, orderBy)
	
	rows, err := r.db.Query(query, perPage, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to get threads: %w", err)
	}
	defer rows.Close()
	
	var threads []*models.Thread
	for rows.Next() {
		thread := &models.Thread{}
		var authorID sql.NullInt64
		var authorEmail, authorName sql.NullString
		var authorEmailVerifiedAt sql.NullTime
		var authorPhotoURL sql.NullString
		var authorCreatedAt sql.NullTime
		var editedAt sql.NullTime
		
		err := rows.Scan(
			&thread.ID, &thread.UserID, &thread.Title, &thread.Content,
			&thread.Score, &thread.CommentCount, &thread.ViewCount,
			&thread.IsPinned, &thread.IsLocked,
			&thread.CreatedAt, &thread.UpdatedAt, &editedAt,
			&authorID, &authorEmail, &authorName, &authorEmailVerifiedAt, &authorPhotoURL, &authorCreatedAt,
		)
		if err != nil {
			continue
		}
		
		if editedAt.Valid {
			thread.EditedAt = &editedAt.Time
		}
		
		if authorID.Valid {
			thread.Author = &models.User{
				ID:              authorID.Int64,
				Email:           authorEmail.String,
				Name:            &authorName.String,
				EmailVerifiedAt: &authorEmailVerifiedAt.Time,
				PhotoURL:        &authorPhotoURL.String,
				CreatedAt:       authorCreatedAt.Time,
			}
			if !authorEmailVerifiedAt.Valid {
				thread.Author.EmailVerifiedAt = nil
			}
			if !authorPhotoURL.Valid {
				thread.Author.PhotoURL = nil
			}
		}
		
		// Get user vote and reactions if userID is provided
		if userID != nil {
			vote, err := r.GetUserVote(thread.ID, *userID)
			if err == nil {
				thread.UserVote = vote
			}
			
			reactions, err := r.GetUserReactions(thread.ID, *userID)
			if err == nil {
				thread.UserReactions = reactions
			}
		}
		
		threads = append(threads, thread)
	}
	
	return threads, total, nil
}

func (r *threadRepository) Update(thread *models.Thread) error {
	now := time.Now()
	query := `
		UPDATE threads 
		SET title = ?, content = ?, edited_at = ?, updated_at = CURRENT_TIMESTAMP
		WHERE id = ? AND user_id = ?
	`
	
	result, err := r.db.Exec(query, thread.Title, thread.Content, now, thread.ID, thread.UserID)
	if err != nil {
		return fmt.Errorf("failed to update thread: %w", err)
	}
	
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	
	if rowsAffected == 0 {
		return fmt.Errorf("thread not found or user not authorized")
	}
	
	thread.EditedAt = &now
	thread.UpdatedAt = now
	
	return nil
}

func (r *threadRepository) IncrementViewCount(threadID int64) error {
	_, err := r.db.Exec("UPDATE threads SET view_count = view_count + 1 WHERE id = ?", threadID)
	return err
}

func (r *threadRepository) GetUserVote(threadID, userID int64) (*int, error) {
	var voteType sql.NullInt64
	err := r.db.QueryRow(
		"SELECT vote_type FROM votes WHERE thread_id = ? AND user_id = ?",
		threadID, userID,
	).Scan(&voteType)
	
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	
	if !voteType.Valid {
		return nil, nil
	}
	
	vote := int(voteType.Int64)
	return &vote, nil
}

func (r *threadRepository) GetUserReactions(threadID, userID int64) ([]string, error) {
	rows, err := r.db.Query(
		"SELECT reaction_type FROM reactions WHERE thread_id = ? AND user_id = ?",
		threadID, userID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var reactions []string
	for rows.Next() {
		var reactionType string
		if err := rows.Scan(&reactionType); err != nil {
			continue
		}
		reactions = append(reactions, reactionType)
	}
	
	return reactions, nil
}

func (r *threadRepository) GetReactionSummary(threadID int64) ([]*models.ReactionSummary, error) {
	rows, err := r.db.Query(`
		SELECT reaction_type, COUNT(*) as count
		FROM reactions
		WHERE thread_id = ?
		GROUP BY reaction_type
		ORDER BY count DESC
	`, threadID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var summaries []*models.ReactionSummary
	for rows.Next() {
		var summary models.ReactionSummary
		if err := rows.Scan(&summary.Type, &summary.Count); err != nil {
			continue
		}
		summaries = append(summaries, &summary)
	}
	
	return summaries, nil
}

