import React from "react";
import { MainMenuButton } from "./ButtonMainMenu";


type GameHeaderProps = {
  level: string
  steps: number
}

function GameHeader({level, steps}: GameHeaderProps) {
  return (
    <>
    <div className="GameHeader">
      <h3 className="GameHeader-element">
        {`Difficult: ${level}`}
      </h3>
      <MainMenuButton />
      <h3 className="GameHeader-element">
        {`Steps: ${steps}`}
      </h3>
    </div>
    </>
  );
}

export default GameHeader;
