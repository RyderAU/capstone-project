import "../App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseBar = () => {
  useEffect(() => {
    setStudentCourses(student.courses);
  }, []);

  // grab student details
  const student = { courses: ["COMP3900", "COMP4920", "COMP1234"] };

  const [studentCourses, setStudentCourses] = useState([]);

  // setStudentDetails(student.courses);

  console.log(studentCourses);

  return (
    // <nav className="courses-container">
    //   This student is doing {student.courses}
    //   <ul className="courses-item">
    //     <Link to="/subject-one">
    //       <li>COURSE1</li>
    //     </Link>
    //     <Link to="/subject-two">
    //       <li>COURSE2</li>
    //     </Link>
    //     <Link to="/subject-three">
    //       <li>COURSE3</li>
    //     </Link>
    //   </ul>
    // </nav>
    <nav className="courses-container">
      {studentCourses.map((course) => (
        <h1 key={course}>{course}</h1>
      ))}
    </nav>
  );
};

export default CourseBar;
