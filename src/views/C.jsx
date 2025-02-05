import React, { useState, useTransition } from "react";
import sty from "./C.module.less"
export default function C() {
  const [isPending, startTransition] = useTransition();
  const [arr, steArr] = useState([
    {
      name: "tab1",
      active: true
    },
    {
      name: "tab2",
      active: false
    },
    {
      name: "tab3",
      active: false
    }
  ]);
  const [index, steIndex] = useState(0)
  const change = (index) => {
    startTransition(() => {
      steArr((pre) => {
        return pre.map((item, i) => {
          if (i === index) {
            item.active = true
          } else {
            item.active = false
          }
          return item
        })
      })
    })
    steIndex(index)
  }
  return <div>
    <div className={sty.tab}>
      {
        arr.map((item, index) => {
          return <div
            style={{ background: item.active ? "#ccc" : "#fff" }}
            onClick={() => change(index)}
          >
            {item.name}
          </div>
        })
      }
    </div>
    {index == 0 && <div>我是0</div>}
    {index == 1 && <div>
      {new Array(50000).fill(0).map((item, index) => {
        return <div key={index}>我是{index}</div>
      })
      }
    </div>}
    {index == 2 && <div>我是2</div>}
  </div>;
}
