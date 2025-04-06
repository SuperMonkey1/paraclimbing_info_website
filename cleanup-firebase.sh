#!/bin/bash

# Remove Firebase-related files and directories
echo "Removing Firebase-related files and directories..."

# Remove src/firebase directory
rm -rf src/firebase

# Remove newsletter component
rm -rf src/components/newsletter

# Remove firebase from package.json if it's still there
if grep -q "\"firebase\"" package.json; then
  echo "Removing firebase from package.json..."
  sed -i '' 's/,\n.*"firebase".*//g' package.json
fi

echo "Cleanup completed successfully!"
echo "Now your project should compile without Firebase-related errors."
echo "You may need to run 'npm install' to update your node_modules after these changes."
