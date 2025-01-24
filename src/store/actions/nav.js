import * as TYPE from "../reducer/action-typs"
const nav = {
    setWork() {
        return TYPE.NAV_SET_WORK
    },
    setSeniority() {
        return TYPE.NAV_SET_SENIORITY
    },
    setWages() {
        return TYPE.NAV_SET_WAGES  
    }
}
export default nav