import React from "react";
import Nav from "./views/Nav";
import Menu from "./views/Menu";
// 导出一个默认的App函数
export default function App() {
  // 返回一个div，其中包含Nav和Menu组件
  return (
    <div>
      <Nav x={1} y={1} />
      <Menu />
    </div>
  );
}
