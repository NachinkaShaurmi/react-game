import React, { useEffect, useState } from "react";
import Card from "../../component/Card";
import GameHeader from "../../component/GameHeader";
import { Redirect, useHistory } from "react-router-dom";

type gameProps = {
  handleClick(id: number, url: string): void;
  startNewGame(): void;
  imgPack: any[];
  isWin: number;
};

function Game(props: gameProps) {
  useEffect(() => {
    props.startNewGame();
  }, []);

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

  let history = useHistory();
  useEffect(() => {
    if (!props.isWin) {
      setTimeout(() => {
        history.push("/win", { update: true });
      }, 1500);
    }
  }, [props.isWin]);

  return (
    <>
      <GameHeader />
      <div className="card-container">{cardList}</div>
    </>
  );
}

export default Game;
