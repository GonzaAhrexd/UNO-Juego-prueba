import '../assets/Player1.css'

import { useQuery } from '@tanstack/react-query';
import type { Card } from '../types/Card';

import CardComponent from './CardComponent'
import { useEffect } from 'react';

import usePlayerCardsStore from '../states/playerCards';
import useMasoCard from '../states/masoCard';
import useMasoTomar from '../states/masoTomar';
import useTurnoStore from '../states/turno';
function Player1() {


    const { data, isPending, error } = useQuery({
        queryKey: ['initialCards'],
        queryFn: () => fetch('/initialCards.json').then(r => r.json()),
    })

    const playerCards: Card[] = data?.player1?.cards || []

    const { setPlayerCards, playerCards: storedPlayerCards, removeCard, setAvailableCards } = usePlayerCardsStore();
    const { masoCard, setMasoCard } = useMasoCard();
    const { addCardsToHistory } = useMasoTomar();
    const { isAnyAvailable } = usePlayerCardsStore();
    const { currentTurn, nextTurn, invertTurn, invertedTurn, backTurn } = useTurnoStore();

    useEffect(() => {
        setPlayerCards(playerCards);
        setAvailableCards(masoCard as Card);
        isAnyAvailable()
    }, [playerCards])

    useEffect(() => {
        setAvailableCards(masoCard as Card);
        addCardsToHistory(playerCards as Card[]);
        isAnyAvailable()
    }, [masoCard])

    const handleUsecard = (card: Card) => {
        removeCard(card);
        setMasoCard(card);

        // Capturar el estado actual ANTES de invertir
        const wasInverted = invertedTurn;

        if (card.value === "<->") {
            invertTurn();
            // Después de invertir, la dirección será opuesta a la actual
            // Si estaba invertido (true), ahora será normal (false) -> nextTurn
            // Si estaba normal (false), ahora será invertido (true) -> backTurn
            if (wasInverted) {
                nextTurn()
            } else {
                backTurn()
            }
        } else {
            // Carta normal, seguir la dirección actual
            if (wasInverted) {
                backTurn()
            } else {
                nextTurn()
            }
        }

        isAnyAvailable()
    }


    if (isPending) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>

    // Calcular rotación dinámica para cada carta
    const getCardRotation = (index: number, total: number) => {
        if(total > 16 ) return 0; // Evitar rotación si hay muchas cartas para no desordenar
        const middleIndex = (total - 1) / 2;
        const rotation = (index - middleIndex) * 2; // 5 grados entre cada carta
        return rotation;
    };

    const getCardTranslation = (index: number, total: number) => {
        if(total > 16 ) return 0; // Evitar traducción si hay muchas cartas para no desordenar
        const middleIndex = (total - 1) / 2;
        const translation = index < middleIndex ? (index - middleIndex) * -10 :  (index - middleIndex) * 10; // 10px entre cada carta
        
        
        return translation;
    };


    return (
        <div>
             <div className={`playerInfo ${currentTurn === 'player1' ? 'activePlayer' : ''}`}>
                <span>{currentTurn !== 'player1' ? 'Player 1' : 'Your turn!'}</span>
            </div>
            <div className='cardsPlayer1'>
                {storedPlayerCards.map((card, index) =>
                    <button 
                        disabled={!card.isAvailable || currentTurn !== 'player1'} 
                        onClick={() => handleUsecard(card)} 
                        key={index}
                        style={{ 
                            transform: `rotate(${getCardRotation(index, storedPlayerCards.length)}deg) translateY(${getCardTranslation(index, storedPlayerCards.length)}px)` }}
                    >
                        <CardComponent key={index} card={card} isBot={false} />
                    </button>
                )}
            </div>
           
        </div>
    )
}

export default Player1