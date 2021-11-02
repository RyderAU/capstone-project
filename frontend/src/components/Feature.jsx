import "./Feature.css";
import { useParams } from "react-router";
import { StoreContext } from '../Store';
import Chat from "./Chat";

const Feature = ({ selectedCourse }) => {
  const { courseid, feature } = useParams();
  console.log(`this is the ${courseid} ${feature} feature`);

  return (
    <div key={selectedCourse} className="course-main">
        {(feature == "chat") && <Chat courseid={courseid}/> }
    </div>
  );
};

export default Feature;
