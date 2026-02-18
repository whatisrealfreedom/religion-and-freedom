package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/whatisrealfreedom/freedom-website/internal/models"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
)

type CommentHandler struct {
	repo repository.ContentCommentRepository
}

func NewCommentHandler(repo repository.ContentCommentRepository) *CommentHandler {
	return &CommentHandler{repo: repo}
}

// GetComments returns comments for a commentable (erfan_slide/1, shahnameh_story/feraydun, etc.)
func (h *CommentHandler) GetComments(c *gin.Context) {
	commentableType := c.Param("type")
	commentableID := c.Param("id")
	if commentableType == "" || commentableID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type and id required"})
		return
	}

	var userID *int64
	if uid, exists := c.Get("user_id"); exists {
		if id, ok := uid.(int64); ok {
			userID = &id
		}
	}

	comments, err := h.repo.GetByCommentable(commentableType, commentableID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch comments", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": comments})
}

// CreateComment creates a comment on a commentable (auth required)
func (h *CommentHandler) CreateComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	commentableType := c.Param("type")
	commentableID := c.Param("id")
	if commentableType == "" || commentableID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type and id required"})
		return
	}

	var req models.CreateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	comment := &models.ContentComment{
		CommentableType: commentableType,
		CommentableID:   commentableID,
		UserID:          userID.(int64),
		Content:         req.Content,
		ParentID:        req.ParentID,
	}

	if err := h.repo.Create(comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment", "details": err.Error()})
		return
	}

	created, err := h.repo.GetByID(comment.ID, (*int64)(nil))
	if err != nil {
		c.JSON(http.StatusCreated, comment)
		return
	}
	c.JSON(http.StatusCreated, created)
}

// UpdateComment updates a content comment (auth required)
func (h *CommentHandler) UpdateComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
		return
	}

	var req models.UpdateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	comment := &models.ContentComment{ID: id, UserID: userID.(int64), Content: req.Content}
	if err := h.repo.Update(comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update comment"})
		return
	}

	uid := userID.(int64)
	updated, _ := h.repo.GetByID(id, &uid)
	c.JSON(http.StatusOK, updated)
}

// VoteComment votes on a content comment (auth required)
func (h *CommentHandler) VoteComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
		return
	}

	var req models.VoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	if err := h.repo.Vote(id, userID.(int64), req.VoteType); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to vote"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// ReactComment adds a reaction to a content comment (auth required)
func (h *CommentHandler) ReactComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
		return
	}

	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
		return
	}

	var req models.ReactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	if err := h.repo.React(id, userID.(int64), req.ReactionType); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to react"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}
