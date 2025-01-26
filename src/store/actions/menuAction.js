import * as TYPE from "../reducers/action-type";
const menuAction = {
  setName() {
    return TYPE.MENU_SET_NAME;
  },
  setAge() {
    return TYPE.MENU_SET_AGE;
  },
  setSex() {
    return TYPE.MENU_SET_SEX;
  },
};
export default menuAction;
