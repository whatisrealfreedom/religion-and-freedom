//go:build !mysql && !all
// +build !mysql,!all

package repository

import (
	"fmt"
	"github.com/whatisrealfreedom/freedom-website/internal/config"
)

// newMySQLDB is a stub that returns an error when MySQL driver is not compiled
func newMySQLDB(cfg *config.Config) (Database, error) {
	return nil, fmt.Errorf("MySQL support not compiled. Build with: go build -tags mysql")
}
