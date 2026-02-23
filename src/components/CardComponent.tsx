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
        <div className={` ${isBot ? 'backwardCard' : isMaso ? 'masoCard' : `card   ${(!card.isAvailable && !isPila) && `cardUnavailable`} ${card.color}`}`}> 
            {!isBot && !isMaso ?
                <div className='centeredNumber'>
                    {card.value != "<->" ? 
                    <span className={`cardNumber ${card.color}`}>{card.value}</span>
                    :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="48" height="48"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={2.5}
                            className={`cardNumber ${card.color}`}
                            style={{ display: 'block' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>               
                    }       
                    
                </div>
                :
                <div className='centeredNumber'>
                    <span className={`${isMaso ? 'masoCard' : ''}`}>UNO</span>
                </div>
            }
        </div>
    )
}

export default CardComponent