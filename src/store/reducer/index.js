import { combineReducers } from "redux"
import menu from "./menu"
import nav from "./nav"
const reducer = combineReducers({
    menu,
    nav
})
export default reducer