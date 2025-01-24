import * as TYPE from "./action-typs"
let initialState = {
    name: '张三',
    age: 18,
    sex: '男',
}
const menu = (state = initialState, action) => {
    state = { ...state }
    switch (action.type) {
        case TYPE.MENU_SET_NAME:
            state.name = action.payload;
            break;
        case TYPE.MENU_SET_AGE:
            state.age = action.payload;
            break;
        case TYPE.MENU_SET_SEX:
            state.sex = action.payload;
            break;
        default:
    }
    return state;
}
export default menu;