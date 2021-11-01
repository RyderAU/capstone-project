import React, { useState } from "react";
import axios from "axios";
import { StoreContext } from "../Store";
import { useHistory, NavLink } from "react-router-dom";
import home from "../images/homeicon.png";
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url] = context.url;
  const [courses] = context.courses;
  const [token, setToken] = context.token;

  // Send request to backend, if request successful move to Landing page
  const handleLogout = () => {
    console.log("Logout Button Clicked");

    axios
      .post(`${url}/logout`, {
        token: token,
      })
      .then((r) => {
        handleSuccess(r);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  // Case 1: API returns success
  const handleSuccess = (response) => {
    console.log("Logout Success");
    console.log(response);

    // Resets token
    setToken("");
    history.push(`/`);
  };

  // Case 2: API returns error
  const handleError = (error) => {
    console.log("Login Failure");
    console.log(error);
  };

  return (
    <div className="nav-container">
      <img
        src={home}
        alt=""
        style={{ margin: "5px" }}
        onClick={() => {
          history.push("/");
          history.push(`dashboard/${courses[0]}/chat`);
        }}
      />
      <ul>
        <button onClick={() => handleLogout()}>Log Out</button>
      </ul>

      <button
        onClick={() => {
          history.push("/");
          history.push("dashboard/timetable");
        }}
      >
        timetable
      </button>
      <button
        onClick={() => {
          history.push("/");
          history.push("dashboard/profile");
        }}
      >
        profile
      </button>
    </div>
  );
};

export default NavBar;
