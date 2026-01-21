import '../assets/Player1.css'

import CardComponent from './CardComponent'
import type { Card } from '../types/Card'
function Bot() {
    const card: Card[] = [{ color: 'red', value: '5', }, { color: 'blue', value: '2' }, { color: 'green', value: '9' }, { color: 'yellow', value: '1' }, { color: 'red', value: '7' }, { color: 'blue', value: '4' }, { color: 'green', value: '3' }] 
  return (
        <div className='cards'>
        {card.map((card, index) => 
        <CardComponent key={index} card={card} isBot={true}></CardComponent>
        )}


    </div>
  )
}

export default Bot