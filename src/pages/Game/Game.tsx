import React, { useEffect, useRef, useState } from "react";
import Card from "../../component/Card";
import GameHeader from "../../component/GameHeader";
import WinGame from "../Win/WinGame";
import { Redirect, useHistory } from "react-router-dom";
import { successSound } from "../../Data/AudioAPI";
import { MainMenuButton } from "../../component/ButtonMainMenu";

type gameProps = {
  handleClick(id: number, url: string): void;
  startNewGame(): void;
  demoGameAction(): void;
  imgPack: any[];
  isWinCondition: number;
  level: string;
  steps: number;
  volume: number;
  volumeMusic: number;
  music: boolean;
  sound: boolean;
  selectedBacksideColor: number;
  isDemo: boolean;
};

function Game({
  selectedBacksideColor,
  handleClick,
  startNewGame,
  demoGameAction,
  imgPack,
  isWinCondition,
  level,
  steps,
  music,
  sound,
  volumeMusic,
  volume,
  isDemo,
}: gameProps) {
  let history = useHistory();
  const [isWin, setIsWin] = useState(false);

  const mt = new Audio("");
  mt.src = `audio/mainTheme.mp3`;
  mt.volume = volumeMusic;
  mt.loop = true;

  useEffect(() => {
    if (music) {
      setTimeout(() => {
        mt.play();
      }, 500);
      return () => {
        mt.pause();
      };
    }
  }, []);

  useEffect(() => {
    if (isWinCondition === 0 && isWin === false) {
      setTimeout(() => {
        setIsWin(true);
        if (sound) successSound(volume);
        history.push("/win", { update: true });
      }, 1500);
    }
  }, [isWinCondition]);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (isDemo) {
      demoGameAction();
    }
  }, []);

  const gameFieldRef = useRef<HTMLDivElement>(null);

  const cardList = imgPack.map((el) => (
    <Card
      url={el.url}
      id={el.id}
      key={el.id}
      isFlip={el.isFlip}
      isCanFlip={el.isCanFlip}
      handleClick={handleClick}
      selectedBacksideColor={selectedBacksideColor}
    />
  ));

  return (
    <div className="game">
      <GameHeader level={level} steps={steps} gameFieldRef={gameFieldRef} />
      {
        <div className="card-container" ref={gameFieldRef}>
          {cardList}
        </div>
      }
    </div>
  );
}

export default Game;
