import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// import components
import NavBar from "../components/NavBar";
import CourseBar from "../components/CourseBar";
import CourseDashboard from "../components/CourseDashboard";

function Dashboard() {
  useEffect(() => {
    // grab student details
    const student = { courses: ["COMP3900", "COMP4920", "COMP1234"] };
    setStudentCourses(student.courses);
  }, []);

  const [studentCourses, setStudentCourses] = useState([]);

  return (
    <Router>
      <div>
        <NavBar />
        <CourseBar courses={studentCourses} />
        <Switch>
          <Route exact path="/dashboard/" component={CourseDashboard} />
          <Route exact path="/dashboard/:code" component={CourseDashboard} />
          {/* so refreshing doesn't remove side bar */}
          <Route path="/dashboard/:code/:feature" component={CourseDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
