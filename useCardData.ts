// frontend/hooks/useCardData.ts
// React hooks for accessing card data and spread calculations

import { useState, useEffect, useMemo } from 'react';
import { 
  getCardById, 
  getRandomCard, 
  getRandomCards,
  TarotCard 
} from '../../shared/cardData';
import {
  calculateBirthCard,
  calculateDailyCard,
  getBirthCardId,
  getDailyCardId,
  getSpreadPositions,
  getReadingContext,
  isCardImplemented,
  SpreadPosition,
  ReadingContext
} from '../../shared/spreadCalculations';

/**
 * Hook to get a single card by ID
 */
export function useCard(cardId: string) {
  const [card, setCard] = useState<TarotCard | null>(null);
  
  useEffect(() => {
    const cardData = getCardById(cardId);
    setCard(cardData);
  }, [cardId]);
  
  return card;
}

/**
 * Hook to get random card(s)
 */
export function useRandomCards(count: number = 1) {
  const [cards, setCards] = useState<TarotCard[]>([]);
  
  const drawCards = () => {
    if (count === 1) {
      setCards([getRandomCard()]);
    } else {
      setCards(getRandomCards(count));
    }
  };
  
  // Draw on mount
  useEffect(() => {
    drawCards();
  }, [count]);
  
  return {
    cards,
    redraw: drawCards
  };
}

/**
 * Hook to calculate birth card
 */
export function useBirthCard(birthDate: Date | null) {
  const [birthCard, setBirthCard] = useState<{
    cardNumber: number;
    cardId: string | null;
    card: TarotCard | null;
    isImplemented: boolean;
  } | null>(null);
  
  useEffect(() => {
    if (!birthDate) {
      setBirthCard(null);
      return;
    }
    
    const cardNumber = calculateBirthCard(birthDate);
    const cardId = getBirthCardId(birthDate);
    const card = cardId ? getCardById(cardId) : null;
    const implemented = isCardImplemented(cardNumber);
    
    setBirthCard({
      cardNumber,
      cardId,
      card,
      isImplemented: implemented
    });
  }, [birthDate]);
  
  return birthCard;
}

/**
 * Hook to calculate daily card
 */
export function useDailyCard(birthDate: Date | null, currentDate: Date = new Date()) {
  const [dailyCard, setDailyCard] = useState<{
    cardNumber: number;
    cardId: string | null;
    card: TarotCard | null;
    isImplemented: boolean;
  } | null>(null);
  
  useEffect(() => {
    if (!birthDate) {
      setDailyCard(null);
      return;
    }
    
    const birthCardNumber = calculateBirthCard(birthDate);
    const cardNumber = calculateDailyCard(birthCardNumber, currentDate);
    const cardId = getDailyCardId(birthDate, currentDate);
    const card = cardId ? getCardById(cardId) : null;
    const implemented = isCardImplemented(cardNumber);
    
    setDailyCard({
      cardNumber,
      cardId,
      card,
      isImplemented: implemented
    });
  }, [birthDate, currentDate]);
  
  return dailyCard;
}

/**
 * Hook to get spread positions
 */
export function useSpreadPositions(spreadType: 'daily' | 'threespread') {
  const positions = useMemo(() => {
    return getSpreadPositions(spreadType);
  }, [spreadType]);
  
  return positions;
}

/**
 * Hook to manage complete reading context
 */
export function useReadingContext(
  spreadType: 'daily' | 'threespread' | 'birthcard',
  birthDate?: Date,
  currentDate?: Date
) {
  const [context, setContext] = useState<ReadingContext | null>(null);
  
  useEffect(() => {
    const readingContext = getReadingContext(spreadType, birthDate, currentDate);
    setContext(readingContext);
  }, [spreadType, birthDate, currentDate]);
  
  return context;
}

/**
 * Hook to manage three-card spread drawing
 */
export function useThreeCardSpread() {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isDrawn, setIsDrawn] = useState(false);
  
  const drawSpread = () => {
    const drawnCards = getRandomCards(3);
    setCards(drawnCards);
    setIsDrawn(true);
  };
  
  const reset = () => {
    setCards([]);
    setIsDrawn(false);
  };
  
  return {
    cards,
    isDrawn,
    drawSpread,
    reset
  };
}
