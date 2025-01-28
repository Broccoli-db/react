import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNameSync, setName, setAge, setSex } from "../../store/menu";
import { Button } from "antd";
export default function Index() {
  const dispatch = useDispatch();
  const { name, age, sex } = useSelector((state) => {
    return state.menu;
  });
  console.log(123);

  useEffect(() => {
    dispatch(setNameSync());
  }, []);
  const newName = useMemo(() => {
    return `我是${name}`;
  }, [name]);
  return (
    <div>
      <div>姓名：{name}</div>
      <div>年龄：{age}</div>
      <div>性别：{sex}</div>
      <div>{newName}</div>
      <Button onClick={() => dispatch(setName("王五"))}>修改姓名</Button>
      <Button onClick={() => dispatch(setAge(20))}>修改年龄</Button>
      <Button onClick={() => dispatch(setSex("女"))}>修改性别</Button>
    </div>
  );
}
