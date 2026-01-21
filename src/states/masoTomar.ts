import { create } from 'zustand'
import type { Card } from '../types/Card'



type Colors = "red" | "blue" | "green" | "yellow" 

const generateCard = (): Card => {
    const colors: Colors[] = ["red", "blue", "green", "yellow"];
    const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    
    return { color: randomColor, value: randomValue };

}

type PlayerCardsState = {
    cardHistory: Card[]
    setInitialHistory: (cardHistory: Card[]) => void
    takeOneCard: () => Card
    addToHistory: (card: Card) => void 
    addCardsToHistory: (cards: Card[]) => void
}

const useMasoTomar = create<PlayerCardsState>((set, get) => ({
    cardHistory: [],
    setInitialHistory: (cardHistory: Card[]) => set({ cardHistory: cardHistory || [] }),
    takeOneCard: () => {
        let newCard: Card

        while(true) {
            newCard = generateCard();
            const isTriplicate = get().cardHistory.filter(
                (card: Card) => card.color === newCard.color && card.value === newCard.value
            ).length >= 2;

            if (!isTriplicate) break;
        }

        set((state) => ({ cardHistory: [...state.cardHistory, newCard] }));
        return newCard
    },
    addToHistory: (card: Card) => set((state) => ({ cardHistory: [...state.cardHistory, card] })),
    addCardsToHistory: (cards: Card[]) => set((state) => ({ cardHistory: [...state.cardHistory, ...cards] })),
}))


export default useMasoTomar
