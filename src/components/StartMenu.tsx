import '../assets/StartMenu.css'

type StartMenuProps = {
    setIsGameStarted: (value: boolean) => void
}

function StartMenu({setIsGameStarted}: StartMenuProps) {
  return (
      <>
          <img className="unoGameLogo" src="./Uno_logo.png" alt="" />
          <div className='initialOptions'>
            <button className="startButton" onClick={() => setIsGameStarted(true)}>Iniciar</button>
          </div>
        </>
  )
}

export default StartMenu