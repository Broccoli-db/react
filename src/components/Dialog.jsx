import React, { useState, useRef } from "react";
import { flushSync } from "react-dom";
function Dialog(props) {
  const [num, setNum] = useState(1);
  const [num2, setNum2] = useState(2);
  const [num3, setNum3] = useState(() => {
    return 3;
  });
  const obj = useRef(num);
  console.log("渲染", num3);

  //   const edit = () => {
  //     flushSync(() => {
  //       setNum(num + 1);
  //       console.log("num", num);
  //     });
  //     setNum2(num2 + 1);
  //   };
  //   const editTow = () => {
  //     setNum((v) => {
  //       let newVal = v + 1;
  //       console.log("num回调", newVal);
  //       return newVal;
  //     });
  //     console.log("num外面", num);
  //     console.log("ref", obj);
  //   };
  // const edit = () => {
  //   // setTimeout(() => {
  //   setNum(num + 1);
  //   setNum2(num2 + 1);
  //   // }, 1000);
  // };
  // const edit = () => {
  //   for (let i = 0; i < 10; i++) {
  //     setNum(num + i);
  //   }
  // };
  const edit = () => {
    for (let i = 0; i < 10; i++) {
      flushSync(() => {
        setNum((v) => {
          let p = v + 1
          return p
        });
      })
    }
  };
  return (
    <div className="dialog_box">
      <div>{num}</div>
      {/* <button onClick={edit}>num+1</button>
      <button onClick={editTow}>num+1</button> */}
      <button onClick={edit}>num+1</button>
    </div>
  );
}

export default Dialog;
