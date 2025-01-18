// 浏览器兼容
// import "react-app-polyfill/stable";
// import "react-app-polyfill/ie11";
// import "react-app-polyfill/ie9";

import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.less";
import Dialog from "./components/Dialog";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ConfigProvider locale={zhCN}>
      <Dialog title="2025React" content="2025复习React" />
      <Dialog title="2025React" content="2025复习React">
        <button>看不下去</button>
        <button>再看一会吧</button>
      </Dialog>{" "}
    </ConfigProvider>
  </>
);

// 测试代理
// fetch("/jian/subscriptions/recommended_collections")
//   .then((res) => res.json())
//   .then((res) => console.log(res));
// fetch("/zhi/news/latest")
//   .then((res) => res.json())
//   .then((res) => console.log(res));
