import { create } from 'zustand'

type TurnoState = {
    currentTurn: 'player1' | 'bot1' | 'bot2' | 'bot3'
    setTurn: (turn: 'player1' | 'bot1' | 'bot2' | 'bot3') => void
    nextTurn: () => void
}

const useTurnoStore = create<TurnoState>((set) => ({
    currentTurn: 'player1',
    setTurn: (turn: 'player1' | 'bot1' | 'bot2' | 'bot3') => set({ currentTurn: turn }),
    nextTurn: () => set((state) => {
        const turnOrder: ('player1' | 'bot1' | 'bot2' | 'bot3')[] = ['player1', 'bot1', 'bot2', 'bot3'];
        const currentIndex = turnOrder.indexOf(state.currentTurn);
        const nextIndex = (currentIndex + 1) % turnOrder.length;
        return { currentTurn: turnOrder[nextIndex] };
    })
}))

export default useTurnoStore