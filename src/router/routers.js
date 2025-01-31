/*
配置路由表：数组，数组中每一项就是一个需要配置的路由规则
    + redirect：true 此配置是重定向
    + from：来源的地址
    + to：重定向的地址
    + exact：是否精准匹配
    + path：路由的路径
    + component：路由对应的组件
    + name:路由名称
    + meta：{} 路由元信息(包含路由的一些信息)
    + children：[] 子路由
*/
import { lazy } from "react";
import A from "../views/A";
const routers = [
  {
    redirect: true,
    from: "/",
    to: "/a",
    exact: true,
  },
  {
    path: "/a",
    component: A,
    name: "a",
    meta: {},
    children: [
      {
        redirect: true,
        from: "/a",
        to: "/a/a1",
        exact: true,
      },
      {
        path: "/a/a1",
        component: lazy(() =>
          import(/* webpackChunkName:"AChild"*/ "../views/A/A1")
        ),
        name: "a1",
        meta: {},
        children: [],
      },
      {
        path: "/a/a2",
        component: lazy(() =>
          import(/* webpackChunkName:"AChild"*/ "../views/A/A2")
        ),
        name: "a2",
        meta: {},
        children: [],
      },
      {
        path: "/a/a3",
        component: lazy(() =>
          import(/* webpackChunkName:"AChild"*/ "../views/A/A3")
        ),
        name: "a3",
        meta: {},
        children: [],
      },
    ],
  },
  {
    path: "/b",
    component: lazy(() => import("../views/B")),
    name: "b",
    meta: {},
    children: [],
  },
  {
    path: "/c",
    component: lazy(() => import("../views/C")),
    name: "c",
    meta: {},
    children: [],
  },
  {
    redirect: true,
    to: "/a",
  },
];
export default routers;
