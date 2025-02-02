import { Button } from "antd";
import React, { useState } from "react";

export default function B() {
  const [num, setNum] = useState(0);
  return (
    <div>
      {num}
      <Button onClick={() => setNum(num + 1)}></Button>
    </div>
  );
}
