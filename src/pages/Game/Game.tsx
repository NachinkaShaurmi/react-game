import React, { useEffect, useState } from "react";
import Card from "../../component/Card";
import GameHeader from "../../component/GameHeader";
import WinGame from "../Win/WinGame";
import { Redirect, useHistory } from "react-router-dom";
import { successSound } from "../../Data/AudioAPI";
import { MainMenuButton } from "../../component/ButtonMainMenu";

type gameProps = {
  handleClick(id: number, url: string): void;
  startNewGame(): void;
  imgPack: any[];
  isWinCondition: number;
  level: string;
  steps: number;
  volume: number;
  music: boolean;
  sound: boolean;
  selectedBacksideColor: number;
};

function Game({
  selectedBacksideColor,
  handleClick,
  startNewGame,
  imgPack,
  isWinCondition,
  level,
  steps,
  music,
  sound,
  volume,
}: gameProps) {
  let history = useHistory();
  const [isWin, setIsWin] = useState(false);

  const mt = new Audio("");
  mt.src = `audio/mainTheme.mp3`;
  mt.volume = volume;
  mt.loop = true;

  useEffect(() => {
    if (music) {
      setTimeout(() => {
        mt.play();
      }, 500)
      return () => {
        mt.pause();
      };
    }
  }, []);

  useEffect(() => {
    // console.log(1,isWinCondition)
    if (isWinCondition === 0 && isWin === false) {
      setTimeout(() => {
        setIsWin(true);
        if (sound) successSound(volume);
        history.push("/win", { update: true });
        // console.log(1,isWin)
      }, 1500);
    }
  }, [isWinCondition]);

  useEffect(() => {
    startNewGame();
  }, []);

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

  // useEffect(() => {
  //   if (isWin) {
  //     setTimeout(() => {
  //       history.push("/win", { update: true });
  //     }, 1500);
  //   }
  // }, [isWin]);

  return (
    <div className="game">
      <GameHeader level={level} steps={steps} />
      {
        // isWin ? <WinGame /> :
        <div className="card-container">{cardList}</div>
      }
    </div>
  );
}

export default Game;
