#!/bin/bash
# Quick Deploy Script for Majestic Demos

echo "🔮 Majestic Tarot - Quick Deploy Script"
echo ""

# Check if we're in the right directory
if [ ! -f "public/index.html" ]; then
    echo "❌ Error: Run this script from the majestic-deployment folder"
    exit 1
fi

echo "📦 Deploying static demos from /public folder..."
echo ""

# Option 1: Netlify
if command -v netlify &> /dev/null; then
    echo "✅ Netlify CLI found"
    echo "🚀 Deploying to Netlify..."
    cd public
    netlify deploy --prod
    cd ..
    echo ""
    echo "✨ Deployment complete!"
    exit 0
fi

# Option 2: Vercel
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI found"
    echo "🚀 Deploying to Vercel..."
    cd public
    vercel --prod
    cd ..
    echo ""
    echo "✨ Deployment complete!"
    exit 0
fi

# No CLI found
echo "❌ No deployment CLI found"
echo ""
echo "📋 Installation options:"
echo ""
echo "For Netlify:"
echo "  npm install -g netlify-cli"
echo "  Then run: ./deploy.sh"
echo ""
echo "For Vercel:"
echo "  npm install -g vercel"
echo "  Then run: ./deploy.sh"
echo ""
echo "Or drag the 'public' folder to:"
echo "  • https://app.netlify.com/drop"
echo "  • https://vercel.com/new"
