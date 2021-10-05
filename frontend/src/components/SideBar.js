import "../App.css";
import { Link } from "react-router-dom";

const SideBar = (props) => {
  return (
    <nav className="features-container">
      <ul className="features-item">
        <Link to={`/${props.code}/chat`}>
          <li>Chat</li>
        </Link>
        <Link to={`/${props.code}/course-outline`}>
          <li>Course Outline</li>
        </Link>
        <Link to={`/${props.code}/mark-calculator`}>
          <li>Mark Calculation</li>
        </Link>
      </ul>
    </nav>
  );
};

export default SideBar;
