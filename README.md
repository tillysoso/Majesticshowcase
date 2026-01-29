# Majestic - Modular Web App Architecture

**The Co-Star for Intuition** - Four AI avatar companions delivering genuinely different tarot guidance through complete thematic experiences.

---

## 🔗 Quick Links

📖 **[Utilities Guide](./UTILITIES_GUIDE.md)** - Complete API reference for card data, calculations, and reading generation  
🚀 **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Deploy to Netlify, Vercel, or GitHub Pages in 5 minutes  
📝 **[Changelog](./CHANGELOG.md)** - Version history and what's new in v2.0  
🧪 **[Live Demo](pages/system-utilities-demo.html)** - Interactive testing interface

---

## 📁 Complete File Structure

```
/majestic-app (189KB total - v2.0)
├── index.html (9KB)                    # Main entry point with sidebar navigation
├── README.md (20KB)                    # Complete documentation (you are here)
├── UTILITIES_GUIDE.md (15KB) ⭐       # API reference for utilities
├── DEPLOYMENT_GUIDE.md (12KB) ⭐      # Deployment instructions
├── CHANGELOG.md (10KB) ⭐             # Version history
│
├── assets/
│   ├── css/ (12KB)                     # Shared styles across all pages
│   │   ├── global.css (3KB)            # Layout, colors, typography, CSS variables
│   │   ├── components.css (7KB)        # Reusable component styles
│   │   └── animations.css (2KB)        # Animation keyframes
│   │
│   └── js/ (81KB demo / 52KB production)
│       ├── config.js (17KB) ⭐         # COMPLETE AVATAR THEME SYSTEM
│       ├── components.js (4KB)         # UI rendering functions
│       ├── state.js (2KB)              # State management
│       ├── api.js (29KB)               # Mock API (demo) / Real API (production)
│       │
│       ├── utilities/ ⭐ NEW (11KB)
│       │   ├── cardData.js (6KB)       # 5 tarot cards + helper functions
│       │   └── spreadCalculations.js (5KB)  # Birth/daily card numerology
│       │
│       └── services/ ⭐ NEW (13KB)
│           ├── readingService.js (3KB) # Generic reading generation
│           └── claudeApi.js (10KB)     # Real Claude API integration
│
└── pages/ (31KB)
    ├── reading-engine.html (13KB)      # Main card reading interface
    └── system-utilities-demo.html (18KB) ⭐ NEW  # Test all utilities

Total Demo Size: 189KB
Total Production Size: 160KB (remove mock api.js, use claudeApi.js backend)
```
Total Production Size: 46KB (when api.js replaced with real Claude API)
```

---

## ⭐ Avatar Theme System (Complete)

### What's in `assets/js/config.js`

Each avatar has a **complete thematic identity** pulled from the production `tarotLLMService.ts`:

```javascript
var AVATAR_CONFIGS = {
    olivia: {
        // Basic Identity
        icon: '🌱',
        name: 'Olivia',
        element: 'Earth',
        suit: 'Pentacles',
        
        // Visual Theme (UI styling)
        theme: {
            colors: {
                primary: '#7ED321',      // Nature green
                secondary: '#689F38',    // Forest green
                accent: '#AED581',       // Light spring green
                light: '#F1F8E9',        // Soft green tint
                dark: '#33691E',         // Deep forest
                glow: 'rgba(126, 211, 33, 0.6)'
            },
            backgrounds: ['forest groves', 'mountain meadows', 'garden sanctuaries'],
            sacredObjects: ['crystals', 'plants', 'wooden totems'],
            cssIcon: 'Leaf'
        },
        
        // Personality Depth
        personality: {
            tagline: 'I guide with nurturing stability and help you build solid foundations',
            archetype: 'The Nurturing Builder',
            adviceType: 'Practical, step-by-step guidance with gentle encouragement',
            backstory: 'Born from ancient forest wisdom...',
            themeSong: 'Rooted by Little Simz',
            bestFor: 'Users seeking career guidance, financial stability',
            voiceMarkers: ['Okay wait—', 'Ooh', 'I love this', '💙'],
            reflectionPrompts: {
                daily: "What's one grounded action you can take today?",
                threespread: "How can you build on these foundations?"
            }
        },
        
        // API System Prompt (for Claude API integration)
        systemPrompt: `You are Olivia, an Earth-element tarot guide...`
    }
    // ... elijah, destiny, casper (all with same complete structure)
}
```

### Avatar Color Palettes

**Olivia (Earth)** 🌱
- Primary: `#7ED321` (Nature green)
- Glow: `rgba(126, 211, 33, 0.6)`
- Backgrounds: Forest groves, mountain meadows, garden sanctuaries

**Elijah (Air)** 🌬️
- Primary: `#9E9E9E` (Gray)
- Glow: `rgba(158, 158, 158, 0.6)`
- Backgrounds: Sky temples, cloud libraries, crystal caves

**Destiny (Water)** 🌊
- Primary: `#2196F3` (Ocean blue)
- Glow: `rgba(33, 150, 243, 0.6)`
- Backgrounds: Ocean depths, moonlit lakes, flowing rivers

**Casper (Fire)** 🔥
- Primary: `#FF5722` (Fire orange)
- Glow: `rgba(255, 87, 34, 0.6)`
- Backgrounds: Fire temples, sunset peaks, forge spaces

---

## 🎯 Architecture Benefits

### 1. Complete Avatar System
✅ **Visual themes** - Full color palettes, backgrounds, sacred objects  
✅ **Personality depth** - Archetypes, backstories, voice markers, theme songs  
✅ **API-ready** - Complete system prompts for Claude integration  
✅ **Reflection prompts** - Avatar-specific questions per reading type  
✅ **Single source of truth** - One config file for all avatar data  

### 2. Modular & Scalable
✅ **Reusable components** - Every UI pattern is a function  
✅ **Shared styles** - Update colors once, changes everywhere  
✅ **Easy to extend** - Add new avatars or reading types in config  
✅ **Production-ready** - Swap api.js for real Claude API  

### 3. Performance Optimized
✅ **Small file sizes** - 78KB demo / 46KB production  
✅ **Browser caching** - Shared assets cached once  
✅ **No duplication** - Code written once, used everywhere  

---

## 🚀 Deployment Guide

### Option 1: Netlify (Recommended)

1. Upload `majestic-app` folder to Netlify
2. Set **Publish directory**: `.` (root)
3. No build command needed (static site)
4. Deploy!

**Drag & Drop:** https://app.netlify.com/drop

### Option 2: Vercel

```bash
cd majestic-app
vercel --prod
```

### Option 3: Local Testing

```bash
cd majestic-app
python3 -m http.server 8000
# Open: http://localhost:8000
```

---

## 🔧 Using the Avatar Theme System

### Accessing Avatar Colors in CSS

```css
/* Use avatar colors dynamically */
.olivia-themed-element {
    background: #7ED321;  /* From AVATAR_CONFIGS.olivia.theme.colors.primary */
    box-shadow: 0 0 20px rgba(126, 211, 33, 0.6);  /* glow */
}

.destiny-themed-element {
    background: #2196F3;  /* From AVATAR_CONFIGS.destiny.theme.colors.primary */
    box-shadow: 0 0 20px rgba(33, 150, 243, 0.6);  /* glow */
}
```

### Accessing Avatar Data in JavaScript

```javascript
// Get avatar config
var avatar = AVATAR_CONFIGS['olivia'];

// Use theme colors
var primaryColor = avatar.theme.colors.primary;
element.style.backgroundColor = primaryColor;

// Display personality info
console.log(avatar.personality.archetype);  // "The Nurturing Builder"
console.log(avatar.personality.themeSong);   // "Rooted by Little Simz"

// Get reflection prompt
var prompt = avatar.personality.reflectionPrompts.daily;
// "What's one grounded action you can take today based on this guidance?"

// Use system prompt for API
var apiSystemPrompt = avatar.systemPrompt;
```

### Using Component Functions

```javascript
// Render avatar header with theme
var html = renderAvatarHeader(AVATAR_CONFIGS.olivia);
// Returns: HTML with avatar icon, name, tagline

// Render card with avatar theme
var cardHTML = renderCard('⭐', 'The Star', 'Present');

// Render interpretation section
var interpHTML = renderInterpretation(
    'Olivia\'s Daily Reading',
    'Interpretation text...',
    ['Point 1', 'Point 2']
);
```

---

## 🎨 Customization Guide

### 1. Adding a New Avatar

Edit `assets/js/config.js`:

```javascript
var AVATAR_CONFIGS = {
    // ... existing avatars ...
    
    newAvatar: {
        icon: '⚡',
        name: 'NewName',
        element: 'Lightning',
        suit: 'Storms',
        
        theme: {
            colors: {
                primary: '#YOUR_COLOR',
                secondary: '#YOUR_COLOR',
                accent: '#YOUR_COLOR',
                light: '#YOUR_COLOR',
                dark: '#YOUR_COLOR',
                glow: 'rgba(YOUR, RGB, HERE, 0.6)'
            },
            backgrounds: ['location 1', 'location 2', 'location 3'],
            sacredObjects: ['object 1', 'object 2', 'object 3'],
            cssIcon: 'YourIcon'
        },
        
        personality: {
            tagline: 'Your tagline',
            archetype: 'Your Archetype',
            adviceType: 'Your advice style',
            backstory: 'Your backstory',
            themeSong: 'Song by Artist',
            bestFor: 'Who this serves',
            voiceMarkers: ['phrase 1', 'phrase 2'],
            reflectionPrompts: {
                daily: "Your daily prompt?",
                threespread: "Your three-card prompt?"
            }
        },
        
        systemPrompt: `Your complete system prompt for Claude API...`
    }
};
```

Then add CSS styling in `assets/css/components.css`:

```css
.newAvatar .interpretation-section {
    border-left: 4px solid #YOUR_PRIMARY_COLOR;
}

.avatar-reading.newAvatar {
    background: linear-gradient(135deg, 
        rgba(YOUR, RGB, HERE, 0.1) 0%, 
        rgba(YOUR, RGB, HERE, 0.1) 100%);
}
```

### 2. Updating Avatar Colors

Edit `assets/js/config.js` → `theme.colors` → Changes apply everywhere

### 3. Changing Brand Colors

Edit `assets/css/global.css`:

```css
:root {
    --color-bg-primary: #1a1a2e;      /* Main background */
    --color-accent: #ffd700;          /* Gold accent */
}
```

### 4. Adding New Reading Types

Edit `assets/js/config.js`:

```javascript
var CARDS = {
    daily: { /* existing */ },
    birth: { /* existing */ },
    threeCard: { /* existing */ },
    jumping: { /* existing */ },
    
    // Add new type
    celticCross: {
        cards: [
            { emoji: '🎴', name: 'Card 1', position: 'Present' },
            // ... 10 cards total
        ],
        base: {
            text: "Base interpretation...",
            points: ["Point 1", "Point 2"]
        }
    }
};
```

Then add to `reading-engine.html`:

```javascript
var types = [
    // ... existing types ...
    { key: 'celticCross', icon: '🔟', title: 'Celtic Cross', subtitle: '10-card deep dive' }
];
```

---

## 🔄 Production API Integration

Replace `assets/js/api.js` with real Claude API calls:

```javascript
/* ========================================
   MAJESTIC - API LAYER (PRODUCTION)
   Real Claude API integration
   ======================================== */

/**
 * Get avatar reading from Claude API
 * @param {string} readingType - Type of reading
 * @param {string} avatar - Avatar key
 * @param {Function} callback - Callback function
 */
function getAvatarReading(readingType, avatar, callback) {
    var avatarConfig = AVATAR_CONFIGS[avatar];
    var cardData = CARDS[readingType];
    
    // Build user prompt
    var userPrompt = buildUserPrompt(readingType, cardData);
    
    // Call Claude API
    fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': YOUR_API_KEY,  // NEVER expose in frontend!
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            temperature: 0.7,
            system: avatarConfig.systemPrompt,  // Uses theme system!
            messages: [{
                role: 'user',
                content: userPrompt
            }]
        })
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var reading = parseAPIResponse(data, avatar);
        callback(reading);
    })
    .catch(function(error) {
        console.error('API Error:', error);
        callback(getFallbackReading(readingType, avatar));
    });
}

function buildUserPrompt(readingType, cardData) {
    var prompt = 'Interpret this tarot reading:\n\n';
    
    if (readingType === 'daily' || readingType === 'birth') {
        prompt += 'Card: ' + cardData.card.name + '\n';
        prompt += 'Base meaning: ' + cardData.base.text;
    } else {
        prompt += 'Three-card spread:\n';
        cardData.cards.forEach(function(card) {
            prompt += card.position + ': ' + card.name + '\n';
        });
        prompt += '\nBase meaning: ' + cardData.base.text;
    }
    
    if (readingType === 'jumping') {
        prompt += '\n\nJumping card: ' + cardData.jumpingCard.name;
        prompt += ' (This card jumped out during shuffling - emphasize its special significance)';
    }
    
    return prompt;
}

function parseAPIResponse(data, avatar) {
    var content = data.content[0].text;
    var config = AVATAR_CONFIGS[avatar];
    
    // Extract structured reading
    return {
        title: config.name + "'s Reading",
        text: content,
        points: extractPoints(content),
        music: config.personality.themeSong
    };
}

function extractPoints(text) {
    // Parse structured sections from API response
    // Based on avatar's specific format
    var points = [];
    var lines = text.split('\n');
    
    lines.forEach(function(line) {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('▸')) {
            points.push(line.replace(/^[•\-▸]\s*/, ''));
        }
    });
    
    return points.length > 0 ? points : ['See full reading above'];
}
```

**CRITICAL:** Move API key to backend/serverless function!

---

## 📚 Component API Reference

### renderCard(emoji, name, position)
```javascript
// Renders tarot card display
renderCard('⭐', 'The Star', 'Present');
// Returns: HTML string with card visual
```

### renderInterpretation(title, text, points)
```javascript
// Renders interpretation section with bullet points
renderInterpretation(
    'Olivia\'s Daily Reading',
    'Your interpretation text here...',
    ['Reflection point 1', 'Reflection point 2']
);
// Returns: HTML string with styled interpretation
```

### renderAvatarHeader(avatar)
```javascript
// Renders avatar reading header with icon, name, tagline
var avatar = AVATAR_CONFIGS.olivia;
renderAvatarHeader(avatar);
// Returns: HTML string with avatar identity
```

### renderMusicNote(musicRec)
```javascript
// Renders music recommendation section
renderMusicNote('"Rooted" by Little Simz — for grounded connection');
// Returns: HTML string with styled music note
```

### renderAvatarCard(key, avatar, disabled)
```javascript
// Renders avatar card for selection grid
renderAvatarCard('olivia', AVATAR_CONFIGS.olivia, false);
// Returns: HTML string with clickable avatar card
```

### renderJumpingCardContainer(jumpingCard, guidance, points)
```javascript
// Renders jumping card special section
renderJumpingCardContainer(
    { emoji: '🃏', name: 'The Fool' },
    'Jumping card guidance text...',
    ['Point 1', 'Point 2']
);
// Returns: HTML string with jumping card styling
```

---

## 🧪 Testing the Avatar Theme System

### Test Avatar Colors

```html
<!-- Add to any page for testing -->
<div id="themeTest"></div>

<script src="../assets/js/config.js"></script>
<script>
    var avatars = ['olivia', 'elijah', 'destiny', 'casper'];
    var html = '';
    
    avatars.forEach(function(key) {
        var avatar = AVATAR_CONFIGS[key];
        var color = avatar.theme.colors.primary;
        
        html += '<div style="background:' + color + '; padding:20px; margin:10px;">';
        html += avatar.icon + ' ' + avatar.name + ' - ' + avatar.personality.archetype;
        html += '<br>Theme Song: ' + avatar.personality.themeSong;
        html += '</div>';
    });
    
    document.getElementById('themeTest').innerHTML = html;
</script>
```

### Test Voice Markers

```javascript
var olivia = AVATAR_CONFIGS.olivia;
console.log('Olivia Voice Markers:', olivia.personality.voiceMarkers);
// ["Okay wait—", "Ooh", "I love this", "💙", ...]

var elijah = AVATAR_CONFIGS.elijah;
console.log('Elijah Voice Markers:', elijah.personality.voiceMarkers);
// ["Notice the duality", "Both truths can coexist", ...]
```

### Test Reflection Prompts

```javascript
function getReflectionPrompt(avatar, readingType) {
    return AVATAR_CONFIGS[avatar].personality.reflectionPrompts[readingType];
}

console.log(getReflectionPrompt('olivia', 'daily'));
// "What's one grounded action you can take today based on this guidance?"

console.log(getReflectionPrompt('casper', 'threespread'));
// "What are you being called to transform or release based on this reading?"
```

---

## 🔐 Security Best Practices

### API Keys
```javascript
// ❌ NEVER DO THIS:
var apiKey = 'sk-ant-xxxxx';  // Exposed in frontend!

// ✅ DO THIS INSTEAD:
// 1. Create serverless function (Netlify/Vercel)
// 2. Store API key in environment variables
// 3. Frontend calls YOUR endpoint, not Claude API directly

// Netlify Function example:
exports.handler = async function(event, context) {
    const apiKey = process.env.ANTHROPIC_API_KEY;  // Secure!
    // ... make Claude API call here
}
```

### CORS
- Current structure works for static hosting
- For production API: Use server-side proxy or Netlify Functions

---

## 📊 File Size Breakdown

### Demo (Current)
```
CSS:       12KB  (global 3KB + components 7KB + animations 2KB)
JS Data:   41KB  (config 6KB + components 4KB + state 2KB + mock API 29KB)
HTML:      22KB  (index 9KB + reading engine 13KB)
─────────────────
Total:     78KB
```

### Production (After API Integration)
```
CSS:       12KB  (same - shared styles)
JS Data:   12KB  (config 6KB + components 4KB + state 2KB + real API 5KB)
HTML:      22KB  (same - page shells)
─────────────────
Total:     46KB  (41% reduction!)
```

---

## 🗺️ Roadmap

### Phase 1: Demo ✅ (Current)
- ✅ Complete avatar theme system with personality depth
- ✅ Modular file architecture
- ✅ 4 reading types with animations
- ✅ Mock API showing avatar differentiation
- ✅ Production-ready structure

### Phase 2: Production MVP
- [ ] Real Claude API integration using theme system
- [ ] Serverless functions for API security
- [ ] User authentication
- [ ] Reading history/journal with avatar themes
- [ ] Avatar relationship progression

### Phase 3: Full Product
- [ ] Sacred space customization (using avatar.theme.backgrounds)
- [ ] Meditation with avatar-specific audio
- [ ] Celtic Cross + additional spreads
- [ ] Premium features
- [ ] Avatar theme customization by user

---

## 🐛 Troubleshooting

### Avatar themes not applying
```javascript
// Check config loaded
console.log(typeof AVATAR_CONFIGS);  // Should be "object"
console.log(AVATAR_CONFIGS.olivia.theme.colors.primary);  // Should be "#7ED321"

// Check CSS variables
console.log(getComputedStyle(document.documentElement).getPropertyValue('--color-accent'));
```

### Colors not showing
- Clear browser cache
- Check CSS file paths in HTML `<link>` tags
- Verify CSS variables defined in `global.css`
- Inspect element to see computed styles

### JavaScript errors
Load order must be:
1. `config.js` (data first)
2. `state.js` (state management)
3. `components.js` (UI functions)
4. `api.js` (API calls)
5. Page-specific logic

---

## 📞 Support & Resources

### Documentation Files
- `Majestic_Technical_Architecture_v2.md` - Complete technical architecture
- `Majestic_PRD_Avatar_Addendum_v2.md` - Avatar interpretation system spec
- `tarotLLMService.ts` - Production API service reference

### Quick Reference
- Avatar color codes: See "Avatar Color Palettes" section above
- System prompts: In `config.js` → `AVATAR_CONFIGS[avatar].systemPrompt`
- Theme data: In `config.js` → `AVATAR_CONFIGS[avatar].theme`
- Voice markers: In `config.js` → `AVATAR_CONFIGS[avatar].personality.voiceMarkers`

---

**Built with ❤️ for spiritual seekers who want genuine guidance through complete thematic experiences.**

*Architecture combines modular web patterns with deep avatar personality systems for production-ready spiritual tech.*
