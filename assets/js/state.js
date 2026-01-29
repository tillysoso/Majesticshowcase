/* ========================================
   MAJESTIC - STATE MANAGEMENT
   Application state and transitions
   ======================================== */

// Application State
var APP_STATE = {
    currentReading: null,      // 'daily' | 'birth' | 'threeCard' | 'jumping'
    selectedAvatar: null,      // 'olivia' | 'elijah' | 'destiny' | 'casper'
    currentView: 'selection',  // 'selection' | 'animation' | 'base' | 'avatar'
    cardData: null,            // Current card data being displayed
    avatarReading: null        // Current avatar interpretation
};

/**
 * Set current reading type
 * @param {string} readingType - Type of reading
 */
function setReading(readingType) {
    APP_STATE.currentReading = readingType;
    APP_STATE.cardData = CARDS[readingType];
    APP_STATE.currentView = 'animation';
}

/**
 * Set selected avatar
 * @param {string} avatar - Avatar key
 */
function setAvatar(avatar) {
    APP_STATE.selectedAvatar = avatar;
    APP_STATE.currentView = 'avatar';
}

/**
 * Reset to initial selection view
 */
function resetToSelection() {
    APP_STATE.currentReading = null;
    APP_STATE.selectedAvatar = null;
    APP_STATE.currentView = 'selection';
    APP_STATE.cardData = null;
    APP_STATE.avatarReading = null;
}

/**
 * Transition to base reading view
 */
function transitionToBase() {
    APP_STATE.currentView = 'base';
}

/**
 * Get current state
 * @returns {Object} Current application state
 */
function getState() {
    return APP_STATE;
}
