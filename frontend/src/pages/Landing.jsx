import "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import { LandingContainer, Title, Label, Input, Button, ButtonSecondary } from "../components/AuthCSS";

let emailInput;
let passwordInput;

function Landing() {
  return (
      <div>
     
      <LandingContainer>
        <Title>ourUNSW</Title>

        <Button onClick={() => console.log("Login button clicked")} type="submit" id ="login-submit"
          aria-label="login-button">
          Login
        </Button> 
        <ButtonSecondary onClick={() => console.log(`Register button blicked`)}
          type="submit" id ="signup-redirect"
          aria-label="signup-button">
          Sign Up
        </ButtonSecondary>
      </LandingContainer>
      </div>
  );
}

export default Landing;
