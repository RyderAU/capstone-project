import "../App.css";
import { NavLink } from "react-router-dom";

const SideBar = (props) => {
  return (
    <div className="features-container">
      <NavLink to={`/${props.code}/chat`} activeClassName="feature-highlight">
        <div className="features-item">Chat</div>
      </NavLink>
      <NavLink
        to={`/${props.code}/course-outline`}
        activeClassName="feature-highlight"
      >
        <div className="features-item">Course Outline</div>
      </NavLink>
      <NavLink
        to={`/${props.code}/mark-calculator`}
        activeClassName="feature-highlight"
      >
        <div className="features-item">Mark Calculation</div>
      </NavLink>
    </div>
  );
};

export default SideBar;
