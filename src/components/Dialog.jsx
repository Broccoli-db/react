import React from "react";
function Dialog(props) {
  const { title, content, children } = props;
  const childrenArr = React.Children.toArray(children);
  return (
    <div className="dialog_box">
      <div className="dialog_title">{title}</div>
      <div className="dialog_content">{content}</div>
      <div className="footer" style={{ display: "flex" }}>
        {childrenArr}
      </div>
    </div>
  );
}

export default Dialog;
