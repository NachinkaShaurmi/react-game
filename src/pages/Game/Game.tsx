import React, { useEffect, useState } from "react";
import Card from "../../component/Card";
import GameHeader from "../../component/GameHeader";
import WinGame from "../../component/WinGame";
import { Redirect, useHistory } from "react-router-dom";
import playMusic, {successSound, mainTheme} from "../../Data/AudioAPI";

type gameProps = {
  handleClick(id: number, url: string): void;
  startNewGame(): void;
  imgPack: any[];
  isWinCondition: number;
  level: string;
  steps: number
  music: boolean
};

function Game({handleClick, startNewGame, imgPack, isWinCondition, level, steps, music}: gameProps) {
  const [isWin, setIsWin] = useState(false);

  // const mt = new Audio("");
  // mt.src = `audio/mainTheme.mp3`;
  // mt.volume = 0.5;
  
  
  
  useEffect(() => {
    if (music) mainTheme()
    return () => {
        mainTheme()
      }
      
  }, [])


  useEffect(() => {
    // console.log(1,isWinCondition)
    if (isWinCondition === 0 && isWin=== false) {
      setTimeout(() => {
        setIsWin(true)
        successSound()
        // console.log(1,isWin)
      }, 1500)  
    }
  }, [isWinCondition])

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
    />
  ));

  // let history = useHistory();
  // useEffect(() => {
  //   if (!props.isWin) {
  //     setTimeout(() => {
  //       history.push("/win", { update: true });
  //     }, 1500);
  //   }
  // }, [props.isWin]);

  return (
    <div className='game'>
      <GameHeader level = {level} steps={steps}/>
      {
        isWin ? <WinGame /> : <div className="card-container">{cardList}</div>
      }
      
    </div>
  );
}

export default Game;
