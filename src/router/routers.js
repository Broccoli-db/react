import { Navigate } from "react-router-dom";
import { lazy } from "react";
import A from "../views/A";
export default [
  {
    path: "/",
    element: () => <Navigate to="/a" />,
  },
  {
    path: "/a",
    name: "a",
    element: A,
    children: [
      {
        path: "/a",
        element: () => <Navigate to="/a/a1" />,
      },
      {
        path: "/a/a1",
        element: lazy(() => import("../views/A/A1")),
        children: [],
        meta: {},
        name: "a1",
      },
      {
        path: "/a/a2",
        element: lazy(() => import("../views/A/A2")),
        children: [],
        meta: {},
        name: "a2",
      },
      {
        path: "/a/a3",
        element: lazy(() => import("../views/A/A3")),
        children: [],
        meta: {},
        name: "a3",
      },
    ],
    meta: {},
  },
  {
    path: "/b",
    name: "b",
    element: lazy(() => import("../views/B")),
    children: [],
    meta: {},
  },
  {
    path: "/c",
    name: "c",
    element: lazy(() => import("../views/C")),
    children: [],
    meta: {},
  },
];
