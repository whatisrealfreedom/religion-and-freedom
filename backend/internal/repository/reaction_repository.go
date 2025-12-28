package repository

import (
	"database/sql"
	"fmt"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type ReactionRepository interface {
	CreateOrDelete(reaction *models.Reaction) error
	GetByUserAndItem(userID int64, threadID, commentID *int64, reactionType string) (*models.Reaction, error)
}

type reactionRepository struct {
	db *sql.DB
}

func NewReactionRepository(db *sql.DB) ReactionRepository {
	return &reactionRepository{db: db}
}

func (r *reactionRepository) CreateOrDelete(reaction *models.Reaction) error {
	// Check if reaction already exists
	existing, err := r.GetByUserAndItem(reaction.UserID, reaction.ThreadID, reaction.CommentID, reaction.ReactionType)
	if err == nil && existing != nil {
		// Delete existing reaction (toggle off)
		var query string
		var args []interface{}
		
		if reaction.ThreadID != nil {
			query = "DELETE FROM reactions WHERE user_id = ? AND thread_id = ? AND reaction_type = ?"
			args = []interface{}{reaction.UserID, *reaction.ThreadID, reaction.ReactionType}
		} else if reaction.CommentID != nil {
			query = "DELETE FROM reactions WHERE user_id = ? AND comment_id = ? AND reaction_type = ?"
			args = []interface{}{reaction.UserID, *reaction.CommentID, reaction.ReactionType}
		} else {
			return fmt.Errorf("either thread_id or comment_id must be provided")
		}
		
		_, err := r.db.Exec(query, args...)
		if err != nil {
			return fmt.Errorf("failed to delete reaction: %w", err)
		}
		return nil
	}
	
	// Create new reaction
	query := `
		INSERT INTO reactions (user_id, thread_id, comment_id, reaction_type, created_at)
		VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
		RETURNING id, created_at
	`
	
	var id int64
	var createdAt sql.NullTime
	err = r.db.QueryRow(
		query,
		reaction.UserID,
		reaction.ThreadID,
		reaction.CommentID,
		reaction.ReactionType,
	).Scan(&id, &createdAt)
	
	if err != nil {
		return fmt.Errorf("failed to create reaction: %w", err)
	}
	
	reaction.ID = id
	if createdAt.Valid {
		reaction.CreatedAt = createdAt.Time
	}
	
	return nil
}

func (r *reactionRepository) GetByUserAndItem(userID int64, threadID, commentID *int64, reactionType string) (*models.Reaction, error) {
	var query string
	var args []interface{}
	
	if threadID != nil {
		query = "SELECT id, user_id, thread_id, comment_id, reaction_type, created_at FROM reactions WHERE user_id = ? AND thread_id = ? AND reaction_type = ?"
		args = []interface{}{userID, *threadID, reactionType}
	} else if commentID != nil {
		query = "SELECT id, user_id, thread_id, comment_id, reaction_type, created_at FROM reactions WHERE user_id = ? AND comment_id = ? AND reaction_type = ?"
		args = []interface{}{userID, *commentID, reactionType}
	} else {
		return nil, fmt.Errorf("either thread_id or comment_id must be provided")
	}
	
	reaction := &models.Reaction{}
	var threadIDVal, commentIDVal sql.NullInt64
	var createdAt sql.NullTime
	
	err := r.db.QueryRow(query, args...).Scan(
		&reaction.ID,
		&reaction.UserID,
		&threadIDVal,
		&commentIDVal,
		&reaction.ReactionType,
		&createdAt,
	)
	
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	
	if threadIDVal.Valid {
		reaction.ThreadID = &threadIDVal.Int64
	}
	if commentIDVal.Valid {
		reaction.CommentID = &commentIDVal.Int64
	}
	if createdAt.Valid {
		reaction.CreatedAt = createdAt.Time
	}
	
	return reaction, nil
}

