import "../App.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CourseBar = () => {
  useEffect(() => {
    setStudentCourses(student.courses);
  }, []);

  // grab student details
  const student = { courses: ["COMP3900", "COMP4920", "COMP1234"] };

  const [studentCourses, setStudentCourses] = useState([]);

  return (
    <nav className="courses-container">
      {studentCourses.map((course) => (
        <h1 key={course}>
          <NavLink to={`/${course}`} activeClassName="course-highlight">
            {course}
          </NavLink>
        </h1>
      ))}
    </nav>
  );
};

export default CourseBar;
