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
    const { currentTurn, nextTurn, backTurn, invertedTurn } = useTurnoStore();


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
        const wasInverted = invertedTurn;
        const newCard = takeOneCard();
        addCard(newCard);

        // Verificar si la nueva carta es jugable directamente
        const isPlayable = newCard.color === masoCard?.color || newCard.value === masoCard?.value;

        if (!isPlayable) {
            // No hay cartas jugables, saltar turno
            console.log('No hay cartas jugables, saltando turno');
            if (wasInverted) {
                backTurn();
            } else {
                nextTurn();
            }
        } else {
            // Hay carta jugable, actualizar disponibilidad
            setAvailableCards(masoCard as Card);
            isAnyAvailable();
        }
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
                    <Bot botNumber='bot2' />
                    {/* <Player1 /> */}
                </div>

                <div className='midScreen'>
                    {/* Bot 2, cartas y 3 */}
                    <Bot botNumber='bot1' />


                    <div className='deckPile'>
                        <button disabled={availableCards} onClick={handleTakeCard}>
                            <CardComponent card={{ color: "green", value: "1" }} isMaso={true} isBot={false} />
                        </button>
                        <div className={`arrow-direction ${invertedTurn && 'inverted'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>

                        </div>
                        {masoCard ? (
                            <CardComponent card={masoCard} isBot={false} isPila={true}></CardComponent>
                        ) : (
                            <div>Cargando pila...</div>
                        )}
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