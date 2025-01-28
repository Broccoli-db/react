import { configureStore } from "@reduxjs/toolkit";
import menu from "./menu";
const store = configureStore({
  reducer: {
    menu,
  },
});
export default store;
