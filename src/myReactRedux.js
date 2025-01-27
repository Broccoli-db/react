import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { bindActionCreators } from "redux";
const Context = createContext();

export const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const connect = (mapStateToProps, mapDispatchToProps) => {
  if (!mapStateToProps) {
    mapStateToProps = (obj = {}) => {
      return obj;
    };
  }
  if (!mapDispatchToProps) {
    mapDispatchToProps = (dispatch) => {
      return {
        dispatch,
      };
    };
  }
  return function currying(Component) {
    return function HOC(props) {
      const store = useContext(Context);
      const { getState, dispatch, subscribe } = store;
      let [blo, setBlo] = useState(false);
      useEffect(() => {
        let unSubscribe = subscribe(() => {
          setBlo((blo) => !blo);
        });
        return () => {
          unSubscribe();
        };
      }, []);
      const state = getState();
      const newState = useMemo(() => mapStateToProps(state), [state]);
      let newDispatch = {};
      if (typeof mapDispatchToProps === "function") {
        newDispatch = mapDispatchToProps(dispatch);
      } else {
        newDispatch = bindActionCreators(mapDispatchToProps, dispatch);
      }
      return <Component {...props} {...newState} {...newDispatch} />;
    };
  };
};
