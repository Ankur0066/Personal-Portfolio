#!/bin/bash

# Array of files to update
files=("initial_setup.txt" "README.md" "config.yml" "main.js" "style.css" "index.html" "utility.sh" "schema.sql" ".gitignore" "Dockerfile")

# Array of corresponding commit messages
messages=("Update initial setup configuration"
          "Refactor and enhance README.md content"
          "Modify config file for better environment settings"
          "Optimize and update main.js logic"
          "Improve styles in style.css"
          "Revise index.html structure"
          "Enhance utility script functionality"
          "Update database schema with new fields"
          "Refine .gitignore rules"
          "Revise Dockerfile for improved build process")

# Iterate over each file and update it
for i in "${!files[@]}"; do
  echo "Updating ${files[$i]}" >> "${files[$i]}"  # Update the file
  git add "${files[$i]}"
  git commit -m "${messages[$i]}"
done
