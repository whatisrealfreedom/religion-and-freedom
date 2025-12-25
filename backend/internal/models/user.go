package models

import "time"

// User represents a user in the system
type User struct {
	ID                        int64      `json:"id" db:"id"`
	Email                     string     `json:"email" db:"email"`
	Password                  string     `json:"-" db:"password"` // Never return password in JSON
	Name                      *string    `json:"name" db:"name"`
	CreatedAt                 time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt                 time.Time  `json:"updated_at" db:"updated_at"`
	TelegramID                *int64     `json:"telegram_id" db:"telegram_id"`
	LanguageID                *int64     `json:"language_id" db:"language_id"`
	CurrencyID                *int64     `json:"currency_id" db:"currency_id"`
	CountryID                 *int64     `json:"country_id" db:"country_id"`
	PreferredDateFormat       *string    `json:"preferred_date_format" db:"preferred_date_format"`
	PreferredTimezone         *string    `json:"preferred_timezone" db:"preferred_timezone"`
	NumberFormatPreference    *string    `json:"number_format_preference" db:"number_format_preference"`
	CurrencyDisplayPreference *string    `json:"currency_display_preference" db:"currency_display_preference"`
	City                      *string    `json:"city" db:"city"`
	Address                   *string    `json:"address" db:"address"` // JSON stored as string
	JobTitle                  *string    `json:"job_title" db:"job_title"`
	Bio                       *string    `json:"bio" db:"bio"`
	Mobile                    *string    `json:"mobile" db:"mobile"`
	Phone                     *string    `json:"phone" db:"phone"`
	IsActive                  bool       `json:"is_active" db:"is_active"`
	Birthdate                 *time.Time `json:"birthdate" db:"birthdate"`
	EmailVerifiedAt           *time.Time `json:"email_verified_at" db:"email_verified_at"`
	MobileVerifiedAt          *time.Time `json:"mobile_verified_at" db:"mobile_verified_at"`
	PhoneVerifiedAt           *time.Time `json:"phone_verified_at" db:"phone_verified_at"`
	PhotoURL                  *string    `json:"photo_url" db:"photo_url"`
	ReferralCode              string     `json:"referral_code" db:"referral_code"`
	InvitedBy                 *int64     `json:"invited_by" db:"invited_by"`
	Points                    int        `json:"points" db:"points"`
	RegistrationSrc           *string    `json:"registration_src" db:"registration_src"`
}

// EmailVerificationCode represents an email verification code
type EmailVerificationCode struct {
	ID        int64     `json:"id" db:"id"`
	UserID    int64     `json:"user_id" db:"user_id"`
	Code      string    `json:"code" db:"code"`
	Email     string    `json:"email" db:"email"`
	ExpiresAt time.Time `json:"expires_at" db:"expires_at"`
	Used      bool      `json:"used" db:"used"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// RegisterRequest represents a registration request
type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name"`
}

// LoginRequest represents a login request
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// VerifyEmailRequest represents an email verification request
type VerifyEmailRequest struct {
	Email string `json:"email" binding:"required,email"`
	Code  string `json:"code" binding:"required,len=5"`
}

// AuthResponse represents an authentication response
type AuthResponse struct {
	Token string `json:"token"`
	User  *User  `json:"user"`
}
