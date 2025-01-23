import React, { useContext, useState, useEffect } from 'react'
import sty from './index.module.less'
import ancestorsContext from '../../ancestorsContext'
import { Button } from 'antd'
export default function Menu() {
    const state = useContext(ancestorsContext)
    const { name, age, sex } = state.getState()
    const [num, setNum] = useState(0)
    const addNum = () => {
        setNum(num + 1)
    }
    useEffect(() => {
        let unsubscribe = state.subscribe(addNum)
        return () => {
            unsubscribe()
        }
    }, [num])
    // 修改姓名
    const changeName = () => {
        state.dispatch({ type: 'changeName', name: '张三' })
    }
    // 修改年龄
    const changeAge = () => {
        state.dispatch({ type: 'changeAge', age: 20 })
    }
    // 修改性别
    const changeSex = () => {
        state.dispatch({ type: 'changeSex', sex: '女' })
    }
    return (
        <div className={`${sty.menu} ${sty.box}`}>
            <div>姓名：{name}</div>
            <div>年龄：{age}</div>
            <div>性别：{sex}</div>
            <Button onClick={changeName}>修改姓名</Button>
            <Button onClick={changeAge}>修改年龄</Button>
            <Button onClick={changeSex}>修改性别</Button>
        </div>
    )
}
