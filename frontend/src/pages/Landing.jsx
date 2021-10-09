import React, { useState } from 'react';
import { StoreContext } from '../Store';
import { useHistory } from 'react-router-dom'
// import components
import { LandingContainer, Title, Label, Input,
        Button, ButtonSecondary } from "../components/AuthCSS";

/**
 * Landing page
 * @returns Contains the title, login button and signup button
 */
const Landing = () => {

  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;

  const handleLogin = () => {
    console.log("Login Button Clicked");
    history.push("/login");
  };

  const handleSignUp = () => {
    console.log("Sign Up Button Clicked");
    history.push("/signup");
  };

  return (
      <div>
     
      <LandingContainer>
        <Title>ourUNSW</Title>

        <Button onClick={() => handleLogin()} type="submit" id ="login-redirect"
          aria-label="login-button-redirect">
          Login
        </Button>
        
        <ButtonSecondary onClick={() => handleSignUp()}
          type="submit" id ="signup-redirect"
          aria-label="signup-button-redirect">
          Sign Up
        </ButtonSecondary>
      </LandingContainer>
      </div>
  );
}

export default Landing;
