import { combineReducers } from "redux";
import myCombineReducers from "./myCombineReducers";
import menuReducer from "./menu";
import navReducer from "./nav";
const reducers = myCombineReducers({
  menu: menuReducer,
  nav: navReducer,
});
export default reducers;
