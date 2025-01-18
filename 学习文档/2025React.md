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
	数据发送改变时，会让页面刷新
		构建了一套虚拟DOM到真实DOM的渲染体系
		有效避免了DOM的重排和重绘
操作DOM:
	操作DOM比较消化性能（可能会导致DOM重排/重绘）

React框架采用的是MVC体系；Vue框架采用的是MVVM体系
```

八，MVC

```
MVC：model数据层 + view视图层 + controller控制层
	 数据层受到改变那么视图层则会刷新页面，视图层操作按钮等改变数据，则会通过React合成事件监听到，然后写业务		逻辑改变数据
	 ***单向数据驱动***
```

<img src="D:\item\2025study\2025React\学习文档\MVC.png" alt="MVC" style="zoom:50%;" />

##### 九，MVVM

```
MVVM:model数据层 + view视图层 + vievModel数据/视图监听层
	**双向驱动**
```

<img src="D:\item\2025study\2025React\学习文档\MVVM.png" alt="MVVM" style="zoom:50%;" />

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

<img src="D:\item\2025study\2025React\学习文档\JSX渲染机制.png" alt="JSX渲染机制" style="zoom: 67%;" />

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
@1，基于bale-presset-react-app把调用的组件转换为createElement格式
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

