package repository

import (
	"database/sql"
	"fmt"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type CommentRepository interface {
	Create(comment *models.Comment) error
	GetByThreadID(threadID int64, userID *int64) ([]*models.Comment, error)
	GetByID(id int64, userID *int64) (*models.Comment, error)
	Update(comment *models.Comment) error
	GetUserVote(commentID, userID int64) (*int, error)
	GetUserReactions(commentID, userID int64) ([]string, error)
	GetReactionSummary(commentID int64) ([]*models.ReactionSummary, error)
	CalculateDepth(commentID int64) (int, error)
}

type commentRepository struct {
	db *sql.DB
}

func NewCommentRepository(db *sql.DB) CommentRepository {
	return &commentRepository{db: db}
}

func (r *commentRepository) Create(comment *models.Comment) error {
	// Calculate depth if parent_id is provided
	depth := 0
	if comment.ParentID != nil {
		var err error
		depth, err = r.CalculateDepth(*comment.ParentID)
		if err != nil {
			return fmt.Errorf("failed to calculate depth: %w", err)
		}
		depth++ // Increment for this comment
	}
	
	query := `
		INSERT INTO comments (thread_id, user_id, parent_id, content, score, depth, is_deleted, created_at, updated_at)
		VALUES (?, ?, ?, ?, 0, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		RETURNING id, created_at, updated_at
	`
	
	var id int64
	var createdAt, updatedAt sql.NullTime
	err := r.db.QueryRow(
		query,
		comment.ThreadID,
		comment.UserID,
		comment.ParentID,
		comment.Content,
		depth,
	).Scan(&id, &createdAt, &updatedAt)
	
	if err != nil {
		return fmt.Errorf("failed to create comment: %w", err)
	}
	
	comment.ID = id
	comment.Depth = depth
	if createdAt.Valid {
		comment.CreatedAt = createdAt.Time
	}
	if updatedAt.Valid {
		comment.UpdatedAt = updatedAt.Time
	}
	comment.Score = 0
	
	return nil
}

func (r *commentRepository) GetByThreadID(threadID int64, userID *int64) ([]*models.Comment, error) {
	query := `
		SELECT c.id, c.thread_id, c.user_id, c.parent_id, c.content, c.score, c.depth,
		       c.is_deleted, c.created_at, c.updated_at, c.edited_at,
		       u.id, u.email, u.name, u.email_verified_at, u.photo_url, u.created_at
		FROM comments c
		LEFT JOIN users u ON c.user_id = u.id
		WHERE c.thread_id = ? AND c.is_deleted = 0
		ORDER BY c.created_at ASC
	`
	
	rows, err := r.db.Query(query, threadID)
	if err != nil {
		return nil, fmt.Errorf("failed to get comments: %w", err)
	}
	defer rows.Close()
	
	var comments []*models.Comment
	commentMap := make(map[int64]*models.Comment)
	
	for rows.Next() {
		comment := &models.Comment{}
		var parentID sql.NullInt64
		var authorID sql.NullInt64
		var authorEmail, authorName sql.NullString
		var authorEmailVerifiedAt sql.NullTime
		var authorPhotoURL sql.NullString
		var authorCreatedAt sql.NullTime
		var editedAt sql.NullTime
		
		err := rows.Scan(
			&comment.ID, &comment.ThreadID, &comment.UserID, &parentID,
			&comment.Content, &comment.Score, &comment.Depth,
			&comment.IsDeleted, &comment.CreatedAt, &comment.UpdatedAt, &editedAt,
			&authorID, &authorEmail, &authorName, &authorEmailVerifiedAt, &authorPhotoURL, &authorCreatedAt,
		)
		if err != nil {
			continue
		}
		
		if parentID.Valid {
			comment.ParentID = &parentID.Int64
		}
		
		if editedAt.Valid {
			comment.EditedAt = &editedAt.Time
		}
		
		if authorID.Valid {
			comment.Author = &models.User{
				ID:              authorID.Int64,
				Email:           authorEmail.String,
				Name:            &authorName.String,
				EmailVerifiedAt: &authorEmailVerifiedAt.Time,
				PhotoURL:        &authorPhotoURL.String,
				CreatedAt:       authorCreatedAt.Time,
			}
			if !authorEmailVerifiedAt.Valid {
				comment.Author.EmailVerifiedAt = nil
			}
			if !authorPhotoURL.Valid {
				comment.Author.PhotoURL = nil
			}
		}
		
		// Get user vote and reactions if userID is provided
		if userID != nil {
			vote, err := r.GetUserVote(comment.ID, *userID)
			if err == nil {
				comment.UserVote = vote
			}
			
			reactions, err := r.GetUserReactions(comment.ID, *userID)
			if err == nil {
				comment.UserReactions = reactions
			}
		}
		
		commentMap[comment.ID] = comment
		comments = append(comments, comment)
	}
	
	return comments, nil
}

func (r *commentRepository) GetByID(id int64, userID *int64) (*models.Comment, error) {
	query := `
		SELECT c.id, c.thread_id, c.user_id, c.parent_id, c.content, c.score, c.depth,
		       c.is_deleted, c.created_at, c.updated_at, c.edited_at,
		       u.id, u.email, u.name, u.email_verified_at, u.photo_url, u.created_at
		FROM comments c
		LEFT JOIN users u ON c.user_id = u.id
		WHERE c.id = ?
	`
	
	comment := &models.Comment{}
	var parentID sql.NullInt64
	var authorID sql.NullInt64
	var authorEmail, authorName sql.NullString
	var authorEmailVerifiedAt sql.NullTime
	var authorPhotoURL sql.NullString
	var authorCreatedAt sql.NullTime
	var editedAt sql.NullTime
	
	err := r.db.QueryRow(query, id).Scan(
		&comment.ID, &comment.ThreadID, &comment.UserID, &parentID,
		&comment.Content, &comment.Score, &comment.Depth,
		&comment.IsDeleted, &comment.CreatedAt, &comment.UpdatedAt, &editedAt,
		&authorID, &authorEmail, &authorName, &authorEmailVerifiedAt, &authorPhotoURL, &authorCreatedAt,
	)
	
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("comment not found")
		}
		return nil, fmt.Errorf("failed to get comment: %w", err)
	}
	
	if parentID.Valid {
		comment.ParentID = &parentID.Int64
	}
	
	if editedAt.Valid {
		comment.EditedAt = &editedAt.Time
	}
	
	if authorID.Valid {
		comment.Author = &models.User{
			ID:              authorID.Int64,
			Email:           authorEmail.String,
			Name:            &authorName.String,
			EmailVerifiedAt: &authorEmailVerifiedAt.Time,
			PhotoURL:        &authorPhotoURL.String,
			CreatedAt:       authorCreatedAt.Time,
		}
		if !authorEmailVerifiedAt.Valid {
			comment.Author.EmailVerifiedAt = nil
		}
		if !authorPhotoURL.Valid {
			comment.Author.PhotoURL = nil
		}
	}
	
	// Get user vote and reactions if userID is provided
	if userID != nil {
		vote, err := r.GetUserVote(id, *userID)
		if err == nil {
			comment.UserVote = vote
		}
		
		reactions, err := r.GetUserReactions(id, *userID)
		if err == nil {
			comment.UserReactions = reactions
		}
	}
	
	return comment, nil
}

func (r *commentRepository) Update(comment *models.Comment) error {
	query := `
		UPDATE comments 
		SET content = ?, edited_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
		WHERE id = ? AND user_id = ?
	`
	
	result, err := r.db.Exec(query, comment.Content, comment.ID, comment.UserID)
	if err != nil {
		return fmt.Errorf("failed to update comment: %w", err)
	}
	
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}
	
	if rowsAffected == 0 {
		return fmt.Errorf("comment not found or user not authorized")
	}
	
	return nil
}

func (r *commentRepository) GetUserVote(commentID, userID int64) (*int, error) {
	var voteType sql.NullInt64
	err := r.db.QueryRow(
		"SELECT vote_type FROM votes WHERE comment_id = ? AND user_id = ?",
		commentID, userID,
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

func (r *commentRepository) GetUserReactions(commentID, userID int64) ([]string, error) {
	rows, err := r.db.Query(
		"SELECT reaction_type FROM reactions WHERE comment_id = ? AND user_id = ?",
		commentID, userID,
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

func (r *commentRepository) GetReactionSummary(commentID int64) ([]*models.ReactionSummary, error) {
	rows, err := r.db.Query(`
		SELECT reaction_type, COUNT(*) as count
		FROM reactions
		WHERE comment_id = ?
		GROUP BY reaction_type
		ORDER BY count DESC
	`, commentID)
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

func (r *commentRepository) CalculateDepth(commentID int64) (int, error) {
	var depth int
	err := r.db.QueryRow("SELECT depth FROM comments WHERE id = ?", commentID).Scan(&depth)
	if err != nil {
		return 0, err
	}
	return depth, nil
}

