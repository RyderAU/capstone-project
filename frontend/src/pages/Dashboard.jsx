import NavBar from "../components/NavBar";
import CourseBar from "../components/CourseBar";
import Timetable from "../components/Timetable";
import Profile from "../components/Profile";
import OtherProfile from "../components/OtherProfile";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/dashboard/timetable">
          <Timetable />
        </Route>
        <Route exact path="/dashboard/profile">
          <Profile />
        </Route>
        {/* might need to change this later */}
        <Route exact path="/dashboard/other-profile">
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
