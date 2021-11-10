import "./Feature.css";
import { useParams } from "react-router";
import { StoreContext } from '../Store';
import Chat from "./Chat";
import CourseOutline from "./CourseOutline";

const Feature = ({ selectedCourse }) => {
  const { courseid, feature } = useParams();
  console.log(`this is the ${courseid} ${feature} feature`);

  return (
    <div key={selectedCourse} className="course-main">
        {(feature == "chat") && <Chat courseid={courseid}/> }
        {(feature == "course-outline") && <CourseOutline courseid={courseid}/> }
    </div>
  );
};

export default Feature;
