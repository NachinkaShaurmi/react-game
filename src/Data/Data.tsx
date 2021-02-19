import React from "react";


export const mainStore = {

  mainMenuElements: [
    { name: "New Game", to: "/game", disabled: false },
    { name: "Continue", to: "/game", disabled: true },
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

};

export const CardContext = React.createContext(false)