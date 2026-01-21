import { create } from 'zustand'

import type { Card } from '../types/Card'

type BotCards = Card & {
    isAvailable: boolean
}

type ReceiveCards = {
    bot1: {
        cards: Card[]
    }
    bot2: {
        cards: Card[]
    }
    bot3: {
        cards: Card[]
    }
}

type Bots = {
    bot1: BotCards[]
    bot2: BotCards[]
    bot3: BotCards[]
}

type BotCardsState = {
    botCards: Bots | null
    addCard: (cardToAdd: Card, botNumber: 'bot1' | 'bot2' | 'bot3') => void
    removeCard: (cardToRemove: Card, botNumber: 'bot1' | 'bot2' | 'bot3') => void
    setInitialBotCards: (cards: ReceiveCards) => void
    availableCards: {
        bot1: boolean
        bot2: boolean
        bot3: boolean
    }
    isAnyAvailable: (botNumber: 'bot1' | 'bot2' | 'bot3') => void
    setAvailableCards: (condition: Card) => void
}

const useBotCards = create<BotCardsState>((set) => ({
    botCards: null,
        addCard: (cardToAdd: Card, botNumber: 'bot1' | 'bot2' | 'bot3') => void set((state) => ({
        botCards: state.botCards ? {
            ...state.botCards,
            [botNumber]: [...state.botCards[botNumber], { ...cardToAdd, isAvailable: false }],
        } : null
    })),
    removeCard: (cardToRemove: Card, botNumber: 'bot1' | 'bot2' | 'bot3') => set((state) => ({
        botCards: state.botCards ? {
            ...state.botCards,
            [botNumber]: state.botCards[botNumber].filter(
                (card) => !(card.color === cardToRemove.color && card.value === cardToRemove.value)
            ),
        } : null
    })),
    setInitialBotCards: (cards: ReceiveCards) => set({ 
        botCards: {
            bot1: cards.bot1.cards.map((card: Card) => ({
                ...card,
                isAvailable: false
            })),
            bot2: cards.bot2.cards.map((card: Card) => ({
                ...card,
                isAvailable: false
            })),
            bot3: cards.bot3.cards.map((card: Card) => ({
                ...card,
                isAvailable: false
            })),
        }
    }),
    availableCards: {
        bot1: false,
        bot2: false,
        bot3: false
    }, 
    setAvailableCards: (condition: Card) => set((state) => ({
        botCards: state.botCards ? {
            bot1: state.botCards.bot1.map((card) => {
                if (card.color === condition.color || card.value === condition.value) {
                    return { ...card, isAvailable: true };
                }   else {
                    return { ...card, isAvailable: false };
                }
            }),
            bot2: state.botCards.bot2.map((card) => {
                if (card.color === condition.color || card.value === condition.value) {
                    return { ...card, isAvailable: true };
                }   else {
                    return { ...card, isAvailable: false };
                }
            }),
            bot3: state.botCards.bot3.map((card) => {
                if (card.color === condition.color || card.value === condition.value) {
                    return { ...card, isAvailable: true };
                }   else {
                    return { ...card, isAvailable: false };
                }
            }),
        } : null
    })),
    // Actualiza el estado de availableCards si hay alguna carta disponible
    isAnyAvailable: (botNumber) => set((state) => ({
        availableCards: {
            ...state.availableCards,
            [botNumber]: state.botCards ? state.botCards[botNumber].some(card => card.isAvailable) : false
        }
    })),
       
   
}))


export default useBotCards
