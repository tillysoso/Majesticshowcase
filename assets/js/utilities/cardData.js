/* ========================================
   MAJESTIC - CARD DATA
   Tarot card definitions and utilities
   ======================================== */

// Tarot Card Data Structure
var TAROT_CARDS = {
    'fool': {
        id: 'fool',
        name: 'The Fool',
        number: 0,
        suit: 'major',
        element: 'spirit',
        keywords: ['new beginnings', 'innocence', 'spontaneity', 'free spirit', 'leap of faith'],
        uprightMeaning: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
        reversedMeaning: 'Reversed, The Fool suggests holding back, recklessness, risk-taking, and behaving like a fool.',
        emoji: '🃏'
    },
    
    'ace-of-cups': {
        id: 'ace-of-cups',
        name: 'Ace of Cups',
        number: 1,
        suit: 'cups',
        element: 'water',
        keywords: ['love', 'new feelings', 'emotional awakening', 'creativity', 'spirituality'],
        uprightMeaning: 'The Ace of Cups represents new feelings, spirituality, intuition, love, and emotional awakening. It signals the beginning of emotional or spiritual journeys.',
        reversedMeaning: 'Reversed, it suggests emotional loss, blocked creativity, emptiness, and emotional instability.',
        emoji: '🍷'
    },
    
    'seven-of-wands': {
        id: 'seven-of-wands',
        name: 'Seven of Wands',
        number: 7,
        suit: 'wands',
        element: 'fire',
        keywords: ['challenge', 'competition', 'perseverance', 'defending position', 'standing your ground'],
        uprightMeaning: 'The Seven of Wands represents challenge, competition, protection, and perseverance. You are defending your position and standing your ground against opposition.',
        reversedMeaning: 'Reversed, it suggests giving up, exhaustion, overwhelmed by challenges, or lack of confidence.',
        emoji: '🔥'
    },
    
    'six-of-pentacles': {
        id: 'six-of-pentacles',
        name: 'Six of Pentacles',
        number: 6,
        suit: 'pentacles',
        element: 'earth',
        keywords: ['generosity', 'charity', 'sharing wealth', 'fairness', 'giving and receiving'],
        uprightMeaning: 'The Six of Pentacles represents gifts, generosity, charity, sharing wealth, and fairness. It\'s about the balance of giving and receiving.',
        reversedMeaning: 'Reversed, it suggests strings attached, stinginess, debt, one-sided charity, or power imbalance.',
        emoji: '🪙'
    },
    
    'ten-of-swords': {
        id: 'ten-of-swords',
        name: 'Ten of Swords',
        number: 10,
        suit: 'swords',
        element: 'air',
        keywords: ['painful ending', 'deep wounds', 'betrayal', 'rock bottom', 'inevitable end'],
        uprightMeaning: 'The Ten of Swords represents painful endings, deep wounds, betrayal, loss, and crisis. It marks rock bottom but also signals that the only way forward is up.',
        reversedMeaning: 'Reversed, it suggests recovery, regeneration, resisting an inevitable end, or fear of ruin.',
        emoji: '⚔️'
    }
};

// Major Arcana IDs (expand as you add more cards)
var MAJOR_ARCANA_IDS = ['fool'];

/**
 * Get card by ID
 * @param {string} cardId - Card identifier
 * @returns {Object|null} Card object or null
 */
function getCardById(cardId) {
    return TAROT_CARDS[cardId] || null;
}

/**
 * Get random card from deck
 * @returns {Object} Random card object
 */
function getRandomCard() {
    var cardIds = Object.keys(TAROT_CARDS);
    var randomId = cardIds[Math.floor(Math.random() * cardIds.length)];
    return TAROT_CARDS[randomId];
}

/**
 * Get multiple random cards (no duplicates)
 * @param {number} count - Number of cards to draw
 * @returns {Array} Array of card objects
 */
function getRandomCards(count) {
    var cardIds = Object.keys(TAROT_CARDS);
    var shuffled = cardIds.slice().sort(function() { return Math.random() - 0.5; });
    var selectedIds = shuffled.slice(0, Math.min(count, cardIds.length));
    
    return selectedIds.map(function(id) { return TAROT_CARDS[id]; });
}

/**
 * Get all card IDs
 * @returns {Array} Array of card IDs
 */
function getAllCardIds() {
    return Object.keys(TAROT_CARDS);
}

/**
 * Get cards by suit
 * @param {string} suit - Card suit (major, cups, wands, pentacles, swords)
 * @returns {Array} Array of cards matching suit
 */
function getCardsBySuit(suit) {
    var cards = [];
    for (var id in TAROT_CARDS) {
        if (TAROT_CARDS[id].suit === suit) {
            cards.push(TAROT_CARDS[id]);
        }
    }
    return cards;
}

/**
 * Get cards by element
 * @param {string} element - Card element (spirit, water, fire, earth, air)
 * @returns {Array} Array of cards matching element
 */
function getCardsByElement(element) {
    var cards = [];
    for (var id in TAROT_CARDS) {
        if (TAROT_CARDS[id].element === element) {
            cards.push(TAROT_CARDS[id]);
        }
    }
    return cards;
}

/**
 * Get total number of cards in deck
 * @returns {number} Card count
 */
function getDeckSize() {
    return Object.keys(TAROT_CARDS).length;
}
