import { create } from 'zustand'

import type { Card } from '../types/Card'

type PlayerCard = Card & {
    isAvailable: boolean
}

type PlayerCardsState = {
    playerCards: PlayerCard[]
    availableCards: boolean
    setPlayerCards: (cards: Card[]) => void
    removeCard: (cardToRemove: Card) => void
    setAvailableCards: (condition: Card) => void
    addCard: (cardToAdd: Card) => void
    isAnyAvailable: () => void
}

const usePlayerCardsStore = create<PlayerCardsState>((set) => ({
    playerCards: [],
    availableCards: true, 
    setPlayerCards: (cards: Card[]) => set({ 
        playerCards: cards.map((card: Card) => ({
            ...card,
            isAvailable: false
        }))
    }),
    removeCard: (cardToRemove: Card) => set((state) => ({
        playerCards: state.playerCards.filter(
            (card) => !(card.color === cardToRemove.color && card.value === cardToRemove.value)
        ),
    })),
    addCard: (cardToAdd: Card) => set((state) => ({
        playerCards: [...state.playerCards, { ...cardToAdd, isAvailable: false }],
    })),
    setAvailableCards: (condition: Card) => set((state) => ({
        playerCards: state.playerCards.map((card) => {
            if (card.color === condition.color || card.value === condition.value) {
                return { ...card, isAvailable: true };
            }   else {
                return { ...card, isAvailable: false };
            }
            return card;
        }),
    })),
    // Actualiza el estado de availableCards si hay alguna carta disponible
    isAnyAvailable: () => set((state) => ({
        availableCards: state.playerCards.some(card => card.isAvailable)
    })),
}))


export default usePlayerCardsStore
