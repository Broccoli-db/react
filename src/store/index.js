import { createStore } from 'redux'
/*管理员：修改STORE容器中的公共状态*/
let initial = {
    name: 'admin',
    age: 18,
    sex: '男'
}
const reducer = (state = initial, action) => {
    // state:克隆一份初始状态
    state = { ...state }
    // state:存储STORE容器中的公共状态
    // action:每一次基于dispatch派发的时候，传递进来的行为对象(必须包含type属性，行为标识)
    switch (action.type) {
        case 'changeName':
            state.name = action.name
            break
        case 'changeAge':
            state.age = action.age
            break
        case 'changeSex':
            state.sex = action.sex
            break
    }
    // 返回的内容，会整体替换STORE容器中的内容
    return state
}
/*创建STORE公共容器*/
const store = createStore(reducer)
export default store