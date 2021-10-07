import "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import pages
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/dashbaord">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
