import "./CourseChat.css";
import { useParams } from "react-router";

const CourseChat = () => {
  const { courseid } = useParams();
  console.log(`LOADED course chat for ${courseid}`);
  return (
    <div className="course-main">
      <div>course group chat for {courseid}</div>
    </div>
  );
};

export default CourseChat;
