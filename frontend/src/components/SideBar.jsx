import "./SideBar.css";
import { NavLink, useRouteMatch, BrowserRouter, Route } from "react-router-dom";
import Feature from "./Feature";

function SideBar({ selectedCourse }) {
  const { url, path } = useRouteMatch();
  return (
    <BrowserRouter key={selectedCourse}>
      <div>
        <div className="feature-container">
          <div>
            <NavLink
              to={`${url}/chat`}
              className="feature-item"
              activeClassName="active-link"
            >
              Chat
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`${url}/course-outline`}
              className="feature-item"
              activeClassName="active-link"
            >
              Course Outline
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`${url}/mark-calculation`}
              className="feature-item"
              activeClassName="active-link"
            >
              Mark Calculation
            </NavLink>
          </div>
        </div>
        <Route path={`${path}/:feature`}>
          <Feature selectedCourse={selectedCourse} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default SideBar;
