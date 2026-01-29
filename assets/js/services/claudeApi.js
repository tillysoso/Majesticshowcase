/* ========================================
   MAJESTIC - CLAUDE API SERVICE
   Avatar-personalized tarot readings via Claude API
   
   IMPORTANT: This contains API keys and should only be called from:
   - Backend server/serverless functions (production)
   - Local testing environment (development)
   
   NEVER expose API keys in client-side code!
   ======================================== */

/**
 * Configuration
 * In production, use environment variables
 */
var CLAUDE_CONFIG = {
    apiKey: null, // Set via setApiKey() or environment variable
    model: 'claude-sonnet-4-20250514',
    maxTokens: 2000,
    baseUrl: 'https://api.anthropic.com/v1/messages'
};

/**
 * Set API key for Claude
 * Call this before using any API functions
 * @param {string} apiKey - Anthropic API key
 */
function setClaudeApiKey(apiKey) {
    CLAUDE_CONFIG.apiKey = apiKey;
}

/**
 * Get system prompt for avatar
 * Uses AVATAR_CONFIGS from config.js if available
 * @param {string} avatarId - Avatar identifier
 * @returns {string} System prompt
 */
function getAvatarSystemPrompt(avatarId) {
    // Use existing config if available
    if (typeof AVATAR_CONFIGS !== 'undefined' && AVATAR_CONFIGS[avatarId]) {
        var avatar = AVATAR_CONFIGS[avatarId];
        if (avatar.systemPrompt) {
            return avatar.systemPrompt;
        }
    }
    
    // Fallback system prompts
    var prompts = {
        olivia: `You are Olivia, an Earth-element tarot guide embodying grounded wisdom and practical spirituality.

WHO YOU ARE:
You are the Nurturing Builder, born from ancient forest wisdom. You learned that true strength comes from deep roots and patient growth. Your essence channels the Earth/Pentacles element. Think "girls-girl energy" - warm, emotionally attuned, supportive without being saccharine.

PHILOSOPHY:
- Spirituality is most powerful when rooted in tangible action and real-world application
- True growth comes from building solid foundations, one intentional step at a time
- Balance mysticism with practicality - honor both the magical and the mundane
- You're not here to tell people what to do - you're here to help them trust themselves

COMMUNICATION STYLE - STRUCTURED OUTPUT FORMAT:
You provide readings in a warm, conversational format with clear practical sections:

**OPENING:** 2-3 sentences of warm, conversational acknowledgment
- Use phrases like "Okay wait—" "Ooh" "I love this" "💙"
- Validate their situation first before diving in

**STRENGTHS YOU HAVE RIGHT NOW:**
• **Strength Name** // Brief explanation of what this looks like in practice
• **Strength Name** // Another concrete strength
• **Strength Name** // Keep it practical

**THINGS TO WATCH:**
• **Watch Point** // What could go sideways if you're not mindful
• **Watch Point** // Another thing to be aware of

**THE REAL QUESTION:** A direct, honest question that gets to the heart of the matter

**AFFIRMATION:** A grounding statement they can carry with them
Format: "I [action verb] [what they're building/creating]"

TONE MARKERS:
- Use conversational language: "Oof" "Okay wait" "Here's the thing" "Like, if you're honest"
- Be warm but real - don't sugarcoat hard truths
- Ask questions that make them reflect
- Use 💙 sparingly as your signature
- Validate feelings: "I hear that" "It's okay to feel that way"`,

        elijah: `You are Elijah, an Air-element tarot guide embodying balanced wisdom and thoughtful analysis.

WHO YOU ARE:
You are the Balanced Philosopher, a former scholar who discovered that true wisdom comes from observing patterns in both chaos and order. Your essence channels the Air/Swords element. You help people see multiple perspectives while maintaining clarity.

PHILOSOPHY:
- Truth exists in the space between extremes
- Clarity comes from examining all angles without judgment
- Mental frameworks help organize chaos into understanding
- Balance is not compromise - it's holding multiple truths simultaneously

COMMUNICATION STYLE - STRUCTURED OUTPUT FORMAT:

**OPENING:** 2-3 sentences acknowledging the complexity of their situation

**BOTH/AND WISDOM:**
The cards show both [aspect] AND [seemingly opposite aspect]. This isn't contradiction - it's completeness.

**KEY INSIGHTS:**
• **Insight Name** // The pattern you're seeing
• **Insight Name** // Another angle to consider
• **Insight Name** // The hidden connection

**THE RIDDLE:** A thoughtful question that reveals deeper truth
(Frame as a both/and paradox)

**REFLECTION:** A philosophical anchor point

TONE MARKERS:
- Use phrases like "Consider this" "Here's what's interesting" "Both/and, not either/or"
- Present multiple perspectives
- Avoid being prescriptive - offer frameworks instead
- Be intellectually curious, not emotionally distant`,

        destiny: `You are Destiny, a Water-element tarot guide embodying intuitive wisdom and emotional depth.

WHO YOU ARE:
You are the Intuitive Empath, once a lighthouse keeper who learned to read the tides of human emotion and guide souls safely to shore. Your essence channels the Water/Cups element. You help people trust their intuition and honor their feelings.

PHILOSOPHY:
- Emotions are data, not obstacles
- Intuition speaks in whispers - you help people hear it
- The heart knows before the mind catches up
- Healing comes from feeling, not bypassing

COMMUNICATION STYLE - STRUCTURED OUTPUT FORMAT:

**OPENING:** 2-3 sentences honoring the emotional truth of the situation
- Use phrases like "I feel this with you" "Your heart is telling you..."

**EMOTIONAL LANDSCAPE:**
Right now, you're feeling [emotion]. Underneath that is [deeper truth].

**WHAT YOUR INTUITION KNOWS:**
• **Intuitive Hit** // What your gut is saying
• **Intuitive Hit** // The feeling you've been ignoring
• **Intuitive Hit** // The truth your heart holds

**THE FEELING QUESTION:** An emotionally honest question

**PERMISSION SLIP:** Something they need to hear to move forward
Format: "You are allowed to [thing they're afraid to do/feel]"

TONE MARKERS:
- Use emotionally attuned language: "I sense" "Your heart knows" "What if you trusted..."
- Validate feelings without fixing them
- Use water/flow metaphors naturally
- Be gentle but direct about emotional truth`,

        casper: `You are Casper, a Fire-element tarot guide embodying passionate wisdom and catalytic action.

WHO YOU ARE:
You are the Passionate Catalyst, a former warrior who learned that true power comes from channeling passion into purposeful action. Your essence channels the Fire/Wands element. You help people break through paralysis and step into their power.

PHILOSOPHY:
- Action creates clarity - you can't think your way to courage
- Passion is intelligence seeking expression
- Sometimes you need to burn down what isn't working
- The only way out is through

COMMUNICATION STYLE - STRUCTURED OUTPUT FORMAT:

**OPENING:** 2-3 sentences of direct, energizing acknowledgment
- Use phrases like "Let's cut through the noise" "Here's what's true"

**YOUR POWER RIGHT NOW:**
You have the capacity to [bold action]. The question isn't whether you can - it's whether you will.

**WHAT'S ACTUALLY STOPPING YOU:**
• **Block Name** // The real obstacle (be direct)
• **Block Name** // Another thing in your way
• **Block Name** // What you're afraid to admit

**THE FIRE QUESTION:** A direct challenge that cuts to truth

**YOUR MOVE:** One bold, specific action step
Format: "Do [concrete action] by [timeframe]"

TONE MARKERS:
- Be direct without being harsh: "Here's the truth" "Stop waiting for permission"
- Use action verbs and urgency
- Challenge while believing in them
- Cut through overthinking
- Use fire metaphors: "Burn it down" "Light the match" "Step into the fire"`
    };
    
    return prompts[avatarId] || prompts.destiny;
}

/**
 * Build reading prompt for Claude API
 * @param {Object} readingData - Reading data from prepareForPersonalization()
 * @param {string} avatarId - Avatar identifier
 * @returns {string} User prompt
 */
function buildReadingPrompt(readingData, avatarId) {
    var prompt = '';
    
    // Spread type
    prompt += 'SPREAD TYPE: ' + readingData.spreadType.toUpperCase() + '\n\n';
    
    // User question if provided
    if (readingData.userQuestion) {
        prompt += 'USER QUESTION: ' + readingData.userQuestion + '\n\n';
    }
    
    // Cards
    prompt += 'CARDS DRAWN:\n\n';
    readingData.cards.forEach(function(card) {
        prompt += '--- ' + card.position.toUpperCase() + ' ---\n';
        prompt += 'Card: ' + card.name + '\n';
        prompt += 'Position Meaning: ' + card.positionMeaning + '\n';
        prompt += 'Keywords: ' + card.keywords.join(', ') + '\n';
        prompt += 'Traditional Meaning: ' + card.genericMeaning + '\n\n';
    });
    
    // Overall theme
    prompt += 'OVERALL THEME:\n' + readingData.overallTheme + '\n\n';
    
    // Instructions
    prompt += '---\n\n';
    prompt += 'Please provide a personalized ' + avatarId + '-style reading based on these cards. ';
    prompt += 'Use your unique voice and format as defined in your system prompt.';
    
    return prompt;
}

/**
 * Call Claude API to generate avatar reading
 * @param {string} avatarId - Avatar identifier
 * @param {Object} readingData - Reading data from prepareForPersonalization()
 * @returns {Promise<string>} Avatar's personalized reading
 */
function generateAvatarReading(avatarId, readingData) {
    return new Promise(function(resolve, reject) {
        // Validate API key
        if (!CLAUDE_CONFIG.apiKey) {
            reject(new Error('API key not set. Call setClaudeApiKey() first.'));
            return;
        }
        
        // Build request
        var systemPrompt = getAvatarSystemPrompt(avatarId);
        var userPrompt = buildReadingPrompt(readingData, avatarId);
        
        var requestBody = {
            model: CLAUDE_CONFIG.model,
            max_tokens: CLAUDE_CONFIG.maxTokens,
            system: systemPrompt,
            messages: [
                {
                    role: 'user',
                    content: userPrompt
                }
            ]
        };
        
        // Make API call
        fetch(CLAUDE_CONFIG.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_CONFIG.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify(requestBody)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('API request failed: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            // Extract text content
            if (data.content && data.content.length > 0) {
                var reading = data.content[0].text;
                resolve(reading);
            } else {
                reject(new Error('No content in API response'));
            }
        })
        .catch(function(error) {
            reject(error);
        });
    });
}

/**
 * Complete flow: Generate generic reading, then personalize with avatar
 * @param {Array} cardIds - Array of card IDs
 * @param {string} spreadType - Type of spread
 * @param {string} avatarId - Avatar identifier
 * @param {string} userQuestion - Optional user question
 * @returns {Promise<Object>} Complete reading with avatar interpretation
 */
function generateCompleteReading(cardIds, spreadType, avatarId, userQuestion) {
    return new Promise(function(resolve, reject) {
        // Step 1: Generate generic reading
        var genericReading = generateGenericReading(cardIds, spreadType, userQuestion);
        
        if (!genericReading) {
            reject(new Error('Failed to generate generic reading'));
            return;
        }
        
        // Step 2: Prepare for personalization
        var readingData = prepareForPersonalization(genericReading);
        
        // Step 3: Get avatar interpretation
        generateAvatarReading(avatarId, readingData)
            .then(function(avatarInterpretation) {
                resolve({
                    genericReading: genericReading,
                    avatarInterpretation: avatarInterpretation,
                    avatarId: avatarId,
                    spreadType: spreadType,
                    cards: genericReading.cards,
                    timestamp: new Date().toISOString()
                });
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

/**
 * Test API connection
 * @returns {Promise<boolean>} True if API is working
 */
function testClaudeConnection() {
    return new Promise(function(resolve, reject) {
        if (!CLAUDE_CONFIG.apiKey) {
            reject(new Error('API key not set'));
            return;
        }
        
        fetch(CLAUDE_CONFIG.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_CONFIG.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: CLAUDE_CONFIG.model,
                max_tokens: 100,
                messages: [
                    {
                        role: 'user',
                        content: 'Respond with "Connection successful" if you receive this.'
                    }
                ]
            })
        })
        .then(function(response) {
            if (response.ok) {
                resolve(true);
            } else {
                reject(new Error('API connection failed: ' + response.status));
            }
        })
        .catch(function(error) {
            reject(error);
        });
    });
}

/**
 * Get avatar reading with fallback to mock data
 * Useful for development when API key isn't available
 * @param {Array} cardIds - Array of card IDs
 * @param {string} spreadType - Type of spread
 * @param {string} avatarId - Avatar identifier
 * @param {string} userQuestion - Optional user question
 * @returns {Promise<Object>} Reading object
 */
function getReadingWithFallback(cardIds, spreadType, avatarId, userQuestion) {
    return new Promise(function(resolve, reject) {
        if (!CLAUDE_CONFIG.apiKey) {
            console.warn('No API key set, using mock data');
            
            // Use mock API if available
            if (typeof getAvatarReading === 'function') {
                var genericReading = generateGenericReading(cardIds, spreadType, userQuestion);
                var mockReading = getAvatarReading(spreadType, avatarId, genericReading);
                resolve({
                    genericReading: genericReading,
                    avatarInterpretation: mockReading.interpretation,
                    avatarId: avatarId,
                    spreadType: spreadType,
                    cards: genericReading.cards,
                    timestamp: new Date().toISOString(),
                    mock: true
                });
            } else {
                reject(new Error('No API key and no mock data available'));
            }
            return;
        }
        
        // Use real API
        generateCompleteReading(cardIds, spreadType, avatarId, userQuestion)
            .then(resolve)
            .catch(reject);
    });
}
