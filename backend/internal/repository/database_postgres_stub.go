//go:build !postgres && !all
// +build !postgres,!all

package repository

import (
	"fmt"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
)

// newPostgresDB is a stub that returns an error when PostgreSQL driver is not compiled
func newPostgresDB(cfg *config.Config) (Database, error) {
	return nil, fmt.Errorf("PostgreSQL support not compiled. Build with: go build -tags postgres")
}
