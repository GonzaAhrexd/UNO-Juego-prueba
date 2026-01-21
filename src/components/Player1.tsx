import '../assets/Player1.css'

import { useQuery } from '@tanstack/react-query';
import type { Card } from '../types/Card';

import CardComponent from './CardComponent'
import { useEffect } from 'react';

import usePlayerCardsStore  from '../states/playerCards';
import useMasoCard from '../states/masoCard';
function Player1() {


    const { data, isPending, error } = useQuery({
        queryKey: ['initialCards'],
        queryFn: () => fetch('/initialCards.json').then(r => r.json()),
    })

    const playerCards: Card[] = data?.player1?.cards || []

    const { setPlayerCards, playerCards: storedPlayerCards, removeCard, setAvailableCards } = usePlayerCardsStore();
    const { masoCard, setMasoCard } = useMasoCard();
    useEffect(() => {
        setPlayerCards(playerCards);
        setAvailableCards(masoCard as Card);    
    }, [playerCards])

    useEffect(() => {
        setAvailableCards(masoCard as Card);
    }, [masoCard])

    const handleUsecard = (card: Card) => {
        removeCard(card);
        setMasoCard(card);
    }


    if (isPending) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>


    return (
        <div className='cards'>

            {storedPlayerCards.map((card, index) =>
            <button disabled={!card.isAvailable} onClick={() => handleUsecard(card)} key={index}>
                <CardComponent key={index} card={card} isBot={false} />
            </button>
            )}

        </div>
    )
}

export default Player1