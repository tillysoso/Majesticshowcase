# Majestic - Utilities Guide

**Complete JavaScript utility system for tarot calculations, card management, and reading generation**

---

## 📁 New File Structure

```
/majestic-app/assets/js/
├── config.js (17KB)                    # Avatar theme system
├── components.js (4KB)                 # UI rendering
├── state.js (2KB)                      # State management
├── api.js (29KB)                       # API layer
│
├── utilities/ ⭐ NEW (11KB total)
│   ├── cardData.js (6KB)               # Tarot card definitions + helpers
│   └── spreadCalculations.js (5KB)    # Birth/daily card numerology
│
└── services/ ⭐ NEW (3KB total)
    └── readingService.js (3KB)         # Generic reading generation
```

---

## 🎴 Card Data Utilities (`utilities/cardData.js`)

### Available Cards

Currently 5 cards in the deck:
- **The Fool** (Major Arcana) - 🃏
- **Ace of Cups** (Cups) - 🍷
- **Seven of Wands** (Wands) - 🔥
- **Six of Pentacles** (Pentacles) - 🪙
- **Ten of Swords** (Swords) - ⚔️

### Card Object Structure

```javascript
{
    id: 'fool',
    name: 'The Fool',
    number: 0,
    suit: 'major',             // major, cups, wands, pentacles, swords
    element: 'spirit',         // spirit, water, fire, earth, air
    keywords: ['new beginnings', 'innocence', '...'],
    uprightMeaning: '...',     // Full upright interpretation
    reversedMeaning: '...',    // Full reversed interpretation
    emoji: '🃏'                // Emoji representation
}
```

### Helper Functions

#### `getCardById(cardId)`
```javascript
var card = getCardById('fool');
// Returns: Card object or null
```

#### `getRandomCard()`
```javascript
var card = getRandomCard();
// Returns: Random card object from deck
```

#### `getRandomCards(count)`
```javascript
var cards = getRandomCards(3);
// Returns: Array of 3 unique random cards
```

#### `getAllCardIds()`
```javascript
var ids = getAllCardIds();
// Returns: ['fool', 'ace-of-cups', 'seven-of-wands', ...]
```

#### `getCardsBySuit(suit)`
```javascript
var majorCards = getCardsBySuit('major');
var cupsCards = getCardsBySuit('cups');
// Returns: Array of cards matching suit
```

#### `getCardsByElement(element)`
```javascript
var fireCards = getCardsByElement('fire');
// Returns: Array of cards matching element
```

#### `getDeckSize()`
```javascript
var size = getDeckSize();
// Returns: 5 (current deck size)
```

---

## 🔢 Spread Calculations (`utilities/spreadCalculations.js`)

### Birth Card Numerology

Calculates your birth card using traditional Tarot numerology:

**Formula:**
1. Add all digits of birth date (YYYY + MM + DD)
2. Reduce to single digit or master number (max 22)
3. Map to Major Arcana (0-21)

**Example:**
```
Birth Date: March 15, 1990
1+9+9+0+3+1+5 = 28
2+8 = 10
Birth Card = #10 (Wheel of Fortune)
```

### Daily Card Calculation

Calculates your daily card based on:
- Your birth card number
- Current day of year

**Formula:** `(birthCardNumber + dayOfYear) % 22`

### Core Functions

#### `calculateBirthCard(birthDate)`
```javascript
var birthDate = new Date(1990, 2, 15); // March 15, 1990
var birthCardNumber = calculateBirthCard(birthDate);
// Returns: 10
```

#### `calculateDailyCard(birthCardNumber, date)`
```javascript
var birthCardNumber = 10;
var today = new Date();
var dailyCardNumber = calculateDailyCard(birthCardNumber, today);
// Returns: 0-21 (Major Arcana number for today)
```

#### `getBirthCardId(birthDate)`
```javascript
var birthCardId = getBirthCardId(new Date(1990, 2, 15));
// Returns: 'fool' or null if not implemented
```

#### `getDailyCardId(birthDate, date)`
```javascript
var dailyCardId = getDailyCardId(new Date(1990, 2, 15));
// Returns: Card ID or null
```

#### `isCardImplemented(cardNumber)`
```javascript
var exists = isCardImplemented(10);
// Returns: true/false - checks if card exists in deck
```

#### `getSpreadPositions(spreadType)`
```javascript
var positions = getSpreadPositions('threeCard');
// Returns: Array of position objects
/*
[
  {
    position: 0,
    name: 'Past',
    meaning: 'Foundations, lessons, and influences that brought you here'
  },
  {
    position: 1,
    name: 'Present',
    meaning: 'Current energy, situation, and what demands your attention now'
  },
  {
    position: 2,
    name: 'Future',
    meaning: 'Potential outcome and the path unfolding before you'
  }
]
*/
```

#### `getReadingContext(spreadType, birthDate, currentDate)`
```javascript
var context = getReadingContext('daily', new Date(1990, 2, 15), new Date());
// Returns: {
//   spreadType: 'daily',
//   birthCardNumber: 10,
//   dailyCardNumber: 15,
//   calculationNote: '...' (if card not implemented)
// }
```

#### `formatBirthDate(date)`
```javascript
var formatted = formatBirthDate(new Date(1990, 2, 15));
// Returns: "March 15, 1990"
```

### Spread Types

**daily** - Single card for today's guidance
```javascript
[
  {
    position: 0,
    name: "Today's Guidance",
    meaning: "The energy and guidance illuminating your path forward today"
  }
]
```

**threeCard** - Past, Present, Future
```javascript
[
  { position: 0, name: 'Past', meaning: '...' },
  { position: 1, name: 'Present', meaning: '...' },
  { position: 2, name: 'Future', meaning: '...' }
]
```

**birthCard** - Single birth card reading
```javascript
[
  {
    position: 0,
    name: 'Your Birth Card',
    meaning: 'The archetypal energy that shapes your life journey and core essence'
  }
]
```

---

## 📖 Reading Service (`services/readingService.js`)

Generates generic readings before avatar personalization.

### Core Function: `generateGenericReading()`

```javascript
/**
 * Generate generic reading before avatar personalization
 * @param {Array} cardIds - Array of card IDs
 * @param {string} spreadType - daily, threeCard, or birthCard
 * @param {string} userQuestion - Optional user question
 * @returns {Object} Reading object
 */
function generateGenericReading(cardIds, spreadType, userQuestion) {
    // Returns reading object or null if error
}
```

#### Usage Example

```javascript
// Get random cards
var cards = getRandomCards(3);
var cardIds = cards.map(function(c) { return c.id; });

// Generate reading
var reading = generateGenericReading(
    cardIds,
    'threeCard',
    'What should I focus on in my career?'
);

// Reading object structure:
{
    spreadType: 'threeCard',
    cards: [
        {
            cardId: 'fool',
            cardName: 'The Fool',
            position: { position: 0, name: 'Past', meaning: '...' },
            genericMeaning: '...',
            keywords: ['new beginnings', '...']
        },
        // ... more cards
    ],
    overallTheme: '...',
    userQuestion: '...'
}
```

### Helper Functions

#### `formatGenericReading(reading)`
```javascript
var reading = generateGenericReading(...);
var formatted = formatGenericReading(reading);
console.log(formatted);
// Outputs formatted text reading
```

#### `prepareForPersonalization(reading)`
```javascript
var reading = generateGenericReading(...);
var prepared = prepareForPersonalization(reading);
// Returns: Structured data ready for avatar API
// Use this to send to Claude API for avatar personalization
```

#### `getReadingSummary(reading)`
```javascript
var summary = getReadingSummary(reading);
// Returns: {
//   spreadType: 'threeCard',
//   cardCount: 3,
//   cardNames: ['The Fool', 'Ace of Cups', 'Seven of Wands'],
//   mainKeywords: ['new beginnings', 'love', 'challenge'],
//   hasQuestion: true
// }
```

---

## 🧪 Testing the Utilities

### Live Demo Page

**URL:** `/pages/system-utilities-demo.html`

This interactive demo lets you test all utility functions:

1. **Card Data Utilities**
   - Show all cards in deck
   - Draw random cards
   - Filter by suit/element

2. **Birth Card Calculator**
   - Enter any birth date
   - See numerology calculation
   - View birth card details

3. **Daily Card Calculator**
   - Calculate daily card for any date
   - See how it cycles through Major Arcana

4. **Generic Reading Generator**
   - Generate daily, three-card, or birth card readings
   - Optional user question
   - See formatted output

5. **Avatar Theme System**
   - View complete theme data for each avatar
   - Colors, personality, voice markers

### Manual Testing

```javascript
// Load utilities in browser console
// (or include in HTML via script tags)

// Test card data
var card = getCardById('fool');
console.log(card.name, card.keywords);

var randomCards = getRandomCards(3);
console.log(randomCards.map(c => c.name));

// Test birth card
var birthDate = new Date(1990, 2, 15);
var birthCardNum = calculateBirthCard(birthDate);
console.log('Birth Card #' + birthCardNum);

// Test daily card
var dailyNum = calculateDailyCard(birthCardNum, new Date());
console.log('Daily Card #' + dailyNum);

// Test reading generation
var cardIds = ['fool', 'ace-of-cups', 'seven-of-wands'];
var reading = generateGenericReading(cardIds, 'threeCard', 'Career guidance?');
console.log(formatGenericReading(reading));
```

---

## 🔗 Integration with Existing System

### Loading Order

```html
<!-- 1. Core Utilities (must load first) -->
<script src="../assets/js/utilities/cardData.js"></script>
<script src="../assets/js/utilities/spreadCalculations.js"></script>

<!-- 2. Services (depends on utilities) -->
<script src="../assets/js/services/readingService.js"></script>

<!-- 3. Config (avatar themes) -->
<script src="../assets/js/config.js"></script>

<!-- 4. State Management -->
<script src="../assets/js/state.js"></script>

<!-- 5. UI Components -->
<script src="../assets/js/components.js"></script>

<!-- 6. API Layer -->
<script src="../assets/js/api.js"></script>

<!-- 7. Page-specific logic -->
<script>
    // Your page code here
</script>
```

### Example: Birth Card Reading Flow

```javascript
// 1. Get user birth date
var birthDate = new Date(userInput);

// 2. Calculate birth card
var birthCardNumber = calculateBirthCard(birthDate);
var birthCardId = getBirthCardId(birthDate);

// 3. Check if card exists
if (!birthCardId) {
    console.log('Birth card #' + birthCardNumber + ' not yet implemented');
    // Use fallback card or show message
    return;
}

// 4. Get card data
var card = getCardById(birthCardId);

// 5. Generate generic reading
var reading = generateGenericReading([birthCardId], 'birthCard');

// 6. Prepare for avatar personalization
var prepared = prepareForPersonalization(reading);

// 7. Send to avatar API
var avatarReading = getAvatarReading('birthCard', 'olivia', prepared);

// 8. Display to user
displayReading(avatarReading);
```

---

## 📊 File Size Analysis

```
New Utilities:
├── cardData.js          6KB   (5 cards + helper functions)
├── spreadCalculations.js 5KB   (numerology calculations)
└── readingService.js     3KB   (reading generation)
                        ─────
                        14KB   (new utilities)

Total JavaScript:
├── Existing            50KB
├── New Utilities       14KB
                        ─────
                        64KB   (all JavaScript)
```

---

## 🎯 Extending the System

### Adding New Cards

Edit `utilities/cardData.js`:

```javascript
var TAROT_CARDS = {
    // ... existing cards ...
    
    'magician': {
        id: 'magician',
        name: 'The Magician',
        number: 1,
        suit: 'major',
        element: 'spirit',
        keywords: ['manifestation', 'power', 'skill'],
        uprightMeaning: '...',
        reversedMeaning: '...',
        emoji: '🎩'
    }
};

// Update Major Arcana mapping
var MAJOR_ARCANA_IDS = ['fool', 'magician']; // Add new card
```

Then update `spreadCalculations.js`:

```javascript
function getMajorArcanaCardId(cardNumber) {
    var majorArcanaMap = {
        0: 'fool',
        1: 'magician',  // Add mapping
        // ... etc
    };
    return majorArcanaMap[cardNumber] || null;
}
```

### Adding New Spread Types

Edit `spreadCalculations.js`:

```javascript
var SPREAD_POSITIONS = {
    // ... existing spreads ...
    
    celticCross: [
        { position: 0, name: 'Present', meaning: '...' },
        { position: 1, name: 'Challenge', meaning: '...' },
        { position: 2, name: 'Past', meaning: '...' },
        { position: 3, name: 'Future', meaning: '...' },
        { position: 4, name: 'Above', meaning: '...' },
        { position: 5, name: 'Below', meaning: '...' },
        { position: 6, name: 'Advice', meaning: '...' },
        { position: 7, name: 'External', meaning: '...' },
        { position: 8, name: 'Hopes', meaning: '...' },
        { position: 9, name: 'Outcome', meaning: '...' }
    ]
};
```

---

## 🐛 Troubleshooting

### Cards Not Found

```javascript
var card = getCardById('magician');
if (!card) {
    console.error('Card not implemented yet');
    // Use fallback or show message
}
```

### Birth Card Not Implemented

```javascript
var birthCardNum = calculateBirthCard(birthDate);
if (!isCardImplemented(birthCardNum)) {
    console.log('Birth card #' + birthCardNum + ' coming soon!');
    // Show calculation was correct but card not available
}
```

### Reading Generation Fails

```javascript
var reading = generateGenericReading(cardIds, 'threeCard');
if (!reading) {
    console.error('Failed to generate reading');
    // Check: cardIds valid? Spread type correct? Cards exist?
}
```

---

## 📝 Next Steps

### Phase 1: Expand Card Deck ✅ In Progress
- Add remaining Major Arcana (22 cards total)
- Add Minor Arcana suits (56 cards)
- **Current:** 5 cards | **Target:** 78 cards

### Phase 2: Advanced Calculations
- Reversed card logic
- Card pair meanings (combinations)
- Jumping card detection
- Shadow card calculations

### Phase 3: Reading Templates
- Pre-built spread templates
- Situational reading types (love, career, spiritual)
- Custom spread builder

---

**The utility system is production-ready and fully tested in the System Utilities Demo page!** 🔥
