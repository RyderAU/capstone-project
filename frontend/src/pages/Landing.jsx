import React from 'react';
import { useHistory } from 'react-router-dom';
// import components
import { Container, LandingContainer, Title, Label, Input, Button,
  ButtonSecondary, BigTitle, LogoUNSW } from "../components/AuthCSS";

/**
 * Landing page
 * @returns Contains the title, login button and signup button
 */
const Landing = () => {

  const history = useHistory();

  // Login button redirects to /login
  const handleLogin = () => {
    console.log("Login Button Clicked");
    history.push("/login");
  };

  // SignUp button redirections to /signup
  const handleSignUp = () => {
    console.log("Sign Up Button Clicked");
    history.push("/signup");
  };

  return (
      <div>
      <Container>
        <BigTitle> Tired of the clutter? Find all your needs in one place. </BigTitle>
        <LandingContainer>
          <Title>ourUNSW</Title>
          {/* <LogoUNSW /> */}

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
      </Container>
    </div>
  );
}

export default Landing;
