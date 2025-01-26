const myCombineReducers = (reducers) => {
  let reducersKeys = Reflect.ownKeys(reducers);
  return (state = {}, action) => {
    let newState = {};
    reducersKeys.forEach((key) => {
      newState[key] = reducers[key](state[key], action);
    });
    return newState;
  };
};
export default myCombineReducers;
