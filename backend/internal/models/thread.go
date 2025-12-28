package models

import "time"

// Thread represents a discussion thread (question/post)
type Thread struct {
	ID           int64     `json:"id" db:"id"`
	UserID       int64     `json:"user_id" db:"user_id"`
	Title        string    `json:"title" db:"title"`
	Content      string    `json:"content" db:"content"`
	Score        int       `json:"score" db:"score"`
	CommentCount int       `json:"comment_count" db:"comment_count"`
	ViewCount    int       `json:"view_count" db:"view_count"`
	IsPinned     bool      `json:"is_pinned" db:"is_pinned"`
	IsLocked     bool      `json:"is_locked" db:"is_locked"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time `json:"updated_at" db:"updated_at"`
	EditedAt     *time.Time `json:"edited_at,omitempty" db:"edited_at"`
	
	// Joined data
	Author       *User     `json:"author,omitempty"`
	UserVote     *int      `json:"user_vote,omitempty"` // 1 for upvote, -1 for downvote, nil for no vote
	UserReactions []string `json:"user_reactions,omitempty"` // List of reaction types user has given
}

// Comment represents a comment in a thread (can be nested)
type Comment struct {
	ID        int64     `json:"id" db:"id"`
	ThreadID  int64     `json:"thread_id" db:"thread_id"`
	UserID    int64     `json:"user_id" db:"user_id"`
	ParentID  *int64    `json:"parent_id,omitempty" db:"parent_id"`
	Content   string    `json:"content" db:"content"`
	Score     int       `json:"score" db:"score"`
	Depth     int       `json:"depth" db:"depth"`
	IsDeleted bool      `json:"is_deleted" db:"is_deleted"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
	EditedAt  *time.Time `json:"edited_at,omitempty" db:"edited_at"`
	
	// Joined data
	Author       *User     `json:"author,omitempty"`
	UserVote     *int      `json:"user_vote,omitempty"`
	UserReactions []string `json:"user_reactions,omitempty"`
	Replies      []*Comment `json:"replies,omitempty"` // Nested replies
}

// Vote represents a vote (upvote/downvote) on a thread or comment
type Vote struct {
	ID        int64     `json:"id" db:"id"`
	UserID    int64     `json:"user_id" db:"user_id"`
	ThreadID  *int64    `json:"thread_id,omitempty" db:"thread_id"`
	CommentID *int64    `json:"comment_id,omitempty" db:"comment_id"`
	VoteType  int       `json:"vote_type" db:"vote_type"` // 1 for upvote, -1 for downvote
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// Reaction represents an emoji reaction on a thread or comment
type Reaction struct {
	ID          int64     `json:"id" db:"id"`
	UserID      int64     `json:"user_id" db:"user_id"`
	ThreadID    *int64    `json:"thread_id,omitempty" db:"thread_id"`
	CommentID   *int64    `json:"comment_id,omitempty" db:"comment_id"`
	ReactionType string   `json:"reaction_type" db:"reaction_type"` // 'heart', 'clap', 'thumbs_up', 'thumbs_down'
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	
	// Joined data
	User        *User     `json:"user,omitempty"`
}

// ReactionSummary represents aggregated reaction counts
type ReactionSummary struct {
	Type  string `json:"type"`
	Count int    `json:"count"`
	Users []*User `json:"users,omitempty"` // Users who gave this reaction (for hover)
}

// ThreadDraft represents a saved draft for a thread
type ThreadDraft struct {
	ID        int64     `json:"id" db:"id"`
	UserID    int64     `json:"user_id" db:"user_id"`
	Title     *string   `json:"title,omitempty" db:"title"`
	Content   *string   `json:"content,omitempty" db:"content"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// CreateThreadRequest represents a request to create a new thread
type CreateThreadRequest struct {
	Title   string `json:"title" binding:"required,min=3,max=200"`
	Content string `json:"content" binding:"required,min=10"`
}

// UpdateThreadRequest represents a request to update a thread
type UpdateThreadRequest struct {
	Title   string `json:"title" binding:"required,min=3,max=200"`
	Content string `json:"content" binding:"required,min=10"`
}

// CreateCommentRequest represents a request to create a new comment
type CreateCommentRequest struct {
	Content  string `json:"content" binding:"required,min=1"`
	ParentID *int64 `json:"parent_id,omitempty"` // Optional: for nested replies
}

// UpdateCommentRequest represents a request to update a comment
type UpdateCommentRequest struct {
	Content string `json:"content" binding:"required,min=1"`
}

// VoteRequest represents a request to vote on a thread or comment
type VoteRequest struct {
	VoteType int `json:"vote_type" binding:"required,oneof=1 -1"` // 1 for upvote, -1 for downvote
}

// ReactionRequest represents a request to add/remove a reaction
type ReactionRequest struct {
	ReactionType string `json:"reaction_type" binding:"required,oneof=heart clap thumbs_up thumbs_down"`
}

// ThreadListResponse represents a paginated list of threads
type ThreadListResponse struct {
	Threads []*Thread `json:"threads"`
	Total   int       `json:"total"`
	Page    int       `json:"page"`
	PerPage int       `json:"per_page"`
}

// ThreadDetailResponse represents a thread with its comments
type ThreadDetailResponse struct {
	Thread   *Thread    `json:"thread"`
	Comments []*Comment `json:"comments"` // Flat list, will be nested on frontend
}

