import "./CourseBar.css";
import { BrowserRouter, NavLink, Route, useRouteMatch } from "react-router-dom";
import { useState, useContext } from "react";
import { StoreContext } from "../Store";
import SideBar from "./SideBar";

function CourseBar() {
  const { url, path } = useRouteMatch();

  const [selectedCourse, setSelectedCourse] = useState(``);

  const { courses } = useContext(StoreContext);

  return (
    <BrowserRouter>
      <div>
        <div className="course-container">
          {courses[0].map((course) => (
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
