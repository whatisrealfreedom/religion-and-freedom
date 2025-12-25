package services

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/whatisrealfreedom/freedom-website/internal/config"
	"gopkg.in/mail.v2"
)

type EmailService struct {
	config *config.Config
}

func NewEmailService(cfg *config.Config) *EmailService {
	return &EmailService{
		config: cfg,
	}
}

// GenerateVerificationCode generates a random 5-digit code
func (es *EmailService) GenerateVerificationCode() string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	code := r.Intn(90000) + 10000 // Generates a number between 10000 and 99999
	return fmt.Sprintf("%05d", code)
}

// SendVerificationEmail sends a verification code email
func (es *EmailService) SendVerificationEmail(to, code string) error {
	if es.config.MailUsername == "" || es.config.MailPassword == "" {
		return fmt.Errorf("email configuration is missing")
	}

	m := mail.NewMessage()
	m.SetHeader("From", fmt.Sprintf("%s <%s>", es.config.MailFromName, es.config.MailFromAddress))
	m.SetHeader("To", to)
	m.SetHeader("Subject", "Verify Your Email - RealFreedom")

	body := fmt.Sprintf(`
		<html>
		<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
			<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
				<h1 style="color: #2563eb;">RealFreedom</h1>
				<h2 style="color: #1e40af;">Email Verification</h2>
				<p>Thank you for registering with RealFreedom!</p>
				<p>Please use the following code to verify your email address:</p>
				<div style="background-color: #f3f4f6; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
					<h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px; margin: 0;">%s</h1>
				</div>
				<p>This code will expire in 15 minutes.</p>
				<p>If you didn't create an account with RealFreedom, please ignore this email.</p>
				<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
				<p style="color: #6b7280; font-size: 12px;">© RealFreedom - All rights reserved</p>
			</div>
		</body>
		</html>
	`, code)

	m.SetBody("text/html", body)

	port, err := strconv.Atoi(es.config.MailPort)
	if err != nil {
		return fmt.Errorf("invalid mail port: %w", err)
	}

	d := mail.NewDialer(es.config.MailHost, port, es.config.MailUsername, es.config.MailPassword)

	if es.config.MailEncryption == "tls" {
		d.StartTLSPolicy = mail.MandatoryStartTLS
	} else if es.config.MailEncryption == "ssl" {
		d.SSL = true
	}

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}
