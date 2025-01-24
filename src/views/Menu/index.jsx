import React, { useContext, useState, useEffect } from 'react'
import StoreContext from '../../storeConText'
import { Button } from 'antd';
import actions from '../../store/actions';
export default function Index() {
    const state = useContext(StoreContext)
    const { name, age, sex } = state.getState().menu
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
            <div>姓名：{name}</div>
            <div>年纪：{age}</div>
            <div>性别：{sex}</div>
            <Button onClick={() => {
                state.dispatch({
                    type: actions.menu.setName(),
                    payload: '王五'
                })
            }}>修改姓名</Button>
            <Button onClick={() => {
                state.dispatch({
                    type: actions.menu.setAge(),
                    payload: 20
                })
            }}>修改年纪</Button>
            <Button onClick={() => {
                state.dispatch({
                    type: actions.menu.setSex(),
                    payload: '女'
                })
            }}>修改性别</Button>
        </div>
    )
}

