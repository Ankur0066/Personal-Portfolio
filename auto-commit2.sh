#!/bin/bash

# Number of commits to create
NUM_COMMITS=3

# Delay between commits (in seconds)
DELAY=5

# Array of commit messages
commit_messages=(
    "Add initial setup file"
    "Create README.md"
    "Add config file"
    "Check and update main.js"
    "Add style.css"
    "check index.html"
    "Add utility script"
    "Create database schema"
    "Add .gitignore"
    "go through Dockerfile"
)

# Function to generate a random string for file content
generate_content() {
    echo "This is a random content generated at $(date) with value $RANDOM"
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
    generate_content > $file_name
    
    # Add the file to the staging area
    git add $file_name
    
    # Generate a random commit message from the list
    commit_message=$(generate_random_commit_message)
    
    # Commit the file with the generated message
    git commit -m "$commit_message"
    
    # Wait for a specified delay before the next commit
    echo "Waiting for $DELAY seconds before the next commit..."
    sleep $DELAY
done

# Push the changes to GitHub
git push origin main
