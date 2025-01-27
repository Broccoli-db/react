import React, { useContext, useEffect, useState } from "react";
import { Button } from "antd";
// import { connect } from "react-redux";
import { connect } from "../../myReactRedux";
import actions from "../../store/actions";
function Index(props) {
  console.log(props);

  const { name, age, sex } = props;
  const changeName = () => {
    props.dispatch({
      type: actions.navAction.setName(),
      payload: "王五",
    });
  };
  // 修改年龄
  const changeAge = () => {
    props.dispatch({
      type: actions.navAction.setAge(),
      payload: "88",
    });
  };
  // 修改性别
  const changeSex = () => {
    props.dispatch({
      type: actions.navAction.setSex(),
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
export default connect((state) => state.nav)(Index);
