import { createSlice } from "@reduxjs/toolkit";
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    name: "张三",
    age: 18,
    sex: "男",
    arr: [],
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setSex(state, action) {
      state.sex = action.payload;
    },
    setArr(state, action) {
      state.arr = action.payload;
    },
  },
});
export const { setName, setAge, setSex, setArr } = menuSlice.actions;
// 异步调用
export const setNameSync = () => {
  return async (dispatch) => {
    try {
      let res = await fetch("/jian/subscriptions/recommended_collections");
      let data = await res.json();
      dispatch(setArr(data));
    } catch (error) {
      console.log(error);
    }
  };
};
export default menuSlice.reducer;
