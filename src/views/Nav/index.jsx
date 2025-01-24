import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'antd';
import StoreContext from '../../storeConText'
import actions from '../../store/actions'
export default function Index() {
    const state = useContext(StoreContext)
    const { work, seniority, wages } = state.getState().nav
    const [blo, setBlo] = useState(false)
    const changeBlo = () => {
        setBlo(!blo)
    }
    useEffect(() => {
        let unSubscribe = state.subscribe(changeBlo)
        return () => {
            unSubscribe()
        }
    }, [blo])

    return (
        <div>
            <div>工作：{work}</div>
            <div>工龄：{seniority}</div>
            <div>工资：{wages}</div>
            <Button onClick={() => {
                state.dispatch({
                    type: actions.nav.setWork(),
                    payload: '前端工程师'
                })
            }}>修改工作</Button>
            <Button onClick={() => {
                state.dispatch({
                    type: actions.nav.setSeniority(),
                    payload: "4年"
                })
            }}>修改工龄</Button>
            <Button onClick={() => {
                state.dispatch({
                    type: actions.nav.setWages(),
                    payload: "百万年薪"
                })
            }}>修改工资</Button>
        </div>
    )
}
