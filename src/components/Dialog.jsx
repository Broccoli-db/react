import { Button } from 'antd'
import React, { useState, memo, useCallback, forwardRef } from 'react'
const useAllState = (val) => {
  let [state, setState] = useState(() => {
    return typeof val === "function" ? val() : val
  })
  const setObjState = (newVal) => {
    if (typeof newVal === "function") {
      newVal = newVal(state)
    }
    setState((pre) => {
      if (Object.prototype.toString.call(newVal).includes("Object")) {
        return { ...pre, ...newVal }
      } else {
        return newVal
      }
    })
  }
  return [state, setObjState]
}
function Dialog() {
  const [state, setState] = useAllState({
    name: "张三",
    age: 18
  })
  const [arr, setArr] = useAllState([1, 2, 3, 4, 5, 6])
  const [name, setName] = useAllState("张三")
  const [num, setnum] = useAllState(1)
  const [blo, setBlo] = useAllState(false)

  const [name1, setName1] = useAllState(() => {
    console.log("渲染1");

    return "张三"
  })
  const [num1, setnum1] = useState(() => {
    console.log("渲染2");

    return 1
  })
  const handleClick = () => {
    setState({ name: "李四" })
  }
  const handleAge = () => {
    setArr((v) => {
      return v.map(i => i + 1)
    })
  }
  const handleName = () => {
    setName("李四")
    setnum(2)
    setBlo(true)
  }
  return (
    <div>
      <Button onClick={handleClick}>修改对象</Button>
      <p>{state.name}</p>
      <p>{state.age}</p>


      <Button onClick={handleAge}>添加修改数组</Button>
      {arr.map((item, index) => {
        return <p key={index}>{item}</p>
      })
      }
      <Button onClick={handleName}>修改字符串/数组/布尔值</Button>
      <p>{name}</p>
      <p>{num}</p>
      <p>{blo ? "true" : "false"}</p>
    </div>
  )
}
export default Dialog