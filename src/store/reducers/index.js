import { combineReducers } from "redux";
import menuReducer from "./menu";
import navReducer from "./nav";
const reducers = combineReducers({
  menu: menuReducer,
  nav: navReducer,
});
export default reducers;
