package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/whatisrealfreedom/freedom-website/internal/models"
	"golang.org/x/crypto/bcrypt"
)

type UserRepository interface {
	Create(user *models.User) error
	GetByEmail(email string) (*models.User, error)
	GetByID(id int64) (*models.User, error)
	Update(user *models.User) error
	VerifyEmail(userID int64) error
	CreateVerificationCode(userID int64, email, code string) error
	GetVerificationCode(email, code string) (*models.EmailVerificationCode, error)
	MarkVerificationCodeAsUsed(codeID int64) error
	DeleteExpiredVerificationCodes() error
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{db: db}
}

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPassword checks if a password matches a hash
func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// GenerateReferralCode generates a unique referral code
func GenerateReferralCode() string {
	return fmt.Sprintf("RF%d", time.Now().UnixNano()%10000000)
}

func (r *userRepository) Create(user *models.User) error {
	// Hash password
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	// Generate referral code if not set
	if user.ReferralCode == "" {
		user.ReferralCode = GenerateReferralCode()
	}

	query := `
		INSERT INTO users (
			email, password, name, telegram_id, language_id, currency_id, country_id,
			preferred_date_format, preferred_timezone, number_format_preference,
			currency_display_preference, city, address, job_title, bio, mobile, phone,
			is_active, birthdate, photo_url, referral_code, invited_by, points, registration_src,
			created_at, updated_at
		) VALUES (
			?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
		)
	`

	result, err := r.db.Exec(query,
		user.Email,
		hashedPassword,
		user.Name,
		user.TelegramID,
		user.LanguageID,
		user.CurrencyID,
		user.CountryID,
		user.PreferredDateFormat,
		user.PreferredTimezone,
		user.NumberFormatPreference,
		user.CurrencyDisplayPreference,
		user.City,
		user.Address,
		user.JobTitle,
		user.Bio,
		user.Mobile,
		user.Phone,
		user.IsActive,
		user.Birthdate,
		user.PhotoURL,
		user.ReferralCode,
		user.InvitedBy,
		user.Points,
		user.RegistrationSrc,
	)
	if err != nil {
		return fmt.Errorf("failed to create user: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return fmt.Errorf("failed to get last insert id: %w", err)
	}

	user.ID = id

	// Force checkpoint for WAL mode to ensure data is persisted
	_, _ = r.db.Exec("PRAGMA wal_checkpoint(TRUNCATE)")

	return nil
}

func (r *userRepository) GetByEmail(email string) (*models.User, error) {
	query := `
		SELECT id, email, password, name, created_at, updated_at, telegram_id,
			language_id, currency_id, country_id, preferred_date_format, preferred_timezone,
			number_format_preference, currency_display_preference, city, address, job_title,
			bio, mobile, phone, is_active, birthdate, email_verified_at, mobile_verified_at,
			phone_verified_at, photo_url, referral_code, invited_by, points, registration_src
		FROM users
		WHERE email = ?
	`

	var user models.User
	var name sql.NullString
	var telegramID, languageID, currencyID, countryID, invitedBy sql.NullInt64
	var preferredDateFormat, preferredTimezone, numberFormatPreference sql.NullString
	var currencyDisplayPreference, city, address, jobTitle, bio sql.NullString
	var mobile, phone, photoURL, registrationSrc sql.NullString
	var birthdate, emailVerifiedAt, mobileVerifiedAt, phoneVerifiedAt sql.NullTime
	var points sql.NullInt64

	err := r.db.QueryRow(query, email).Scan(
		&user.ID,
		&user.Email,
		&user.Password,
		&name,
		&user.CreatedAt,
		&user.UpdatedAt,
		&telegramID,
		&languageID,
		&currencyID,
		&countryID,
		&preferredDateFormat,
		&preferredTimezone,
		&numberFormatPreference,
		&currencyDisplayPreference,
		&city,
		&address,
		&jobTitle,
		&bio,
		&mobile,
		&phone,
		&user.IsActive,
		&birthdate,
		&emailVerifiedAt,
		&mobileVerifiedAt,
		&phoneVerifiedAt,
		&photoURL,
		&user.ReferralCode,
		&invitedBy,
		&points,
		&registrationSrc,
	)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Convert nullable fields
	if name.Valid {
		user.Name = &name.String
	}
	if telegramID.Valid {
		user.TelegramID = &telegramID.Int64
	}
	if languageID.Valid {
		user.LanguageID = &languageID.Int64
	}
	if currencyID.Valid {
		user.CurrencyID = &currencyID.Int64
	}
	if countryID.Valid {
		user.CountryID = &countryID.Int64
	}
	if preferredDateFormat.Valid {
		user.PreferredDateFormat = &preferredDateFormat.String
	}
	if preferredTimezone.Valid {
		user.PreferredTimezone = &preferredTimezone.String
	}
	if numberFormatPreference.Valid {
		user.NumberFormatPreference = &numberFormatPreference.String
	}
	if currencyDisplayPreference.Valid {
		user.CurrencyDisplayPreference = &currencyDisplayPreference.String
	}
	if city.Valid {
		user.City = &city.String
	}
	if address.Valid {
		user.Address = &address.String
	}
	if jobTitle.Valid {
		user.JobTitle = &jobTitle.String
	}
	if bio.Valid {
		user.Bio = &bio.String
	}
	if mobile.Valid {
		user.Mobile = &mobile.String
	}
	if phone.Valid {
		user.Phone = &phone.String
	}
	if birthdate.Valid {
		user.Birthdate = &birthdate.Time
	}
	if emailVerifiedAt.Valid {
		user.EmailVerifiedAt = &emailVerifiedAt.Time
	}
	if mobileVerifiedAt.Valid {
		user.MobileVerifiedAt = &mobileVerifiedAt.Time
	}
	if phoneVerifiedAt.Valid {
		user.PhoneVerifiedAt = &phoneVerifiedAt.Time
	}
	if photoURL.Valid {
		user.PhotoURL = &photoURL.String
	}
	if invitedBy.Valid {
		user.InvitedBy = &invitedBy.Int64
	}
	if points.Valid {
		user.Points = int(points.Int64)
	}
	if registrationSrc.Valid {
		user.RegistrationSrc = &registrationSrc.String
	}

	return &user, nil
}

func (r *userRepository) GetByID(id int64) (*models.User, error) {
	query := `
		SELECT id, email, password, name, created_at, updated_at, telegram_id,
			language_id, currency_id, country_id, preferred_date_format, preferred_timezone,
			number_format_preference, currency_display_preference, city, address, job_title,
			bio, mobile, phone, is_active, birthdate, email_verified_at, mobile_verified_at,
			phone_verified_at, photo_url, referral_code, invited_by, points, registration_src
		FROM users
		WHERE id = ?
	`

	var user models.User
	var name sql.NullString
	var telegramID, languageID, currencyID, countryID, invitedBy sql.NullInt64
	var preferredDateFormat, preferredTimezone, numberFormatPreference sql.NullString
	var currencyDisplayPreference, city, address, jobTitle, bio sql.NullString
	var mobile, phone, photoURL, registrationSrc sql.NullString
	var birthdate, emailVerifiedAt, mobileVerifiedAt, phoneVerifiedAt sql.NullTime
	var points sql.NullInt64

	err := r.db.QueryRow(query, id).Scan(
		&user.ID,
		&user.Email,
		&user.Password,
		&name,
		&user.CreatedAt,
		&user.UpdatedAt,
		&telegramID,
		&languageID,
		&currencyID,
		&countryID,
		&preferredDateFormat,
		&preferredTimezone,
		&numberFormatPreference,
		&currencyDisplayPreference,
		&city,
		&address,
		&jobTitle,
		&bio,
		&mobile,
		&phone,
		&user.IsActive,
		&birthdate,
		&emailVerifiedAt,
		&mobileVerifiedAt,
		&phoneVerifiedAt,
		&photoURL,
		&user.ReferralCode,
		&invitedBy,
		&points,
		&registrationSrc,
	)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("user not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Convert nullable fields (same as GetByEmail)
	if name.Valid {
		user.Name = &name.String
	}
	if telegramID.Valid {
		user.TelegramID = &telegramID.Int64
	}
	if languageID.Valid {
		user.LanguageID = &languageID.Int64
	}
	if currencyID.Valid {
		user.CurrencyID = &currencyID.Int64
	}
	if countryID.Valid {
		user.CountryID = &countryID.Int64
	}
	if preferredDateFormat.Valid {
		user.PreferredDateFormat = &preferredDateFormat.String
	}
	if preferredTimezone.Valid {
		user.PreferredTimezone = &preferredTimezone.String
	}
	if numberFormatPreference.Valid {
		user.NumberFormatPreference = &numberFormatPreference.String
	}
	if currencyDisplayPreference.Valid {
		user.CurrencyDisplayPreference = &currencyDisplayPreference.String
	}
	if city.Valid {
		user.City = &city.String
	}
	if address.Valid {
		user.Address = &address.String
	}
	if jobTitle.Valid {
		user.JobTitle = &jobTitle.String
	}
	if bio.Valid {
		user.Bio = &bio.String
	}
	if mobile.Valid {
		user.Mobile = &mobile.String
	}
	if phone.Valid {
		user.Phone = &phone.String
	}
	if birthdate.Valid {
		user.Birthdate = &birthdate.Time
	}
	if emailVerifiedAt.Valid {
		user.EmailVerifiedAt = &emailVerifiedAt.Time
	}
	if mobileVerifiedAt.Valid {
		user.MobileVerifiedAt = &mobileVerifiedAt.Time
	}
	if phoneVerifiedAt.Valid {
		user.PhoneVerifiedAt = &phoneVerifiedAt.Time
	}
	if photoURL.Valid {
		user.PhotoURL = &photoURL.String
	}
	if invitedBy.Valid {
		user.InvitedBy = &invitedBy.Int64
	}
	if points.Valid {
		user.Points = int(points.Int64)
	}
	if registrationSrc.Valid {
		user.RegistrationSrc = &registrationSrc.String
	}

	return &user, nil
}

func (r *userRepository) Update(user *models.User) error {
	query := `
		UPDATE users
		SET name = ?, updated_at = CURRENT_TIMESTAMP
		WHERE id = ?
	`

	_, err := r.db.Exec(query, user.Name, user.ID)
	if err != nil {
		return fmt.Errorf("failed to update user: %w", err)
	}

	return nil
}

func (r *userRepository) VerifyEmail(userID int64) error {
	query := `
		UPDATE users
		SET email_verified_at = CURRENT_TIMESTAMP, is_active = 1
		WHERE id = ?
	`

	_, err := r.db.Exec(query, userID)
	if err != nil {
		return fmt.Errorf("failed to verify email: %w", err)
	}

	// Force checkpoint for WAL mode to ensure data is persisted
	_, _ = r.db.Exec("PRAGMA wal_checkpoint(TRUNCATE)")

	return nil
}

func (r *userRepository) CreateVerificationCode(userID int64, email, code string) error {
	expiresAt := time.Now().Add(15 * time.Minute)

	query := `
		INSERT INTO email_verification_codes (user_id, code, email, expires_at, used, created_at)
		VALUES (?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
	`

	_, err := r.db.Exec(query, userID, code, email, expiresAt)
	if err != nil {
		return fmt.Errorf("failed to create verification code: %w", err)
	}

	// Force checkpoint for WAL mode to ensure data is persisted
	_, _ = r.db.Exec("PRAGMA wal_checkpoint(TRUNCATE)")

	return nil
}

func (r *userRepository) GetVerificationCode(email, code string) (*models.EmailVerificationCode, error) {
	// Ensure code is exactly 5 digits with leading zeros
	// Remove any non-digit characters first
	normalizedCode := ""
	for _, r := range code {
		if r >= '0' && r <= '9' {
			normalizedCode += string(r)
		}
	}
	// Pad with leading zeros if needed
	if len(normalizedCode) < 5 {
		normalizedCode = fmt.Sprintf("%05s", normalizedCode)
	} else if len(normalizedCode) > 5 {
		normalizedCode = normalizedCode[len(normalizedCode)-5:]
	}

	query := `
		SELECT id, user_id, code, email, expires_at, used, created_at
		FROM email_verification_codes
		WHERE email = ? AND code = ? AND used = 0
		ORDER BY created_at DESC
		LIMIT 1
	`

	var vc models.EmailVerificationCode
	err := r.db.QueryRow(query, email, normalizedCode).Scan(
		&vc.ID,
		&vc.UserID,
		&vc.Code,
		&vc.Email,
		&vc.ExpiresAt,
		&vc.Used,
		&vc.CreatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("verification code not found or already used")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get verification code: %w", err)
	}

	// Check if code has expired
	if time.Now().After(vc.ExpiresAt) {
		return nil, fmt.Errorf("verification code has expired")
	}

	return &vc, nil
}

func (r *userRepository) MarkVerificationCodeAsUsed(codeID int64) error {
	query := `
		UPDATE email_verification_codes
		SET used = 1
		WHERE id = ?
	`

	_, err := r.db.Exec(query, codeID)
	if err != nil {
		return fmt.Errorf("failed to mark verification code as used: %w", err)
	}

	// Force checkpoint for WAL mode to ensure data is persisted
	_, _ = r.db.Exec("PRAGMA wal_checkpoint(TRUNCATE)")

	return nil
}

func (r *userRepository) DeleteExpiredVerificationCodes() error {
	query := `
		DELETE FROM email_verification_codes
		WHERE expires_at < CURRENT_TIMESTAMP OR used = 1
	`

	_, err := r.db.Exec(query)
	if err != nil {
		return fmt.Errorf("failed to delete expired verification codes: %w", err)
	}

	return nil
}
