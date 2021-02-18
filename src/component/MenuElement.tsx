import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

interface MenuEl {
  name: string;
  to: string;
  disabled: boolean;
}

function MenuElement({ name, to, disabled }: MenuEl) {
  return (
    <li>
      <NavLink to={to} className="menuList-button">
        <Button variant="contained" color="primary" disabled={disabled}>
          {name}
        </Button>
      </NavLink>
    </li>
  );
}

export default MenuElement;
