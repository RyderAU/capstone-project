import "./SideBar.css";
import { NavLink, useRouteMatch, BrowserRouter, Route } from "react-router-dom";
import Feature from "./Feature";

function SideBar({ selectedCourse }) {
  const { url, path } = useRouteMatch();
  return (
    <BrowserRouter key={selectedCourse}>
      <div>
        <div className="feature-container">
          <NavLink
            to={`${url}/chat`}
            className="feature-item"
            activeClassName="active-link"
          >
            <div>Chat</div>
          </NavLink>

          <NavLink
            to={`${url}/course-outline`}
            className="feature-item"
            activeClassName="active-link"
          >
            <div>
              Course
              <br />
              Outline
            </div>
          </NavLink>

          <NavLink
            to={`${url}/mark-calculation`}
            className="feature-item"
            activeClassName="active-link"
          >
            <div>
              Mark
              <br />
              Calculation
            </div>
          </NavLink>
        </div>
        <Route path={`${path}/:feature`}>
          <Feature selectedCourse={selectedCourse} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default SideBar;
