#!/bin/bash

# Auto deploy script
# Pulls latest changes from the repository and serves the files using a simple
# HTTP server.

set -e

# Determine the directory of this script so we can operate from the repo root
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

# Fetch the latest version of the repository
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Updating repository..."
    git pull --ff-only
else
    echo "Error: script is not located inside a git repository" >&2
    exit 1
fi

# Serve the directory on port 8000
# Press Ctrl+C to stop the server.

echo "Starting HTTP server on http://localhost:8000"
python3 -m http.server 8000
