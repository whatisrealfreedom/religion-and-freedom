# Authentication Setup Guide

This guide explains how to set up the authentication system with email verification.

## Email Configuration

The system uses Gmail SMTP to send verification emails. Follow these steps to configure:

### 1. Create a Gmail App Password

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Create a new app password for "Mail"
5. Copy the generated 16-character password

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory (or set environment variables) with the following:

```env
# Email Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password-here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME=RealFreedom
```

**Important:** Never commit the `.env` file to git. It should already be in `.gitignore`.

### 3. Example Configuration

For the provided Gmail account:
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=iamtourleaderofficial@gmail.com
MAIL_PASSWORD=dbhlbrsdqlpyievp
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=iamtourleaderofficial@gmail.com
MAIL_FROM_NAME=RealFreedom
```

## Database Migration

The user tables will be automatically created when you run the server. The migration file `007_create_users.sql` creates:

- `users` table with all required fields
- `email_verification_codes` table for storing verification codes
- Supporting tables: `languages`, `currencies`, `countries`

## API Endpoints

### Register
```
POST /api/v1/auth/register
Body: {
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe" // optional
}
```

### Verify Email
```
POST /api/v1/auth/verify-email
Body: {
  "email": "user@example.com",
  "code": "12345" // 5-digit code
}
```

### Login
```
POST /api/v1/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)
```
GET /api/v1/me
Headers: {
  "Authorization": "Bearer <token>"
}
```

## Frontend Routes

- `/fa/login` or `/en/login` - Login page
- `/fa/register` or `/en/register` - Registration page

## Features

- ✅ User registration with email and password
- ✅ Email verification with 5-digit code
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Beautiful, responsive login/register forms
- ✅ Multi-language support (Persian/English)
- ✅ Email verification required before login
- ✅ Verification codes expire after 15 minutes

## Security Notes

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use strong JWT secrets** in production
3. **Use app passwords** for Gmail, not your regular password
4. **Enable 2FA** on your Gmail account before creating app passwords

