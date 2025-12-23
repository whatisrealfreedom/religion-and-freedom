# Static API Data for GitHub Pages

This directory contains static JSON files that replace the Go backend API when deploying to GitHub Pages.

## Structure

- `chapters.json` - List of all chapters
- `resources-pdfs.json` - List of PDF resources
- `health.json` - Health check endpoint

## How it works

The frontend is configured to use `/api/v1` which, on GitHub Pages, will serve these static JSON files instead of making requests to a backend server.

## Generating static data

Run the following commands to generate static data from the database:

```bash
# From project root
mkdir -p frontend/public/api/v1

# Export chapters
sqlite3 data/freedom.db "SELECT json_group_array(json_object('id', id, 'number', number, 'title', title, 'slug', slug, 'description', description, 'icon', icon, 'pages', pages, 'read_time', read_time, 'featured', featured)) FROM chapters ORDER BY \"order\";" > frontend/public/api/v1/chapters.json

# Export PDFs
sqlite3 data/freedom.db "SELECT json_group_array(json_object('id', id, 'number', number, 'title', title, 'description', description, 'file_url', file_url, 'file_size', file_size, 'pages', pages, 'icon', icon)) FROM resources WHERE type='pdf' ORDER BY number;" > frontend/public/api/v1/resources-pdfs.json

# Health check
echo '{"status":"ok","message":"Freedom API is running"}' > frontend/public/api/v1/health.json
```

