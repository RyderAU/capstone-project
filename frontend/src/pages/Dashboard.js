import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import NavBar from "../components/NavBar";
import CourseBar from "../components/CourseBar";
import SubjectOne from "../components/SubjectOne";
import SubjectTwo from "../components/SubjectTwo";
import SubjectThree from "../components/SubjectThree";

function Dashboard() {
  return (
    <Router>
      <div>
        <NavBar />
        <CourseBar />
        <Switch>
          <Route exact path="/subject-one" component={SubjectOne} />
          <Route exact path="/subject-two" component={SubjectTwo} />
          <Route exact path="/subject-three" component={SubjectThree} />
        </Switch>
      </div>
    </Router>
  );
}

export default Dashboard;
