import { useState } from "react";
import StartMenu from "./components/StartMenu";
import MainGame from "./components/MainGame";
import { AdsBanner } from "./components/AdsBanner/AdsBanner";
function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <>
      <AdsBanner />
      {!isGameStarted ? (
        <>
          <StartMenu setIsGameStarted={setIsGameStarted} />
        </>
      ) : (
        <>
          <MainGame />
        </>
      )}
    </>
  );
}

export default App;
