import { Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
// import { connect } from "react-redux";
import { connect } from "../../myReactRedux";

import actions from "../../store/actions";
function Index(props) {
  const { name, age, sex, dispatch } = props;
  // 修改姓名
  // 定义一个名为changeName的函数，目前函数体为空
  const changeName = () => {
    dispatch({
      type: actions.menuAction.setName(),
      payload: "刘六",
    });
  };
  // 修改年龄
  const changeAge = () => {
    dispatch({
      type: actions.menuAction.setAge(),
      payload: 78,
    });
  };
  // 修改性别
  const changeSex = () => {
    dispatch({
      type: actions.menuAction.setSex(),
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
export default connect((state) => state.menu)(Index);
