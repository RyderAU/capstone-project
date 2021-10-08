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
        <div className="course-container">
          {studentCourses.map((course) => (
            <div key={course}>
              {/*Default to chat tab*/}
              <NavLink
                to={`${url}/${course}/chat`}
                className="course-item"
                activeClassName="active-link"
              >
                {course}
              </NavLink>
            </div>
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
