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
    setInitialBotCards: (cards: ReceiveCards) => void
}

const useBotCards = create<BotCardsState>((set) => ({
    botCards: null,
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
   
}))


export default useBotCards
