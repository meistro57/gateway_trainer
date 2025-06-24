#!/bin/bash

# Auto deploy script
# Pulls the latest changes from the repository and serves the files using the
# `serve` package from npm.

set -e

# Determine the directory of this script so we can operate from the repo root
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO_DIR"

# Fetch the latest version of the repository
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Updating repository..."
    if git remote | grep -q .; then
        if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
            git pull --ff-only
        else
            echo "No upstream branch set, skipping pull."
        fi
    else
        echo "No git remote configured, skipping pull."
    fi
else
    echo "Error: script is not located inside a git repository" >&2
    exit 1
fi

# Serve the directory on port 8000 using the `serve` npm package
# Press Ctrl+C to stop the server.

# Ensure the `serve` command is available
if ! command -v serve >/dev/null 2>&1; then
    echo "'serve' not found. Installing globally with npm..."
    if command -v npm >/dev/null 2>&1; then
        npm install -g serve
    else
        echo "Error: npm is required but was not found." >&2
        exit 1
    fi
fi

echo "Starting HTTP server on http://localhost:8000"
exec serve -l 8000 "$REPO_DIR"
