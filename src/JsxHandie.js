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
export function render(virtualDom, container) {}

/*
  封装一个对象迭代的方法
  for/in方法。只能迭代可枚举 非Symbol类型的属性(不建议使用)，而且会迭代公有的和私有的，性能较差
  使用Object.getOwnPropertyNames()  ==>  获取对象所有的私有属性 （私有的）
  使用Object.getOwnPropertySymbols() ==> 获取对象所有的Symbol类型的属性
  Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
  等同于上方方法，但是不兼容IE
  Object.ownKeys();
*/
export function eachObject(obj, callback) {
  // 判断obj是否是对象
  if (obj === null || typeof obj !== "object")
    throw new TypeError(obj + " is not an object");
  // 判断callback是否是函数;
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  let keys = Object.keys(obj);
  keys.forEach((key) => {
    callback(key, obj[key]);
  });
}
