# Majestic Tarot App - Deployment Package

## Quick Start

### Option 1: Deploy Static Demos (5 minutes)
The `/public` folder contains all standalone HTML demos that work immediately:

```bash
cd public
netlify deploy --prod
# OR
vercel deploy
# OR drag the public folder to Netlify Drop
```

**What's included:**
- Landing page with demo cards (`index.html`)
- Avatar showcase (`avatar-selection.html`)  
- System helpers demo (`system-helpers-demo.html`)
- 4 avatar reading demos (`demos/*.html`)

### Option 2: Full React App Setup
Coming soon - requires Vite/React setup

---

## Folder Structure

```
majestic-deployment/
├── public/                  # ✅ READY TO DEPLOY
│   ├── index.html          # Landing page
│   ├── avatar-selection.html
│   ├── system-helpers-demo.html
│   └── demos/
│       ├── olivia-first-reading-vanilla.html
│       ├── elijah-first-reading.html
│       ├── destiny-first-reading.html
│       └── casper-first-reading.html
│
├── src/                     # React/TypeScript source (needs React setup)
│   ├── components/
│   │   ├── onboarding/
│   │   │   ├── MajesticOnboarding.tsx
│   │   │   └── AvatarSelectionOnboarding.tsx
│   │   ├── cards/
│   │   │   ├── CardReadingShowcase_v2.tsx
│   │   │   └── CardReadingShowcase_v3.tsx
│   │   └── showcase/
│   │       └── MajesticShowcase.tsx
│   │
│   ├── services/
│   │   └── tarotLLMService.ts          # Claude API integration
│   │
│   ├── shared/             # (Create helper modules here)
│   ├── hooks/              # (Create React hooks here)
│   └── types/              # (Create TypeScript types here)
│
└── docs/                    # Reference documentation
    ├── PRD/
    ├── tech-specs/
    └── design-specs/
```

---

## Deployment Instructions

### Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy public folder
cd public
netlify deploy --prod
```

### Vercel
```bash
# Install Vercel CLI  
npm install -g vercel

# Deploy
cd public
vercel --prod
```

### GitHub Pages
```bash
# Push public folder to gh-pages branch
git subtree push --prefix public origin gh-pages
```

---

## Environment Variables

For production deployment with API functionality:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
```

**⚠️ Security Warning:** Never expose API keys in frontend code. Move `tarotLLMService.ts` to a backend API route or serverless function.

---

## What Works Now

✅ **Fully functional static demos:**
- Landing page with navigation
- Avatar personality showcases
- First reading experiences for all 4 avatars
- System helpers visualization
- Birth card calculations (hardcoded demo)
- Daily card rotation logic

🔧 **Needs React setup:**
- Interactive onboarding flow
- Full card reading system
- Avatar selection with state management
- Real-time API calls to Claude

---

## Next Steps

1. **Deploy demos now** (use `/public` folder)
2. **Set up React project** (for full app functionality)
3. **Create backend API** (to secure Anthropic API key)
4. **Add authentication** (for user accounts)
5. **Implement database** (for saving readings)

---

## File Manifest

### Public HTML Files (7 files)
- `index.html` - Landing page
- `avatar-selection.html` - Avatar showcase
- `system-helpers-demo.html` - Technical demo
- `demos/olivia-first-reading-vanilla.html`
- `demos/elijah-first-reading.html`
- `demos/destiny-first-reading.html`  
- `demos/casper-first-reading.html`

### React Components (5 files)
- `components/onboarding/MajesticOnboarding.tsx`
- `components/onboarding/AvatarSelectionOnboarding.tsx`
- `components/cards/CardReadingShowcase_v2.tsx`
- `components/cards/CardReadingShowcase_v3.tsx`
- `components/showcase/MajesticShowcase.tsx`

### Services (1 file)
- `services/tarotLLMService.ts` - Complete LLM integration with all 4 avatars

### Documentation (9 files)
- PRDs, Tech Specs, Design Specs (reference only)

---

## Support

For questions or issues, refer to the documentation in `/docs/`
