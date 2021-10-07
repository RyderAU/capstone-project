import "../App.css";
import { NavLink } from "react-router-dom";

const CourseBar = (props) => {
  return (
    <nav className="courses-container">
      {props.courses.map((course) => (
        <h1 key={course}>
          <NavLink to={`/${course}/chat`} activeClassName="course-highlight">
            {course}
          </NavLink>
        </h1>
      ))}
    </nav>
  );
};

export default CourseBar;
