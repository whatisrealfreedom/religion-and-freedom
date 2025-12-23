package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/whatisrealfreedom/freedom-website/internal/services"
)

type ResourceHandler struct {
	service services.ResourceService
}

func NewResourceHandler(service services.ResourceService) *ResourceHandler {
	return &ResourceHandler{service: service}
}

func (h *ResourceHandler) GetAll(c *gin.Context) {
	resources, err := h.service.GetAllResources()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch resources",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  resources,
		"count": len(resources),
	})
}

func (h *ResourceHandler) GetPDFs(c *gin.Context) {
	pdfs, err := h.service.GetPDFResources()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch PDFs",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  pdfs,
		"count": len(pdfs),
	})
}
