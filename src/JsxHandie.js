export function createElement(ele, props, ...children) {
  let virtualDom = {
    $$typeof: Symbol("react.element"),
    key: null,
    props: {},
    ref: null,
    type: ele,
  };
  let len= children.length;
  if (props !== null) {
    virtualDom.props = {
      ...props,
    };
  }
  if(len===1) virtualDom.props.children = children[0];
  if (len > 1) virtualDom.props.children = children;
  return virtualDom;
}
