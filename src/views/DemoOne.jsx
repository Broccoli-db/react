import React from "react";
import PropTypes from "prop-types";
function DemoOne(props) {
  props.style.fontSize = "30px";
  console.log(props);
  console.log(Object.isFrozen(props));
  return <div>DemoOne</div>;
}
DemoOne.defaultProps = {
  y: 23,
};
DemoOne.prototype = {
  z: PropTypes.string.isRequired,
};
export default DemoOne;
