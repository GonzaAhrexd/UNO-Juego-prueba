import { useState } from 'react'
import StartMenu from './components/StartMenu';
import MainGame from './components/MainGame';
function App() {

  const [isGameStarted, setIsGameStarted] = useState(false);
  
  
  return (
    <>
      {!isGameStarted ? (
        <>
         <StartMenu setIsGameStarted={setIsGameStarted} />
        </>
      ) :
        <>
           <MainGame/>
        </>

      }
    </>
  )
}

export default App
