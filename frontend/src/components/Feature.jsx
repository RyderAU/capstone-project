import "./Feature.css";
import { useParams } from "react-router";
import { StoreContext } from '../Store';
import Chat from "./Chat";
import MarkCalculator from "./MarkCalculator";

const Feature = ({ selectedCourse }) => {
  const { courseid, feature } = useParams();
  console.log(`this is the ${courseid} ${feature} feature`);

  return (
    <div key={selectedCourse} className="course-main">
        {(feature == "chat") && <Chat courseid={courseid}/> }
        {(feature == "mark-calculation") && <MarkCalculator courseid={courseid}/>}
    </div>
  );
};

export default Feature;
