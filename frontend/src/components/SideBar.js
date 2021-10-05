import "../App.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="features-container">
      <ul className="features-item">
        <Link to="/">
          <li>Chat</li>
        </Link>
        <Link to="/">
          <li>Course Outline</li>
        </Link>
        <Link to="/">
          <li>Mark Calculation</li>
        </Link>
      </ul>
    </nav>
  );
};

export default SideBar;
