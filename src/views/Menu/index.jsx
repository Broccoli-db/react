import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../storeContext";
import actions from "../../store/actions";
export default function Index() {
  const store = useContext(StoreContext);
  console.log(actions);
  const { menuAction } = actions;
  const { name, age, sex } = store.getState().menu;
  const [blo, steBlo] = useState(false);
  const refresh = () => {
    steBlo(!blo);
  };
  useEffect(() => {
    let unSubscribe = store.subscribe(refresh);
    return () => {
      unSubscribe();
    };
  }, [blo]);
  // 修改姓名
  const changeName = () => {
    store.dispatch({
      type: menuAction.setName(),
      payload: "王五",
    });
  };
  // 修改年龄
  const changeAge = () => {
    store.dispatch({
      type: menuAction.setAge(),
      payload: 88,
    });
  };
  // 修改性别
  const changeSex = () => {
    store.dispatch({
      type: menuAction.setSex(),
      payload: "女",
    });
  };
  return (
    <div>
      <div>姓名：{name}</div>
      <div>年龄：{age}</div>
      <div>性别：{sex}</div>
      <Button onClick={changeName}>修改姓名</Button>
      <Button onClick={changeAge}>修改年龄</Button>
      <Button onClick={changeSex}>修改性别</Button>
    </div>
  );
}
