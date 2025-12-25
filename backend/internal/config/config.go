package config

import (
	"os"
)

type Config struct {
	ServerHost         string
	ServerPort         string
	Env                string
	DBType             string
	DBPath             string
	DBHost             string
	DBPort             string
	DBName             string
	DBUser             string
	DBPassword         string
	DBSSLMode          string
	CORSAllowedOrigins string
	JWTSecret          string
	JWTExpiry          string
	MailHost           string
	MailPort           string
	MailUsername       string
	MailPassword       string
	MailEncryption     string
	MailFromAddress    string
	MailFromName       string
}

// GetDBPath returns the database path for migration helper
func (c *Config) GetDBPath() string {
	return c.DBPath
}

func Load() *Config {
	return &Config{
		ServerHost:         getEnv("SERVER_HOST", "0.0.0.0"),
		ServerPort:         getEnv("SERVER_PORT", "8080"),
		Env:                getEnv("ENV", "development"),
		DBType:             getEnv("DB_TYPE", "sqlite"),
		DBPath:             getEnv("DB_PATH", "./data/freedom.db"),
		DBHost:             getEnv("DB_HOST", "localhost"),
		DBPort:             getEnv("DB_PORT", "5432"),
		DBName:             getEnv("DB_NAME", "freedom"),
		DBUser:             getEnv("DB_USER", "freedom_user"),
		DBPassword:         getEnv("DB_PASSWORD", ""),
		DBSSLMode:          getEnv("DB_SSL_MODE", "disable"),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:8098"),
		JWTSecret:          getEnv("JWT_SECRET", "change-me-in-production"),
		JWTExpiry:          getEnv("JWT_EXPIRY", "24h"),
		MailHost:           getEnv("MAIL_HOST", "smtp.gmail.com"),
		MailPort:           getEnv("MAIL_PORT", "587"),
		MailUsername:       getEnv("MAIL_USERNAME", ""),
		MailPassword:       getEnv("MAIL_PASSWORD", ""),
		MailEncryption:     getEnv("MAIL_ENCRYPTION", "tls"),
		MailFromAddress:    getEnv("MAIL_FROM_ADDRESS", ""),
		MailFromName:       getEnv("MAIL_FROM_NAME", "RealFreedom"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
