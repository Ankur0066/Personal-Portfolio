#!/bin/bash

# Number of commits to create
NUM_COMMITS=5

# Array of detailed update commit messages
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

# Function to modify a file with new content
modify_content() {
    echo "Updated content at $(date) with value $RANDOM" >> $1
}

# Function to select a random commit message
generate_random_commit_message() {
    random_index=$(($RANDOM % ${#commit_messages[@]}))
    echo "${commit_messages[$random_index]}"
}

# Function to get the last commit number
get_last_commit_number() {
    last_file=$(ls file*.txt 2>/dev/null | sort -V | tail -n 1)
    if [[ $last_file =~ file([0-9]+)\.txt ]]; then
        echo "${BASH_REMATCH[1]}"
    else
        echo "0"
    fi
}

# Get the starting commit number
last_commit=$(get_last_commit_number)

# Create a loop to make multiple commits
for (( i=1; i<=$NUM_COMMITS; i++ ))
do
    commit_number=$((last_commit + i))
    
    # Create or modify a file with random content
    file_name="file${commit_number}.txt"
    
    # Check if the file exists, if not create it with initial content
    if [ ! -f $file_name ]; then
        echo "This is the initial content for $file_name created at $(date)" > $file_name
    fi
    
    # Modify the file with new content
    modify_content $file_name
    
    # Add the file to the staging area
    git add $file_name
    
    # Generate a random detailed update commit message from the list
    commit_message=$(generate_random_commit_message)
    
    # Generate a random date within the last week
    commit_date=$(date -R -d "$((RANDOM % 7)) days ago $((RANDOM % 24)) hours $((RANDOM % 60)) minutes")

    # Commit the file with the generated message and the random date
    GIT_AUTHOR_DATE="$commit_date" GIT_COMMITTER_DATE="$commit_date" git commit -m "$commit_message"
done

# Push the changes to GitHub
git push origin main
