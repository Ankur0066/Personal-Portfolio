delete#!/bin/bash

# Function to get the last commit number
get_last_commit_number() {
    # List files, sort them by name, get the last one, and extract the number
    last_file=$(ls file*.txt 2>/dev/null | sort -V | tail -n 1)
    if [[ $last_file =~ file([0-9]+)\.txt ]]; then
        echo "${BASH_REMATCH[1]}"
    else
        echo "0"
    fi
}

# Get the starting commit number
last_commit=$(get_last_commit_number)

# Create a loop to delete files and make commits
for (( i=1; i<=$last_commit; i++ ))
do
    # Check if the file exists before attempting to delete it
    if [ -f "file$i.txt" ]; then
        # Remove the file
        rm file$i.txt
        
        # Stage the deletion
        git add -u
        
        # Commit the deletion with a message
        git commit -m "Deleted file$i.txt"
        
        # Wait for a second before the next commit
        sleep 1
    fi
done
