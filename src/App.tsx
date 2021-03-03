import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import { Switch, BrowserRouter, Route, useHistory } from "react-router-dom";
import MainMenu from "./pages/MainMenu/MainMenu";
import Footer from "./pages/Footer/Footer";
import Settings from "./pages/Settings/Settings";
import Score from "./pages/Score/Score";
import Game from "./pages/Game/Game";
import shuffleArray from "./Data/ShuffleArray";
import checkLocalStorage from "./Data/CheckLocalStorage";
import playMusic, { flipSound, miniSuccessSound } from "./Data/AudioAPI";
import { initStore } from "./Data/Data";
import WinGame from "./pages/Win/WinGame";

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
    volumeMusic,
    selectedLevel,
    steps,
    selectedBacksideColor,
    score,
    isDemo,
  } = store;

  const newImgPack: imgPackProps[] = checkLocalStorage(
    "imgPack",
    createImgPack(level[selectedLevel], selectedCategory)
  );
  const [imgPack, setImgPack] = useState(newImgPack);

  useEffect(() => {
    localStorage.setItem("imgPack", JSON.stringify(imgPack));
  }, [imgPack]);

  const startNewGame = (): void => {
    if (!isNewGame) return;
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

  const handleVolumeSound = (value: number): void => {
    setStore((prev: any) => {
      return { ...prev, volume: value / 100 };
    });
  };

  const handleVolumeMusic = (value: number): void => {
    setStore((prev: any) => {
      return { ...prev, volumeMusic: value / 100 };
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
        newStore.winCondition = ["", 100, prev.winCondition[2] - 2];
      } else {
        flipCard(id);
        toggleAllCardCanFlip();
        if (sound) flipSound(volume);
        setTimeout(() => {
          flipCard(id);
          toggleAllCardCanFlip();
        }, 1500);
        newStore.winCondition = [url, id, prev.winCondition[2]];
      }
      return newStore;
    });
  };

  const demoGameTrue = (): void => {
    setStore((prev: any) => {
      return { ...prev, isDemo: true };
    });
  };

  const demoGameAction = (): void => {
    setTimeout(() => {
      let wiPathId: any = [];
      setImgPack((prev) => {
        let temp: any[] = [...prev];
        let changeNewImgPack: any[] = [...prev];
        while (temp.length !== 0) {
          const url = temp[0].url;
          let answer;
          temp.forEach((el) => {
            if (el.url === temp[0].url) {
              answer = el.id;
            }
          });
          wiPathId.push(temp[0].id, answer);
          temp = temp.filter((el) => el.url !== url);
        }
        changeNewImgPack = prev.filter((el) => el.isFlip !== true);
        const newImgPack = [...prev];
        for (let i = 0; i < wiPathId.length; i++) {
          setTimeout(() => {
            flipCard(wiPathId[i]);
            if (sound) flipSound(volume);
          }, 1000 * i);
        }
        return newImgPack;
      });
    }, 3000);
  };

  const handleClickNewGame = (name: string): void => {
    if (name === "New Game" || name === "Demo Game") {
      setImgPack(createImgPack(level[selectedLevel], selectedCategory));
      setStore((prev: any) => {
        return {
          ...prev,
          isNewGame: true,
          winCondition: ["", 100, level[selectedLevel]],
          steps: 0,
          isDemo: false,
        };
      });
    }
    if (name === "Demo Game") demoGameTrue();
  };

  const handleNameSubmit = (name: string): void => {
    setStore((prev: any) => {
      let newStore = Object.assign({}, prev);
      newStore.score.push([selectedLevel, name, steps]);
      newStore.score.sort(
        (a: [number, string, number], b: [number, string, number]) => {
          if (a[0] === b[0]) {
            return a[2] - b[2];
          } else {
            return b[0] - a[0];
          }
        }
      );
      newStore.score.splice(9, 1);
      return newStore;
    });
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
                  volumeMusic={volumeMusic}
                  steps={steps}
                  isDemo={isDemo}
                  level={selectedLevel}
                  handleClick={handleClickGame}
                  startNewGame={startNewGame}
                  demoGameAction={demoGameAction}
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
                  handleVolumeSound={handleVolumeSound}
                  handleVolumeMusic={handleVolumeMusic}
                  selectedCategory={selectedCategory}
                  selectedLevel={selectedLevel}
                  selectedBacksideColor={selectedBacksideColor}
                  sound={sound}
                  music={music}
                  volume={volume * 100}
                  volumeMusic={volumeMusic * 100}
                />
              )}
              path="/settings"
            />
            <Route render={() => <Score score={score} />} path="/score" />
            <Route
              render={() => <WinGame handleNameSubmit={handleNameSubmit} />}
              path="/win"
            />
          </Switch>
        </div>
        <Footer />
      </div>
      {/* </FullScreen> */}
    </BrowserRouter>
  );
}

export default App;
