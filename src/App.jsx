import React from "react";
import { HashRouter, NavLink } from "react-router-dom";
import sty from "./App.module.less";
import RouterView from "./router";

export default function App() {
  return (
    <HashRouter>
      <div>
        <div className={sty.nav}>
          <NavLink to="/a">A</NavLink>
          <NavLink to="/b">B</NavLink>
          <NavLink to="/c">C</NavLink>
        </div>
        <div>
          <RouterView></RouterView>
        </div>
      </div>
    </HashRouter>
  );
}
