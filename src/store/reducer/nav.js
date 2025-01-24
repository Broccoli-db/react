import * as TYPE from './action-typs'
let initialState = {
    work: "切图仔",
    seniority: "1年",
    wages: "3k",
}
const nav = (state = initialState, action) => {
    state = { ...state }
    switch (action.type) {
        case TYPE.NAV_SET_WORK:
            state.work = action.payload
            break
        case TYPE.NAV_SET_SENIORITY:
            state.seniority = action.payload
            break
        case TYPE.NAV_SET_WAGES:
            state.wages = action.payload
            break
        default:
            break
    }
    return state
}
export default nav