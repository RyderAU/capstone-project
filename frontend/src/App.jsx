import "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import pages
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
