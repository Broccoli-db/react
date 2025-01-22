import { Button } from 'antd'
import React, { useMemo, useState } from 'react'

export default function Dialog() {
  const [x, setX] = useState(1)
  const [y, setY] = useState(1)
  const [z, setZ] = useState(1)
  const num = useMemo(() => {
    console.log('num');
    return x + y
  }, [x, y])
  return (
    <div>
      <div>{num}</div>
      <div>{z}</div>
      <Button onClick={() => setX(x + 1)}>X增加</Button>
      <Button onClick={() => setZ(z + 1)}>Z增加</Button>
    </div>
  )
}

