import React, { useEffect, useState } from "react";
import { initStore } from "../../Data/Data";
import Card from "../../component/Card";
import GameHeader from "../../component/GameHeader";

// type imgPack = {
//   url: string;
//   id: number;
//   isFlip: boolean;
// };

type gameProps = {
  handleClick(id: number): void
  reverseFlip(id: number): void
  startNewGame(): void
  imgPack: any[]
}

function Game(props: gameProps) {

  useEffect(()=>{
    props.startNewGame()
    console.log('startNewGame')
  }, [])

  const cardList = props.imgPack.map((el) => (
    <Card
      url={el.url}
      id={el.id}
      key={el.id}
      isFlip={el.isFlip}
      isCanFlip={el.isCanFlip}
      handleClick={props.handleClick}
    />
  ));

  return (
    <>
      <GameHeader />
      <div className="card-container">{cardList}</div>
    </>
  );
}

export default Game;
