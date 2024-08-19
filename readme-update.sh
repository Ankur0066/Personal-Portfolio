#!/bin/bash

# Path to the README.md file
README_FILE="README.md"

# Array of motivational quotes
quotes=(
    "The best way to predict the future is to invent it."
    "Do or do not. There is no try."
    "The only limit to our realization of tomorrow is our doubts of today."
    "The journey of a thousand miles begins with one step."
    "Life is what happens when you're busy making other plans."
)

# Function to generate project statistics
generate_project_stats() {
    local stats=$(git log --since="7 days ago" --pretty=format:"%h %s" | wc -l)
    echo "## Recent Project Stats" > $README_FILE
    echo "" >> $README_FILE
    echo "In the last week, there have been $stats commits." >> $README_FILE
    echo "" >> $README_FILE
}

# Function to append a random quote
append_random_quote() {
    local random_index=$(($RANDOM % ${#quotes[@]}))
    local quote="${quotes[$random_index]}"
    echo "### Inspirational Quote" >> $README_FILE
    echo "" >> $README_FILE
    echo "\"$quote\"" >> $README_FILE
    echo "" >> $README_FILE
}

# Function to update README with current date
update_readme_with_date() {
    echo "# Project Overview" > $README_FILE
    echo "" >> $README_FILE
    echo "Last updated on $(date)" >> $README_FILE
    echo "" >> $README_FILE
}

# Generate or update README content
update_readme_with_date
generate_project_stats
append_random_quote

# Add README.md to the staging area
git add $README_FILE

# Commit the README update with a detailed message
commit_message="Update README with recent project stats and motivational quote"
GIT_AUTHOR_DATE="$(date)" GIT_COMMITTER_DATE="$(date)" git commit -m "$commit_message"

# Push the changes to GitHub
git push origin main
