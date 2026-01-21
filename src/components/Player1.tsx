import '../assets/Player1.css'

import { useQuery } from '@tanstack/react-query';
import type { Card } from '../types/Card';

import CardComponent from './CardComponent'

function Player1() {


    const { data, isPending, error } = useQuery({
        queryKey: ['initialCards'],
        queryFn: () => fetch('/initialCards.json').then(r => r.json()),
    })

    const playerCards: Card[] = data?.player1?.cards || []


    if (isPending) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>





    return (
        <div className='cards'>

            {playerCards.map((card, index) =>
                <CardComponent key={index} card={card} />
            )}

        </div>
    )
}

export default Player1