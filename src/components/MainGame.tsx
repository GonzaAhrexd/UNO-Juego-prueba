import { useEffect } from 'react';
import '../assets/MainGame.css'
import type { Card } from '../types/Card';
import Bot from './Bot'
import CardComponent from './CardComponent'
import Player1 from './Player1'

import { useQuery } from '@tanstack/react-query';
import useMasoCard from '../states/masoCard';


function MainGame() {

    const { data, isPending, error } = useQuery({
        queryKey: ['initialStack'],
        queryFn: () => fetch('/initialStack.json').then(r => r.json()),
    })


    const defaultCard: Card = data?.initialCard || null
    const { setMasoCard, masoCard } = useMasoCard();

    useEffect(() => {
        if (data && defaultCard) {
            setMasoCard(defaultCard);
        }
    }, [data, defaultCard, setMasoCard]);



    if (isPending) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>



    return (
        <>
            {/* <img className="unoGameLogo" src="./Uno_logo.png" alt="" /> */}

            {/* Bot1 */}
            <div className='Game'>

                <div>
                    <Bot />
                    {/* <Player1 /> */}
                </div>

                <div className='midScreen'>
                    {/* Bot 2, cartas y 3 */}
                    <Bot />

                    <div>
                        <div className='deckPile'>
                            {masoCard ? (
                                <CardComponent card={masoCard} isBot={false}></CardComponent>
                            ) : (
                                <div>Cargando pila...</div>
                            )}
                            <CardComponent card={{color: "green", value: "1"}} isMaso={true} isBot={false}></CardComponent>
                        </div>
                    </div>

                    <Bot />

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