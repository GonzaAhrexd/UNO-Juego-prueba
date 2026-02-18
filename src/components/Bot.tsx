import '../assets/Player1.css'
import '../assets/Bot.css'
import { useEffect } from 'react'
import CardComponent from './CardComponent'
import type { Card } from '../types/Card'
import useBotCards from '../states/botState'
import useTurnoStore from '../states/turno'
import useMasoCard from '../states/masoCard'
import useMasoTomar from '../states/masoTomar'
import { useQuery } from '@tanstack/react-query';

type BotProps = {
  botNumber: 'bot1' | 'bot2' | 'bot3'
}

function Bot({ botNumber }: BotProps) {
  const { botCards, addCard, removeCard, availableCards, isAnyAvailable, setAvailableCards } = useBotCards();
  const { currentTurn, invertTurn, invertedTurn, nextTurn, backTurn } = useTurnoStore();
  const { masoCard, setMasoCard } = useMasoCard();
  const { takeOneCard } = useMasoTomar();

  const cards: Card[] = botCards?.[botNumber] || []

  const { data: botsInfo, isPending, error } = useQuery({
    queryKey: ['botsInfo'],
    queryFn: () => fetch('/players.json').then(r => r.json()),
  })

  const thisBotInfo = botsInfo?.[botNumber]


  useEffect(() => {
    if (currentTurn === botNumber) {
      console.log(`${botNumber} is playing now.`)
      setTimeout(() => {
        setAvailableCards(masoCard as Card);
        isAnyAvailable(botNumber);

        console.log(botNumber + "has already played")
      }, 2000);
    }
  }, [currentTurn, botNumber, masoCard, setAvailableCards, isAnyAvailable]);

  useEffect(() => {
    if (botNumber == currentTurn) {
      const wasInverted = invertedTurn;

      if (availableCards[botNumber]) {
        const cardToPlay = cards.find(card => card.isAvailable);

        if (cardToPlay) {
          console.log(`${botNumber} plays:`, cardToPlay);
          removeCard(cardToPlay, botNumber);
          setMasoCard(cardToPlay);

          if (cardToPlay.value === "<->") {
            invertTurn();
            // Después de invertir, usar dirección opuesta
            if (wasInverted) {
              nextTurn()
            } else {
              backTurn()
            }
          } else {
            // Carta normal, seguir dirección actual
            if (wasInverted) {
              backTurn()
            } else {
              nextTurn()
            }
          }
        }

      } else {
        console.log(`${botNumber} has no available cards, taking one from the deck.`);
        const newCard = takeOneCard();

        if (newCard.color === masoCard?.color || newCard.value === masoCard?.value) {
          removeCard(newCard, botNumber);
          setMasoCard(newCard);

          if (newCard.value === "<->") {
            invertTurn();
            // Después de invertir, usar dirección opuesta
            if (wasInverted) {
              nextTurn()
            } else {
              backTurn()
            }
          } else {
            // Carta normal, seguir dirección actual
            if (wasInverted) {
              backTurn()
            } else {
              nextTurn()
            }
          }
        } else {
          addCard(newCard, botNumber);
          // No jugó carta, solo avanza según dirección actual
          if (wasInverted) {
            backTurn()
          } else {
            nextTurn()
          }
        }
      }
    }
  }, [availableCards]);

  if (isPending) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='showCards'>
      {cards.length > 7 && botNumber === 'bot3' && (
        <span className='showMoreCards left'>+{cards.length - 8}</span>
      )}

      <div className='botPlacement'>
        <div className='botInfo'>
          <div className={`botProfile ${currentTurn === botNumber ? 'botActive' : ''}`}>
            {thisBotInfo?.name[0]}  
            <span>{botCards?.[botNumber]?.length || 0}</span>
          </div>
          
          <span>
            {thisBotInfo?.name || 'Bot'}
          </span>
        </div>



        <div className='cardsBots'>
          {cards && cards.length > 0 ? (
            cards.slice(0, 7).map((card, index) => (
              <CardComponent key={index} card={card} isBot={true} />
            ))
          ) : (
            <div>Cargando cartas...</div>
          )}
        </div>

        {cards.length > 7 && botNumber === 'bot1' && (
          <span className='showMoreCards right'>+{cards.length - 8}</span>
        )}

      </div>

      {cards.length > 7 && botNumber === 'bot2' && (
        <span className='showMoreCards bottom'>+{cards.length - 8}</span>
      )}
    </div>
  )
}

export default Bot