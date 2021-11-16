import "./CourseBar.css";
import { BrowserRouter, NavLink, Route, useRouteMatch } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import React from "react";
import axios from "axios";
import { StoreContext } from "../Store";
import SideBar from "./SideBar";

function CourseBar() {

  const context = React.useContext(StoreContext);
  const [newurl] = context.url;
  const token = localStorage.getItem("token");

  

  const { url, path } = useRouteMatch();

  const [selectedCourse, setSelectedCourse] = useState(``);

  const [courses, setCourses] = useState([]);

  const handleSuccess = (res) => {
    console.log(res.data);
    setCourses(res.data.courses.split(', '));
    console.log(courses);
  };

  useEffect(() => {
    // get info
    axios
      .get(`${newurl}/dashboard/profile?token=${token}`)
      .then((res) => handleSuccess(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <div className="course-container">
          {courses.map((course) => (
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
