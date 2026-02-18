#!/bin/bash
# Script to manually run a specific migration or all migrations
# Usage: ./run_migration.sh [migration_file.sql]

set -e

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MIGRATIONS_DIR="$PROJECT_ROOT/migrations"

# Default database path (can be overridden with DB_PATH env var)
DB_PATH="${DB_PATH:-$PROJECT_ROOT/../data/freedom.db}"

echo "📁 Migrations directory: $MIGRATIONS_DIR"
echo "💾 Database: $DB_PATH"
echo ""

if [ ! -f "$DB_PATH" ]; then
    echo "⚠️  Database file not found at $DB_PATH"
    echo "Creating database directory..."
    mkdir -p "$(dirname "$DB_PATH")"
    touch "$DB_PATH"
fi

if [ -z "$1" ]; then
    echo "🔄 Running all migrations..."
    echo ""
    
    # Run all migrations in order
    for migration_file in "$MIGRATIONS_DIR"/*.sql; do
        if [ -f "$migration_file" ]; then
            filename=$(basename "$migration_file")
            echo "📄 Running: $filename"
            sqlite3 "$DB_PATH" < "$migration_file" && echo "✅ $filename" || echo "❌ $filename failed"
        fi
    done
else
    # Run specific migration
    migration_file="$MIGRATIONS_DIR/$1"
    if [ ! -f "$migration_file" ]; then
        echo "❌ Migration file not found: $migration_file"
        exit 1
    fi
    
    echo "📄 Running: $1"
    sqlite3 "$DB_PATH" < "$migration_file" && echo "✅ Migration completed" || echo "❌ Migration failed"
fi

echo ""
echo "✅ Done!"
