// 模拟基础createElement：创建虚拟dom对象
export function createElement(ele, props, ...children) {
  let virtualDom = {
    $$typeof: Symbol("react.element"),
    key: null,
    props: {},
    ref: null,
    type: ele,
  };
  let len = children.length;
  if (props !== null) {
    virtualDom.props = {
      ...props,
    };
  }
  if (len === 1) virtualDom.props.children = children[0];
  if (len > 1) virtualDom.props.children = children;
  return virtualDom;
}
// 模拟基础render：将虚拟dom对象
export function render(virtualDom, container) {
  let { type, props } = virtualDom;
  if (typeof type === "string") {
    // 创建一个标签
    let ele = document.createElement(type);
    // 将属性添加到标签上以及子节点
    eachObject(props, (key, value) => {
      // className的处理
      if (key === "className") {
        ele.className = value;
        return;
      } else if (key === "style") {
        // 样式的处理
        eachObject(value, (styleKey, styleValue) => {
          ele.style[styleKey] = styleValue;
        });
        return;
      } else if (key === "children") {
        // 处理子节点
        let children = value;
        if (!Array.isArray(children)) children = [children];
        children.forEach((child) => {
          if (/^(string|number)$/.test(typeof child)) {
            ele.appendChild(document.createTextNode(child));
            return;
          }
          render(child, ele);
        });
        return;
      }
      ele.setAttribute(key, value);
    });
    container.appendChild(ele);
  }
}

/*
  封装一个对象迭代的方法
  for/in方法。只能迭代可枚举 非Symbol类型的属性(不建议使用)，而且会迭代公有的和私有的，性能较差
  使用Object.getOwnPropertyNames()  ==>  获取对象所有的私有属性 （私有的）
  使用Object.getOwnPropertySymbols() ==> 获取对象所有的Symbol类型的属性
  Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
  等同于上方方法，但是不兼容IE
  Object.ownKeys();
  Reflect.ownKeys(obj)
*/
export function eachObject(obj, callback) {
  // 判断obj是否是对象
  if (obj === null || typeof obj !== "object")
    throw new TypeError(obj + " is not an object");
  // 判断callback是否是函数;
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  let keys = Reflect.ownKeys(obj);
  console.log(keys);
  keys.forEach((key) => {
    callback(key, obj[key]);
  });
}

// 模拟一个简单useState

/*
*_state：存储状态
*_index：存储索引值
*/
let _state = [],
  _index = 0;
// 通知更新视图
let defer = (cb) => Promise.resolve().then(cb);
export function useState(initialState) {
  // 储存对应的索引值
  let currenIndex = _index
  if (typeof initialState === 'function') {
    initialState = initialState()
  }
  _state[currenIndex] = _state[currenIndex] || initialState;
  let setState = (newState) => {
    // 如果是函数更新
    if (typeof newState === 'function') {
      newState = newState(_state[currenIndex])
    }
    _state[currenIndex] = newState;
    if (_index !== 0) {
      defer(renderComponent)
    }
    _index = 0
  }
  _index += 1;
  return [_state[currenIndex], setState]
}