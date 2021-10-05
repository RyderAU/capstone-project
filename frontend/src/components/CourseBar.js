import "../App.css";
import { Link } from "react-router-dom";

const CourseBar = () => {
  return (
    <nav className="courses-container">
      <ul className="courses-item">
        <Link to="/subject-one">
          <li>COURSE1</li>
        </Link>
        <Link to="/subject-two">
          <li>COURSE2</li>
        </Link>
        <Link to="/subject-three">
          <li>COURSE3</li>
        </Link>
      </ul>
    </nav>
  );
};

export default CourseBar;
