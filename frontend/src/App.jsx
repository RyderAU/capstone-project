import "react-router-dom";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import React from "react";
import { StoreContext } from "./Store";
import StoreProvider from "./Store";
// import pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Linking from "./pages/Linking";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
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

            <Route exact path="/linking">
              <Linking />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
