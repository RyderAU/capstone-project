import "../App.css";
import { useParams } from "react-router";

const CourseChat = () => {
  const { courseid } = useParams();
  return <div className="course-main">course group chat for {courseid}</div>;
};

export default CourseChat;
