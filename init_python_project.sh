#chmod +x init_python_project.sh
#./init_python_project.sh

Ò
#!/bin/bash

# Get folder name as project name
PROJECT_NAME=$(basename "$(pwd)")

# Git setup
git init
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Python.gitignore
echo "# $PROJECT_NAME" > README.md

# Add project_files/ to gitignore
echo "" >> .gitignore
echo "# Project specific" >> .gitignore
echo "project_files/" >> .gitignore

# Create main.py in project root
echo "# Main file for $PROJECT_NAME" > main.py

git add .
git commit -m "Initial commit"
echo "Git repository initialized with Python .gitignore and initial commit"

# Create GitHub repository and add as remote using GitHub CLI
echo "Creating GitHub repository..."
gh repo create "$PROJECT_NAME" --private --source=. --remote=origin

if [ $? -ne 0 ]; then
    echo "GitHub CLI not installed or not authenticated. Please run 'gh auth login' first."
    echo "Alternatively, use: git remote add origin YOUR_GITHUB_REPO_URL"
    echo "Then push with: git push -u origin main"
else
    echo "GitHub repository created and linked as remote"
fi

# Create virtual environment
python3 -m venv env
source env/bin/activate
echo "Virtual environment created and activated"

# Create folder structure
mkdir -p build
mkdir -p project_files
mkdir -p documentation
mkdir -p src/creators
mkdir -p src/models
echo "Folder structure created"

# Create empty requirements file
pip freeze > requirements.txt
echo "Requirements file created"

# Add all new files and push changes
git add .
git commit -m "Add project structure and virtual environment"
git branch -M main
git push -u origin main
echo "All changes pushed to GitHub"

echo ""
echo "Project $PROJECT_NAME has been successfully initialized and pushed to GitHub!"