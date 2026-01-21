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
}

const usePlayerCardsStore = create<PlayerCardsState>((set) => ({
    cardHistory: [],
    setInitialHistory: () => set({ cardHistory: [] }),
    takeOneCard: () => set((state) => {
        let newCard: Card


        while(true) {{
            newCard = generateCard();
            const isTriplicate = state.cardHistory.filter(
                (card) => card.color === newCard.color && card.value === newCard.value
            ).length >= 2;

            if (!isTriplicate) break;
        }
    }
        return { cardHistory: [...state.cardHistory, newCard] };
    })
   
}))


export default usePlayerCardsStore
