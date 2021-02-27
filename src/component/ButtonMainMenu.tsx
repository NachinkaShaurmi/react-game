import Button from "@material-ui/core/Button";
import React from "react";
import { NavLink } from "react-router-dom";

export const MainMenuButton: React.FC = () => {
  return (
    <NavLink to="/" className="menuList-button">
      <Button variant="contained" color="primary" >
        Go Main Menu
      </Button>
    </NavLink>
  );
};
