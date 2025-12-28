package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/whatisrealfreedom/freedom-website/internal/models"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
)

type DiscussionHandler struct {
	threadRepo   repository.ThreadRepository
	commentRepo  repository.CommentRepository
	voteRepo     repository.VoteRepository
	reactionRepo repository.ReactionRepository
}

func NewDiscussionHandler(
	threadRepo repository.ThreadRepository,
	commentRepo repository.CommentRepository,
	voteRepo repository.VoteRepository,
	reactionRepo repository.ReactionRepository,
) *DiscussionHandler {
	return &DiscussionHandler{
		threadRepo:   threadRepo,
		commentRepo:  commentRepo,
		voteRepo:     voteRepo,
		reactionRepo: reactionRepo,
	}
}

// GetThreads returns a list of threads with pagination
func (h *DiscussionHandler) GetThreads(c *gin.Context) {
	sortBy := c.DefaultQuery("sort", "newest")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "20"))
	
	if page < 1 {
		page = 1
	}
	if perPage < 1 || perPage > 100 {
		perPage = 20
	}
	
	// Get user ID from context if authenticated
	var userID *int64
	if uid, exists := c.Get("user_id"); exists {
		if id, ok := uid.(int64); ok {
			userID = &id
		}
	}
	
	threads, total, err := h.threadRepo.GetAll(sortBy, page, perPage, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch threads",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, models.ThreadListResponse{
		Threads: threads,
		Total:   total,
		Page:    page,
		PerPage: perPage,
	})
}

// GetThread returns a single thread with its comments
func (h *DiscussionHandler) GetThread(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid thread ID",
		})
		return
	}
	
	// Get user ID from context if authenticated
	var userID *int64
	if uid, exists := c.Get("user_id"); exists {
		if id, ok := uid.(int64); ok {
			userID = &id
		}
	}
	
	thread, err := h.threadRepo.GetByID(id, userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Thread not found",
		})
		return
	}
	
	// Increment view count
	go h.threadRepo.IncrementViewCount(id)
	
	// Get comments
	comments, err := h.commentRepo.GetByThreadID(id, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch comments",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, models.ThreadDetailResponse{
		Thread:   thread,
		Comments: comments,
	})
}

// CreateThread creates a new thread
func (h *DiscussionHandler) CreateThread(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	var req models.CreateThreadRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	thread := &models.Thread{
		UserID:  userID.(int64),
		Title:   req.Title,
		Content: req.Content,
	}
	
	if err := h.threadRepo.Create(thread); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create thread",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusCreated, thread)
}

// UpdateThread updates an existing thread
func (h *DiscussionHandler) UpdateThread(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid thread ID",
		})
		return
	}
	
	var req models.UpdateThreadRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	thread := &models.Thread{
		ID:      id,
		UserID:  userID.(int64),
		Title:   req.Title,
		Content: req.Content,
	}
	
	if err := h.threadRepo.Update(thread); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to update thread",
			"details": err.Error(),
		})
		return
	}
	
	// Get updated thread
	uid := userID.(int64)
	updatedThread, err := h.threadRepo.GetByID(id, &uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch updated thread",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, updatedThread)
}

// CreateComment creates a new comment
func (h *DiscussionHandler) CreateComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	threadIDStr := c.Param("id")
	threadID, err := strconv.ParseInt(threadIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid thread ID",
		})
		return
	}
	
	var req models.CreateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	comment := &models.Comment{
		ThreadID: threadID,
		UserID:   userID.(int64),
		Content:  req.Content,
		ParentID: req.ParentID,
	}
	
	if err := h.commentRepo.Create(comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create comment",
			"details": err.Error(),
		})
		return
	}
	
	// Get created comment with author info
	uid := userID.(int64)
	createdComment, err := h.commentRepo.GetByID(comment.ID, &uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch created comment",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusCreated, createdComment)
}

// UpdateComment updates an existing comment
func (h *DiscussionHandler) UpdateComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid comment ID",
		})
		return
	}
	
	var req models.UpdateCommentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	comment := &models.Comment{
		ID:      id,
		UserID:  userID.(int64),
		Content: req.Content,
	}
	
	if err := h.commentRepo.Update(comment); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to update comment",
			"details": err.Error(),
		})
		return
	}
	
	// Get updated comment
	uid := userID.(int64)
	updatedComment, err := h.commentRepo.GetByID(id, &uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch updated comment",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, updatedComment)
}

// VoteThread votes on a thread
func (h *DiscussionHandler) VoteThread(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid thread ID",
		})
		return
	}
	
	// Check if user owns the thread
	thread, err := h.threadRepo.GetByID(id, nil)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Thread not found",
		})
		return
	}
	
	if thread.UserID == userID.(int64) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You cannot vote on your own thread",
		})
		return
	}
	
	var req models.VoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	// Check if user already voted with the same vote type
	existingVote, _ := h.voteRepo.GetByUserAndItem(userID.(int64), &id, nil)
	if existingVote != nil && existingVote.VoteType == req.VoteType {
		// Remove vote (toggle off)
		if err := h.voteRepo.Delete(id, 0, userID.(int64)); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to remove vote",
				"details": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Vote removed"})
		return
	}
	
	vote := &models.Vote{
		UserID:   userID.(int64),
		ThreadID: &id,
		VoteType: req.VoteType,
	}
	
	if err := h.voteRepo.CreateOrUpdate(vote); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to vote",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Vote recorded"})
}

// VoteComment votes on a comment
func (h *DiscussionHandler) VoteComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid comment ID",
		})
		return
	}
	
	// Check if user owns the comment
	comment, err := h.commentRepo.GetByID(id, nil)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Comment not found",
		})
		return
	}
	
	if comment.UserID == userID.(int64) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You cannot vote on your own comment",
		})
		return
	}
	
	var req models.VoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	// Check if user already voted with the same vote type
	existingVote, _ := h.voteRepo.GetByUserAndItem(userID.(int64), nil, &id)
	if existingVote != nil && existingVote.VoteType == req.VoteType {
		// Remove vote (toggle off)
		if err := h.voteRepo.Delete(0, id, userID.(int64)); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error":   "Failed to remove vote",
				"details": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Vote removed"})
		return
	}
	
	vote := &models.Vote{
		UserID:    userID.(int64),
		CommentID: &id,
		VoteType:  req.VoteType,
	}
	
	if err := h.voteRepo.CreateOrUpdate(vote); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to vote",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Vote recorded"})
}

// ReactThread adds or removes a reaction on a thread
func (h *DiscussionHandler) ReactThread(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid thread ID",
		})
		return
	}
	
	// Check if user owns the thread
	thread, err := h.threadRepo.GetByID(id, nil)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Thread not found",
		})
		return
	}
	
	if thread.UserID == userID.(int64) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You cannot react to your own thread",
		})
		return
	}
	
	var req models.ReactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	reaction := &models.Reaction{
		UserID:       userID.(int64),
		ThreadID:     &id,
		ReactionType: req.ReactionType,
	}
	
	if err := h.reactionRepo.CreateOrDelete(reaction); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to react",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Reaction toggled"})
}

// ReactComment adds or removes a reaction on a comment
func (h *DiscussionHandler) ReactComment(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Authentication required",
		})
		return
	}
	
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid comment ID",
		})
		return
	}
	
	// Check if user owns the comment
	comment, err := h.commentRepo.GetByID(id, nil)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Comment not found",
		})
		return
	}
	
	if comment.UserID == userID.(int64) {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You cannot react to your own comment",
		})
		return
	}
	
	var req models.ReactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request",
			"details": err.Error(),
		})
		return
	}
	
	reaction := &models.Reaction{
		UserID:       userID.(int64),
		CommentID:    &id,
		ReactionType: req.ReactionType,
	}
	
	if err := h.reactionRepo.CreateOrDelete(reaction); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to react",
			"details": err.Error(),
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "Reaction toggled"})
}

