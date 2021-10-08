import "./CourseBar.css";
import { BrowserRouter, NavLink, Route, useRouteMatch } from "react-router-dom";
import SideBar from "./SideBar";

function CourseBar({ studentCourses }) {
  const { url, path } = useRouteMatch();
  console.log(`url from course bar is: ${url}`);
  console.log(`path from course bar is: ${path}`);

  return (
    <BrowserRouter>
      <div>
        <div className="courses-container">
          {studentCourses.map((course) => (
            <li key={course}>
              {/*Default to chat tab*/}
              <NavLink
                to={`${url}/${course}/chat`}
                activeClassName="active-link"
              >
                {course}
              </NavLink>
            </li>
          ))}
        </div>
        <Route path={`${path}/:courseid`}>
          <SideBar />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default CourseBar;
