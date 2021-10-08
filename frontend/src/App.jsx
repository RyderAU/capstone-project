import "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
