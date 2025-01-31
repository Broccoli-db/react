import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import sty from "./A.module.less";
import RouterView from "../router";
import routers from "../router/routers";
import { Button } from "antd";
export default function A(props) {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    setArr(() => {
      return routers.filter((i) => {
        return i.name === "a";
      })[0].children;
    });
  }, []);
  const jump = () => {
    props.history.push({
      pathname: "/c",
      state: { name: "c" },
      search: "?name=c",
    });
  };
  return (
    <div className={sty.box}>
      <div className={sty.nav}>
        <NavLink to="/a/a1">A1</NavLink>
        <NavLink to="/a/a2">A2</NavLink>
        <NavLink to="/a/a3">A3</NavLink>
        <Button onClick={jump}>跳转到C组件</Button>
      </div>
      <div className={sty.content}>
        <RouterView routers={arr} />
      </div>
    </div>
  );
}
