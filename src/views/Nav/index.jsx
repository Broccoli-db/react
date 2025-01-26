import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../storeContext";
import { Button } from "antd";
import actions from "../../store/actions";
export default function Index() {
  const store = useContext(StoreContext);
  console.log(store);
  const { name, age, sex } = store.getState().nav;
  const [blo, setBlo] = useState(false);
  const { navAction } = actions;
  const refresh = () => {
    setBlo(!blo);
  };
  useEffect(() => {
    const unSubscribe = store.subscribe(refresh);
    return () => {
      unSubscribe();
    };
  }, [blo]);
  const changeName = () => {
    console.log(navAction.setName());

    store.dispatch({
      type: navAction.setName(),
      payload: "王五",
    });
  };
  // 修改年龄
  const changeAge = () => {
    store.dispatch({
      type: navAction.setAge(),
      payload: 88,
    });
  };
  // 修改性别
  const changeSex = () => {
    store.dispatch({
      type: navAction.setSex(),
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
