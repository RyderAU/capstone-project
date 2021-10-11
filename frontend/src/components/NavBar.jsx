import React, { useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import { useHistory } from 'react-router-dom'
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [courses] = context.courses;
  const [token, setToken] = context.token;

  // Send request to backend, if request successful move to Landing page
  const handleLogout = () => {

    console.log("Logout Button Clicked");

    axios.post(`${url}/logout`, {
      token: token,
    })
      .then(r => {
        handleSuccess(r);
      })
      .catch(err => {
        handleError(err);
      });
    };
    
  // Case 1: API returns success
  const handleSuccess = (response) => {
    console.log('Logout Success');
    console.log(response);

    // Resets token
    setToken("");
    history.push(`/`);
  };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Login Failure');
    console.log(error);
  };


  return (
    <nav className="nav-container">
      <ul>
        <button onClick={() => handleLogout()}>Log Out</button>
      </ul>
    </nav>
  );
};

export default NavBar;
