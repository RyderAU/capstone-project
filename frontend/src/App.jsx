import "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import pages
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/"></Route>
        </Switch>
      </div>
    </BrowserRouter>

    // </div>
  );
}

export default App;
