import "../App.css";
import SideBar from "./SideBar";

const CourseDashboard = ({ match }) => {
  return (
    <div className="course-main">
      <SideBar code={match.params.code} />
      hello this is {match.params.code}
    </div>
  );
};

export default CourseDashboard;
