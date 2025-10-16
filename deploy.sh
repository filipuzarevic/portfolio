#!/bin/bash

# This script commits and pushes your changes to make them live

echo "📝 Committing your changes..."

# Add all changed files
git add .

# Ask for a commit message
echo "What did you change? (Press Enter for default message)"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update portfolio site"
fi

# Commit the changes
git commit -m "$commit_message"

# Push to GitHub (which triggers Vercel deployment)
echo "🚀 Pushing to GitHub and deploying..."
git push

echo "✅ Done! Your changes will be live at https://simplifi.me in 1-2 minutes"
