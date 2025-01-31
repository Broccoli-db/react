import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const RouterView = (props) => {
  let { routers } = props;
  return (
    <Switch>
      {routers.map((item, index) => {
        let { redirect, from, to, exact, path, component: Component } = item;
        let config = {};
        if (redirect) {
          config = { to };
          if (from) {
            config.from = from;
          }
          if (exact) {
            config.exact = exact;
          }
          return <Redirect key={index} {...config} />;
        }
        config = { path };
        if (exact) {
          config.exact = exact;
        }
        return (
          <Route
            key={index}
            {...config}
            render={(props) => {
              return (
                <Suspense fallback={<>正在加载中...</>}>
                  <Component {...props}></Component>
                </Suspense>
              );
            }}
          ></Route>
        );
      })}
    </Switch>
  );
};
export default RouterView;
