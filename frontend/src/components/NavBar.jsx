import React, { useState } from "react";
import axios from "axios";
import { StoreContext } from "../Store";
import { useHistory } from "react-router-dom";
import home from "../images/homeicon.png";
import timetable from "../images/schedule.png";
import user from "../images/default-user.png";
import "./NavBar.css";
import Search from "./Search";

const NavBar = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [courses] = context.courses;
  // const [token, setToken] = context.token;
  const token = localStorage.getItem("token");

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
    
    // setToken("");
    localStorage.setItem("token", "");
    history.push("/");
  };

  // Case 2: API returns error
  const handleError = (error) => {
    console.log("Login Failure");
    console.log(error);
  };

  return (
    <div className="nav-container">
      <div className="nav-item">
        <img
          src={home}
          alt=""
          className="home-button"
          onClick={() => {
            history.push("/");
            history.push(`dashboard/${courses[0]}/chat`);
          }}
        />
        <div className="logout-button" onClick={() => handleLogout()}>Log Out</div>
      </div>
      <div className="nav-item item-right">
        <Search />
        <img
          src={timetable}
          alt=""
          className="timetable-button"
          onClick={() => {
            history.push("/");
            history.push("dashboard/timetable");
          }}
        />
        <img
          src={user}
          alt=""
          className="profile-button"
          onClick={() => {
            history.push("/");
            history.push("dashboard/profile");
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
