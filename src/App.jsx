import React from "react";
import { HashRouter, NavLink } from "react-router-dom";
import sty from "./App.module.less";
import RouterView from "./router";
import { KeepAliveProvider, withKeepAlive } from "keepalive-react-component";
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
          {/* 使用KeepAliveProvider把路由配置包裹 */}
          <KeepAliveProvider>
            <RouterView></RouterView>
          </KeepAliveProvider>
        </div>
      </div>
    </HashRouter>
  );
}
