import React from "react";
import "./App.scss";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu/MainMenu";
import Footer from "./pages/Footer/Footer";
import Settings from "./pages/Settings/Settings";
import Score from "./pages/Score/Score";
import Game from "./pages/Game/Game";

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: "ghostwhite" }}>
        <div className="main">
          <Switch>
            <Route component={MainMenu} path="/" exact />
            <Route component={Game} path="/game" />
            <Route component={Settings} path="/settings" />
            <Route component={Score} path="/score" />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
