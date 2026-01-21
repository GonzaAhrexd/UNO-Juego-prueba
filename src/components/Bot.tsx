import '../assets/Player1.css'
import { useEffect } from 'react'
import CardComponent from './CardComponent'
import type { Card } from '../types/Card'
import useBotCards from '../states/botState'
import useTurnoStore from '../states/turno'

type BotProps = {
  botNumber: 'bot1' | 'bot2' | 'bot3'
}

function Bot({ botNumber }: BotProps) {
  const { botCards } = useBotCards();
  const { currentTurn } = useTurnoStore();

  const cards: Card[] = botCards?.[botNumber] || []

  useEffect(() => {
    console.log(`${botNumber} cards:`, cards)
  }, [cards, botNumber])


  const useRandomCard = () => {
    

  }

  useEffect(() => {

    if(currentTurn === botNumber){
      console.log(`${botNumber} is playing now.`)
      // Agrega un timer de 4 segundos
      setTimeout(() => {
      
      
      
        console.log(`${botNumber} has played a card or taken an action.`)
      
      }, 4000);
    }


  }, [currentTurn]);



  return (
    <div className='cards'>
      {cards && cards.length > 0 ? (
        cards.map((card, index) =>
          <CardComponent key={index} card={card} isBot={true}></CardComponent>
        )
      ) : (
        <div>Cargando cartas...</div>
      )}
    </div>
  )
}

export default Bot