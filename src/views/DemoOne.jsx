import React from "react";
import PropTypes from "prop-types";
function DemoOne(props) {
  const { children } = props;
  props.style.fontSize = "30px";
  let childrenArr = React.Children.toArray(children);
  let head = [];
  let defaultC = [];
  let foot = [];
  childrenArr.forEach((i) => {
    console.log(i);

    if (i.props.slot === "head") {
      head.push(i);
    } else if (i.props.slot === "foot") {
      defaultC.push(i);
    } else {
      foot.push(i);
    }
  });
  console.log(head, defaultC, foot);
  return (
    <div>
      {head}
      <div>
        <div>DemoOne</div>
        {defaultC}
      </div>
      {foot}
    </div>
  );
}
// DemoOne.defaultProps = {
//   y: 23,
// };
// DemoOne.prototype = {
//   z: PropTypes.string.isRequired,
// };
export default DemoOne;
