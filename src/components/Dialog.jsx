import React, { useContext, useState } from 'react'
import ContextObject from '../contextObject'
function Dialog() {
  const [age, setAge] = useState(18)
  const [name, setName] = useState("张三")
  const chage = () => {
    setAge(age + 1)
    setName("李四")
  }
  return (
    <ContextObject.Provider value={{
      age,
      name,
      chage
    }}>
      <div>
        <p>祖先组件</p>
        <Child />
      </div>
    </ContextObject.Provider>

  )
}
// 子组件
const Child = () => {
  const { age, name, chage } = useContext(ContextObject)
  console.log(age, name, chage, "子组件");

  return (
    <div>
      <p>子组件</p>
      <GrandChild />
    </div>
  )
}
// 孙组件
const GrandChild = () => {
  const { age, name, chage } = useContext(ContextObject)
  console.log(age, name, chage, "孙组件");

  return <div>
    <p>孙组件</p>
  </div>
}
export default Dialog