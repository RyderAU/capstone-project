import "./Feature.css";
import { useParams } from "react-router";

const Feature = ({ selectedCourse }) => {
  const { courseid, feature } = useParams();
  console.log(`this is the ${feature} feature`);
  return (
    <div key={selectedCourse} className="course-main">
      <div>
        {courseid} {feature}
      </div>
    </div>
  );
};

export default Feature;
