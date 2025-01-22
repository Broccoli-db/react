import React from "react";
import sty from "./index.module.less";
import { Button } from "antd";
// 导航组件
function Nav() {
  // 返回一个div，包含导航组件的内容
  return (
    <div className={`${sty.nav} ${sty.box}`}>
      我是导航组件
      <div className="num">2025</div>
      <div className={sty.name}>王五</div>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}

const Hoc = (Component) => {
  return (props) => {
    console.log(props);
    return <Component {...props} />;
  };
};

export default Hoc(Nav);
