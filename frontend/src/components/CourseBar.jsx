import "./CourseBar.css";
import {
  BrowserRouter,
  NavLink,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";

function CourseBar({ studentCourses }) {
  const { url, path } = useRouteMatch();
  console.log(`url from course bar is: ${url}`);
  console.log(`path from course bar is: ${path}`);

  const [selectedCourse, setSelectedCourse] = useState(``);
  console.log(`selectedCourse is ${selectedCourse}`);

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
                onClick={() => {
                  setSelectedCourse(`${course}`);
                }}
              >
                {course}
              </NavLink>
            </div>
          ))}
        </div>
        <Route path={`${path}/:courseid`}>
          <SideBar selectedCourse={selectedCourse} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default CourseBar;
