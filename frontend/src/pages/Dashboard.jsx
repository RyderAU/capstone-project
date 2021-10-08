import CourseBar from "../components/CourseBar";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

function Dashboard() {
  const { url, path } = useRouteMatch();
  useEffect(() => {
    // grab student details
    const student = { courses: ["COMP3900", "COMP4920", "COMP1234"] };
    setStudentCourses(student.courses);
  }, []);

  const [studentCourses, setStudentCourses] = useState([]);

  return (
    <div>
      <NavBar />
      <CourseBar studentCourses={studentCourses} />
    </div>
  );
}

export default Dashboard;
