import React, { useEffect, useState } from "react";
import "./App.scss";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu/MainMenu";
import Footer from "./pages/Footer/Footer";
import Settings from "./pages/Settings/Settings";
import Score from "./pages/Score/Score";
import Game from "./pages/Game/Game";
import { initStore } from "./Data/Data";

type imgPackProps = {
  url: string;
  id: number;
  isFlip: boolean;
  isCanFlip: boolean;
};

type mainMenuProps = {
  mainMenuElements: any[];
};

function App() {
  let newStore;
  if (localStorage.getItem("store") !== null) {
    newStore = JSON.parse(localStorage.getItem("store") || "");
  } else {
    newStore = initStore;
  }
  const [store, setStore] = useState(newStore);

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  const {
    mainMenuElements,
    cardsPathName,
    category,
    selectedCategory,
    level,
    isNewGame,
  } = store;

  // const [imgPack, setImgPack] = useState(
  //   createImgPack(level[0], selectedCategory)
  // );

  let newImgPack: imgPackProps[];
  if (localStorage.getItem("imgPack") !== null) {
    newImgPack = JSON.parse(localStorage.getItem("imgPack") || "");
  } else {
    newImgPack = createImgPack(level[0], selectedCategory);
  }
  const [imgPack, setImgPack] = useState(newImgPack);

  useEffect(() => {
    localStorage.setItem("imgPack", JSON.stringify(imgPack));
  }, [imgPack]);

  function shuffleArray(ar: string[]): string[] {
    const sortAr = [...ar];
    return sortAr.sort(() => 0.5 - Math.random());
  }

  const reverseFlip = (): void => {
    setImgPack((prev) =>
      prev.map((el) => {
        el.isCanFlip = true;
        if (el.isFlip === true) {
          el.isFlip = false;
        }
        return el;
      })
    );
  };

  const startNewGame = (): void => {
    if (!isNewGame) return;
    setStore((prev: any) => {
      return {
        ...prev,
        isNewGame: false,
      };
    });

    setImgPack((prev) =>
      prev.map((el) => {
        el.isCanFlip = false;
        el.isFlip = !el.isFlip;
        setTimeout(() => {
          reverseFlip();
        }, 2000);
        return el;
      })
    );
  };

  const handleClick = (id: number): void => {
    setImgPack((prev) =>
      prev.map((el) => {
        if (el.id !== id) {
          el.isCanFlip = false;
        }
        if (el.id === id) {
          el.isFlip = !el.isFlip;
          setTimeout(() => {
            reverseFlip();
          }, 1500);
        }
        return el;
      })
    );
  };

  function createImgPack(
    count: number = 16,
    category: string = "fruits"
  ): imgPackProps[] {
    const shuffleCards = shuffleArray(cardsPathName).slice(0, count / 2);
    const imgPack = shuffleArray([...shuffleCards, ...shuffleCards]).map(
      (el, i) => ({
        id: i,
        url: `./images/${category}/${el}`,
        isFlip: false,
        isCanFlip: true,
      })
    );
    return imgPack;
  }

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: "ghostwhite" }}>
        <div className="main">
          <Switch>
            <Route
              render={() => <MainMenu mainMenuElements={mainMenuElements} />}
              path="/"
              exact
            />
            <Route
              render={() => (
                <Game
                  handleClick={handleClick}
                  reverseFlip={reverseFlip}
                  startNewGame={startNewGame}
                  imgPack={imgPack}
                />
              )}
              path="/game"
            />
            <Route render={() => <Settings />} path="/settings" />
            <Route render={() => <Score />} path="/score" />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
