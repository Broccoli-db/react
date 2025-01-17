// 浏览器兼容
// import "react-app-polyfill/stable";
// import "react-app-polyfill/ie11";
// import "react-app-polyfill/ie9";

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.less";

import { createElement, render } from "@/JsxHandie";
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <div>
//     <h2>2025React</h2>
//     <div className="num">10</div>
//     <div className="num">20</div>
//     {React.createElement("button", { className: "btn" }, "按钮")}
//   </div>
// );

let jsxObj = createElement(
  "div",
  { id: "app" },
  "Hello, ",
  createElement("span", null, "world!"),
  createElement("span", null, "world!"),
  createElement("span", null, "world!"),
  createElement("span", null, "world!")
);
render(jsxObj, document.getElementById("root"));
console.log(jsxObj);

// 测试代理
// fetch("/jian/subscriptions/recommended_collections")
//   .then((res) => res.json())
//   .then((res) => console.log(res));
// fetch("/zhi/news/latest")
//   .then((res) => res.json())
//   .then((res) => console.log(res));
