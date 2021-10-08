import "./SideBar.css";
import { NavLink, useRouteMatch, BrowserRouter, Route } from "react-router-dom";
import CourseChat from "./CourseChat";
import CourseOutline from "./CourseOutline";
import MarkCalculator from "./MarkCalculator";

function SideBar() {
  console.log("WE IN");
  const { url, path } = useRouteMatch();
  console.log(`url from SideBar is: ${url}`);
  console.log(`path from SideBar is: ${path}`);
  return (
    <BrowserRouter>
      <div>
        <div className="feature-container">
          <div>
            <NavLink
              to={`${url}/chat`}
              className="feature-item"
              activeClassName="active-link"
            >
              chat
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`${url}/outline`}
              className="feature-item"
              activeClassName="active-link"
            >
              outline
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`${url}/calc`}
              className="feature-item"
              activeClassName="active-link"
            >
              calc
            </NavLink>
          </div>
        </div>
        <Route path={`${path}/chat`}>
          <CourseChat />
        </Route>
        <Route path={`${path}/outline`}>
          <CourseOutline />
        </Route>
        <Route path={`${path}/calc`}>
          <MarkCalculator />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default SideBar;
