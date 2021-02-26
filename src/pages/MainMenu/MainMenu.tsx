import React, { useContext } from "react";
import MenuElement from "../../component/MenuElement";

type mainMenuProps = {
  mainMenuElements: any[]
  handleClick(name: string):void
}

function MainMenu({mainMenuElements, handleClick}: mainMenuProps) {
  const menuList = mainMenuElements.map((el, i) => (
    <MenuElement name={el.name} to={el.to} disabled={el.disabled} key={i} handleClick={handleClick} />
  ));
  

  return <ul className="menuList">{menuList}</ul>;
}

export default MainMenu;
