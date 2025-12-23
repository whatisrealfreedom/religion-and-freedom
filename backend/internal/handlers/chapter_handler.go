package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/whatisrealfreedom/freedom-website/internal/services"
)

type ChapterHandler struct {
	service services.ChapterService
}

func NewChapterHandler(service services.ChapterService) *ChapterHandler {
	return &ChapterHandler{service: service}
}

func (h *ChapterHandler) GetAll(c *gin.Context) {
	chapters, err := h.service.GetAllChapters()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch chapters",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  chapters,
		"count": len(chapters),
	})
}

func (h *ChapterHandler) GetByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid chapter ID",
		})
		return
	}

	chapter, err := h.service.GetChapterByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Chapter not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": chapter,
	})
}
