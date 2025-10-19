#!/bin/bash

echo "🚀 Deploying Em Học Toán to GitHub Pages"
echo "========================================"

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🔗 Your app should be available at: https://cuongdinhngo.github.io/emhoctoan/"
else
    echo "❌ Deployment failed!"
    exit 1
fi
