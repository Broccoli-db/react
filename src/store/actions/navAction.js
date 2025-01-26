import * as TYPE from "../reducers/action-type";
const navAction = {
  setName() {
    return TYPE.NAV_SET_NAME;
  },
  setAge() {
    return TYPE.NAV_SET_AGE;
  },
  setSex() {
    return TYPE.NAV_SET_SEX;
  },
};
export default navAction;
