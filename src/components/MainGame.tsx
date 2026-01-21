import '../assets/MainGame.css'
import Player1 from './Player1'
function MainGame() {
    return (
        <>
            {/* <img className="unoGameLogo" src="./Uno_logo.png" alt="" /> */}

            {/* Bot1 */}
            <div className='Game'>

            <div>

                {/* <Player1 /> */}
            </div>
            {/* Bot 2, cartas y 3 */}
            <div>
                  {/* <Player1 /> */}
            </div>

            {/* Jugador */}
            <div>
                <Player1 />
            </div>

            </div>

        </>
    )
}

export default MainGame