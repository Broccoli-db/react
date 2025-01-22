import { Button } from 'antd'
import React, { useState, memo, useCallback, forwardRef } from 'react'

const Son = memo(forwardRef(() => {
  console.log("我是子组件");
  return (
    <div>
      <h1>我是子组件</h1>
    </div>
  )
}))

function Dialog() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const hadelleClick = useCallback(() => {

  }, [x])
  return (
    <div>
      <h1>我是父组件</h1>
      <Button onClick={() => setX(x + 1)}>点击X</Button>
      <Button onClick={() => setY(y + 1)}>点击y</Button>
      <Son hadelleClick={hadelleClick} />
    </div>
  )
}
export default Dialog