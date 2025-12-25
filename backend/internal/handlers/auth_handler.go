package handlers

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/whatisrealfreedom/freedom-website/internal/models"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
	"github.com/whatisrealfreedom/freedom-website/internal/services"
	"github.com/whatisrealfreedom/freedom-website/internal/utils"
)

type AuthHandler struct {
	userRepo     repository.UserRepository
	emailService *services.EmailService
	config       interface {
		GetJWTSecret() string
		GetJWTExpiry() string
	}
}

func NewAuthHandler(userRepo repository.UserRepository, emailService *services.EmailService, jwtSecret, jwtExpiry string) *AuthHandler {
	// Initialize JWT
	utils.InitJWT(jwtSecret)

	return &AuthHandler{
		userRepo:     userRepo,
		emailService: emailService,
		config: &configWrapper{
			jwtSecret: jwtSecret,
			jwtExpiry: jwtExpiry,
		},
	}
}

type configWrapper struct {
	jwtSecret string
	jwtExpiry string
}

func (c *configWrapper) GetJWTSecret() string {
	return c.jwtSecret
}

func (c *configWrapper) GetJWTExpiry() string {
	return c.jwtExpiry
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	// Check if user already exists
	existingUser, _ := h.userRepo.GetByEmail(req.Email)
	if existingUser != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
		return
	}

	// Create user
	user := &models.User{
		Email:    req.Email,
		Password: req.Password,
		IsActive: false, // User is inactive until email is verified
	}

	if req.Name != "" {
		user.Name = &req.Name
	}

	if err := h.userRepo.Create(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user", "details": err.Error()})
		return
	}

	// Generate verification code
	code := h.emailService.GenerateVerificationCode()

	// Save verification code
	if err := h.userRepo.CreateVerificationCode(user.ID, user.Email, code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create verification code", "details": err.Error()})
		return
	}

	// Send verification email
	if err := h.emailService.SendVerificationEmail(user.Email, code); err != nil {
		// Log error but don't fail registration
		// In production, you might want to queue this for retry
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "User created but failed to send verification email",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Registration successful. Please check your email for verification code.",
		"user_id": user.ID,
	})
}

// VerifyEmail handles email verification
func (h *AuthHandler) VerifyEmail(c *gin.Context) {
	var req models.VerifyEmailRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	// Normalize code: remove spaces and ensure it's exactly 5 digits
	code := strings.TrimSpace(req.Code)
	// Remove any non-digit characters
	code = strings.Map(func(r rune) rune {
		if r >= '0' && r <= '9' {
			return r
		}
		return -1
	}, code)

	if len(code) != 5 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Verification code must be exactly 5 digits"})
		return
	}

	// Get verification code
	vc, err := h.userRepo.GetVerificationCode(req.Email, code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired verification code", "details": err.Error()})
		return
	}

	// Verify user email
	if err := h.userRepo.VerifyEmail(vc.UserID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to verify email", "details": err.Error()})
		return
	}

	// Mark verification code as used
	if err := h.userRepo.MarkVerificationCodeAsUsed(vc.ID); err != nil {
		// Log error but don't fail verification
	}

	// Get user
	user, err := h.userRepo.GetByID(vc.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user", "details": err.Error()})
		return
	}

	// Generate JWT token
	expiry, _ := time.ParseDuration(h.config.GetJWTExpiry())
	token, err := utils.GenerateToken(user.ID, user.Email, expiry)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token", "details": err.Error()})
		return
	}

	// Clear password from response
	user.Password = ""

	c.JSON(http.StatusOK, models.AuthResponse{
		Token: token,
		User:  user,
	})
}

// Login handles user login
func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	// Get user
	user, err := h.userRepo.GetByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check password
	if !repository.CheckPassword(req.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check if email is verified
	if user.EmailVerifiedAt == nil {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Email not verified. Please verify your email first.",
		})
		return
	}

	// Check if user is active
	if !user.IsActive {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "Account is not active. Please contact support.",
		})
		return
	}

	// Generate JWT token
	expiry, _ := time.ParseDuration(h.config.GetJWTExpiry())
	token, err := utils.GenerateToken(user.ID, user.Email, expiry)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token", "details": err.Error()})
		return
	}

	// Clear password from response
	user.Password = ""

	c.JSON(http.StatusOK, models.AuthResponse{
		Token: token,
		User:  user,
	})
}

// ResendVerificationCode handles resending verification code
func (h *AuthHandler) ResendVerificationCode(c *gin.Context) {
	var req struct {
		Email string `json:"email" binding:"required,email"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	// Get user by email
	user, err := h.userRepo.GetByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if email is already verified
	if user.EmailVerifiedAt != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is already verified"})
		return
	}

	// Generate new verification code
	code := h.emailService.GenerateVerificationCode()

	// Save verification code
	if err := h.userRepo.CreateVerificationCode(user.ID, user.Email, code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create verification code", "details": err.Error()})
		return
	}

	// Send verification email
	if err := h.emailService.SendVerificationEmail(user.Email, code); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to send verification email",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Verification code has been resent to your email.",
	})
}

// GetMe returns the current authenticated user
func (h *AuthHandler) GetMe(c *gin.Context) {
	// Get user ID from context (set by auth middleware)
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	user, err := h.userRepo.GetByID(userID.(int64))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Clear password from response
	user.Password = ""

	c.JSON(http.StatusOK, gin.H{"data": user})
}
