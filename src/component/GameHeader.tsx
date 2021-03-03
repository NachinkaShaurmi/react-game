import { Button } from "@material-ui/core";
import React from "react";
import { MainMenuButton } from "./ButtonMainMenu";

type GameHeaderProps = {
  level: string;
  steps: number;
  gameFieldRef: any;
};

function GameHeader({ level, steps, gameFieldRef }: GameHeaderProps) {
  const levelString = ["easy", "medium", "hard", "maximum"];

  const handleClick = (): void => {
    gameFieldRef.current.requestFullscreen();
  };

  return (
    <>
      <div className="GameHeader">
        <h3 className="GameHeader-element">
          {`Difficult: ${levelString[+level]}`}
        </h3>
        <MainMenuButton />
        <Button variant="contained" color="primary" onClick={handleClick}>
          FullScreen Mode
        </Button>
        <h3 className="GameHeader-element">{`Steps: ${steps}`}</h3>
      </div>
    </>
  );
}

export default GameHeader;
