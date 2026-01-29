# Majestic - Modular Web App

**The Co-Star for Intuition** - Four AI avatar companions delivering genuinely different tarot guidance.

---

## 📁 File Structure

```
/majestic-app
├── index.html                          # Main entry point (10KB)
├── assets/
│   ├── css/
│   │   ├── global.css                  # Shared layout, colors, typography (3KB)
│   │   ├── components.css              # Reusable component styles (8KB)
│   │   └── animations.css              # Animation keyframes (2KB)
│   └── js/
│       ├── config.js                   # Avatar configs + card data (4KB)
│       ├── components.js               # UI rendering functions (3KB)
│       ├── state.js                    # Application state management (1KB)
│       └── api.js                      # Mock API responses (29KB - replaced in prod)
└── pages/
    ├── reading-engine.html             # Card reading page (9KB)
    └── onboarding.html                 # Onboarding page (copy from existing)

Total Demo Size: ~69KB (without onboarding)
Total Production Size: ~40KB (when api.js replaced with real Claude API)
```

---

## 🎯 Architecture Benefits

### Reusability
- ✅ **Single source of truth** for avatar personalities and card data
- ✅ **Shared CSS** across all pages (update colors once, changes everywhere)
- ✅ **Component functions** used by any page that needs them
- ✅ **State management** centralized and predictable

### Scalability
- ✅ **Easy to add new pages** (just import shared assets)
- ✅ **Easy to add new avatars** (add to config.js, no code changes)
- ✅ **Easy to add new reading types** (add to CARDS object)
- ✅ **Easy to swap mock API** for real API (replace api.js)

### Performance
- ✅ **Smaller file sizes** (no duplication)
- ✅ **Browser caching** (shared assets cached once)
- ✅ **Faster updates** (change CSS once, not in every file)

---

## 🚀 Deployment Instructions

### Option 1: Netlify (Recommended)

1. **Upload the entire `majestic-app` folder** to Netlify
2. Set **Publish directory** to: `.` (root)
3. No build command needed (static site)
4. Deploy!

**Live URL:** `https://your-site.netlify.app`

### Option 2: Manual Hosting

1. Upload entire folder structure to your web host
2. Ensure directory structure is preserved
3. Access via `https://yourdomain.com/index.html`

### Option 3: Local Testing

```bash
# Navigate to folder
cd majestic-app

# Start simple HTTP server (Python 3)
python3 -m http.server 8000

# Or with Node.js
npx serve

# Open browser to: http://localhost:8000
```

---

## 🔧 Configuration

### Updating Avatar Personalities

Edit `assets/js/config.js`:

```javascript
var AVATAR_CONFIGS = {
    olivia: {
        icon: '🌱',
        name: 'Olivia',
        element: 'Earth',
        tagline: 'Your tagline here',
        systemPrompt: 'System prompt for Claude API...'
    }
    // Add more avatars...
}
```

### Updating Card Data

Edit `assets/js/config.js`:

```javascript
var CARDS = {
    daily: {
        card: { emoji: '⭐', name: 'The Star', number: 'XVII' },
        base: {
            text: "Base interpretation...",
            points: ["Point 1", "Point 2"]
        }
    }
    // Add more reading types...
}
```

### Updating Styles

- **Colors & Typography:** Edit `assets/css/global.css` (CSS variables at top)
- **Component Styles:** Edit `assets/css/components.css`
- **Animations:** Edit `assets/css/animations.css`

### Transitioning to Production API

Replace `assets/js/api.js` with real Claude API integration:

```javascript
// Production version
function getAvatarReading(readingType, avatar, callback) {
    var avatarConfig = AVATAR_CONFIGS[avatar];
    var cardData = CARDS[readingType];
    
    fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': YOUR_API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: avatarConfig.systemPrompt,
            messages: [{
                role: 'user',
                content: buildPrompt(cardData)
            }]
        })
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        callback(parseAPIResponse(data));
    });
}
```

---

## 📦 Adding New Pages

1. Create `pages/new-page.html`
2. Import shared assets:
```html
<link rel="stylesheet" href="../assets/css/global.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/animations.css">

<script src="../assets/js/config.js"></script>
<script src="../assets/js/components.js"></script>
<script src="../assets/js/state.js"></script>
<script src="../assets/js/api.js"></script>
```
3. Add navigation item to `index.html` sidebar
4. Use component functions (e.g., `renderCard()`, `renderInterpretation()`)

---

## 🧪 Testing Checklist

### Desktop
- [ ] Sidebar navigation works
- [ ] Reading engine loads in iframe
- [ ] Avatar selection works
- [ ] Card animations play smoothly
- [ ] All 4 reading types work
- [ ] Jumping card animation triggers

### Mobile (iOS Safari)
- [ ] Hamburger menu opens/closes sidebar
- [ ] Overlay dismisses sidebar
- [ ] All functionality works in iframe
- [ ] Responsive layout adapts
- [ ] Touch interactions work
- [ ] No console errors

### Cross-Browser
- [ ] Chrome/Safari/Firefox/Edge
- [ ] Mobile Safari (iOS 16+)
- [ ] Android Chrome

---

## 📊 File Size Analysis

```
CSS Files:
├── global.css        3KB   (layout, colors, typography)
├── components.css    8KB   (reusable component styles)
└── animations.css    2KB   (keyframes)
                     ─────
                     13KB   (all styles)

JS Files (Demo):
├── config.js         4KB   (avatar configs + card data)
├── components.js     3KB   (render functions)
├── state.js          1KB   (state management)
└── api.js           29KB   (mock responses)
                     ─────
                     37KB   (all scripts - demo)

JS Files (Production):
├── config.js         4KB
├── components.js     3KB
├── state.js          1KB
└── api.js            5KB   (real API integration)
                     ─────
                     13KB   (all scripts - production)

Pages:
├── index.html       10KB   (navigation shell)
└── reading-engine    9KB   (page shell)
                     ─────
                     19KB   (pages)

Total Demo:      69KB
Total Prod:      45KB (35% reduction!)
```

---

## 🔒 Security Notes

### API Keys
- **Never** commit API keys to git
- Use environment variables or server-side proxy
- For production, make API calls from backend, not browser

### CORS
- Current structure works for static hosting
- For API integration, you'll need server-side proxy or CORS configuration

---

## 🎨 Customization Guide

### Changing Brand Colors

Edit `assets/css/global.css`:

```css
:root {
    --color-bg-primary: #1a1a2e;      /* Main background */
    --color-accent: #ffd700;          /* Gold accent */
    --color-olivia: #4CAF50;          /* Earth green */
    --color-elijah: #9E9E9E;          /* Air silver */
    --color-destiny: #2196F3;         /* Water blue */
    --color-casper: #FF5722;          /* Fire orange */
}
```

### Adding New Animations

Add to `assets/css/animations.css`:

```css
@keyframes yourAnimation {
    from { /* start state */ }
    to { /* end state */ }
}

.your-class {
    animation: yourAnimation 1s ease-out;
}
```

---

## 📚 Component API Reference

### renderCard(emoji, name, position)
Renders tarot card display
- **emoji**: Card emoji (string)
- **name**: Card name (string)
- **position**: Optional position label (string)
- **Returns**: HTML string

### renderInterpretation(title, text, points)
Renders interpretation section
- **title**: Section title (string)
- **text**: Main interpretation (string)
- **points**: Array of bullet points (array)
- **Returns**: HTML string

### renderAvatarHeader(avatar)
Renders avatar reading header
- **avatar**: Avatar config object
- **Returns**: HTML string

### renderMusicNote(musicRec)
Renders music recommendation
- **musicRec**: Music text (string)
- **Returns**: HTML string

---

## 🐛 Troubleshooting

### Iframe not loading
- Check file paths (relative paths use `../` from pages folder)
- Ensure CORS headers if testing locally
- Check browser console for errors

### Styles not applying
- Clear browser cache
- Check CSS file paths in HTML
- Verify CSS variables are defined in global.css

### JavaScript errors
- Ensure all scripts load in correct order:
  1. config.js (data)
  2. state.js (state)
  3. components.js (UI)
  4. api.js (API)
  5. Page-specific logic

### Mobile sidebar not working
- Check for JavaScript errors in mobile console
- Verify onclick handlers are inline (not addEventListener for iOS)
- Test with Eruda console on mobile

---

## 📝 Development Workflow

1. **Edit shared styles** → Changes apply to all pages
2. **Edit config.js** → Update avatar/card data everywhere
3. **Edit components.js** → Update rendering logic everywhere
4. **Edit page HTML** → Only affects that specific page
5. **Test locally** → `python3 -m http.server`
6. **Deploy** → Push to Netlify

---

## 🎯 Roadmap

### Phase 1: Demo (Current)
- ✅ Modular architecture
- ✅ 4 reading types
- ✅ 4 avatars with unique interpretations
- ✅ Mock API responses

### Phase 2: Production MVP
- [ ] Real Claude API integration
- [ ] User authentication
- [ ] Reading history/journal
- [ ] Avatar relationship progression

### Phase 3: Full Product
- [ ] Sacred space customization
- [ ] Meditation integration
- [ ] Multiple spread types
- [ ] Premium features

---

## 📞 Support

For questions or issues:
1. Check this README first
2. Review Technical Architecture v2 document
3. Check browser console for errors
4. Test in incognito mode (clears cache/cookies)

---

**Built with ❤️ for spiritual seekers who want genuine guidance, not generic fortune-telling.**
