import React, { useState } from "react";
import { MainMenuButton } from "../../component/ButtonMainMenu";
import imgWin from "../../assets/images/imgWin.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

type winGameProps = {
  handleNameSubmit(name: string): void
}

function WinGame({handleNameSubmit}: winGameProps) {
  const [name, setName] = useState("");
  const handleChangeName = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setName(target.value);

  return (
    <div className="win">
      <img src={imgWin} alt="Win" width="465px" />
      {/* <input value={name} onChange={handleChange} type='text' /> */}
      <TextField
        id="standard-basic"
        label="Enter your name"
        onChange={handleChangeName}
      />
      <NavLink to="/score" className="menuList-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNameSubmit(name)}
        >
          Submit
        </Button>
      </NavLink>
      <MainMenuButton />
    </div>
  );
}

export default WinGame;
