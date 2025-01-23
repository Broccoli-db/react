// 实现redux的部分源码
export const createStore = (reducer) => {
    if (typeof reducer !== 'function') throw new Error('reducer必须是一个函数');
    // 初始化状态
    let state;
    // 事件池
    const listeners = [];
    // 获取公共状态
    const getState = () => {
        // 返回状态
        return state;
    };
    // 向事件池加入让组件更新的方法
    const subscribe = (listener) => {
        // 规则校验
        if (typeof listener !== 'function') throw new TypeError('listener must be a function');
        // 如果没有添加过，则添加事件
        if (!listeners.includes(listener)) {
            listeners.push(listener);
        }
        // 返回一个取消订阅的方法
        return () => {
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    };
    // 派发任务通知REDUCER执行
    const dispatch = (action) => {
        // 规则校验
        if (!Object.prototype.toString.call(action).includes('Object')) throw new TypeError('action must be a Object');
        if (typeof action.type === 'undefined') throw new TypeError('action must have a type property');
        // 执行reducer,并获取新的状态
        state = reducer(state, action);
        listeners.forEach(listener => {
            listener()
        });
        return action;
    };
    // 自动执行一次dispatch，type为@@redux/INIT,源码中会生成一个36位随机值，转成成36进制
    dispatch({ type: '@@redux/INIT' });
    return {
        getState,
        dispatch,
        subscribe
    }
}