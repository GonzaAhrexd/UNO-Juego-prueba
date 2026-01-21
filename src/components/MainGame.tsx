import { useEffect } from 'react';
import '../assets/MainGame.css'
import type { Card } from '../types/Card';
import Bot from './Bot'
import CardComponent from './CardComponent'
import Player1 from './Player1'

import { useQuery } from '@tanstack/react-query';
import useMasoCard from '../states/masoCard';
import useMasoTomar from '../states/masoTomar';
import usePlayerCardsStore from '../states/playerCards';
import useBotCards from '../states/botState';
import useTurnoStore from '../states/turno';
function MainGame() {

    const { data, isPending, error } = useQuery({
        queryKey: ['initialStack'],
        queryFn: () => fetch('/initialStack.json').then(r => r.json()),
    })

    const { data: dataBots, isPending: isPendingBots, error: errorBots } = useQuery({
        queryKey: ['initialCardsBots'],
        queryFn: () => fetch('/initialCards.json').then(r => r.json()),
    })


    const defaultCard: Card = data?.initialCard || null
    const { setMasoCard, masoCard } = useMasoCard();
    const { setInitialHistory, } = useMasoTomar();
    const { takeOneCard } = useMasoTomar();
    const { addCard, availableCards, isAnyAvailable, setAvailableCards } = usePlayerCardsStore();
    const { botCards, setInitialBotCards } = useBotCards();
    const { currentTurn } = useTurnoStore(); 


    useEffect(() => {
        if (data && defaultCard && dataBots) {
            setMasoCard(defaultCard);
            const initialHistory: Card[] = [defaultCard];

            const botCardsAdd = {
                bot1: dataBots.bot1,
                bot2: dataBots.bot2,
                bot3: dataBots.bot3,
            }

            console.log(botCardsAdd)
            setInitialBotCards(botCardsAdd);
            setInitialHistory(initialHistory);
        }
    }, [data, dataBots, setMasoCard, setInitialBotCards, setInitialHistory]);

    useEffect(() => {
        console.log("botCards actualizado:", botCards)
    }, [botCards]);

    


    const handleTakeCard = () => {
        const newCard = takeOneCard();
        addCard(newCard);
        setAvailableCards(masoCard as Card);
        isAnyAvailable()
    }

    if (isPending && isPendingBots) return <div>Cargando...</div>
    if (error || errorBots) return <div>Error: {error?.message || errorBots?.message}</div>

    return (
        <>
            {/* <img className="unoGameLogo" src="./Uno_logo.png" alt="" /> */}

            {/* Bot1 */}
            <div className='Game'>
                <span className='turnDisplay'>{currentTurn}</span>
                <div>
                    <Bot botNumber='bot1' />
                    {/* <Player1 /> */}
                </div>

                <div className='midScreen'>
                    {/* Bot 2, cartas y 3 */}
                    <Bot botNumber='bot2' />

                    <div>
                        <div className='deckPile'>
                            {masoCard ? (
                                <CardComponent card={masoCard} isBot={false}></CardComponent>
                            ) : (
                                <div>Cargando pila...</div>
                            )}
                            <>
                                {availableCards ? <p>Juega una carta</p> : <p>Toma una carta</p>}
                                <button disabled={availableCards} onClick={handleTakeCard}>
                                    <CardComponent card={{ color: "green", value: "1" }} isMaso={true} isBot={false} />
                                </button>
                            </>
                        </div>
                    </div>

                    <Bot botNumber='bot3' />

                </div>

                {/* Jugador */}
                <div className='lastRow'>
                    <Player1 />

                </div>

            </div>

        </>
    )
}

export default MainGame