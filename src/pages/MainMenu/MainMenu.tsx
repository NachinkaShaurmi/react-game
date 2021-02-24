import React, { useContext } from "react";
import MenuElement from "../../component/MenuElement";
import { initStore } from "../../Data/Data";

type mainMenuProps = {
  mainMenuElements: any[]
}

function MainMenu({mainMenuElements}: mainMenuProps) {
  //const { mainMenuElements } = initStore;
  const menuList = mainMenuElements.map((el, i) => (
    <MenuElement name={el.name} to={el.to} disabled={el.disabled} key={i} />
  ));

  return <ul className="menuList">{menuList}</ul>;
}

export default MainMenu;
