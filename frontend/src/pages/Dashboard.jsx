import NavBar from "../components/NavBar";
import CourseBar from "../components/CourseBar";
import Timetable from "../components/Timetable";
import Profile from "../components/Profile";
import OtherProfile from "../components/OtherProfile";
import { Switch, Route } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <NavBar />
      {/* Routes for subpages within app */}
      <Switch>
        <Route exact path="/dashboard/timetable">
          <Timetable />
        </Route>
        <Route exact path="/dashboard/profile">
          <Profile />
        </Route>
        <Route exact path="/dashboard/:email">
          <OtherProfile />
        </Route>
        <Route path="/dashboard">
          <CourseBar />
        </Route>
      </Switch>
    </div>
  );
}

export default Dashboard;
