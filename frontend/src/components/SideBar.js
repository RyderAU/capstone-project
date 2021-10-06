import "../App.css";
import { NavLink } from "react-router-dom";

const SideBar = (props) => {
  return (
    <nav className="features-container">
      <ul className="features-item">
        <NavLink to={`/${props.code}/chat`} activeClassName="feature-highlight">
          Chat <br />
        </NavLink>
        <NavLink
          to={`/${props.code}/course-outline`}
          activeClassName="feature-highlight"
        >
          Course Outline <br />
        </NavLink>
        <NavLink
          to={`/${props.code}/mark-calculator`}
          activeClassName="feature-highlight"
        >
          Mark Calculation
        </NavLink>
      </ul>
    </nav>
  );
};

export default SideBar;
