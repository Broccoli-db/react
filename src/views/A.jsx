import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export default function A() {
  return (
    <div>
      <NavLink to="/a/a1">A1</NavLink>
      <NavLink to="/a/a2">A2</NavLink>
      <NavLink to="/a/a3">A3</NavLink>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
