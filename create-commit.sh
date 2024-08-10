#!/bin/bash

# ====================================================================
# Script Name: create_commits.sh
# Description: Automates the creation of Git commits with specified dates
#              to simulate repository activity for educational purposes.
# Author: Your Name
# Date: YYYY-MM-DD
# ====================================================================

# ---------------------------- Configuration --------------------------

# Path to your local Git repository
REPO_PATH="C:\Users\ankur\Github\Personal-Portfolio"

# Array of commit details: "YYYY-MM-DD HH:MM:SS|Commit message|File to modify"
commit_details=(
    "2024-08-10 10:15:00|Initial project setup|README.md"
    "2024-08-09 14:30:00|Add feature X implementation|feature_x.py"
    "2024-08-08 09:45:00|Fix bug in feature Y|bugfix_y.py"
    "2024-08-07 16:20:00|Update documentation|docs/setup.md"
    "2024-08-06 11:05:00|Refactor codebase for optimization|main.py"
    # Add more commit details as needed
)

# ---------------------------------------------------------------------

# Function to display script usage
usage() {
    echo "Usage: $0"
    echo "Ensure that the REPO_PATH variable is set to your local Git repository."
    exit 1
}

# Check if repository path exists
if [ ! -d "$REPO_PATH" ]; then
    echo "Error: Repository path '$REPO_PATH' does not exist."
    usage
fi

# Navigate to the repository
cd "$REPO_PATH" || { echo "Failed to navigate to repository."; exit 1; }

# Ensure the repository has at least one commit
if [ -z "$(git rev-parse --verify HEAD 2>/dev/null)" ]; then
    echo "Repository is empty. Creating an initial commit."
    touch README.md
    git add README.md
    git commit -m "Initial commit"
fi

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

# Iterate over each commit detail and create commits accordingly
for detail in "${commit_details[@]}"; do
    # Split the detail into components
    IFS='|' read -r commit_date commit_msg file_to_modify <<< "$detail"

    # Validate date format
    if ! date -d "$commit_date" "+%Y-%m-%d %H:%M:%S" >/dev/null 2>&1; then
        echo "Invalid date format: '$commit_date'. Skipping this commit."
        continue
    fi

    # Modify the specified file
    modify_file "$file_to_modify" "$commit_msg"

    # Stage the changes
    git add "$file_to_modify"

    # Export the commit date environment variables
    export GIT_AUTHOR_DATE="$commit_date"
    export GIT_COMMITTER_DATE="$commit_date"

    # Commit with the provided message
    git commit -m "$commit_msg"

    echo "Committed '$commit_msg' on $commit_date"
done

# Push the commits to the remote repository
echo "Pushing commits to the remote repository..."
git push origin main

echo "All specified commits have been created and pushed successfully."
