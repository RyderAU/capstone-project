import NavBar from "../components/NavBar";
import CourseBar from "../components/CourseBar";
import Timetable from "../components/Timetable";
import Profile from "../components/Profile";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/dashboard/timetable">
            <Timetable />
          </Route>
          <Route exact path="/dashboard/profile">
            <Profile />
          </Route>
          <Route path="/dashboard">
            <CourseBar />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Dashboard;
