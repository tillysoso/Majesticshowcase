// test/demonstrationTest.ts
// Test file to demonstrate all helper functions and card calculations

import { getAvatarTheme, getAvatarPersonality, getAvatarData } from '../shared/avatarData';
import { getCardById, getRandomCard, getRandomCards } from '../shared/cardData';
import { 
  calculateBirthCard, 
  calculateDailyCard, 
  getBirthCardId,
  getDailyCardId,
  getSpreadPositions,
  getReadingContext,
  isCardImplemented
} from '../shared/spreadCalculations';
import { generateGenericReading, formatGenericReading } from '../backend/readingService';

console.log('=== MAJESTIC TAROT SYSTEM DEMONSTRATION ===\n');

// ============================================
// 1. AVATAR THEME HELPERS
// ============================================
console.log('1. AVATAR THEME DATA:');
console.log('-------------------');

const destinyTheme = getAvatarTheme('destiny');
console.log('Destiny Theme Colors:', destinyTheme?.colors);
console.log('Destiny Backgrounds:', destinyTheme?.backgrounds);

const oliviaPersonality = getAvatarPersonality('olivia');
console.log('\nOlivia Personality:');
console.log('- Tagline:', oliviaPersonality?.tagline);
console.log('- Archetype:', oliviaPersonality?.archetype);
console.log('- Theme Song:', oliviaPersonality?.themeSong);

const casperData = getAvatarData('casper');
console.log('\nCasper Complete Data:');
console.log('- Element:', casperData?.element);
console.log('- Primary Color:', casperData?.theme.colors.primary);
console.log('- Backstory:', casperData?.personality.backstory);

// ============================================
// 2. CARD DATA HELPERS
// ============================================
console.log('\n\n2. CARD DATA:');
console.log('-------------');

const foolCard = getCardById('fool');
console.log('The Fool Card:');
console.log('- Name:', foolCard?.name);
console.log('- Element:', foolCard?.element);
console.log('- Keywords:', foolCard?.keywords.join(', '));

const randomCard = getRandomCard();
console.log('\nRandom Card Draw:', randomCard.name);

const threeCards = getRandomCards(3);
console.log('\nThree Random Cards:');
threeCards.forEach((card, i) => console.log(`  ${i + 1}. ${card.name}`));

// ============================================
// 3. BIRTH CARD CALCULATIONS
// ============================================
console.log('\n\n3. BIRTH CARD CALCULATIONS:');
console.log('---------------------------');

// Test birth date: March 15, 1990
const testBirthDate = new Date(1990, 2, 15);
console.log('Birth Date:', testBirthDate.toDateString());

const birthCardNumber = calculateBirthCard(testBirthDate);
console.log('Birth Card Number:', birthCardNumber);

const birthCardId = getBirthCardId(testBirthDate);
console.log('Birth Card ID:', birthCardId || 'NOT IMPLEMENTED');

const birthCardImplemented = isCardImplemented(birthCardNumber);
console.log('Birth Card Available:', birthCardImplemented ? 'Yes' : 'No (calculation works, card not in deck yet)');

// ============================================
// 4. DAILY CARD CALCULATIONS
// ============================================
console.log('\n\n4. DAILY CARD CALCULATIONS:');
console.log('---------------------------');

const today = new Date();
console.log('Today:', today.toDateString());

const dailyCardNumber = calculateDailyCard(birthCardNumber, today);
console.log('Daily Card Number:', dailyCardNumber);

const dailyCardId = getDailyCardId(testBirthDate, today);
console.log('Daily Card ID:', dailyCardId || 'NOT IMPLEMENTED');

const dailyCardImplemented = isCardImplemented(dailyCardNumber);
console.log('Daily Card Available:', dailyCardImplemented ? 'Yes' : 'No (calculation works, card not in deck yet)');

// ============================================
// 5. SPREAD POSITIONS
// ============================================
console.log('\n\n5. SPREAD POSITIONS:');
console.log('-------------------');

const dailyPositions = getSpreadPositions('daily');
console.log('Daily Draw Positions:');
dailyPositions.forEach(pos => {
  console.log(`  - ${pos.name}: ${pos.meaning}`);
});

const threeSpreadPositions = getSpreadPositions('threespread');
console.log('\nThree-Card Spread Positions:');
threeSpreadPositions.forEach(pos => {
  console.log(`  - ${pos.name}: ${pos.meaning}`);
});

// ============================================
// 6. READING CONTEXT
// ============================================
console.log('\n\n6. READING CONTEXT:');
console.log('------------------');

const dailyContext = getReadingContext('daily', testBirthDate, today);
console.log('Daily Reading Context:');
console.log('  Birth Card #:', dailyContext.birthCardNumber);
console.log('  Daily Card #:', dailyContext.dailyCardNumber);
if (dailyContext.calculationNote) {
  console.log('  Note:', dailyContext.calculationNote);
}

// ============================================
// 7. GENERIC READING GENERATION
// ============================================
console.log('\n\n7. GENERIC READING GENERATION:');
console.log('------------------------------');

// Generate a three-card reading with available cards
const readingCards = getRandomCards(3);
const readingCardIds = readingCards.map(c => c.id);

const genericReading = generateGenericReading(
  readingCardIds,
  'threespread',
  'What should I focus on in my career?'
);

if (genericReading) {
  console.log('\nGeneric Three-Card Reading:');
  console.log(formatGenericReading(genericReading));
} else {
  console.log('Failed to generate reading');
}

// ============================================
// 8. RANDOMIZATION TEST
// ============================================
console.log('\n\n8. RANDOMIZATION TEST:');
console.log('---------------------');
console.log('Drawing 5 random cards to test distribution:\n');

for (let i = 0; i < 5; i++) {
  const card = getRandomCard();
  console.log(`Draw ${i + 1}: ${card.name} (${card.suit})`);
}

console.log('\n=== END DEMONSTRATION ===');

// Export for use in actual tests
export {
  getAvatarTheme,
  getCardById,
  calculateBirthCard,
  generateGenericReading
};
