// 浏览器兼容
// import "react-app-polyfill/stable";
// import "react-app-polyfill/ie11";
// import "react-app-polyfill/ie9";

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.less";
import DemoOne from "./views/DemoOne";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <DemoOne title="demo" x={10} className="demo" style={{ fontSize: "20px" }}>
      <div slot="head">123</div>
      <div>456</div>
      <div slot="foot">789</div>
    </DemoOne>
  </>
);

// 测试代理
// fetch("/jian/subscriptions/recommended_collections")
//   .then((res) => res.json())
//   .then((res) => console.log(res));
// fetch("/zhi/news/latest")
//   .then((res) => res.json())
//   .then((res) => console.log(res));
