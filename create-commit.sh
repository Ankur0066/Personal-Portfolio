#!/bin/bash

# ====================================================================
# Script Name: create_random_commits.sh
# Description: Automates the creation of random Git commits on random dates
#              within a specified date range.
# Author: Ankur
# Date: 2024-09-01
# ====================================================================

# Path to your local Git repository
REPO_PATH="C:\Users\ankur\Github\Personal-Portfolio"

# Array of commit messages
commit_messages=(
    "Update initial setup configuration"
    "Refactor and enhance README.md content"
    "Modify config file for better environment settings"
    "Optimize and update main.js logic"
    "Improve styles in style.css"
    "Revise index.html structure"
    "Enhance utility script functionality"
    "Update database schema with new fields"
    "Refine .gitignore rules"
    "Revise Dockerfile for improved build process"
)

# Check if repository path exists
if [ ! -d "$REPO_PATH" ]; then
    echo "Error: Repository path '$REPO_PATH' does not exist."
    exit 1
fi

# Navigate to the repository
cd "$REPO_PATH" || { echo "Failed to navigate to repository."; exit 1; }

# Function to create or modify a file with meaningful content
modify_file() {
    local file_path="$1"
    local commit_message="$2"

    # Create the file if it doesn't exist
    if [ ! -f "$file_path" ]; then
        touch "$file_path"
        echo "# $(basename "$file_path" .md | awk '{print toupper($0)}')" > "$file_path"
    fi

    # Append a line related to the commit message
    echo "$commit_message - Updated on $(date +"%Y-%m-%d")" >> "$file_path"
}

# Function to generate a random date within a specific range
generate_random_date() {
    local start_date=$(date -d "2024-07-15" +%s)
    local end_date=$(date -d "2024-07-30" +%s)
    local random_date=$(date -d @$((start_date + RANDOM % (end_date - start_date))) +"%Y-%m-%d")
    echo $random_date
}

# Ensure the repository has at least one commit
if [ -z "$(git rev-parse --verify HEAD 2>/dev/null)" ]; then
    echo "Repository is empty. Creating an initial commit."
    touch README.md
    git add README.md
    git commit -m "Initial commit"
fi

# Get the starting commit number
get_last_commit_number() {
    last_file=$(ls file*.txt 2>/dev/null | sort -V | tail -n 1)
    if [[ $last_file =~ file([0-9]+)\.txt ]]; then
        echo "${BASH_REMATCH[1]}"
    else
        echo "0"
    fi
}

last_commit=$(get_last_commit_number)

# Iterate over the date range and create random commits
current_date="2024-07-15"
end_date="2024-07-30"

while [[ "$current_date" < "$end_date" ]]; do
    num_commits=$((RANDOM % 4 + 2))  # Random number between 2 and 5

    for (( j=0; j<$num_commits; j++ )); do
        commit_number=$((last_commit + 1))
        commit_message=${commit_messages[$((RANDOM % ${#commit_messages[@]}))]}
        last_commit=$((last_commit + 1))

        # Create or modify a file
        file_name="file${commit_number}.txt"
        modify_file $file_name "$commit_message"

        # Stage the file
        git add "$file_name"

        # Ensure the file is staged
        if git diff --cached --name-only | grep -q "$file_name"; then
            # Generate a random time on the current date
            commit_time=$(date -d "$current_date $((RANDOM % 24)):$((RANDOM % 60)):00" +"%Y-%m-%d %H:%M:%S")
            GIT_AUTHOR_DATE="$commit_time" GIT_COMMITTER_DATE="$commit_time" git commit -m "$commit_message"
            echo "Committed '$commit_message' on $commit_time"
        else
            echo "Failed to stage $file_name"
        fi
    done

    # Move to the next day
    current_date=$(date -I -d "$current_date + 1 day")
done

# Display the commit log for review
echo "Displaying the git commit log..."
git log --oneline

echo "Review the commits with 'git log'. Use 'git push' to push the commits to GitHub."
