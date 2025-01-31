import React from "react";
import { HashRouter, Link } from "react-router-dom";
import sty from "./App.module.less";
import RouterView from "./router";
import routers from "./router/routers";
export default function App() {
  return (
    <HashRouter>
      {/* 导航部分 */}
      <nav className={sty.nav}>
        <Link to="/a">A</Link>
        <Link to="/b">B</Link>
        <Link to="/c">C</Link>
      </nav>
      {/* 路由容器:每一次页面加载或者路由切换完毕，
      都会根据当前的哈希值，到这里和每一个Router进行匹配 */}
      <div className="">
        <RouterView routers={routers}></RouterView>
      </div>
    </HashRouter>
  );
}
