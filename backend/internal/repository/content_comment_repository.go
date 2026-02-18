package repository

import (
	"database/sql"
	"fmt"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
)

type ContentCommentRepository interface {
	Create(comment *models.ContentComment) error
	GetByCommentable(commentableType, commentableID string, userID *int64) ([]*models.ContentComment, error)
	GetByID(id int64, userID *int64) (*models.ContentComment, error)
	Update(comment *models.ContentComment) error
	GetUserVote(commentID, userID int64) (*int, error)
	GetUserReactions(commentID, userID int64) ([]string, error)
	Vote(commentID, userID int64, voteType int) error
	React(commentID, userID int64, reactionType string) error
	CalculateDepth(commentID int64) (int, error)
}

type contentCommentRepository struct {
	db *sql.DB
}

func NewContentCommentRepository(db *sql.DB) ContentCommentRepository {
	return &contentCommentRepository{db: db}
}

func (r *contentCommentRepository) Create(comment *models.ContentComment) error {
	depth := 0
	if comment.ParentID != nil {
		d, err := r.CalculateDepth(*comment.ParentID)
		if err != nil {
			return fmt.Errorf("failed to calculate depth: %w", err)
		}
		depth = d + 1
	}

	query := `
		INSERT INTO content_comments (commentable_type, commentable_id, user_id, parent_id, content, score, depth, is_deleted, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, 0, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	`
	result, err := r.db.Exec(query, comment.CommentableType, comment.CommentableID, comment.UserID, comment.ParentID, comment.Content, depth)
	if err != nil {
		return fmt.Errorf("failed to create comment: %w", err)
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	comment.ID = id
	comment.Depth = depth
	comment.Score = 0
	return nil
}

func (r *contentCommentRepository) GetByCommentable(commentableType, commentableID string, userID *int64) ([]*models.ContentComment, error) {
	query := `
		SELECT c.id, c.commentable_type, c.commentable_id, c.user_id, c.parent_id, c.content, c.score, c.depth,
		       c.is_deleted, c.created_at, c.updated_at, c.edited_at,
		       u.id, u.email, u.name, u.email_verified_at, u.photo_url, u.created_at
		FROM content_comments c
		LEFT JOIN users u ON c.user_id = u.id
		WHERE c.commentable_type = ? AND c.commentable_id = ? AND c.is_deleted = 0
		ORDER BY c.created_at ASC
	`
	rows, err := r.db.Query(query, commentableType, commentableID)
	if err != nil {
		return nil, fmt.Errorf("failed to get comments: %w", err)
	}
	defer rows.Close()

	var comments []*models.ContentComment
	for rows.Next() {
		comment := &models.ContentComment{}
		var parentID sql.NullInt64
		var authorID sql.NullInt64
		var authorEmail, authorName sql.NullString
		var authorEmailVerifiedAt sql.NullTime
		var authorPhotoURL sql.NullString
		var authorCreatedAt sql.NullTime
		var editedAt sql.NullTime

		err := rows.Scan(
			&comment.ID, &comment.CommentableType, &comment.CommentableID, &comment.UserID, &parentID,
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
				ID:        authorID.Int64,
				Email:     authorEmail.String,
				Name:      &authorName.String,
				CreatedAt: authorCreatedAt.Time,
			}
			if authorEmailVerifiedAt.Valid {
				comment.Author.EmailVerifiedAt = &authorEmailVerifiedAt.Time
			}
			if authorPhotoURL.Valid {
				comment.Author.PhotoURL = &authorPhotoURL.String
			}
		}
		if userID != nil {
			vote, _ := r.GetUserVote(comment.ID, *userID)
			comment.UserVote = vote
			reactions, _ := r.GetUserReactions(comment.ID, *userID)
			comment.UserReactions = reactions
		}
		comments = append(comments, comment)
	}
	return comments, nil
}

func (r *contentCommentRepository) GetByID(id int64, userID *int64) (*models.ContentComment, error) {
	query := `
		SELECT c.id, c.commentable_type, c.commentable_id, c.user_id, c.parent_id, c.content, c.score, c.depth,
		       c.is_deleted, c.created_at, c.updated_at, c.edited_at,
		       u.id, u.email, u.name, u.email_verified_at, u.photo_url, u.created_at
		FROM content_comments c
		LEFT JOIN users u ON c.user_id = u.id
		WHERE c.id = ?
	`
	comment := &models.ContentComment{}
	var parentID sql.NullInt64
	var authorID sql.NullInt64
	var authorEmail, authorName sql.NullString
	var authorEmailVerifiedAt sql.NullTime
	var authorPhotoURL sql.NullString
	var authorCreatedAt sql.NullTime
	var editedAt sql.NullTime

	err := r.db.QueryRow(query, id).Scan(
		&comment.ID, &comment.CommentableType, &comment.CommentableID, &comment.UserID, &parentID,
		&comment.Content, &comment.Score, &comment.Depth,
		&comment.IsDeleted, &comment.CreatedAt, &comment.UpdatedAt, &editedAt,
		&authorID, &authorEmail, &authorName, &authorEmailVerifiedAt, &authorPhotoURL, &authorCreatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("comment not found")
		}
		return nil, err
	}
	if parentID.Valid {
		comment.ParentID = &parentID.Int64
	}
	if editedAt.Valid {
		comment.EditedAt = &editedAt.Time
	}
	if authorID.Valid {
		comment.Author = &models.User{ID: authorID.Int64, Email: authorEmail.String, Name: &authorName.String, CreatedAt: authorCreatedAt.Time}
		if authorEmailVerifiedAt.Valid {
			comment.Author.EmailVerifiedAt = &authorEmailVerifiedAt.Time
		}
	}
	if userID != nil {
		comment.UserVote, _ = r.GetUserVote(id, *userID)
		comment.UserReactions, _ = r.GetUserReactions(id, *userID)
	}
	return comment, nil
}

func (r *contentCommentRepository) Update(comment *models.ContentComment) error {
	_, err := r.db.Exec(
		`UPDATE content_comments SET content = ?, edited_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
		comment.Content, comment.ID, comment.UserID,
	)
	return err
}

func (r *contentCommentRepository) GetUserVote(commentID, userID int64) (*int, error) {
	var voteType sql.NullInt64
	err := r.db.QueryRow(
		"SELECT vote_type FROM content_comment_votes WHERE content_comment_id = ? AND user_id = ?",
		commentID, userID,
	).Scan(&voteType)
	if err != nil || !voteType.Valid {
		return nil, nil
	}
	v := int(voteType.Int64)
	return &v, nil
}

func (r *contentCommentRepository) GetUserReactions(commentID, userID int64) ([]string, error) {
	rows, err := r.db.Query(
		"SELECT reaction_type FROM content_comment_reactions WHERE content_comment_id = ? AND user_id = ?",
		commentID, userID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var reactions []string
	for rows.Next() {
		var t string
		if rows.Scan(&t) == nil {
			reactions = append(reactions, t)
		}
	}
	return reactions, nil
}

func (r *contentCommentRepository) Vote(commentID, userID int64, voteType int) error {
	_, err := r.db.Exec(`DELETE FROM content_comment_votes WHERE user_id = ? AND content_comment_id = ?`, userID, commentID)
	if err != nil {
		return err
	}
	_, err = r.db.Exec(
		`INSERT INTO content_comment_votes (user_id, content_comment_id, vote_type) VALUES (?, ?, ?)`,
		userID, commentID, voteType,
	)
	return err
}

func (r *contentCommentRepository) React(commentID, userID int64, reactionType string) error {
	// Database-agnostic INSERT IGNORE / INSERT OR IGNORE
	// Use global dialect to get the correct syntax
	dialect := getDialectFromDB(r.db)
	insertIgnore := dialect.InsertIgnore()
	
	query := fmt.Sprintf(`%s INTO content_comment_reactions (user_id, content_comment_id, reaction_type) VALUES (?, ?, ?)`, insertIgnore)
	
	// For PostgreSQL, INSERT IGNORE doesn't exist, so we need ON CONFLICT DO NOTHING
	if dialect.GetDBType() == DBTypePostgres {
		query = `INSERT INTO content_comment_reactions (user_id, content_comment_id, reaction_type) VALUES (?, ?, ?) ON CONFLICT(user_id, content_comment_id, reaction_type) DO NOTHING`
	}
	
	_, err := r.db.Exec(query, userID, commentID, reactionType)
	return err
}

// getDialectFromDB attempts to detect database type from connection
// Falls back to SQLite if detection fails
func getDialectFromDB(db *sql.DB) DBDialect {
	if globalDialect != nil {
		return globalDialect
	}
	// Fallback: try to detect from driver name
	driverName := ""
	if db != nil {
		// Get driver name from connection string or use default
		// This is a fallback - ideally globalDialect should always be set
		driverName = "sqlite" // Default fallback
	}
	return getDialect(driverName)
}

func (r *contentCommentRepository) CalculateDepth(commentID int64) (int, error) {
	var depth int
	err := r.db.QueryRow("SELECT depth FROM content_comments WHERE id = ?", commentID).Scan(&depth)
	return depth, err
}
