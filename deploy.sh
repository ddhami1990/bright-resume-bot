#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Deploying to GitHub Pages..."

    # Deploy to gh-pages branch
    npx gh-pages -d dist

    if [ $? -eq 0 ]; then
        echo "Deployment successful!"
        echo "Your site should be available at: https://[your-username].github.io/bright-resume-bot"
    else
        echo "Deployment failed!"
        exit 1
    fi
else
    echo "Build failed!"
    exit 1
fi