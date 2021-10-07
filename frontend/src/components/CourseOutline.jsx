import "../App.css";
import { useParams } from "react-router";

const CourseOutline = () => {
  const { courseid } = useParams();
  return <div className="course-main">course outline for {courseid}</div>;
};

export default CourseOutline;
