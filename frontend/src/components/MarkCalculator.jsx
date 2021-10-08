import "./MarkCalculator.css";
import { useParams } from "react-router";

const MarkCalculator = () => {
  const { courseid } = useParams();
  return <div className="course-main">mark calculator for {courseid}</div>;
};

export default MarkCalculator;
