import "./CourseChat.css";
import { useParams } from "react-router";

const CourseChat = () => {
  const { courseid } = useParams();
  console.log(`course chat for ${courseid}`);
  return <div className="course-main">course group chat for {courseid}</div>;
};

export default CourseChat;
