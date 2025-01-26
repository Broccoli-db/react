import * as TYPE from "./action-type";
let initialState = {
  name: "李四",
  age: 18,
  sex: "男",
};
const navReducer = (state = initialState, action) => {
  state = { ...state };
  switch (action.type) {
    case TYPE.NAV_SET_NAME:
      state.name = action.payload;
      break;
    case TYPE.NAV_SET_AGE:
      state.age = action.payload;
      break;
    case TYPE.NAV_SET_SEX:
      state.sex = action.payload;
      break;
    default:
      break;
  }
  return state;
};
export default navReducer;
