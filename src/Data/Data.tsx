export const initStore = {
  mainMenuElements: [
    { name: "New Game", to: "/game", disabled: false },
    { name: "Settings", to: "/settings", disabled: false },
    { name: "Score", to: "/score", disabled: false },
  ],
  cardsPathName: [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
  ],
  category: {
    fruits: "fruits",
    animal: "animal",
    people: "people",
  },
  selectedCategory: "fruits",
  level: [6, 8, 12, 16],
  selectedLevel: 0,
  level2: {
    easy: 6,
    medium: 8,
    hard: 12,
    maximum: 16,
  },
  isNewGame: true,
  winCondition: ["", 100, 6],
  steps: 0,
  volume: 0.5,
  sound: true,
  music: true,
  backsideColor: [1, 2, 3],
  selectedBacksideColor: 1,
};

// export const CardContext = React.createContext(false)
