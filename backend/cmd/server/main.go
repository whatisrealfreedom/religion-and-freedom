package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
	"github.com/whatisrealfreedom/freedom-website/internal/handlers"
	"github.com/whatisrealfreedom/freedom-website/internal/middleware"
	"github.com/whatisrealfreedom/freedom-website/internal/repository"
	"github.com/whatisrealfreedom/freedom-website/internal/services"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load .env file from project root
	// Try multiple locations to find the root .env file
	envPaths := []string{
		"../../.env", // Project root (if running from cmd/server)
		"../.env",    // Project root (if running from backend/)
		".env",       // Current directory (fallback)
	}

	envLoaded := false
	for _, envPath := range envPaths {
		if err := godotenv.Load(envPath); err == nil {
			log.Printf("Loaded .env file from: %s", envPath)
			envLoaded = true
			break
		}
	}

	if !envLoaded {
		log.Println("No .env file found in project root, using environment variables or defaults")
	}

	// Load configuration
	cfg := config.Load()

	// Initialize database with retry logic
	var db repository.Database
	var dbErr error
	maxRetries := 3
	for i := 0; i < maxRetries; i++ {
		db, dbErr = repository.NewDatabase(cfg)
		if dbErr == nil {
			break
		}
		log.Printf("⚠️  Database connection attempt %d/%d failed: %v", i+1, maxRetries, dbErr)
		if i < maxRetries-1 {
			log.Println("Retrying in 2 seconds...")
			time.Sleep(2 * time.Second)
		}
	}
	
	if dbErr != nil {
		log.Printf("❌ Failed to connect to database after %d attempts: %v", maxRetries, dbErr)
		log.Println("⚠️  Server will start but database operations may fail")
		// Don't fatal - allow server to start for health checks
		// This prevents 502 errors
	} else {
		defer db.Close()
		log.Println("✅ Database connection established")
	}

	// Initialize repository (only if db is available)
	var repo *repository.Repository
	if db != nil {
		repo = repository.NewRepository(db)
		log.Println("✅ Repository initialized")
	} else {
		log.Println("⚠️  Repository not initialized - database unavailable")
		log.Println("⚠️  Server will start but most endpoints will return 503")
		// Create a minimal repository structure to prevent nil pointer panics
		// We'll handle nil checks in route handlers
		repo = nil
	}

	// Initialize services
	var chapterService services.ChapterService
	var resourceService services.ResourceService
	if repo != nil {
		if repo.Chapter != nil {
			chapterService = services.NewChapterService(repo.Chapter)
		}
		if repo.Resource != nil {
			resourceService = services.NewResourceService(repo.Resource)
		}
	}
	emailService := services.NewEmailService(cfg)

	// Initialize handlers
	var chapterHandler *handlers.ChapterHandler
	var resourceHandler *handlers.ResourceHandler
	var authHandler *handlers.AuthHandler
	var discussionHandler *handlers.DiscussionHandler
	
	if chapterService != nil {
		chapterHandler = handlers.NewChapterHandler(chapterService)
	}
	if resourceService != nil {
		resourceHandler = handlers.NewResourceHandler(resourceService)
	}
	healthHandler := handlers.NewHealthHandlerWithDB(db)
	if repo != nil && repo.User != nil {
		authHandler = handlers.NewAuthHandler(repo.User, emailService, cfg.JWTSecret, cfg.JWTExpiry)
	}
	if repo != nil && repo.Thread != nil && repo.Comment != nil && repo.Vote != nil && repo.Reaction != nil {
		discussionHandler = handlers.NewDiscussionHandler(repo.Thread, repo.Comment, repo.Vote, repo.Reaction)
	}

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
		if authHandler != nil {
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
		} else {
			api.POST("/auth/*path", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
			api.GET("/me", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
		}

		// Chapters (only if handler is available)
		if chapterHandler != nil {
			chapters := api.Group("/chapters")
			{
				chapters.GET("", chapterHandler.GetAll)
				chapters.GET("/:id", chapterHandler.GetByID)
			}
		} else {
			api.GET("/chapters", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
			api.GET("/chapters/:id", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
		}

		// Resources (only if handler is available)
		if resourceHandler != nil {
			resources := api.Group("/resources")
			{
				resources.GET("", resourceHandler.GetAll)
				resources.GET("/pdfs", resourceHandler.GetPDFs)
			}
		} else {
			api.GET("/resources", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
			api.GET("/resources/pdfs", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
		}

		// Discussions (public read, protected write)
		if discussionHandler != nil {
			discussions := api.Group("/discussions")
			{
				discussions.GET("", discussionHandler.GetThreads)
				discussions.GET("/:id", discussionHandler.GetThread)
				
				// Protected routes
				discussionsProtected := discussions.Group("")
				discussionsProtected.Use(middleware.AuthMiddleware())
				{
					discussionsProtected.POST("", discussionHandler.CreateThread)
					discussionsProtected.PUT("/:id", discussionHandler.UpdateThread)
					discussionsProtected.POST("/:id/comments", discussionHandler.CreateComment)
					discussionsProtected.PUT("/comments/:id", discussionHandler.UpdateComment)
					discussionsProtected.POST("/:id/vote", discussionHandler.VoteThread)
					discussionsProtected.POST("/comments/:id/vote", discussionHandler.VoteComment)
					discussionsProtected.POST("/:id/react", discussionHandler.ReactThread)
					discussionsProtected.POST("/comments/:id/react", discussionHandler.ReactComment)
				}
			}
		} else {
			api.GET("/discussions", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
			api.GET("/discussions/:id", func(c *gin.Context) {
				c.JSON(503, gin.H{"error": "Database service unavailable"})
			})
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
