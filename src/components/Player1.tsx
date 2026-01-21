import '../assets/Player1.css'

import { useQuery } from '@tanstack/react-query';
import type { Card } from '../types/Card';

import CardComponent from './CardComponent'
import { useEffect } from 'react';

import usePlayerCardsStore  from '../states/playerCards';
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
    const { currentTurn, nextTurn } = useTurnoStore();

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
        console.log(masoCard)
        isAnyAvailable()
        nextTurn()
    }


    if (isPending) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>


    return (
        <div className='cards'>

            {storedPlayerCards.map((card, index) =>
            <button disabled={!card.isAvailable || currentTurn !== 'player1'} onClick={() => handleUsecard(card)} key={index}>
                <CardComponent key={index} card={card} isBot={false} />
            </button>
            )}

        </div>
    )
}

export default Player1