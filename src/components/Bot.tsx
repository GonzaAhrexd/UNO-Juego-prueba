import '../assets/Player1.css'
import { useEffect } from 'react'
import CardComponent from './CardComponent'
import type { Card } from '../types/Card'
import useBotCards from '../states/botState'
import useTurnoStore from '../states/turno'
import useMasoCard from '../states/masoCard'
import useMasoTomar from '../states/masoTomar'

type BotProps = {
  botNumber: 'bot1' | 'bot2' | 'bot3'
}

function Bot({ botNumber }: BotProps) {
  const { botCards, addCard, removeCard, availableCards, isAnyAvailable, setAvailableCards } = useBotCards();
  const { currentTurn, nextTurn  } = useTurnoStore();
  const { masoCard, setMasoCard } = useMasoCard(); 
  const { takeOneCard } = useMasoTomar();

  const cards: Card[] = botCards?.[botNumber] || []

  
  

  useEffect(() => {
    if(currentTurn === botNumber){
      console.log(`${botNumber} is playing now.`)
      setTimeout(() => {
        setAvailableCards(masoCard as Card);
        isAnyAvailable(botNumber); 

        console.log(botNumber + "has already played")
      }, 2000);
    }
  }, [currentTurn, botNumber, masoCard, setAvailableCards, isAnyAvailable]);

  useEffect(() => {
    if(botNumber == currentTurn) {
   
    if(availableCards[botNumber]) {
      const cardToPlay = cards.find(card => card.isAvailable);

      if (cardToPlay) {
        console.log(`${botNumber} plays:`, cardToPlay);
        removeCard(cardToPlay, botNumber);
        setMasoCard(cardToPlay);
        nextTurn()
      }

    } else {
      console.log(`${botNumber} has no available cards, taking one from the deck.`);
      const newCard = takeOneCard();
      // Aquí iría la lógica para añadir la carta al bot

      


      addCard(newCard, botNumber);


       


    }

    console.log(`${botNumber} availableCards actualizado:`, availableCards[botNumber])
   
    }

  }, [availableCards]);



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