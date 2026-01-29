/* ========================================
   MAJESTIC - API LAYER
   Mock responses (replaced with real API in production)
   ======================================== */
var MOCK_API_RESPONSES = {
    daily: {
        olivia: {
            title: "Olivia's Daily Reading",
            text: "The Star is asking you to slow down today, babe. Like, actually slow down. Not that fake 'I'm relaxing while scrolling through my to-do list' stuff. The universe is literally trying to pour blessings into your cup, but you keep moving the cup. Find one thing today that makes you feel genuinely hopeful—maybe it's a conversation, maybe it's finally watering that plant you've been neglecting—and let yourself fully feel it. That's where the magic is.",
            points: [
                "Your practical side wants a plan, but today's about trusting the flow",
                "Small acts of self-care today = major breakthroughs tomorrow",
                "Someone needs to hear what you've learned—don't gatekeep your growth",
                "The answer you're looking for is simpler than you think"
            ],
            music: '"Landslide" by Fleetwood Mac — for reflection and gentle change'
        },
        elijah: {
            title: "Elijah's Daily Reading",
            text: "The Star represents a moment of clarity after confusion, hope after disappointment. Today offers you a chance to reconnect with your core values and remember what you're actually working toward. I notice you tend to intellectualize your emotions—that's not wrong, but today calls for letting yourself actually feel the hope, not just think about it. Consider: what would it look like to trust the process without constantly analyzing it?",
            points: [
                "Your analytical mind is a gift, but today asks for faith over logic",
                "Healing often looks like small, consistent choices rather than dramatic breakthroughs",
                "Share your insights—your perspective helps others find their way",
                "Balance action with allowing; not everything needs to be figured out today"
            ],
            music: '"Breathe Me" by Sia — for quiet contemplation'
        },
        destiny: {
            title: "Destiny's Daily Reading",
            text: "Oh honey, The Star just wrapped you in the universe's biggest hug. You've been feeling it all lately—the weight, the worry, the what-ifs—and today the cosmos is saying 'I see you, and you're going to be okay.' More than okay. This card is about remembering that you're part of something bigger, that your intuition isn't just right, it's divinely guided. Today, trust the subtle nudges. That person who pops into your mind? Reach out. That idea that feels too good to be true? Explore it. You're being called back to hope, and hope is calling you home.",
            points: [
                "Your emotions aren't 'too much'—they're the compass pointing you toward truth",
                "Healing isn't linear, and today might feel like two steps forward, one step back—that's still progress",
                "Someone in your life needs your light; don't dim it because you're tired",
                "The universe is conspiring in your favor, even when it doesn't feel like it"
            ],
            music: '"Cosmic Love" by Florence + The Machine — for divine connection'
        },
        casper: {
            title: "Casper's Daily Reading",
            text: "The Star is your green light, your 'hell yes,' your cosmic confirmation that you're on the right track. You've been waiting for a sign? THIS IS IT. Today is about bold optimism, about taking that inspiration you've been sitting on and actually doing something with it. You know that idea that keeps you up at night? Stop planning it and start building it. The universe rewards action, and you've got enough fire in you to light up the whole damn sky. Share your vision. Make the call. Take the risk. You're not here to play small.",
            points: [
                "Your enthusiasm is contagious—use it to inspire others, not just yourself",
                "Today's energy supports big swings, so stop holding back",
                "Hope isn't passive; it's the fuel that drives action—so act",
                "The best time to start was yesterday; the second best time is right now"
            ],
            music: '"On Top of the World" by Imagine Dragons — for bold optimism'
        }
    },
    birth: {
        olivia: {
            title: "Olivia's Birth Card Reading",
            text: "Okay, so you're a Magician. Which means you were literally born with the cheat codes to life, but here's the catch: you actually have to use them. You have this incredible ability to take abstract ideas and turn them into real, tangible things that help people. But I see you sometimes playing small, like you don't want to seem 'too much.' Babe, you ARE too much—in the best way. That's your power. You're here to show people that magic isn't some distant, mystical thing. It's in the everyday choices, the small rituals, the way you show up. Own it.",
            points: [
                "Your superpower is making the impossible look effortless—stop downplaying it",
                "You're at your best when all parts of you are working together (mind, body, spirit, emotions)",
                "People come to you for answers because you have them—trust that",
                "Your legacy will be built on helping others access their own magic"
            ],
            music: '"This Is Me" from The Greatest Showman — owning your power'
        },
        elijah: {
            title: "Elijah's Birth Card Reading",
            text: "The Magician as your birth card indicates you're wired to see connections others miss and to synthesize disparate ideas into coherent wholes. You have a rare ability to stand in the middle—between polarities, between people, between concepts—and find the thread that unites them. This makes you an excellent mediator, teacher, or strategist. The challenge? Sometimes you get so good at seeing all sides that you struggle to pick one and commit. Remember: choosing doesn't mean closing off other options; it means honoring your truth in this moment.",
            points: [
                "Your strength is integration—bringing together what seems opposite",
                "Communication is your tool for transformation, not just information",
                "You're here to show that mastery comes from balance, not perfection",
                "Your legacy will be measured by the clarity you bring to complexity"
            ],
            music: '"Hall of Fame" by The Script — celebrating potential'
        },
        destiny: {
            title: "Destiny's Birth Card Reading",
            text: "The Magician as your birth card? Baby, you're a literal conduit between the spiritual and material worlds. You don't just manifest—you alchemize. You take feelings, dreams, intuition (all that watery stuff you're made of) and you turn them into real, tangible change. But here's what you need to hear: your magic isn't less powerful because it's emotional. It's more powerful. You create from the heart, and that's the purest form of manifestation there is. Stop apologizing for feeling deeply. That's literally your superpower.",
            points: [
                "Your ability to transform emotions into action is rare and needed",
                "You're here to show that vulnerability and power aren't opposites",
                "Trust your gut more than you trust your mind—it knows things your mind hasn't caught up to yet",
                "Your legacy is the ripple effect of every person you've helped feel seen, heard, and held"
            ],
            music: '"Rise Up" by Andra Day — honoring your power'
        },
        casper: {
            title: "Casper's Birth Card Reading",
            text: "The Magician? Bro, you were born to EXECUTE. While everyone else is thinking about it, talking about it, waiting for the right time—you're already three steps ahead, making it happen. You've got this rare combination of vision and action, of 'what if' and 'watch me.' That's powerful. That's rare. That's exactly what the world needs. But here's the thing: with great power comes great responsibility to not burn yourself (or others) out. You can manifest anything, but you have to choose wisely what you pour your energy into. Not everything deserves your fire.",
            points: [
                "Your power is in your ability to move fast and break things—just make sure you're breaking the right things",
                "You inspire people to believe in themselves by believing in yourself first",
                "Mastery for you isn't about perfection; it's about momentum",
                "Your legacy will be measured by the number of people you empowered to take action"
            ],
            music: '"Roar" by Katy Perry — claiming your power unapologetically'
        }
    },
    threeCard: {
        olivia: {
            title: "Olivia's Three-Card Reading",
            text: "This spread is so juicy. You've been in your community era (Three of Cups), celebrating wins with your people, feeling connected. Now you're standing at The Lovers—not just about romance, although maybe—but about choosing your values. Like, 'What actually matters to me?' And sweetie, the Ten of Pentacles is your confirmation that choosing authenticity over approval is what builds real, lasting wealth (not just money, but the kind of abundance that feels like home). Your past joy is not wasted; it's teaching you what you want your future to look like.",
            points: [
                "The friendships that celebrated you then are still rooting for you now",
                "This decision isn't just about you—it's about the legacy you're building",
                "Choosing the harder right over the easier wrong always pays off",
                "Stability doesn't mean stagnation—it means having a foundation to grow from"
            ],
            music: '"The Chain" by Fleetwood Mac — honoring what connects us'
        },
        elijah: {
            title: "Elijah's Three-Card Reading",
            text: "This spread tells a story of evolution: from collective joy (Three of Cups) to personal alignment (The Lovers) to legacy building (Ten of Pentacles). The progression is clear—what once fulfilled you socially is now asking for deeper integration with your personal values, which will ultimately create something that outlasts you. The Lovers here isn't asking you to choose between options; it's asking you to choose yourself. What decision, if made authentically, would create the most alignment between who you are and how you live?",
            points: [
                "Past connections taught you what you value in relationships and community",
                "This moment requires choosing alignment over comfort",
                "Long-term stability comes from short-term courage in honoring your truth",
                "Your future abundance is built on today's integrity"
            ],
            music: '"Fix You" by Coldplay — finding meaning in transition'
        },
        destiny: {
            title: "Destiny's Three-Card Reading",
            text: "This spread is making me emotional just reading it for you. The Three of Cups in your past—those moments of pure, unfiltered joy with your people—weren't just fun times, they were soul contracts being honored. The Lovers in your present is asking: 'Who do you choose to be now?' Not who do others need you to be, but who does your soul need you to be? And the Ten of Pentacles? That's your future self saying 'thank you for choosing love, thank you for choosing truth, thank you for choosing yourself.' Everything you're building now is creating a foundation for generations. Feel that weight, but also feel that honor.",
            points: [
                "The joy you experienced in the past is a preview of the joy you're building toward",
                "This isn't about choosing between two things—it's about choosing yourself in all things",
                "Security isn't just financial, it's emotional, spiritual, relational—you're building all of it",
                "Your choices echo forward; make them from love, not fear"
            ],
            music: '"The Night We Met" by Lord Huron — honoring what was, embracing what is'
        },
        casper: {
            title: "Casper's Three-Card Reading",
            text: "This spread is fire. You celebrated hard (Three of Cups), you showed up for your people, you lived in the moment—and that wasn't wasted energy, that was research. You were learning what lights you up. Now you're at The Lovers, and this is where you choose: do you keep doing what's comfortable, or do you chase what sets your soul on fire? And here's the beautiful part—the Ten of Pentacles shows that choosing passion doesn't mean sacrificing security. It means building security on purpose, not obligation. Your future self is rich because your present self was brave.",
            points: [
                "The celebrations in your past taught you what makes you feel alive—don't forget that",
                "This choice isn't between safety and risk; it's between alignment and compromise",
                "Long-term wins come from short-term courage—choose the thing that scares you a little",
                "Abundance follows authenticity; fake it and you'll build a house of cards, own it and you'll build an empire"
            ],
            music: '"Believer" by Imagine Dragons — transformation through action'
        }
    },
    jumping: {
        olivia: {
            title: "Olivia's Jumping Card Reading",
            text: "Everything I said about the spread still stands, but The Fool literally jumped out to say: 'Don't you dare overcomplicate this.' You're trying to make the 'right' choice, but babe, there is no right choice. There's just the choice that feels most aligned with who you're becoming. The Fool is your permission slip to be messy, to not have it all figured out, to take the leap even when you can't see the net. Your practical brain hates this, I know. But sometimes the most grounded thing you can do is trust the fall.",
            points: [
                "The friendships that celebrated you then are still rooting for you now",
                "This decision isn't just about you—it's about the legacy you're building",
                "Choosing the harder right over the easier wrong always pays off",
                "Stability doesn't mean stagnation—it means having a foundation to grow from"
            ],
            jumpingText: "The Fool wants you to stop trying to control the outcome. You've done the work (Three of Cups), you're making conscious choices (The Lovers), and yes, you're building toward something stable (Ten of Pentacles)—but none of that means you have to have it all figured out right now. New beginnings are supposed to feel uncertain. That's literally the point. Trust that your past has prepared you, your present is guiding you, and your future is secure enough to handle a little chaos. Take the leap. You've got this.",
            music: '"Dog Days Are Over" by Florence + The Machine — freedom and release'
        },
        elijah: {
            title: "Elijah's Jumping Card Reading",
            text: "The main spread shows a logical progression from joy to choice to security. But The Fool jumping in disrupts that narrative—in the best way. It's reminding you that not everything needs to make sense before you act on it. You're someone who likes to have all the information, to weigh the pros and cons, to think it through from every angle. The Fool says: sometimes you just have to trust the impulse. Not recklessly, but with the understanding that some paths only reveal themselves when you start walking them.",
            points: [
                "Past connections taught you what you value in relationships and community",
                "This moment requires choosing alignment over comfort",
                "Long-term stability comes from short-term courage in honoring your truth",
                "Your future abundance is built on today's integrity"
            ],
            jumpingText: "Here's what The Fool is really saying: your need for certainty is actually holding you back right now. You've celebrated with your people (Three of Cups), you're making conscious choices (The Lovers), you're building toward stability (Ten of Pentacles)—all true. But The Fool is the wild card that says the most important thing you can do right now is embrace not knowing. New chapters require new approaches. You don't need more information; you need more trust. In yourself, in the process, in the journey. The net will appear. It always does for those brave enough to step.",
            music: '"Shake It Out" by Florence + The Machine — releasing what weighs you down'
        },
        destiny: {
            title: "Destiny's Jumping Card Reading",
            text: "Okay, so The Fool jumped into your reading and honestly? I'm not surprised. You've been playing it safe, protecting your heart, thinking seventeen steps ahead before taking one step forward. The Fool is here to lovingly shove you off the cliff. Not to hurt you, but to remind you that you know how to fly—you've just forgotten. This isn't about being reckless; it's about being free. Free from overthinking, free from past pain, free from the fear of getting it wrong. There's no wrong here. There's just you, trusting yourself, finally.",
            points: [
                "The joy you experienced in the past is a preview of the joy you're building toward",
                "This isn't about choosing between two things—it's about choosing yourself in all things",
                "Security isn't just financial, it's emotional, spiritual, relational—you're building all of it",
                "Your choices echo forward; make them from love, not fear"
            ],
            jumpingText: "The spread shows your journey from community to choice to legacy, and all of that is true and beautiful. But The Fool? The Fool is saying 'Stop trying to control how you get there.' You're so focused on making the right choice (The Lovers) and building the right future (Ten of Pentacles) that you're missing the magic of right now. The Fool is pure presence, pure trust, pure 'I don't know what happens next and that's okay.' Your heart knows the way. Stop letting your head negotiate with it. Jump. The universe has been catching you your whole life. It's not going to stop now.",
            music: '"Brave" by Sara Bareilles — trusting your voice'
        },
        casper: {
            title: "Casper's Jumping Card Reading",
            text: "THE FOOL JUMPED. Of course it did. Because you don't need more planning, more strategizing, more 'let me think about it.' You need to GO. The Fool is chaos in the best way—it's the part of you that knows life's too short to play it safe. You've got the community support (Three of Cups), you're making aligned choices (The Lovers), you're building toward something real (Ten of Pentacles)—now The Fool is saying 'Great. Now do it scared. Do it messy. Do it before you're ready.' Because that's how legends are born.",
            points: [
                "The celebrations in your past taught you what makes you feel alive—don't forget that",
                "This choice isn't between safety and risk; it's between alignment and compromise",
                "Long-term wins come from short-term courage—choose the thing that scares you a little",
                "Abundance follows authenticity; fake it and you'll build a house of cards, own it and you'll build an empire"
            ],
            jumpingText: "Here's what The Fool really means for you: You're overthinking it. I know, I know—you want to have your ducks in a row, you want a plan, you want to make sure you're setting yourself up for that Ten of Pentacles success. But The Fool is the reminder that sometimes you just have to jump and build your wings on the way down. You've got the skills (Magician energy), you've got the fire (that's literally your element), you've got the vision (hello, The Star showed up for a reason). What you need now isn't more preparation. It's more faith. Stop waiting for permission. The universe already said yes. Now you have to say yes to yourself.",
            music: '"Can\'t Hold Us" by Macklemore — unstoppable energy'
        }
    }
};

// Application State
var APP_STATE = {
    currentReading: null,
    selectedAvatar: null,
    currentView: 'selection'
};

// ========================================
// UI COMPONENT FUNCTIONS (Reusable)
// ========================================

function renderCard(emoji, name, position) {
    var html = '<div class="card-position">';
    html += '<div class="tarot-card">' + emoji + '</div>';
    html += '<div class="position-label">';
    if (position) html += position + '<br>';
    html += name + '</div></div>';
    return html;
}

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

function renderAvatarHeader(avatar) {
    var html = '<div class="avatar-header">';
    html += '<div class="avatar-reading-icon">' + avatar.icon + '</div>';
    html += '<h1 class="avatar-reading-name">' + avatar.name + '</h1>';
    html += '<p class="avatar-tagline">' + avatar.tagline + '</p>';
    html += '</div>';
    return html;
}

function renderMusicNote(musicRec) {
    return '<div class="music-note">' +
        '<div class="music-note-title">🎵 Soundtrack for this reading</div>' +
        '<div class="music-note-content">' + musicRec + '</div>' +
        '</div>';
}

// ========================================
// MOCK API FUNCTION
// ========================================

function getAvatarReading(readingType, avatar) {
    // Mock API call - in production, this calls Claude API
    return MOCK_API_RESPONSES[readingType][avatar];
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    renderAvatarGrid();
    renderReadingTypes();
}

function renderAvatarGrid() {
    var grid = document.getElementById('avatarGrid');
    var avatars = ['olivia', 'elijah', 'destiny', 'casper'];
    
    avatars.forEach(function(key) {
        var avatar = AVATAR_CONFIGS[key];
        var card = document.createElement('div');
        card.className = 'avatar-card disabled';
        card.onclick = function() { handleAvatarClick(key); };
        card.innerHTML = '<div class="avatar-icon">' + avatar.icon + '</div>' +
            '<div class="avatar-name">' + avatar.name + '</div>' +
            '<div class="avatar-element">' + avatar.element + '</div>';
        grid.appendChild(card);
    });
}

function renderReadingTypes() {
    var container = document.getElementById('readingTypes');
    var types = [
        { key: 'daily', icon: '📅', title: 'Daily Card', subtitle: 'Today\'s guidance' },
        { key: 'birth', icon: '🪐', title: 'Birth Card', subtitle: 'Your soul\'s blueprint' },
        { key: 'threeCard', icon: '🔮', title: 'Three-Card Reading', subtitle: 'Past · Present · Future' },
        { key: 'jumping', icon: '✨', title: 'Jumping Card Spread', subtitle: 'Three cards + special guidance' }
    ];
    
    types.forEach(function(type) {
        var card = document.createElement('div');
        card.className = 'reading-type-card';
        card.onclick = function() { selectReading(type.key); };
        card.innerHTML = '<span class="reading-type-icon">' + type.icon + '</span>' +
            '<div class="reading-type-title">' + type.title + '</div>' +
            '<div class="reading-type-subtitle">' + type.subtitle + '</div>';
        container.appendChild(card);
    });
}

// ========================================
// READING FLOW
// ========================================

function selectReading(readingType) {
    APP_STATE.currentReading = readingType;
    
    document.getElementById('readingTypes').style.display = 'none';
    
    var animationContainer = document.getElementById('cardAnimation');
    animationContainer.classList.add('active');
    
    animateCards(readingType);
    
    setTimeout(function() {
        animationContainer.classList.remove('active');
        showBaseReading(readingType);
    }, 3000);
}

function animateCards(readingType) {
    var deck = document.getElementById('cardDeck');
    deck.innerHTML = '';
    
    var data = CARDS[readingType];
    
    if (readingType === 'daily' || readingType === 'birth') {
        var card = document.createElement('div');
        card.className = 'tarot-card dealt';
        card.textContent = data.card.emoji;
        card.style.left = '50%';
        card.style.top = '50%';
        card.style.transform = 'translateX(-50%) translateY(-50%)';
        deck.appendChild(card);
    } else {
        var positions = [
            { left: '15%', top: '50%' },
            { left: '50%', top: '50%' },
            { left: '85%', top: '50%' }
        ];
        
        data.cards.forEach(function(cardData, index) {
            setTimeout(function() {
                var card = document.createElement('div');
                card.className = 'tarot-card dealt';
                card.textContent = cardData.emoji;
                card.style.left = positions[index].left;
                card.style.top = positions[index].top;
                card.style.transform = 'translateX(-50%) translateY(-50%)';
                deck.appendChild(card);
            }, index * 400);
        });
        
        if (readingType === 'jumping') {
            setTimeout(function() {
                var jumpCard = document.createElement('div');
                jumpCard.className = 'tarot-card jumping';
                jumpCard.textContent = data.jumpingCard.emoji;
                jumpCard.style.left = '50%';
                jumpCard.style.top = '80%';
                jumpCard.style.transform = 'translateX(-50%)';
                deck.appendChild(jumpCard);
            }, 1600);
        }
    }
}

function showBaseReading(readingType) {
    var data = CARDS[readingType];
    var baseReading = document.getElementById('baseReading');
    var content = document.getElementById('baseReadingContent');
    
    baseReading.classList.add('active');
    content.innerHTML = '';
    
    // Enable avatar selection
    var avatarCards = document.querySelectorAll('.avatar-card');
    for (var i = 0; i < avatarCards.length; i++) {
        avatarCards[i].classList.remove('disabled');
    }
    
    // Display cards
    var cardsHTML = '<div class="cards-display">';
    if (readingType === 'daily') {
        cardsHTML += renderCard(data.card.emoji, data.card.name);
    } else if (readingType === 'birth') {
        cardsHTML += renderCard(data.card.emoji, data.card.name + '<br>Birth Date: ' + data.birthdate);
    } else {
        data.cards.forEach(function(card) {
            cardsHTML += renderCard(card.emoji, card.name, card.position);
        });
    }
    cardsHTML += '</div>';
    
    content.innerHTML = cardsHTML + renderInterpretation('Base Interpretation', data.base.text, data.base.points);
    
    // Jumping card section
    if (readingType === 'jumping') {
        var jumpHTML = '<div class="jumping-card-container">' +
            '<h3 class="jumping-card-label">⚡ Your Jumping Card ⚡</h3>' +
            '<div class="card-position"><div class="tarot-card jumping">' + data.jumpingCard.emoji + '</div></div>' +
            renderInterpretation('Jumping Card Guidance', data.base.jumpingGuidance, data.base.jumpingPoints) +
            '</div>';
        content.innerHTML += jumpHTML;
    }
}


/**
 * Get avatar reading from mock API
 * In production, this will call Claude API
 * @param {string} readingType - Type of reading
 * @param {string} avatar - Avatar key
 * @returns {Object} Reading object
 */
function getAvatarReading(readingType, avatar) {
    // Demo: Local lookup (no network)
    return MOCK_API_RESPONSES[readingType][avatar];
}

/**
 * Optional: Simulate API delay for realistic demo
 * @param {string} readingType - Type of reading
 * @param {string} avatar - Avatar key
 * @param {Function} callback - Callback function
 */
function getAvatarReadingWithDelay(readingType, avatar, callback) {
    setTimeout(function() {
        var reading = MOCK_API_RESPONSES[readingType][avatar];
        callback(reading);
    }, 500); // 500ms fake API delay
}
