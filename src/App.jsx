import React from "react";
import Menu from "./views/Menu";
import Nav from "./views/Nav";
// 导出一个默认的App函数
export default function App() {
  // 返回一个div，其中包含Nav和Menu组件
  return (
    <div>
      <Menu />
      <Nav />
    </div>
  );
}
