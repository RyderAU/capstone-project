import "../App.css";
import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import CourseChat from "./CourseChat";
import CourseOutline from "./CourseOutline";
import MarkCalculator from "./MarkCalculator";

const CourseDashboard = ({ match }) => {
  return (
    <Router>
      <div className="course-main">
        <SideBar code={match.params.code} />
        <Switch>
          <Route
            exact
            path={`/${match.params.code}/chat`}
            component={CourseChat}
          />
          <Route
            exact
            path={`/${match.params.code}/course-outline`}
            component={CourseOutline}
          />
          <Route
            exact
            path={`/${match.params.code}/mark-calculator`}
            component={MarkCalculator}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default CourseDashboard;
