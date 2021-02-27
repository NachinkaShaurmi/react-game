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
import { initStore } from "./Data/Data";
import WinGame from "./pages/Win/WinGame";
import { PersonalVideo } from "@material-ui/icons";

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
    selectedBacksideColor,
  } = store;

  const newImgPack: imgPackProps[] = checkLocalStorage(
    "imgPack",
    createImgPack(level[selectedLevel], selectedCategory) // todo1
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

  const handleSetting = (name: string, payload: any): void => {
    setStore((prev: any) => {
      let newStore = Object.assign({}, prev);
      switch (name) {
        case "level":
          newStore.selectedLevel = payload;
          newStore.winCondition = ["", 100, level[payload]];
          return newStore;
        case "BacksideColor":
          newStore.selectedBacksideColor = payload;
          return newStore;
        case "Image":
          newStore.selectedCategory = payload;
          return newStore;
        case "isSound":
          newStore.sound = payload;
          return newStore;
        case "isMusic":
          newStore.music = payload;
          return newStore;
        default:
          return newStore;
      }
    });
  };

  const handleVolume = (value: number): void => {
    setStore((prev: any) => {
      return { ...prev, volume: value / 100 };
    });
  };

  const handleClickGame = (id: number, url: string): void => {
    setStore((prev: any) => {
      let newStore = Object.assign({}, prev);
      newStore.steps = prev.steps + 1;
      if (prev.winCondition[0] === url && id !== prev.winCondition[1]) {
        if (sound) miniSuccessSound(volume);
        flipCard(id);
        flipCard(prev.winCondition[1]);
        newStore.winCondition = ["", 100, prev.winCondition[2] - 2]; // todo2
      } else {
        flipCard(id);
        toggleAllCardCanFlip();
        if (sound) flipSound(volume);
        setTimeout(() => {
          flipCard(id);
          toggleAllCardCanFlip();
        }, 1500);
        newStore.winCondition = [url, id, prev.winCondition[2]]; // todo2
      }
      return newStore;
    });
  };

  const handleClickNewGame = (name: string): void => {
    if (name === "New Game") {
      setImgPack(createImgPack(level[selectedLevel], selectedCategory)); // todo1
      setStore((prev: any) => {
        return {
          ...prev,
          isNewGame: true,
          winCondition: ["", 100, level[selectedLevel]],
          steps: 0,
        };
      });
    }
  };

  function createImgPack(
    count: number = 6,
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
                  sound={sound}
                  volume={volume}
                  steps={steps}
                  level={selectedLevel}
                  handleClick={handleClickGame}
                  startNewGame={startNewGame}
                  imgPack={imgPack}
                  isWinCondition={store.winCondition[2]}
                  selectedBacksideColor={selectedBacksideColor}
                />
              )}
              path="/game"
            />
            <Route
              render={() => (
                <Settings
                  handleSetting={handleSetting}
                  handleVolume={handleVolume}
                  selectedCategory={selectedCategory}
                  selectedLevel={selectedLevel}
                  selectedBacksideColor={selectedBacksideColor}
                  sound={sound}
                  music={music}
                  volume={volume * 100}
                />
              )}
              path="/settings"
            />
            <Route render={() => <Score />} path="/score" />
            <Route render={() => <WinGame />} path="/win" />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
