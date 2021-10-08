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
        <div className="features-container">
          <ul>
            <li>
              <NavLink to={`${url}/chat`} activeClassName="active-link">
                chat
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/outline`} activeClassName="active-link">
                outline
              </NavLink>
            </li>
            <li>
              <NavLink to={`${url}/calc`} activeClassName="active-link">
                calc
              </NavLink>
            </li>
          </ul>
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
