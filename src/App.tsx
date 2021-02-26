import React, { useEffect, useState } from "react";
import "./App.scss";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu/MainMenu";
import Footer from "./pages/Footer/Footer";
import Settings from "./pages/Settings/Settings";
import Score from "./pages/Score/Score";
import Game from "./pages/Game/Game";
import shuffleArray from "./Data/ShuffleArray";
import checkLocalStorage from "./Data/CheckLocalStorage";
import playMusic, {
  flipSound,
  miniSuccessSound,
  successSound,
} from "./Data/AudioAPI";
// import WinGame from "./pages/WinGame/WinGame";
import { initStore } from "./Data/Data";
import WinGame from "./component/WinGame";

type imgPackProps = {
  url: string;
  id: number;
  isFlip: boolean;
  isCanFlip: boolean;
};

// type mainMenuProps = {
//   mainMenuElements: any[];
//   handleClick(name: string): void;
// };

function App() {
  const newStore = checkLocalStorage("store", initStore);
  const [store, setStore] = useState(newStore);

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  const {
    mainMenuElements,
    cardsPathName,
    music,
    sound,
    volume,
    selectedCategory,
    level,
    isNewGame,
    selectedLevel,
    steps,
  } = store;

  const newImgPack: imgPackProps[] = checkLocalStorage(
    "imgPack",
    createImgPack(level[0], selectedCategory)
  );
  const [imgPack, setImgPack] = useState(newImgPack);

  useEffect(() => {
    localStorage.setItem("imgPack", JSON.stringify(imgPack));
  }, [imgPack]);

  const startNewGame = (): void => {
    if (!isNewGame) return;
    console.log("start");
    setStore((prev: any) => {
      return {
        ...prev,
        isNewGame: !isNewGame,
      };
    });

    setImgPack((prev) =>
      prev.map((el) => {
        flipCard(el.id);
        setTimeout(() => {
          flipCard(el.id);
        }, 2000);
        return el;
      })
    );
  };

  const flipCard = (id: number): void => {
    setImgPack((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          el.isFlip = !el.isFlip;
        }
        return el;
      })
    );
  };

  const toggleAllCardCanFlip = (): void => {
    setImgPack((prev) =>
      prev.map((el) => {
        el.isCanFlip = !el.isCanFlip;
        return el;
      })
    );
  };

  const handleClickGame = (id: number, url: string): void => {
    setStore((prev: any) => {
      let newStore = Object.assign({}, prev);
      newStore.steps = prev.steps + 1;
      if (prev.winCondition[0] === url && id !== prev.winCondition[1]) {
        miniSuccessSound();
        if (sound) flipCard(id);
        flipCard(prev.winCondition[1]);
        newStore.winCondition = ["", 100, prev.winCondition[2] - 2];
      } else {
        flipCard(id);
        toggleAllCardCanFlip();
        if (sound) {
          console.log(22)
          flipSound();
        }
        setTimeout(() => {
          flipCard(id);
          toggleAllCardCanFlip();
        }, 1500);
        newStore.winCondition = [url, id, prev.winCondition[2]];
      }
      return newStore;
    });
  };

  const handleClickNewGame = (name: string): void => {
    if (name === "New Game") {
      setImgPack(createImgPack(level[0], selectedCategory));
      setStore((prev: any) => {
        return {
          ...prev,
          isNewGame: true,
          winCondition: ["", 100, 6],
          steps: 0,
        };
      });
    }
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
              render={() => (
                <MainMenu
                  mainMenuElements={mainMenuElements}
                  handleClick={handleClickNewGame}
                />
              )}
              path="/"
              exact
            />
            <Route
              render={() => (
                <Game
                  music={music}
                  steps={steps}
                  level={selectedLevel}
                  handleClick={handleClickGame}
                  startNewGame={startNewGame}
                  imgPack={imgPack}
                  isWinCondition={store.winCondition[2]}
                />
              )}
              path="/game"
            />
            <Route render={() => <Settings />} path="/settings" />
            <Route render={() => <Score />} path="/score" />
            {/* <Route render={() => <WinGame />} path="/win" /> */}
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
