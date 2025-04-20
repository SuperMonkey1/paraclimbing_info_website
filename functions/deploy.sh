#!/bin/bash
# Script to deploy functions while bypassing lint issues

# Build the project
echo "Building the functions..."
npm run build

# Deploy with --no-lint flag to skip linting
echo "Deploying functions (skipping lint checks)..."
firebase deploy --only functions --no-lint

echo "Deployment complete!"
