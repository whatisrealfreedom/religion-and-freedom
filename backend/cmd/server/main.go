package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
	"github.com/whatisrealfreedom/freedom-website/internal/handlers"
	"github.com/whatisrealfreedom/freedom-website/internal/middleware"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
	"github.com/whatisrealfreedom/freedom-website/internal/services"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load .env file (ignore error if file doesn't exist)
	// This allows the app to work with environment variables set directly
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables or defaults")
	}

	// Load configuration
	cfg := config.Load()

	// Initialize database
	db, err := repository.NewDatabase(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize repository
	repo := repository.NewRepository(db)

	// Initialize services
	chapterService := services.NewChapterService(repo.Chapter)
	resourceService := services.NewResourceService(repo.Resource)
	emailService := services.NewEmailService(cfg)

	// Initialize handlers
	chapterHandler := handlers.NewChapterHandler(chapterService)
	resourceHandler := handlers.NewResourceHandler(resourceService)
	healthHandler := handlers.NewHealthHandler()
	authHandler := handlers.NewAuthHandler(repo.User, emailService, cfg.JWTSecret, cfg.JWTExpiry)

	// Setup router
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// Serve static files (PDFs)
	router.Static("/files", "./files")

	// CORS middleware
	router.Use(corsMiddleware(cfg))

	// Routes
	api := router.Group("/api/v1")
	{
		// Health check
		api.GET("/health", healthHandler.Check)

		// Authentication routes (public)
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/verify-email", authHandler.VerifyEmail)
			auth.POST("/resend-code", authHandler.ResendVerificationCode)
			auth.POST("/login", authHandler.Login)
		}

		// Protected routes
		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.GET("/me", authHandler.GetMe)
		}

		// Chapters
		chapters := api.Group("/chapters")
		{
			chapters.GET("", chapterHandler.GetAll)
			chapters.GET("/:id", chapterHandler.GetByID)
		}

		// Resources
		resources := api.Group("/resources")
		{
			resources.GET("", resourceHandler.GetAll)
			resources.GET("/pdfs", resourceHandler.GetPDFs)
		}
	}

	// Start server
	addr := fmt.Sprintf("%s:%s", cfg.ServerHost, cfg.ServerPort)
	log.Printf("🚀 Server starting on %s", addr)
	if err := router.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
		os.Exit(1)
	}
}

func corsMiddleware(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", cfg.CORSAllowedOrigins)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
