-- Create languages table (if not exists)
CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create currencies table (if not exists)
CREATE TABLE IF NOT EXISTS currencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    symbol TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create countries table (if not exists)
CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    telegram_id INTEGER,
    language_id INTEGER,
    currency_id INTEGER,
    country_id INTEGER,
    preferred_date_format TEXT,
    preferred_timezone TEXT,
    number_format_preference TEXT,
    currency_display_preference TEXT,
    city TEXT,
    address TEXT, -- JSON stored as TEXT in SQLite
    job_title TEXT,
    bio TEXT,
    mobile TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT 0,
    birthdate DATE,
    email_verified_at DATETIME,
    mobile_verified_at DATETIME,
    phone_verified_at DATETIME,
    photo_url TEXT,
    referral_code TEXT NOT NULL UNIQUE,
    invited_by INTEGER,
    points INTEGER DEFAULT 0,
    registration_src TEXT,
    FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE SET NULL,
    FOREIGN KEY (currency_id) REFERENCES currencies(id) ON DELETE SET NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create email_verification_codes table
CREATE TABLE IF NOT EXISTS email_verification_codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    code TEXT NOT NULL,
    email TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_invited_by ON users(invited_by);
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_codes_user_id ON email_verification_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_codes_code ON email_verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_email_verification_codes_email ON email_verification_codes(email);

