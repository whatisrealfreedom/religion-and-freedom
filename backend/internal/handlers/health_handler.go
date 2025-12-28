package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
)

type HealthHandler struct {
	db repository.Database
}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

func NewHealthHandlerWithDB(db repository.Database) *HealthHandler {
	return &HealthHandler{db: db}
}

func (h *HealthHandler) Check(c *gin.Context) {
	status := "ok"
	message := "Freedom API is running"
	dbStatus := "unknown"

	// Check database if available
	if h.db != nil {
		if err := h.db.GetDB().Ping(); err != nil {
			status = "degraded"
			message = "API is running but database connection failed"
			dbStatus = "error"
			c.JSON(http.StatusServiceUnavailable, gin.H{
				"status":    status,
				"message":   message,
				"database":  dbStatus,
				"error":     err.Error(),
			})
			return
		}
		dbStatus = "connected"
	}

	c.JSON(http.StatusOK, gin.H{
		"status":   status,
		"message":  message,
		"database": dbStatus,
	})
}
