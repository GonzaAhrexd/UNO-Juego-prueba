import { create } from 'zustand'

import type { Card } from '../types/Card'

type PlayerCard = Card & {
    isAvailable: boolean
}

type PlayerCardsState = {
    playerCards: PlayerCard[]
    setPlayerCards: (cards: Card[]) => void
    removeCard: (cardToRemove: Card) => void
    setAvailableCards: (condition: Card) => void
}

const usePlayerCardsStore = create<PlayerCardsState>((set) => ({
    playerCards: [],
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
    setAvailableCards: (condition: Card) => set((state) => ({
        playerCards: state.playerCards.map((card) => {
            if (card.color === condition.color || card.value === condition.value) {
                return { ...card, isAvailable: true };
            }   else {
                return { ...card, isAvailable: false };
            }
            return card;
        }),
    }))
}))


export default usePlayerCardsStore
