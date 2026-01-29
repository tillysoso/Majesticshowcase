/* ========================================
   MAJESTIC - READING SERVICE
   Generic reading generation before avatar personalization
   ======================================== */

/**
 * Generate generic reading before avatar personalization
 * This provides the base interpretation that avatars will personalize
 * 
 * @param {Array} cardIds - Array of card IDs
 * @param {string} spreadType - Type of spread (daily, threeCard, birthCard)
 * @param {string} userQuestion - Optional user question
 * @returns {Object|null} Generic reading object
 */
function generateGenericReading(cardIds, spreadType, userQuestion) {
    var positions = getSpreadPositions(spreadType);
    
    // Validation
    if (cardIds.length !== positions.length && spreadType !== 'birthCard') {
        console.error('Card count mismatch: expected ' + positions.length + ', got ' + cardIds.length);
        return null;
    }
    
    var cardInterpretations = [];
    
    // Generate generic interpretation for each card
    for (var i = 0; i < cardIds.length; i++) {
        var card = getCardById(cardIds[i]);
        if (!card) {
            console.error('Card not found: ' + cardIds[i]);
            continue;
        }
        
        var position = positions[i];
        
        cardInterpretations.push({
            cardId: card.id,
            cardName: card.name,
            position: position,
            genericMeaning: card.uprightMeaning,
            keywords: card.keywords
        });
    }
    
    // Generate overall theme
    var overallTheme = generateOverallTheme(cardInterpretations, spreadType, userQuestion);
    
    return {
        spreadType: spreadType,
        cards: cardInterpretations,
        overallTheme: overallTheme,
        userQuestion: userQuestion
    };
}

/**
 * Generate overall theme for the reading
 * @param {Array} cards - Card interpretations
 * @param {string} spreadType - Type of spread
 * @param {string} userQuestion - Optional user question
 * @returns {string} Overall theme text
 */
function generateOverallTheme(cards, spreadType, userQuestion) {
    if (spreadType === 'daily') {
        return "Today's energy centers around " + cards[0].keywords.slice(0, 2).join(' and ') + 
               ". " + cards[0].genericMeaning;
    }
    
    if (spreadType === 'birthCard') {
        return "Your birth card reveals the core archetypal energy of " + 
               cards[0].keywords.slice(0, 3).join(', ') + " that shapes your life journey.";
    }
    
    // Three-card spread
    var pastKeywords = cards[0].keywords[0];
    var presentKeywords = cards[1].keywords[0];
    var futureKeywords = cards[2].keywords[0];
    
    return "This reading shows a journey from " + pastKeywords + " through " + 
           presentKeywords + " toward " + futureKeywords + 
           ". The cards suggest a natural progression and evolution in your situation.";
}

/**
 * Format generic reading for display
 * @param {Object} reading - Reading object
 * @returns {string} Formatted reading text
 */
function formatGenericReading(reading) {
    var output = '=== ' + reading.spreadType.toUpperCase() + ' READING ===\n\n';
    
    if (reading.userQuestion) {
        output += 'Question: ' + reading.userQuestion + '\n\n';
    }
    
    reading.cards.forEach(function(card) {
        output += card.position.name + ':\n';
        output += 'Card: ' + card.cardName + '\n';
        output += 'Keywords: ' + card.keywords.join(', ') + '\n';
        output += 'Meaning: ' + card.genericMeaning + '\n\n';
    });
    
    output += 'Overall Theme:\n' + reading.overallTheme + '\n';
    
    return output;
}

/**
 * Prepare reading for avatar personalization
 * Returns structured data for API/LLM service
 * 
 * @param {Object} reading - Generic reading object
 * @returns {Object} Structured reading for personalization
 */
function prepareForPersonalization(reading) {
    return {
        spreadType: reading.spreadType,
        cards: reading.cards.map(function(card) {
            return {
                name: card.cardName,
                position: card.position.name,
                positionMeaning: card.position.meaning,
                genericMeaning: card.genericMeaning,
                keywords: card.keywords
            };
        }),
        userQuestion: reading.userQuestion,
        overallTheme: reading.overallTheme
    };
}

/**
 * Generate reading summary for display
 * @param {Object} reading - Reading object
 * @returns {Object} Summary with key info
 */
function getReadingSummary(reading) {
    return {
        spreadType: reading.spreadType,
        cardCount: reading.cards.length,
        cardNames: reading.cards.map(function(c) { return c.cardName; }),
        mainKeywords: reading.cards.map(function(c) { return c.keywords[0]; }),
        hasQuestion: !!reading.userQuestion
    };
}
