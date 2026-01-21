
import '../assets/Card.css'
import type { Card } from '../types/Card' 

type CardProps = {
    card: Card
}

function CardComponent({ card }: CardProps) {
    return (
        <div className={`card ${card.color}`}>
            <div className='centeredNumber'>
            <span className={`cardNumber ${card.color}`}>{card.value}</span>
            </div>
        </div>
    )
}

export default CardComponent