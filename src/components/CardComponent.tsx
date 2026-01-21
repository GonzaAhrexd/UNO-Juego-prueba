
import '../assets/Card.css'
import type { Card } from '../types/Card' 

type CardProps = {
    card: Card
    isBot: boolean
    isMaso?: boolean
    isPila?: boolean
}

function CardComponent({ card, isBot, isMaso, isPila }: CardProps) {
    return (
        <div className={` ${isBot ? 'backwardCard' : isMaso ? 'masoCard' :  `card   ${(!card.isAvailable && !isPila) && `cardUnavailable`} ${card.color}`}`}>
             {!isBot && !isMaso ?
            <div className='centeredNumber'>
            <span className={`cardNumber ${card.color}`}>{card.value}</span>
            </div>
                : 
                 <div className='centeredNumber'>
            <span>UNO</span>
            </div>
        }
        </div>
    )
}

export default CardComponent