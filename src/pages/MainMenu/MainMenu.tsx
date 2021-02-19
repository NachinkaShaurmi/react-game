import React, { useContext } from "react";
import MenuElement from "../../component/MenuElement";
import { mainStore } from "../../Data/Data";


function MainMenu() {
  const { mainMenuElements } = mainStore;
  const menuList = mainMenuElements.map((el, i) => (
    <MenuElement name={el.name} to={el.to} disabled={el.disabled} key={i} />
  ));

  return <ul className="menuList">{menuList}</ul>;
}

export default MainMenu;
