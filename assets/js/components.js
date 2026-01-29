/* ========================================
   MAJESTIC - UI COMPONENTS
   Reusable rendering functions
   ======================================== */

/**
 * Renders tarot card display
 * @param {string} emoji - Card emoji/icon
 * @param {string} name - Card name
 * @param {string} position - Optional position label (Past/Present/Future)
 * @returns {string} HTML string
 */
function renderCard(emoji, name, position) {
    var html = '<div class="card-position">';
    html += '<div class="tarot-card">' + emoji + '</div>';
    html += '<div class="position-label">';
    if (position) html += position + '<br>';
    html += name + '</div></div>';
    return html;
}

/**
 * Renders interpretation section with title, text, and bullet points
 * @param {string} title - Section title
 * @param {string} text - Main interpretation text
 * @param {Array<string>} points - Array of reflection points
 * @returns {string} HTML string
 */
function renderInterpretation(title, text, points) {
    var html = '<div class="interpretation-section">';
    html += '<h2 class="interpretation-title">' + title + '</h2>';
    html += '<p class="interpretation-text">' + text + '</p>';
    html += '<ul class="reflection-points">';
    for (var i = 0; i < points.length; i++) {
        html += '<li>' + points[i] + '</li>';
    }
    html += '</ul></div>';
    return html;
}

/**
 * Renders avatar reading header
 * @param {Object} avatar - Avatar config object
 * @returns {string} HTML string
 */
function renderAvatarHeader(avatar) {
    var html = '<div class="avatar-header">';
    html += '<div class="avatar-reading-icon">' + avatar.icon + '</div>';
    html += '<h1 class="avatar-reading-name">' + avatar.name + '</h1>';
    html += '<p class="avatar-tagline">' + avatar.tagline + '</p>';
    html += '</div>';
    return html;
}

/**
 * Renders music recommendation section
 * @param {string} musicRec - Music recommendation text
 * @returns {string} HTML string
 */
function renderMusicNote(musicRec) {
    return '<div class="music-note">' +
        '<div class="music-note-title">🎵 Soundtrack for this reading</div>' +
        '<div class="music-note-content">' + musicRec + '</div>' +
        '</div>';
}

/**
 * Renders avatar card for grid
 * @param {string} key - Avatar key (olivia, elijah, etc)
 * @param {Object} avatar - Avatar config object
 * @param {boolean} disabled - Whether card is disabled
 * @returns {string} HTML string
 */
function renderAvatarCard(key, avatar, disabled) {
    var html = '<div class="avatar-card' + (disabled ? ' disabled' : '') + '" ';
    html += 'onclick="handleAvatarClick(\'' + key + '\')">';
    html += '<div class="avatar-icon">' + avatar.icon + '</div>';
    html += '<div class="avatar-name">' + avatar.name + '</div>';
    html += '<div class="avatar-element">' + avatar.element + '</div>';
    html += '</div>';
    return html;
}

/**
 * Renders reading type card
 * @param {Object} type - Reading type config
 * @returns {string} HTML string
 */
function renderReadingTypeCard(type) {
    var html = '<div class="reading-type-card" onclick="selectReading(\'' + type.key + '\')">';
    html += '<span class="reading-type-icon">' + type.icon + '</span>';
    html += '<div class="reading-type-title">' + type.title + '</div>';
    html += '<div class="reading-type-subtitle">' + type.subtitle + '</div>';
    html += '</div>';
    return html;
}

/**
 * Renders loading state
 * @param {string} text - Loading message
 * @returns {string} HTML string
 */
function renderLoading(text) {
    return '<div class="loading">' +
        '<div class="loading-spinner">🔮</div>' +
        '<div class="loading-text">' + (text || 'Loading...') + '</div>' +
        '</div>';
}

/**
 * Renders jumping card container
 * @param {Object} jumpingCard - Jumping card data
 * @param {string} guidance - Jumping guidance text
 * @param {Array<string>} points - Jumping card points
 * @returns {string} HTML string
 */
function renderJumpingCardContainer(jumpingCard, guidance, points) {
    var html = '<div class="jumping-card-container">';
    html += '<h3 class="jumping-card-label">⚡ Your Jumping Card ⚡</h3>';
    html += '<div class="card-position">';
    html += '<div class="tarot-card jumping">' + jumpingCard.emoji + '</div>';
    html += '<div class="position-label">' + jumpingCard.name + '</div>';
    html += '</div>';
    html += renderInterpretation('Jumping Card Guidance', guidance, points);
    html += '</div>';
    return html;
}
