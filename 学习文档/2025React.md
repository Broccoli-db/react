### 2025React

##### 一，创建React脚手架

```
命令 npx create-react-app 项目名称
命令 treer -i "node_modules" 获取项目文件树
├─src
|  └index.js
├─scripts
|    ├─build.js									后期执行相关打包命令的入口文件
|    ├─start.js									
|    └test.js
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─logo192.png
|   ├─logo512.png
|   ├─manifest.json
|   └robots.txt
├─config
|   ├─env.js
|   ├─getHttpsConfig.js
|   ├─modules.js	
|   ├─paths.js									打包中需要的一些路径管理
|   ├─webpack.config.js							打包规则配置
|   ├─webpackDevServer.config.js				webpackDevServer的配置
|   ├─webpack
|   |    ├─persistentCache
|   |    |        └createEnvironmentHash.js
|   ├─jest
|   |  ├─babelTransform.js
|   |  ├─cssTransform.js
|   |  └fileTransform.js

```

##### 二，配置less less-loader 插件

```
pnpm i less less-loader@8 
在webpack.config.js配置less less-loadder插件	
找到了原本的sass处理路径修改成less
1.
    const sassRegex = /\.(scss|sass)$/;
    const sassModuleRegex = /\.module\.(scss|sass)$/;
    替换
    const lessRegex = /\.less$/;
    const lessModuleRegex = /\.module\.less$/;

2.
	找到webpackEnv的函数，找到module模块
 	sassRegex以及sassModuleRegex  替换lessRegex以及lessModuleRegex
```

##### 三，配置别名

```
在webpack.config.js找到webpackEnv的函数，找到resolve模块下的alias对象添加
"@":paths.appSrc
```

##### 四，修改启动域名以及端口号

```
在start.js文件中找到
1.
    const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    替换
    const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
	const HOST = process.env.HOST || '127.0.01';
通过环境变量修改
下载插件 cross-env
在package.json中找到scripts启动命令处
1.
    "start": " node scripts/start.js",
     替换
    "start": "cross-env PORT=8080 node scripts/start.js",
```

##### 五，修改浏览器兼容

```
在index.js入口文件中添加
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";
以及兼容ie11 ie9  stable
```

##### 六，跨域代理

```js
在src下创建setupProxy.js文件
安装插件 pnpm i http-proxy-middleware
在setupProxy.js书写以下代码


1.http-proxy-middleware 2.0版本


    const { createProxyMiddleware } = require("http-proxy-middleware");
    module.exports = function (app) {
      app.use(
        createProxyMiddleware("/jian", {
          target: "https://www.jianshu.com/asimov",
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            "^/jian": "",
          },
        })
      );
      app.use(
        createProxyMiddleware("/zhi", {
          target: "https://news-at.zhihu.com/api/4",
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            "^/zhi": "",
          },
        })
      );
    };


2.http-proxy-middleware 3.0版本

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/jian",
    createProxyMiddleware({
      target: "https://www.jianshu.com/asimov",
      changeOrigin: true,
      pathRewrite: {
        "^/jian": "",
      },
    })
  );
  app.use(
    "/zhi",
    createProxyMiddleware({
      target: "https://news-at.zhihu.com/api/4",
      changeOrigin: true,
      pathRewrite: {
        "^/zhi": "",
      },
    })
  );
};
```

##### 七，React，Vue，Anglar(NG)

```
主流思想：
	不直接操作DOM,数据驱动视图
	数据发生改变时，会让页面刷新
		构建了一套虚拟DOM到真实DOM的渲染体系
		有效避免了DOM的重排和重绘
操作DOM:
	操作DOM比较消化性能（可能会导致DOM重排/重绘）

React框架采用的是MVC体系；Vue框架采用的是MVVM体系
```

##### 八，MVC

```
MVC：model数据层 + view视图层 + controller控制层
	 数据层受到改变那么视图层则会刷新页面，视图层操作按钮等改变数据，则会通过React合成事件监听到，然后写业务		逻辑改变数据
	 ***单向数据驱动***
```

<img src="..\学习文档\MVC.png" alt="MVC" style="zoom:50%;" />

##### 九，MVVM

```
MVVM:model数据层 + view视图层 + vievModel数据/视图监听层
	**双向驱动**
```

<img src="..\学习文档\MVVM.png" alt="MVVM" style="zoom:50%;" />

##### 十，JSX构建视图的基础知识

```
JSX：javaScript and html（xml）把js和HTML标签混合在一起
```

##### 十一,React基础渲染过程

```
通过ReactDom.createRoot获取到index.html的root元素
在使用reder方法渲染进去
```

##### 十二，稀疏数组以及密集数组

```
稀疏数组：数组的每一项都为空，无法使用数组的自身的循环方法，可以使用fill填充为密集数组
密集数组：数组的每一项都是一个真实的值
```

##### 十三，关于JSX底层处理机制

```jsx
1.把我们编写的JSX语法，编译为虚拟DOM对象（virtualDOM）
	虚拟DOM对象：框架自己内部构建的一套对象体系（对象相关成员都是React内部规定的），基于这些属性描述出，	  	  我们所构建视图中的DOM节点相关特征
	
	@1 基于bael-peset-react-app 把jSX编译为React.createElement(...)格式
	@2 再把createElement方法执行，创建出虚拟DOM
                                                         
	jsx语法
	<div id="app">Hello, <span>world!</span></div>;
	转换
	React.createElement(
      'div',
      {
         id: 'app',
      },
        "Hello,",
         React.createElement("span",null，world!)                                             
    )
    
	React.createElement函数:
    参数1:标签(组件)名称，参数2：标签属性对象(无属性为Null)，参数3以及后面参数：标签子节点
    
	React.createElement函数函数返回值：虚拟DOM对象(4个属性)
	key:循环渲染所需要的key值
    props对象：存放自身的属性和内容以及子节点存放在children
    ref：
    type：标签名称
    
    手写简单的createElement方法
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
    

2.把构建的虚拟DOM渲染为真实DOM
	真实DOM：浏览器页面中，最后渲染出来，让用户看见的DOM元素！！！
    
    React16版本：
    React.render(
    	<>...</>,
        documen.getElementById('root')
    )
	
    React18版本：
    const root = ReactDOM.createElement(document.getElementByid('root'))
    root.render(
    	<>...</>
    )
    
	手写简单的render方法
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

补充说明：第一次渲染页面是直接从虚拟DOM转为真实DOM，但是后期更新的时候，需要经过diff算法对比，对比出新旧DOM树的差异部分，然后渲染出差异的虚拟DOM

JSX语法无法选择对象，但是可以通过React.createElement("button",{ className: "btn" }, "按钮")渲染一个对象
```

<img src="..\学习文档\JSX渲染机制.png" alt="JSX渲染机制" style="zoom: 67%;" />

##### 十四，封装一个简单的迭代对象方法

```jsx
/*
  封装一个对象迭代的方法
  for/in方法。只能迭代可枚举 非Symbol类型的属性(不建议使用)，而且会迭代公有的和私有的，性能较差
  使用Object.getOwnPropertyNames()  ==>  获取对象所有的私有属性 （私有的）
  使用Object.getOwnPropertySymbols() ==> 获取对象所有的Symbol类型的属性
  Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
  等同于上方方法，但是不兼容IE
  Object.ownKeys();
  Reflect.ownKeys()
*/

export function eachObject(obj, callback) {
  // 判断obj是否是对象
  if (obj === null || typeof obj !== "object")
    throw new TypeError(obj + " is not an object");
  // 判断callback是否是函数;
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  let keys =   Reflect.ownKeys(obj);
  keys.forEach((key) => {
    callback(key, obj[key]);
  });
}
```

##### 十五，函数组件渲染的机制

```jsx
@1 基于bale-presset-react-app把调用的组件转换为createElement格式
@2 再把createElement方法执行，创建出虚拟DOM

    React.createElement(DemoOne, {
          title: "demo",
          x: 10,
          className: "demo",
          style: {
            fontSize: "20px"
          }
    });

	转换为虚拟DOM对象
    {
        $$typeof:Symbol(react.element),
        key:null,
        ref:null,
        props:{ title: "demo",
          x: 10,
          className: "demo",
          style: {
            fontSize: "20px"
          }},
        type:DemoOne
    }
@3通过rendr方法把虚拟DOM变为真实DOM
 
	转换过程中会把函数执行
    把虚拟DOM的props作为实参传递给函数
    最后把函数执行的返回结果基于rendr方法转为真实DOM,最后转为真实DOM
    
```

##### 十六，函数组件props相关细节处理

```
@1只读，不允许修改
	对象本身可设置规则：冻结，密封，不可扩展
	
	冻结：
		Object.freeze(obj),无法修改，无法新增，无法删除以及无法做劫持。
		Object.freeze(obj)冻结只是浅冻结，无法做到深冻结，只能递归
		检测对象是否被冻结 Object.isFrozen(obj)。
		
	密封：
		Object.seal(obj)无法新增，无法删除，可修改，不可被劫持
		Object.seal(obj)密封只是浅密封，无法做到深密封，只能递归
		检测对象是否被密封 Object.isSealed(obj)
		
	不可扩展：
		Object.preventExtensions(obj)可修改可删除不可新增，可被劫持
		Object.preventExtensions()不可扩展也是浅层的
		检测对象是否被不可扩展 Object.isExtensible(obj)
	
	设置props的属性默认值：
		函数组件.defaultProps={
			key：value
		}
		
	设置props的属性规则：
		使用插件prop-types
		improt PropTypes fome "prop-types"
        函数组件.propTypes={
            key:PropTypes.string.isRequired  //类型：字符串 必传
            key:PropTypes.number			 //类型：数字 不必传
        }
```

##### 十七，关于函数组件的插槽机制

```jsx
 使用props.children 
 
 默认插件
 父组件： 
 	import Son from "./son"
 	function  Father(){
 		return (
        	<>
            	<Son>
                	<div>123</div>
            	</Son>
            	<Son>
            		<div>123</div>
                	<div>456</div>
            	</Son>
            </>
        )
 	}
 	exprot default Father
 
 子组件：
 	function  Son(props){
 		return (
 			<>
 				<div></div>
            	{props.children}
 			</>
 		)
 	}
 	exprot default Father

对props.childern进行判断拆开使用

	使用React.Children.toArray(children)内置方法转为数组
    
	improt React from 'react'
    function  Son(props){
        let children = React.Children.toArray(props.children)
            return (
                <>
                 	{children[1]}
                    <div>456</div>
                    {children[0]}
                </>
            )
        }
 	exprot default Father

具名插槽
	 父组件： 
 	import Son from "./son"
 	function  Father(){
 		return (
        	<>
            	<Son>
            		<div slot="header">123</div>
                	<div>456</div>
                	<div slot="footer">789</div> 
            	</Son>
            </>
        )
 	}
 	exprot default Father
 
 子组件：
	improt React from 'react'
 	function  Son(props){
    let children = React.Children.toArray(props.children)
    let header=[]
    let default=[]
    let footer=[]
    children.foeEach(i=>{
        if(i.props.slot==="header"){
           header.push(i) 
        }else if(i.props.slot==="footer"){
            default.push(i) 
        }else{
            footer.push(i) 
        }
    })
 		return (
 			<>
 				<div></div>
            	{props.children}
 			</>
 		)
 	}
 	exprot default Father
```

##### 十八，静态组件以及动态组件

```
函数组件是"静态组件"：
	第一次渲染组件，把函数执行
        产生一个私有的上下文
        把解析出来的props(含children)传递进来（但是被冻结了）
        对函数返回的JSX元素虚拟DOM对象进行渲染
    当我们去修改数据的时候
    	修改上级上下文的变量
    	私有变量会发生改变
    	但是视图不会更新
    	
类组件以及Hooks组件都属于动态组件
	render函数在渲染的时候，如果type是new 开头的，则会用new创建一个类的实例执行，也会把props传递过去

```

##### 十九，Hooks组件

```
Hooks组件是React16.8后开始提供的
```

##### 二十，安装antd，配置中文包

```jsx
安装命令 pnpm i antd

配置中文以及配置日历中文，需要安装dayjs
	安装命令 pnpm i dayjs
	
在入口文件配置
	import React from "react";
    import ReactDOM from "react-dom/client";
    import "@/index.less";
    import App from "@/App";
    import { ConfigProvider } from "antd";
    import zhCN from "antd/locale/zh_CN";
    import "dayjs/locale/zh-cn";
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <>
        <ConfigProvider locale={zhCN}>
          <App/>
        </ConfigProvider>
      </>
    );
```

##### 二十一,useState

```jsx
hooks组件每次更新视图：
	都是把函数重新执行一次，会产生全新私有上下文
	内部的代码都需要重新执行一次
	
useState更新过程：
   首先Hooks组件会创建两个全局变量，一个空数组，一个索引值初始值为0
   当我们每次调用useState的时候，
   执行过程中首先useState会把索引存储下来，
   在把useState接收的值按照索引值放进去，
   如果接收的值是函数就会执行函数，把函数返回值重新赋给接收的形参
   在对全局索引值加1，最后返回状态值以及修改状态方法
   调用修改状态方法的可以传值也可以转回调函数
   执行的时候首先会判断形参是否是一个函数，是函数就执行，
   把函数的返回值重新赋给形参，再根据保存下来的索引值，
   更新数组对应的值，然后再异步通知渲染视图
   
当调用useState返回的修改状态方法后，后面接着输出状态值还是旧的的值
因为找到的变量是它的上级上下文

useState返回的修改状态方法：
	在react18中是异步的，会有一个更新队列，实现状态的批处理,队列所有的状态函数执行完成后刷新视图
    	//执行一次
        const handle = ()=>{
            setXXX(XXX)
            setXXX(XXX)
        }
        
	在React-dom中有一个flushSync方法可以改变成同步的,
			//执行两次
            const handle = ()=>{
                flushSync(()=>{
                    setXXX(XXX)
                })
                setXXX(XXX)
            }
    在React16种可以放在定时器里面执行变成同步的
            //执行两次
            setTimeout(()=>{
                setXXX(XXX)
                setXXX(XXX)
            },1000)

useState修改状态值后拿到最新的值3种常用方法
	1.用useEffect
	2.调用状态修改方法传回调函数
		setXXX((v)=>{
			let newVal = v+1 
			return newVal
		})

```

<img src="..\学习文档\useState更新视图过程.png" alt="useState更新视图过程" style="zoom:50%;" />

##### 二十二，useState的优化机制

```
useStart修改状态方法在循环for/in中使用flushSync，不管循环几次都只会hooks组件都只会执行两次，
	如果不使用flushSync则只会执行一次
	原因：
    	因为useState每次修改的状态值的时候都会把修改的值与原来的值作比较(基于Object.is方法)，
        当他发现修改的值与原来的值相同时则不会重新执行hooks组件
        
但是setXXX()参数接收的是一个函数那么使用flushSync，hooks组件则会执行循环的次数
如果不是flushSync也只是执行一次，但是最后得到状态值不相同

都不使用flushSync情况下
	cosnt [x,setX] = useState(1)
	for(let i = 0;i<10;i++){
		setX(x+1)
	}
	hooks组件执行一次，x输出为2
	for(let i = 0;i<10;i++){
		setX((v)=>{
			return v+1
		})
	}
	hooks组件执行一次，x输出为11
	
都使用flushSync情况下
	for(let i = 0;i<10;i++){
		flushSync(()=>{
			setX(x+1)
		})
	}
	hooks组件执行两次，x输出为2
	for(let i = 0;i<10;i++){
		flushSync(()=>{
			setX((v)=>{
				return v+1
			})
		})
	}
	hooks组件执行10次，x输出为11
```

<img src="..\学习文档\useState刷新视图原理.png" alt="useState刷新视图原理" style="zoom:50%;" />

##### 二十三，手写简单的useState Hooks函数

```jsx
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
    defer(renderComponent)
  }
  _index += 1;
  return [_state[currenIndex], setState]
}
```

##### 二十四。useEffect

```jsx
useEffect函数可以接收2参数
	参数1：回调函数，参数：数组（可以不传）
	
useEffect(()=>{})
	会在hooks组件任何时候执行
	
useEffect(()=>{}，[])
	只会在hooks组件第一次加载的时候执行
	
useEffect(()=>{}，[某个状态值])
	会在hooks组件第一次加载时执行，同时数组种的状态值发生变化也会执行
	
useEffect(()=>{
	return ()=>{
	
	}
})
	返回的函数会在组件释放的时候执行

useEffect(()=>{
	return ()=>{
		
	}
}，[])
	离开组件的时候会执行
	
useEffect(()=>{
	return ()=>{
		
	}
}，[某个状态值])
	依赖发生变化以及离开组件的时候会执行
```

##### 二十五，useEffect执行原理以及细节

```
执行原理：

    在hooks函数第一次执行时，
    hooks函数所有的useEffect都会被React内部的一个MountEffect方法把所有的useEffect的回调函数以及依赖性放进一个链表中，
    当视图渲染完毕后，又会通过React内部的一个UpdateEffrct方法通知链表中所有的回调函数按要求执行，
    如果useEffect的回调函数返回的是一个函数那么这个被返回的函数则会在hooks组件释放前执行
    
细节：
	useEffect函数只能在hooks函数下调用，
	useEffect的返回值必须是一个函数，所有回调函数不能是async函数
	
```

<img src="..\学习文档\useEffect执行原理.png" alt="useEffect执行原理" style="zoom: 50%;" />

##### 二十六，useLayouEffect

```
与useEffect运行原理基本一致，但是useLayouEffect会比useEffect更早
```

<img src="..\学习文档\useLayouEffect执行原理.png" alt="useEffect执行原理" style="zoom: 33%;" />

##### 二十七，useRef  与  React.forwardRef  以及  useImperativeHandle

```jsx
useRef与React.cerateRef区别：
	1.useRef在hooks组件二次更新的时候获取的以及是之前的DOM,不会重复获取
	2.React.cerateRef在hooks组件二次更新的时候会重新获取DOM
	
useRef配合React.forwardRef获取子组件元素,直接使用useRef在子组件上会报错
	子组件：
		conts Son = React.forwardRef(funtion Son(props,ref)=>{
			return <div>
				   		<span ref={ref}>子组件</span>
				   </div>
		})
	父组件：
		conts Fa = ()=>{
			let n = useRef()
			return <>
						<Son ref={n}/>
				   </>
		}

使用useRef和React.fowardRef以及useImperativeHandle完成子父组件传参
		子组件：
		conts Son = React.forwardRef(funtion Son(props,ref)=>{
			useImperativeHandle(ref,()=>{
				return {
					子组件的方法或者参数
				}
			})
			return <div>
				   		<span ref={ref}>子组件</span>
				   </div>
		})
	父组件：
		conts Fa = ()=>{
			let n = useRef()
			console.log(n.current)
			return <>
						<Son ref={n}/>
				   </>
		}
		
	
 React.forwardRef用法：
 		一个参数：一个Hooks组件，Hooks组件可以多接收到一个Ref
 		const Son = React.forwadrRef((props,ref)=>{
 			return <></>
 		})
 		
useImperativeHandle用法：
	两个参数：参数1（接收到的Ref）,参数2:回调函数，返回想要暴露的属性与方法
	const Son = React.forwadrRef((props,ref)=>{
	
            useImperativeHandle(ref,()=>{
                return {
                    方法或者属性
                }
            })
            
 		return <></>
 	})


```

##### 二十八，React的合成事件

```
React内部基于浏览器合成的事件

事件具备传播机制：
	第一步：从最外层向最里层逐一查找（捕获阶段:分析出路劲）
	第二步：把事件源（触发事件的元素）的触发行为（目标阶段）
	第三步：按照捕获阶段分析出来的路径，从里到外，把每个元素相同的事件行为触发
	阻止事件传播的两个方法
	ev.stopPropagation():阻止事件的传播（包括捕获和冒泡）
	ev.stopImmediatePropagtion（）：也可以阻止事件传播，只不过它可以把当前元素其他的事件，没有执行的也									 不会执行了
	
事件委托：
	利用事件的传播机制，实现一套事件绑定处理方案
	
	优势：
	提高JS代码的运行性能，并且把处理的逻辑都集中在一起
	在一定的需求上需要基于事件委托
	给动态绑定的元素做事件绑定

React两种绑定事件的方式以及区别：
	1.onXxx
	2.onXxxCapture
	
	第一种是绑定在冒泡阶段
	第二种是绑定在捕获阶段
	所以一个元素同时用这个两个绑定一个事件，那么第二种会先执行

合成事件：
	绝对不是给当前元素基于addEventListener单独做的事件绑定，
	React的合成事件都是基于事件委托处理的
	在React17及以后都是委托#root这个容器（捕获和冒泡都做了委托）
	在React17以前都是委托document容器（只做了冒泡阶段的委托）
	只对有事件传播机制的事件做了委托

在组件渲染的时候，如果发现JSX元素中有onXxx/onXxxCapture这样的属性，
不会给当前元素直接做事件绑定，只是把绑定的方法赋值给元素的相关属性

例如：
	xxx.onClick=()=>{}
	xxx.onClickCapture=()=>{}
    在元素上添加了属性为xxx.onClick,属性值是一个事件
    然后对#root这个容器做事件绑定（捕获和冒泡都做了）
    原因：是因为组件中所有渲染的内容，最后都会插入#root容器中，
    这样点击页面中任何一个元素，最后都会#root的事件行为触发
   	而在给#root绑定的方法中，把之前给元素设置的onXxx/onXxxCapture属性，在相应的执行
```

##### 二十九,合成事件执行原理

```jsx
结构：
	<div id="root">
        <div id="secondFloor">
            <div id="thirdFloor">
            </div>
        </div>
    </div>
运行逻辑：
		const root = document.getElementById('root');
        const secondFloor = document.getElementById('secondFloor');
        const thirdFloor = document.getElementById('thirdFloor');

        secondFloor.onClick = () => {
            console.log('secondFloor冒泡');
        }
        secondFloor.onClickCapture = () => {
            console.log('secondFloor捕获');
        }
        
        thirdFloor.onClick = () => {
            console.log('thirdFloor冒泡');
        }   
        thirdFloor.onClickCapture = () => {
            console.log('thirdFloor捕获');
        }
        
        // 捕获
        root.addEventListener('click', (ev) => {
            let path = ev.composedPath();
            [...path].reverse().forEach((el) => {
                if(el.onClickCapture){
                    el.onClickCapture()
                }
            })
        },true);
        // 冒泡
        root.addEventListener('click', (ev) => {
            let path = ev.composedPath();
            path.forEach((el) => {
                if(el.onClick){
                    el.onClick()
                }
            })
        },false);

当render方法将虚拟DOM转换成真实DOM时会将所有的属性添加在标签上，
那么当标签触发事件时就会通过事件流发生事件的捕获和冒泡阶段，
当捕获和冒泡到根节点时，根节点会通过事件对象中composedPath方法获取到路径
ev.composedPath()得到一个数组，
捕获时会将数组反转然后遍历判断是否存在onXxx/onXxxCapture这儿两个属性值，
存在即执行，冒泡同理但不需要反正数组
```

<img src="..\学习文档\合成事件运行原理.png" alt="useEffect执行原理" style="zoom: 50%;" />

##### 三十，useMemo

```jsx
useMemo()使用：
	可接收两个参数：@1参数：回调函数，@2参数：依赖项（数组）

    组件第一次渲染时会useMemo回调函数自动执行一次，
    后期只有依赖项发生改变，useMemo回调函数才会自动执行，
    如果是依赖项以外的状态数据发生改变，
    导致视图更新组件重新调用，useMemo回调函数不会执行
    useMemo回调返回一个通过你计算的值
    
    const [y,setY]=useStste(1)
    const [x,setX]=useStste(1)
    const num = useMemo(()=>{
        return x+y
    },[x,y])
```

##### 三十一，useCallback和memo

```jsx
useCallback()使用：
	可接收两个参数：@1参数：回调函数，@2参数：依赖项（数组）
	
	组件第一次渲染时会useCallback回调函数自动执行一次，
    后期只有依赖项发生改变，useCallback回调函数才会自动执行，
    如果是依赖项以外的状态数据发生改变，
    导致视图更新组件重新调用，useMemo回调函数不会执行
    useCallback回调函数返回一个为执行的函数，
    不是所有的函数都需要useCallback处理，
    一般都是传给子组件的方法做处理，
    这样做就不会导致子组件也被重新渲染
    
 memo:
 	优化子组件无效渲染，
 	只在子组件接收的状态值参数发生了改变才会刷新视图
 	
useCallback结合memo使用：

     const Son = memo(() => {
      console.log("我是子组件");
      return (
        <div>
          <h1>我是子组件</h1>
        </div>
      )
    })

    function Dialog() {
      const [x, setX] = useState(0)
      const [y, setY] = useState(0)
      const hadelleClick = useCallback(() => {
      }, [x])
      return (
        <div>
          <h1>我是父组件</h1>
          <Button onClick={() => setX(x + 1)}>点击X</Button>
          <Button onClick={() => setY(y + 1)}>点击y</Button>
          <Son hadelleClick={hadelleClick} />
        </div>
      )
    }

	以上情况子组件只有x的状态值发生变化，子组件才会刷新视图
```

##### 三十二，memo与forwordRef

```jsx
memo和forwordRef一起使用：

    const Son= forwordRef((props,ref)=>{
        return <>我是子组件</>
    })
    export default memo(Son)
```

##### 三十三，自定义hooks函数

```jsx
简单的封装一个Hooks函数（基于useState二次封装）

const useAllState = (val) => {
  let [state, setState] = useState(() => {
    return typeof val === "function" ? val() : val
  })
  const setObjState = (newVal) => {
    if (typeof newVal === "function") {
      newVal = newVal(state)
    }
    setState((pre) => {
      if (Object.prototype.toString.call(newVal).includes("Object")) {
        return { ...pre, ...newVal }
      } else {
        return newVal
      }
    })
  }
  return [state, setObjState]
}

自定义Hooks作用：
	主要提取一些公共的逻辑，加以复用，省去冗余的代码
```

##### 三十四，useContext

```jsx
useContext()用法

	1.创建一个js文件
	import React from "react";
    const ContextObject = React.createContext();
    export default ContextObject;

	2.用法
    	import React, { useContext, useState } from 'react'
        import ContextObject from '../contextObject'

        function Dialog() {
          const [age, setAge] = useState(18)
          const [name, setName] = useState("张三")
          const chage = () => {
            setAge(age + 1)
            setName("李四")
          }
          return (
            <ContextObject.Provider value={{
              age,
              name,
              chage
            }}>
              <div>
                <p>祖先组件</p>
                <Child />
              </div>
            </ContextObject.Provider>

          )
        }


        // 子组件
        const Child = () => {
          const { age, name, chage } = useContext(ContextObject)
          console.log(age, name, chage, "子组件");
          return (
            <div>
              <p>子组件</p>
              <GrandChild />
            </div>
          )
        }
        
        
        // 孙组件
        const GrandChild = () => {
          const { age, name, chage } = useContext(ContextObject)
          console.log(age, name, chage, "孙组件");
          return <div>
            <p>孙组件</p>
          </div>
        }
        export default Dialog
```

##### 三十五，样式私有化处理

```jsx
1.内联样式
2.类名唯一
3.css module

	创建样式文件：xxx.module.less / xxx.module.css / xxx.module.scss / xxx.module.sass
	.nav {
        width: 100%;
        height: 200px;
    }
    .box {
        background: red;
    }	
	//使用样式穿透 不能穿透className={sty.xxx}这种写法
	.nav {
        width: 100%;
        height: 200px;
    }

    .box {
        background: red;
    }

    :global {
        .num {
            color: blue;
        }

        .ant-btn {
            color: salmon;
            background-color: bisque;
        }
    }
	/引入使用
	import React from 'react'
    import sty from './index.module.less'
    import { Button } from 'antd'
    export default function Nav() {
        return (
            <div className={`${sty.nav} ${sty.box}`}>
                我是导航组件
                <div className='num'>2025</div>
                <Button type="primary">Primary Button</Button>
            </div>
        )
    }
```

