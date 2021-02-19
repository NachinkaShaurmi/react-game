import React, { useState } from "react";
import { mainStore } from "../../Data/Data";
import Card from "../../component/Card";
import GameHeader from "../../component/GameHeader";

const { cardsPathName } = mainStore;

function Game() {
  const [imgPack, setImgPack] = useState(createImgPack());

  function shuffleArray(ar: string[]): string[] {
    const sortAr = [...ar];
    return sortAr.sort(() => 0.5 - Math.random());
  }

  const reverseFlip = () => {
    setImgPack((prev) =>
      prev.map((el) => {
        if (el.isFlip === true) {
          el.isFlip = false;
        }
        return el;
      })
    );
  }

  const handleClick = (id: number) => {
    setImgPack((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.isFlip = !el.isFlip;
          // console.log(el.id, el.isFlip)
          setTimeout(() => {
            reverseFlip();
            // console.log(el.id,el.isFlip)
          }, 1500);
        }
        return el;
      })
    );
  };

  function createImgPack(count: number = 16, category: string = "fruits") {
    const shuffleCards = shuffleArray(cardsPathName).slice(0, count / 2);
    const imgPack = shuffleArray([...shuffleCards, ...shuffleCards]).map(
      (el, i) => ({
        id: i,
        url: `./images/${category}/${el}`,
        isFlip: false,
      })
    );
    return imgPack;
  }

  // const imgPack = createImgPack();
  const cardList = imgPack.map((el) => (
    <Card
      url={el.url}
      id={el.id}
      key={el.id}
      isFlip={el.isFlip}
      handleClick={handleClick}
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
