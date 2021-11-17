import "./Feature.css";
import { useParams } from "react-router";
import { StoreContext } from '../Store';
import Chat from "./Chat";
import CourseOutline from "./CourseOutline";
import MarkCalculator from "./MarkCalculator";

// Three tabs on the left hand panel; chat, course outline, mark calculator
const Feature = ({ selectedCourse }) => {
  const { courseid, feature } = useParams();
  console.log(`this is the ${courseid} ${feature} feature`);

  return (
    <div key={selectedCourse} className="course-main">
        {(feature == "chat") && <Chat courseid={courseid}/> }
        {(feature == "course-outline") && <CourseOutline courseid={courseid}/> }
        {(feature == "mark-calculation") && <MarkCalculator courseid={courseid}/>}
    </div>
  );
};

export default Feature;
