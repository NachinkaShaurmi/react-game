import React, { useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { MainMenuButton } from "../../component/ButtonMainMenu";
import InputLabel from "@material-ui/core/InputLabel";

type SettingsProps = {
  handleSetting(name: string | undefined, payload: any): void;
  handleVolume(value: number | number[]): void;
  selectedCategory: string;
  selectedLevel: number;
  selectedBacksideColor: any;
  sound: boolean;
  music: boolean;
  volume: number;
};

function Settings({
  handleSetting,
  handleVolume,
  selectedCategory,
  selectedLevel,
  selectedBacksideColor,
  sound,
  music,
  volume,
}: SettingsProps) {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form action="" className="settings-container-form">
        <InputLabel id="level">Level</InputLabel>
        <Select
          name="level"
          id="level"
          value={selectedLevel}
          onChange={({ target }) => handleSetting(target.name, target.value)}
          // onChange={({ target }) => console.log(target.name, target.value)}
        >
          <MenuItem value={0}>Easy</MenuItem>
          <MenuItem value={1}>Medium</MenuItem>
          <MenuItem value={2}>Hard</MenuItem>
          <MenuItem value={3}>Very Hard</MenuItem>
        </Select>

        <InputLabel id="BacksideColor">Backside Color</InputLabel>
        <Select
          name="BacksideColor"
          value={selectedBacksideColor}
          id="BacksideColor"
          onChange={({ target }) => handleSetting(target.name, target.value)}
        >
          <MenuItem value={1}>Type 1</MenuItem>
          <MenuItem value={2}>Type 2</MenuItem>
          <MenuItem value={3}>Type 3</MenuItem>
        </Select>

        <InputLabel id="Image">Image</InputLabel>
        <Select
          name="Image"
          id="Image"
          value={selectedCategory}
          onChange={({ target }) => handleSetting(target.name, target.value)}
        >
          <MenuItem value={"fruits"}>Fruits</MenuItem>
          <MenuItem value={"people"}>People</MenuItem>
          <MenuItem value={"animal"}>Animal</MenuItem>
        </Select>

        <label>
          <Checkbox
            color="primary"
            name="isSound"
            onChange={({ target }) =>
              handleSetting(target.name, target.checked)
            }
            checked={sound}
          />
          Sound
        </label>

        <label>
          <Checkbox
            color="primary"
            name="isMusic"
            onChange={({ target }) =>
              handleSetting(target.name, target.checked)
            }
            checked={music}
          />
          Music
        </label>
        <Typography id="continuous-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider            
              name="volume"
              id="volume"
              defaultValue={volume}
              onChange={(e, v) => handleVolume(v)}
              aria-labelledby="continuous-slider"
              step={10}
              marks
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
      </form>
      <MainMenuButton />
    </div>
  );
}

export default Settings;
