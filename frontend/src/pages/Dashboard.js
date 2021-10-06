import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import NavBar from "../components/NavBar";
import CourseBar from "../components/CourseBar";
import CourseDashboard from "../components/CourseDashboard";

function Dashboard() {
  return (
    <Router>
      <div>
        <NavBar />
        <CourseBar />
        <Switch>
          <Route exact path="/:code" component={CourseDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
