/* ========================================
   MAJESTIC - SPREAD CALCULATIONS
   Birth card and daily card numerology
   ======================================== */

// Spread position definitions
var SPREAD_POSITIONS = {
    daily: [
        {
            position: 0,
            name: "Today's Guidance",
            meaning: "The energy and guidance illuminating your path forward today"
        }
    ],
    
    threeCard: [
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
    ],
    
    birthCard: [
        {
            position: 0,
            name: 'Your Birth Card',
            meaning: 'The archetypal energy that shapes your life journey and core essence'
        }
    ]
};

/**
 * Get spread positions by type
 * @param {string} spreadType - Type of spread (daily, threeCard, birthCard)
 * @returns {Array} Array of position objects
 */
function getSpreadPositions(spreadType) {
    return SPREAD_POSITIONS[spreadType] || [];
}

/**
 * Sum all digits in a number
 * @param {number} num - Number to sum digits
 * @returns {number} Sum of digits
 */
function sumDigits(num) {
    return num.toString().split('').reduce(function(sum, digit) {
        return sum + parseInt(digit);
    }, 0);
}

/**
 * Calculate birth card using Tarot numerology
 * Adds all digits of birth date and reduces to 1-22 for Major Arcana
 * 
 * Examples:
 * - 1990-03-15 → 1+9+9+0+3+1+5 = 28 → 2+8 = 10 (Wheel of Fortune)
 * - 1985-12-25 → 1+9+8+5+1+2+2+5 = 33 → 3+3 = 6 (The Lovers)
 * 
 * @param {Date} birthDate - User's birth date
 * @returns {number} Birth card number (0-22)
 */
function calculateBirthCard(birthDate) {
    var year = birthDate.getFullYear();
    var month = birthDate.getMonth() + 1; // JS months are 0-indexed
    var day = birthDate.getDate();
    
    var total = sumDigits(year) + sumDigits(month) + sumDigits(day);
    
    // Reduce to single digit or master number (max 22 for Major Arcana)
    while (total > 22) {
        total = sumDigits(total);
    }
    
    // The Fool is 0, but in calculations it can be represented as 22
    return total === 22 ? 0 : total;
}

/**
 * Calculate daily card based on birth card and current date
 * Uses personal year + day of year cycle through Major Arcana
 * 
 * Formula: (birthCardNumber + dayOfYear) % 22
 * 
 * @param {number} birthCardNumber - Birth card number
 * @param {Date} date - Date for daily card (defaults to today)
 * @returns {number} Daily card number (0-21)
 */
function calculateDailyCard(birthCardNumber, date) {
    if (!date) date = new Date();
    
    // Get day of year (1-365/366)
    var startOfYear = new Date(date.getFullYear(), 0, 1);
    var dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Cycle through Major Arcana based on birth card + day
    var dailyCardNumber = (birthCardNumber + dayOfYear) % 22;
    
    return dailyCardNumber;
}

/**
 * Get Major Arcana card ID by number
 * Note: Expand this mapping as you add more cards
 * 
 * @param {number} cardNumber - Card number (0-21)
 * @returns {string|null} Card ID or null if not implemented
 */
function getMajorArcanaCardId(cardNumber) {
    var majorArcanaMap = {
        0: 'fool'
        // Add more as cards are implemented:
        // 1: 'magician',
        // 2: 'high-priestess',
        // etc.
    };
    
    return majorArcanaMap[cardNumber] || null;
}

/**
 * Calculate birth card and return card ID
 * @param {Date} birthDate - User's birth date
 * @returns {string|null} Card ID or null
 */
function getBirthCardId(birthDate) {
    var birthCardNumber = calculateBirthCard(birthDate);
    return getMajorArcanaCardId(birthCardNumber);
}

/**
 * Calculate daily card and return card ID
 * @param {Date} birthDate - User's birth date
 * @param {Date} date - Date for daily card (defaults to today)
 * @returns {string|null} Card ID or null
 */
function getDailyCardId(birthDate, date) {
    if (!date) date = new Date();
    var birthCardNumber = calculateBirthCard(birthDate);
    var dailyCardNumber = calculateDailyCard(birthCardNumber, date);
    return getMajorArcanaCardId(dailyCardNumber);
}

/**
 * Check if a card number is implemented in the deck
 * @param {number} cardNumber - Card number to check
 * @returns {boolean} True if card exists
 */
function isCardImplemented(cardNumber) {
    return getMajorArcanaCardId(cardNumber) !== null;
}

/**
 * Get reading context with calculation details
 * @param {string} spreadType - Type of spread
 * @param {Date} birthDate - User's birth date (optional)
 * @param {Date} currentDate - Current date (optional)
 * @returns {Object} Reading context object
 */
function getReadingContext(spreadType, birthDate, currentDate) {
    var context = { spreadType: spreadType };
    
    if (birthDate) {
        context.birthCardNumber = calculateBirthCard(birthDate);
        
        if (spreadType === 'daily' && currentDate) {
            context.dailyCardNumber = calculateDailyCard(context.birthCardNumber, currentDate);
            
            // Check if calculated card is implemented
            if (!isCardImplemented(context.dailyCardNumber)) {
                context.calculationNote = 'Your daily card is Major Arcana #' + context.dailyCardNumber + 
                    ', but this card is not yet available. The calculation logic is working correctly!';
            }
        }
        
        if (spreadType === 'birthCard' && !isCardImplemented(context.birthCardNumber)) {
            context.calculationNote = 'Your birth card is Major Arcana #' + context.birthCardNumber + 
                ', but this card is not yet available. The calculation logic is working correctly!';
        }
    }
    
    return context;
}

/**
 * Format birth date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatBirthDate(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}
