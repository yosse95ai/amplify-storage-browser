import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
} from "react-router-dom";
import SideMenu from "./components/topbar";
import { Navigate } from "react-router-dom";
import { MY_ROUTES } from "./constant";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <div>
              <SideMenu />
              <Outlet />
            </div>
          }
        >
          {MY_ROUTES.map((route)=>(<Route path={route.path} element={route.component} key={route.title}/>))}
          <Route path="*" element={<Navigate replace to={MY_ROUTES[0].path} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
