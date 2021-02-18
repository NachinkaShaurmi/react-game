import React from "react";
import MenuElement from '../../component/MenuElement'

function MainMenu() {
  const menuData = [
    { name: "New Game", to: "/game", disabled: false },
    { name: "Continue", to: "/game" , disabled: true},
    { name: "Settings", to: "/settings", disabled: false },
    { name: "Score", to: "/score", disabled: false },
  ];

  const menuList = menuData.map(el => <MenuElement name={el.name} to={el.to} disabled={el.disabled}/>)
  
  return (
    <ul className="menuList">
      {menuList}
    </ul>
  );
}

export default MainMenu;
