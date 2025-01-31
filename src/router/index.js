import routers from "./routers";
import { Suspense } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
/*
    统一渲染的组件
*/
const Elements = (props) => {
  let { element: Element } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const routingInformation = {
    navigate,
    location,
    params,
    searchParams,
  };
  return <Element {...routingInformation} />;
};
const createRouter = (routers) => {
  return (
    <>
      {routers.map((item, index) => {
        let { path } = item;
        return (
          <Route
            key={index}
            path={path}
            element={<Elements {...item}></Elements>}
          >
            {item.children &&
              item.children.length > 0 &&
              createRouter(item.children)}
          </Route>
        );
      })}
    </>
  );
};
const RouterView = () => {
  return (
    <Suspense fallback={<>正在加载中...</>}>
      <Routes>{createRouter(routers)}</Routes>
    </Suspense>
  );
};
export default RouterView;
