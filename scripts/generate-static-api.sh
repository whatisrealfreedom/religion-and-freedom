#!/bin/bash

# Generate static API data for GitHub Pages deployment

set -e

echo "🔄 Generating static API data for GitHub Pages..."

# Create directories
mkdir -p frontend/public/api/v1
mkdir -p frontend/public/files

# Check if database exists
if [ ! -f "data/freedom.db" ]; then
    echo "⚠️  Database not found. Creating sample data..."
    mkdir -p data
    # You can initialize the database here if needed
fi

# Export chapters
if command -v sqlite3 &> /dev/null && [ -f "data/freedom.db" ]; then
    echo "📚 Exporting chapters..."
    sqlite3 data/freedom.db <<EOF > frontend/public/api/v1/chapters.json
SELECT json_group_array(
    json_object(
        'id', id,
        'number', number,
        'title', title,
        'slug', slug,
        'description', description,
        'icon', icon,
        'pages', pages,
        'read_time', read_time,
        'featured', featured
    )
) FROM chapters ORDER BY "order";
EOF
    
    # Format JSON (make it readable)
    python3 -m json.tool frontend/public/api/v1/chapters.json > frontend/public/api/v1/chapters.tmp.json 2>/dev/null || true
    if [ -f frontend/public/api/v1/chapters.tmp.json ]; then
        mv frontend/public/api/v1/chapters.tmp.json frontend/public/api/v1/chapters.json
    fi
    
    echo "📄 Exporting PDF resources..."
    sqlite3 data/freedom.db <<EOF > frontend/public/api/v1/resources-pdfs.json
SELECT json_group_array(
    json_object(
        'id', id,
        'number', number,
        'title', title,
        'description', description,
        'file_url', file_url,
        'file_size', file_size,
        'pages', pages,
        'icon', icon
    )
) FROM resources WHERE type='pdf' ORDER BY number;
EOF
    
    # Format JSON
    python3 -m json.tool frontend/public/api/v1/resources-pdfs.json > frontend/public/api/v1/resources-pdfs.tmp.json 2>/dev/null || true
    if [ -f frontend/public/api/v1/resources-pdfs.tmp.json ]; then
        mv frontend/public/api/v1/resources-pdfs.tmp.json frontend/public/api/v1/resources-pdfs.json
    fi
else
    echo "⚠️  SQLite3 not found or database missing. Creating sample JSON files..."
    cat > frontend/public/api/v1/chapters.json <<'EOF'
{
  "data": [],
  "count": 0
}
EOF
    cat > frontend/public/api/v1/resources-pdfs.json <<'EOF'
{
  "data": [],
  "count": 0
}
EOF
fi

# Health check endpoint
echo "💚 Creating health endpoint..."
cat > frontend/public/api/v1/health.json <<'EOF'
{"status":"ok","message":"Freedom API is running"}
EOF

# Copy PDF files if they exist
if [ -d "files" ]; then
    echo "📎 Copying PDF files..."
    cp -r files/* frontend/public/files/ 2>/dev/null || true
fi

echo "✅ Static API data generated successfully!"
echo ""
echo "Files created:"
echo "  - frontend/public/api/v1/chapters.json"
echo "  - frontend/public/api/v1/resources-pdfs.json"
echo "  - frontend/public/api/v1/health.json"

