import { create } from 'zustand'

import type { Card } from '../types/Card'

type MasoCardState = {
    masoCard: Card | null,
    setMasoCard: (card: Card) => void

}

const useMasoCard = create<MasoCardState>((set) => ({
    masoCard: null,
    setMasoCard: (card: Card) => set({ masoCard: card })
}))


export default useMasoCard
