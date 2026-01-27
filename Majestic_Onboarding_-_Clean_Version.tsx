import React, { useState, useEffect } from 'react';
import { Eye, Leaf, Wind, Droplets, Flame } from 'lucide-react';

const MajesticOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [birthDate, setBirthDate] = useState('1990-03-15'); // Hardcoded to calculate to The Fool (0)
  const [birthCardNumber, setBirthCardNumber] = useState(null);
  const [recommendedAvatar, setRecommendedAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [currentHero, setCurrentHero] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTouchpoint, setActiveTouchpoint] = useState(null);
  const [showTransition, setShowTransition] = useState(false);

  // Avatar data with expanded details
  const avatars = {
    olivia: {
      name: 'Olivia',
      element: 'Earth',
      icon: Leaf,
      personality: 'I guide with nurturing stability and help you build solid foundations.',
      color: 'text-emerald-400',
      song: 'Rooted by Little Simz',
      adviceType: 'Practical, step-by-step guidance with gentle encouragement',
      backstory: 'Born from ancient forest wisdom, Olivia learned that true strength comes from deep roots and patient growth.'
    },
    elijah: {
      name: 'Elijah', 
      element: 'Air',
      icon: Wind,
      personality: 'I offer clarity through balanced perspective and thoughtful analysis.',
      color: 'text-purple-400',
      song: 'Breathe Me by Sia',
      adviceType: 'Balanced insights that consider multiple perspectives',
      backstory: 'A former scholar who discovered that true wisdom comes from observing patterns in both chaos and order.'
    },
    destiny: {
      name: 'Destiny',
      element: 'Water', 
      icon: Droplets,
      personality: 'I help you trust your intuition and flow with life\'s currents.',
      color: 'text-blue-400',
      song: 'Ocean Eyes by Billie Eilish',
      adviceType: 'Intuitive guidance that honors your emotional truth',
      backstory: 'Once a lighthouse keeper, Destiny learned to read the tides of human emotion and guide souls safely to shore.'
    },
    casper: {
      name: 'Casper',
      element: 'Fire',
      icon: Flame, 
      personality: 'I ignite your inner fire and guide you to take empowered action.',
      color: 'text-red-400',
      song: 'Run the World by Beyoncé',
      adviceType: 'Direct, action-oriented guidance that sparks transformation',
      backstory: 'A former warrior who learned that true power comes from channeling passion into purposeful action.'
    }
  };

  // Quiz questions
  const questions = [
    {
      question: "When life feels uncertain, you tend to...",
      options: [
        { text: "Take bold action and trust your instincts", avatar: 'casper', icon: '🔥' },
        { text: "Flow with the changes and feel your way through", avatar: 'destiny', icon: '🌊' },
        { text: "Ground yourself and plan practical next steps", avatar: 'olivia', icon: '🌱' },
        { text: "Step back, breathe, and find balance", avatar: 'elijah', icon: '💨' }
      ]
    },
    {
      question: "Your ideal guidance feels...",
      options: [
        { text: "Direct and empowering", avatar: 'casper', icon: '🔥' },
        { text: "Intuitive and flowing", avatar: 'destiny', icon: '🌊' },
        { text: "Practical and nurturing", avatar: 'olivia', icon: '🌱' },
        { text: "Balanced and wise", avatar: 'elijah', icon: '💨' }
      ]
    }
  ];

  // Calculate recommendation from answers
  const calculateRecommendation = (answers) => {
    const counts = {};
    answers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  // Calculate birth card using tarot numerology
  const calculateBirthCard = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const sumDigits = (num) => {
      return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    };
    
    let total = sumDigits(year) + sumDigits(month) + sumDigits(day);
    while (total > 22) {
      total = sumDigits(total);
    }
    return total === 22 ? 0 : total;
  };

  // Handle quiz progression
  const handleAnswer = (avatarKey) => {
    const newAnswers = [...answers, avatarKey];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz complete, move to birthdate step (step 3)
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle birthdate submission
  const handleBirthdateSubmit = () => {
    const cardNumber = calculateBirthCard(birthDate);
    setBirthCardNumber(cardNumber);
    const recommended = calculateRecommendation(answers);
    setRecommendedAvatar(recommended);
    setCurrentHero(recommended);
    setCurrentStep(currentStep + 1); // Move to recommendation (step 4)
  };

  // Handle avatar selection with transition
  const handleAvatarSelect = (avatarKey) => {
    setShowTransition(true);
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    
    // After transition, set selected avatar
    setTimeout(() => {
      setSelectedAvatar(avatarKey);
      setShowTransition(false);
    }, 2000);
  };

  // Handle hero swapping in recommendation
  const handleHeroSwap = (avatarKey) => {
    setCurrentHero(avatarKey);
    setActiveTouchpoint(null); // Reset active touchpoint when switching
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
  };

  // Handle touchpoint interactions
  const handleTouchpoint = (pointNumber, event) => {
    event.stopPropagation();
    setActiveTouchpoint(activeTouchpoint === pointNumber ? null : pointNumber);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  // Get touchpoint content
  const getTouchpointContent = (pointNumber, avatar) => {
    switch(pointNumber) {
      case 1:
        return {
          title: "Core Philosophy",
          content: avatar.personality
        };
      case 2:
        return {
          title: "Favourite Song",
          content: avatar.song
        };
      case 3:
        return {
          title: "Advice Style",
          content: avatar.adviceType
        };
      case 4:
        return {
          title: "Origin Story",
          content: avatar.backstory
        };
      default:
        return null;
    }
  };

  // Crystal Ball Component
  const CrystalBall = ({ onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full flex items-center justify-center relative cursor-pointer
        transition-all duration-500 hover:scale-105 ${className}`}
      style={{
        background: 'conic-gradient(from 0deg, #a855f7, #ec4899, #f59e0b, #10b981, #3b82f6, #a855f7)',
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
      }}
    >
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
      <Eye className="w-6 h-6 text-gray-800 z-10" />
    </button>
  );

  // Transition Screen
  if (showTransition) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse"
          style={{
            background: 'conic-gradient(from 0deg, #a855f7, #ec4899, #f59e0b, #10b981, #3b82f6, #a855f7)',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)'
          }}
        >
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <Eye className="w-8 h-8 text-gray-800 z-10" />
        </div>
      </div>
    );
  }

  // Splash Screen
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <button
            onClick={() => setCurrentStep(1)}
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer transition-all duration-500 hover:scale-110 group"
            style={{
              background: 'conic-gradient(from 0deg, #a855f7, #ec4899, #f59e0b, #10b981, #3b82f6, #a855f7)',
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)'
            }}
          >
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            <Eye className="w-12 h-12 text-gray-800 z-10 animate-pulse group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          <h1 className="text-5xl font-light text-white mb-2 tracking-[0.3em]">
            MAJESTIC
          </h1>
          <p className="text-gray-400 text-lg font-light italic mb-8">
            Explore your spiritual path
          </p>
          
          <p className="text-gray-500 text-sm">
            Tap the crystal ball to begin
          </p>
        </div>
      </div>
    );
  }

  // Quiz Questions
  if (currentStep >= 1 && currentStep <= 2) {
    const questionIndex = currentStep - 1;
    const question = questions[questionIndex];
    
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-12 flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-6 tracking-[0.3em]">
            MAJESTIC
          </h1>
          
          {/* Crystal Ball */}
          <CrystalBall className="mx-auto mb-6" />
          
          {/* Progress */}
          <div className="flex justify-center gap-2 mb-8">
            {questions.map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i <= questionIndex ? 'bg-gray-900' : 'bg-gray-400'
                }`} 
              />
            ))}
          </div>
        </div>
        
        {/* Quiz Frame */}
        <div className="w-full max-w-sm">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-white text-lg font-light text-center leading-relaxed mb-6">
              {question.question}
            </h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.avatar)}
                  className="w-full bg-gray-800 hover:bg-gray-700 rounded-lg p-3 text-left transition-all duration-200 border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-white font-light text-sm">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Birthdate Collection (Step 3)
  if (currentStep === 3 && !recommendedAvatar) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-6 tracking-[0.3em]">
              MAJESTIC
            </h1>
            
            {/* Crystal Ball */}
            <CrystalBall className="mx-auto mb-6" />
            
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Your Birth Card
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your birthdate to discover your birth card—the archetypal energy that shapes your life journey
            </p>
          </div>

          {/* Birthdate Input */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-3">
              Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors text-gray-900"
            />
            
            {/* Info Text */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                💫 Your birth card is calculated using tarot numerology and represents your core essence
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleBirthdateSubmit}
            className="w-full py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Recommendation Screen (Now Step 4)
  if (currentStep === 4 && !selectedAvatar) {
    const hero = avatars[currentHero];
    const HeroIcon = hero.icon;
    const isOriginalRecommendation = currentHero === recommendedAvatar;
    
    return (
      <div className="min-h-screen bg-gray-900 px-6 py-8 flex flex-col">
        {/* Top Circle - Crystal Ball or Recommended Indicator */}
        <div className="flex justify-center mb-6">
          {isOriginalRecommendation ? (
            <CrystalBall className="animate-pulse" />
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
              <HeroIcon className={`w-8 h-8 ${hero.color}`} />
            </div>
          )}
        </div>
        
        {/* Large Name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4 tracking-[0.2em]">
            {hero.name.toUpperCase()}
          </h1>
          <p className="text-gray-400 text-lg">
            {hero.element} Guide
          </p>
        </div>
        
        {/* Interactive Avatar Area */}
        <div className="flex-1 relative mb-8">
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Central Avatar Icon */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-700 flex items-center justify-center bg-gray-800">
              <HeroIcon className={`w-20 h-20 ${hero.color}`} />
            </div>
            
            {/* Interactive Touchpoints */}
            <button 
              className={`absolute top-8 left-8 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-300 ${
                activeTouchpoint === 1 
                  ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50 scale-110' 
                  : 'bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30'
              }`}
              onClick={(e) => handleTouchpoint(1, e)}
            >
              1
            </button>
            
            <button 
              className={`absolute top-8 right-8 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-300 ${
                activeTouchpoint === 2 
                  ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50 scale-110' 
                  : 'bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30'
              }`}
              onClick={(e) => handleTouchpoint(2, e)}
            >
              2
            </button>
            
            <button 
              className={`absolute bottom-8 left-8 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-300 ${
                activeTouchpoint === 3 
                  ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50 scale-110' 
                  : 'bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30'
              }`}
              onClick={(e) => handleTouchpoint(3, e)}
            >
              3
            </button>
            
            <button 
              className={`absolute bottom-8 right-8 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer transition-all duration-300 ${
                activeTouchpoint === 4 
                  ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50 scale-110' 
                  : 'bg-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30'
              }`}
              onClick={(e) => handleTouchpoint(4, e)}
            >
              4
            </button>
            
            {/* Insight Popup */}
            {activeTouchpoint && (
              <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-72 bg-gray-800 border border-gray-600 rounded-2xl p-4 shadow-xl animate-in fade-in duration-300">
                <div className="text-center">
                  <h3 className="text-yellow-400 font-semibold mb-2">
                    {getTouchpointContent(activeTouchpoint, hero).title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {getTouchpointContent(activeTouchpoint, hero).content}
                  </p>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-l border-t border-gray-600 rotate-45"></div>
              </div>
            )}
          </div>
          
          {/* Instructions */}
          <p className="text-gray-500 text-sm text-center mb-4">
            {activeTouchpoint ? 'Tap another number to explore more' : 'Tap the numbered points to learn about your guide'}
          </p>
          
          {/* Default Bio (only show when no touchpoint is active) */}
          {!activeTouchpoint && (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <p className="text-gray-300 text-center leading-relaxed italic">
                "{hero.personality}"
              </p>
              {isOriginalRecommendation && (
                <p className="text-center mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-400 text-gray-900 font-medium">
                    Recommended for you
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={() => handleAvatarSelect(currentHero)}
            className="w-full bg-white text-gray-900 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Choose {hero.name}
          </button>
        </div>
        
        {/* Stacked Secondary Options */}
        <div className="space-y-3">
          {Object.entries(avatars)
            .filter(([key]) => key !== currentHero)
            .map(([key, avatar]) => {
              const Icon = avatar.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleHeroSwap(key)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-4 hover:border-gray-600 transition-all duration-200 hover:bg-gray-750 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${avatar.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-medium">{avatar.name}</h3>
                    <p className="text-gray-400 text-sm">{avatar.element} Guide</p>
                  </div>
                </button>
              );
            })}
        </div>
        
        <button
          onClick={() => handleAvatarSelect(recommendedAvatar)}
          className="w-full text-gray-500 text-sm mt-4 hover:text-gray-400 transition-colors duration-200"
        >
          Skip - Use Quiz Result ({avatars[recommendedAvatar].name})
        </button>
      </div>
    );
  }

  // Confirmation Screen
  if (selectedAvatar) {
    const selected = avatars[selectedAvatar];
    const Icon = selected.icon;
    
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-12 flex flex-col justify-center">
        <div className="text-center">
          <Icon className={`w-20 h-20 mx-auto mb-6 ${selected.color}`} />
          <h2 className="text-3xl font-light mb-4 text-gray-900 tracking-[0.2em]">
            WELCOME
          </h2>
          <h3 className="text-xl font-light mb-6 text-gray-700">
            {selected.element} Seeker
          </h3>
          
          <div className="bg-gray-900 rounded-2xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-gray-300 text-sm leading-relaxed italic">
              "{selected.personality}"
            </p>
          </div>
          
          <button className="w-full max-w-sm mx-auto bg-gray-900 text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors duration-200">
            Begin Your First Reading
          </button>
        </div>
      </div>
    );
  }
};

export default MajesticOnboarding;