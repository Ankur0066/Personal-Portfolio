#!/bin/bash

#no of commit : 5
# Array of files to update
files=("initial_setup.txt" "README.md" "config.yml" "main.js" "style.css" "index.html" "utility.sh" "schema.sql" ".gitignore" "Dockerfile")

# Array of corresponding commit messages
messages=("Update initial setup configuration"
          
          "Modify config file for better environment settings"
          
          "Improve styles in style.css"
          "Revise index.html structure"
          "Enhance utility script functionality"
          
          
          )

# Iterate over each file and update it
for i in "${!files[@]}"; do
  echo "Updating ${files[$i]}" >> "${files[$i]}"  # Update the file
  git add "${files[$i]}"
  git commit -m "${messages[$i]}"
done
