import { Button } from "antd";
import React, { useRef, useState, useEffect, useImperativeHandle } from "react";

const Dialog = React.forwardRef((props, ref) => {
  const [num, setNum] = useState(1);
  const handleClick = () => {
    console.log(123456);

  }
  useImperativeHandle(ref, () => ({
    handleClick,
  }))
  return (
    <div className="dialog_box">
      <div ref={ref}>{num}</div>
    </div>
  );
})
const Dialog2 = () => {
  const n = useRef()
  useEffect(() => {
    console.log(n.current);
  })
  return <>
    <Button onClick={() => n.current.handleClick()}>点击</Button>
    <Dialog ref={n} />
  </>
}
export default Dialog2;
