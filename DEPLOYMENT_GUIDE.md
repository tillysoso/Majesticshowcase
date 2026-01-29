# Majestic - Deployment Guide

**Two deployment tracks: Vanilla JS demos (now) + React/TypeScript production (future)**

---

## 📊 Current State: Dual Architecture

### Track 1: Vanilla JS Demo System ✅ READY NOW
**Location:** `/majestic-app`  
**Purpose:** Immediate demos, presentations, testing  
**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES5)  
**Deployment:** Static hosting (Netlify, Vercel, GitHub Pages)  
**Build Required:** ❌ No  
**Size:** 189KB  

### Track 2: React/TypeScript Production 🚧 PLANNED
**Location:** `/majestic-app-react` (to be created)  
**Purpose:** Full production application  
**Tech Stack:** React, TypeScript, Vite  
**Deployment:** Vercel, Netlify with build step  
**Build Required:** ✅ Yes  
**Size:** TBD (after build optimization)

---

## 🚀 Quick Deploy: Vanilla JS (5 Minutes)

### Option 1: Netlify Drag-and-Drop

**Simplest method** - No terminal required!

1. Open https://app.netlify.com/drop
2. Drag `/majestic-app` folder to browser
3. Done! You'll get a URL like `majestic-abc123.netlify.app`

**Perfect for:**
- Stakeholder presentations
- Quick demos
- Sharing with business partners

---

### Option 2: Netlify CLI

```bash
# Install Netlify CLI (one-time)
npm install -g netlify-cli

# Navigate to app
cd majestic-app

# Deploy
netlify deploy --prod

# Follow prompts to create new site or link existing
```

**Production URL example:** `https://majestic-tarot.netlify.app`

---

### Option 3: Vercel CLI

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Navigate to app
cd majestic-app

# Deploy
vercel --prod
```

---

### Option 4: GitHub Pages

```bash
# 1. Create GitHub repo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/majestic-app.git
git push -u origin main

# 2. Enable GitHub Pages
# Go to Settings > Pages > Source: main branch > /root
# Save

# 3. Your app will be at:
# https://yourusername.github.io/majestic-app
```

---

## 📁 What Gets Deployed (Vanilla JS)

```
majestic-app/ (189KB)
├── index.html                              ✅ Entry point
├── README.md                               ✅ Documentation
├── UTILITIES_GUIDE.md                      ✅ API reference
├── CHANGELOG.md                            ✅ Version history
│
├── assets/
│   ├── css/ (12KB)
│   │   ├── global.css                      ✅ Core styles
│   │   ├── components.css                  ✅ Component styles
│   │   └── animations.css                  ✅ Animations
│   │
│   └── js/ (81KB)
│       ├── config.js                       ✅ Avatar themes
│       ├── components.js                   ✅ UI rendering
│       ├── state.js                        ✅ State management
│       ├── api.js                          ✅ Mock API (29KB)
│       │
│       ├── utilities/
│       │   ├── cardData.js                 ✅ Card definitions
│       │   └── spreadCalculations.js      ✅ Numerology
│       │
│       └── services/
│           ├── readingService.js           ✅ Reading generation
│           └── claudeApi.js                ✅ Real Claude API
│
└── pages/ (31KB)
    ├── reading-engine.html                 ✅ Main reading page
    └── system-utilities-demo.html          ✅ Testing page
```

---

## 🔐 Environment Variables (Production)

### For Claude API Integration

When using real Claude API (not mock data), set these:

**Netlify:**
```bash
# In Netlify dashboard: Site Settings > Environment Variables
ANTHROPIC_API_KEY=sk-ant-...
```

**Vercel:**
```bash
# In Vercel dashboard: Settings > Environment Variables
ANTHROPIC_API_KEY=sk-ant-...
```

**Local Development:**
```bash
# Create .env file (don't commit this!)
ANTHROPIC_API_KEY=sk-ant-...
```

**⚠️ CRITICAL SECURITY NOTE:**

The current `claudeApi.js` makes client-side API calls. **This exposes your API key!**

**For production, you MUST:**
1. Create serverless functions (Netlify Functions, Vercel Functions)
2. Move API calls to backend
3. Never expose API key in client code

---

## 🛡️ Production API Setup (Serverless)

### Netlify Functions

```bash
# 1. Create netlify/functions folder
mkdir -p netlify/functions

# 2. Create function file
# netlify/functions/get-reading.js
```

```javascript
const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { avatarId, readingData } = JSON.parse(event.body);

    try {
        const message = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            system: getAvatarSystemPrompt(avatarId),
            messages: [
                {
                    role: 'user',
                    content: buildReadingPrompt(readingData, avatarId)
                }
            ]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                interpretation: message.content[0].text
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

**Then update client code:**

```javascript
// Instead of calling Claude API directly:
// fetch('https://api.anthropic.com/v1/messages', ...)

// Call your serverless function:
fetch('/.netlify/functions/get-reading', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        avatarId: 'olivia',
        readingData: preparedReading
    })
})
```

---

## 🎯 Deployment Checklist

### Before Deploying

- [ ] Test all pages locally
- [ ] Verify iOS Safari compatibility
- [ ] Check all navigation links work
- [ ] Test with mock data (no API key)
- [ ] Update README with live URL
- [ ] Remove any console.log() debugging
- [ ] Verify no sensitive data in code

### First Deployment

- [ ] Choose deployment platform
- [ ] Deploy vanilla JS version
- [ ] Get production URL
- [ ] Test in different browsers
- [ ] Share with stakeholders
- [ ] Collect feedback

### Production Deployment (with API)

- [ ] Set up serverless functions
- [ ] Move API calls to backend
- [ ] Set environment variables
- [ ] Test API integration
- [ ] Monitor usage/costs
- [ ] Set up error tracking

---

## 📱 Platform-Specific Notes

### Netlify
**Pros:**
- Drag-and-drop deployment
- Free tier includes 100GB bandwidth
- Automatic HTTPS
- Easy custom domains
- Built-in functions

**Best for:** Quick demos, presentations

**Custom domain:**
```bash
# In Netlify dashboard: Domain Settings > Add custom domain
# majestic.yourdomain.com
```

---

### Vercel
**Pros:**
- Excellent for Next.js (if you migrate to React)
- Fast global CDN
- Serverless functions
- Great developer experience

**Best for:** React/TypeScript production version

**Custom domain:**
```bash
vercel domains add majestic.yourdomain.com
```

---

### GitHub Pages
**Pros:**
- Free
- Simple
- Good for open source projects

**Cons:**
- No serverless functions
- No environment variables
- Slower than Netlify/Vercel

**Best for:** Static demos only

---

## 🔄 Migration Path: Vanilla JS → React

### Phase 1: Set Up React Project

```bash
# Create new React + TypeScript project
npm create vite@latest majestic-app-react -- --template react-ts

cd majestic-app-react
npm install
```

### Phase 2: Port TypeScript Utilities

Copy these files from `/mnt/user-data/uploads/`:
- `avatarData.ts` → `src/shared/`
- `cardData.ts` → `src/shared/`
- `spreadCalculations.ts` → `src/shared/`
- `readingService.ts` → `src/backend/`
- `tarotLLMService.ts` → `src/services/`
- `useAvatarTheme.ts` → `src/hooks/`

### Phase 3: Convert React Components

Your existing React components:
- `MajesticOnboarding.tsx`
- `AvatarSelectionOnboarding.tsx`
- `CardReadingShowcase_v2.tsx`
- `CardReadingShowcase_v3.tsx`
- `MajesticShowcase.tsx`

Move to `src/components/`

### Phase 4: Set Up Routing

```bash
npm install react-router-dom
```

```javascript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MajesticOnboarding from './components/onboarding/MajesticOnboarding';
import CardReadingShowcase from './components/cards/CardReadingShowcase_v3';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MajesticOnboarding />} />
                <Route path="/reading" element={<CardReadingShowcase />} />
            </Routes>
        </BrowserRouter>
    );
}
```

### Phase 5: Build and Deploy

```bash
npm run build

# Deploy dist folder
netlify deploy --prod --dir=dist
```

---

## 📊 Size Comparison

### Vanilla JS (Current)
```
Total: 189KB
├── HTML/CSS: 43KB
├── JavaScript: 81KB
├── Mock Data: 29KB (removed in production)
└── Documentation: 36KB
```

**Production (no mock):** 160KB

---

### React Build (Estimated)
```
Total: ~250KB (gzipped: ~80KB)
├── React Runtime: 130KB
├── App Code: 80KB
├── Vendor Chunks: 40KB
```

**With code splitting:** ~180KB initial load

---

## 🎨 Custom Domain Setup

### Buy Domain (Optional)

**Recommended registrars:**
- Namecheap (~$10/year for .com)
- Google Domains
- Cloudflare

### Connect to Netlify

```bash
# 1. In Netlify dashboard
# Domain Settings > Add custom domain > majestic-tarot.com

# 2. Update DNS at registrar
# Add Netlify nameservers or A/CNAME records

# 3. Wait for DNS propagation (up to 48 hours)

# 4. Netlify auto-provisions SSL certificate
```

### Connect to Vercel

```bash
vercel domains add majestic-tarot.com

# Follow CLI prompts to configure DNS
```

---

## 🐛 Troubleshooting

### "API key not set" Error

**Problem:** Trying to use Claude API without key  
**Solution:** Either:
1. Set API key: `setClaudeApiKey('sk-ant-...')`
2. Use mock data (default behavior)

### Assets Not Loading

**Problem:** Broken links after deployment  
**Solution:** Use relative paths:
- ✅ `../assets/js/config.js`
- ❌ `/assets/js/config.js` (breaks in subdirectories)

### iOS Safari Issues

**Problem:** JavaScript errors on iPhone  
**Solution:** Already handled! We use ES5 syntax.
- ✅ `var` instead of `const/let`
- ✅ `function()` instead of `() =>`
- ✅ Traditional event handlers

### Large File Size

**Problem:** App loads slowly  
**Solutions:**
1. Remove mock data (29KB savings)
2. Minify JavaScript
3. Use CDN for assets
4. Enable gzip compression (automatic on Netlify/Vercel)

---

## 📈 Performance Optimization

### For Vanilla JS

```bash
# Minify JavaScript
npm install -g terser

# Minify all JS files
terser assets/js/config.js -o assets/js/config.min.js
terser assets/js/components.js -o assets/js/components.min.js
# etc.

# Update HTML to use .min.js files
```

### For React Build

```javascript
// vite.config.ts
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    utils: ['./src/shared/cardData', './src/shared/spreadCalculations']
                }
            }
        }
    }
});
```

---

## 🎯 Next Steps

**This Week:**
1. Deploy vanilla JS to Netlify ✅
2. Share with stakeholders ✅
3. Collect feedback
4. Test on multiple devices

**Next Sprint:**
1. Set up serverless functions for API
2. Add remaining tarot cards (5 → 78)
3. Implement user authentication
4. Start React migration

**Future:**
1. Build full onboarding flow
2. Add reading history
3. Implement journaling features
4. Launch beta to users

---

## 📞 Support Resources

**Netlify Docs:** https://docs.netlify.com  
**Vercel Docs:** https://vercel.com/docs  
**Claude API Docs:** https://docs.anthropic.com  
**Vite Docs:** https://vitejs.dev

---

**Last Updated:** January 27, 2026  
**Deployment Status:** ✅ Vanilla JS ready | 🚧 React in planning  
**Current Version:** 2.0
