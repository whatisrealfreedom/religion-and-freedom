package repository

import (
	"database/sql"
	"fmt"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type VoteRepository interface {
	CreateOrUpdate(vote *models.Vote) error
	Delete(threadID, commentID, userID int64) error
	GetByUserAndItem(userID int64, threadID, commentID *int64) (*models.Vote, error)
}

type voteRepository struct {
	db *sql.DB
}

func NewVoteRepository(db *sql.DB) VoteRepository {
	return &voteRepository{db: db}
}

func (r *voteRepository) CreateOrUpdate(vote *models.Vote) error {
	// Check if vote already exists
	existing, err := r.GetByUserAndItem(vote.UserID, vote.ThreadID, vote.CommentID)
	if err == nil && existing != nil {
		// Update existing vote
		query := `
			UPDATE votes 
			SET vote_type = ?
			WHERE user_id = ? AND (thread_id = ? OR comment_id = ?)
		`
		
		var threadID, commentID int64
		if vote.ThreadID != nil {
			threadID = *vote.ThreadID
		}
		if vote.CommentID != nil {
			commentID = *vote.CommentID
		}
		
		_, err := r.db.Exec(query, vote.VoteType, vote.UserID, threadID, commentID)
		if err != nil {
			return fmt.Errorf("failed to update vote: %w", err)
		}
		return nil
	}
	
	// Create new vote
	query := `
		INSERT INTO votes (user_id, thread_id, comment_id, vote_type, created_at)
		VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
		RETURNING id, created_at
	`
	
	var id int64
	var createdAt sql.NullTime
	err = r.db.QueryRow(
		query,
		vote.UserID,
		vote.ThreadID,
		vote.CommentID,
		vote.VoteType,
	).Scan(&id, &createdAt)
	
	if err != nil {
		return fmt.Errorf("failed to create vote: %w", err)
	}
	
	vote.ID = id
	if createdAt.Valid {
		vote.CreatedAt = createdAt.Time
	}
	
	return nil
}

func (r *voteRepository) Delete(threadID, commentID, userID int64) error {
	var query string
	var args []interface{}
	
	if threadID > 0 {
		query = "DELETE FROM votes WHERE thread_id = ? AND user_id = ?"
		args = []interface{}{threadID, userID}
	} else if commentID > 0 {
		query = "DELETE FROM votes WHERE comment_id = ? AND user_id = ?"
		args = []interface{}{commentID, userID}
	} else {
		return fmt.Errorf("either thread_id or comment_id must be provided")
	}
	
	_, err := r.db.Exec(query, args...)
	if err != nil {
		return fmt.Errorf("failed to delete vote: %w", err)
	}
	
	return nil
}

func (r *voteRepository) GetByUserAndItem(userID int64, threadID, commentID *int64) (*models.Vote, error) {
	var query string
	var args []interface{}
	
	if threadID != nil {
		query = "SELECT id, user_id, thread_id, comment_id, vote_type, created_at FROM votes WHERE user_id = ? AND thread_id = ?"
		args = []interface{}{userID, *threadID}
	} else if commentID != nil {
		query = "SELECT id, user_id, thread_id, comment_id, vote_type, created_at FROM votes WHERE user_id = ? AND comment_id = ?"
		args = []interface{}{userID, *commentID}
	} else {
		return nil, fmt.Errorf("either thread_id or comment_id must be provided")
	}
	
	vote := &models.Vote{}
	var threadIDVal, commentIDVal sql.NullInt64
	var createdAt sql.NullTime
	
	err := r.db.QueryRow(query, args...).Scan(
		&vote.ID,
		&vote.UserID,
		&threadIDVal,
		&commentIDVal,
		&vote.VoteType,
		&createdAt,
	)
	
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	
	if threadIDVal.Valid {
		vote.ThreadID = &threadIDVal.Int64
	}
	if commentIDVal.Valid {
		vote.CommentID = &commentIDVal.Int64
	}
	if createdAt.Valid {
		vote.CreatedAt = createdAt.Time
	}
	
	return vote, nil
}

