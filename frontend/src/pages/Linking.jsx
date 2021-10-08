import "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import { Container, Background, SignInBox, LogoUNSW, SignInTitle, Input,
  Button } from "../components/LinkingCSS";

let emailInput;
let passwordInput;

function Linking() {
  return (
      <div>
        <Container> 
          <Background />
          <SignInBox>
            <LogoUNSW />
              <SignInTitle>Sign In</SignInTitle>
              <Input value={emailInput} onChange={(e) => console.log(e.target.value)}
                type="email" placeholder="zID@ad.unsw.edu.au" id="linking-email" required />
                
              <Input value={passwordInput} onChange={(e) => console.log(e.target.value)}
                type="password" placeholder="Enter Password" id="linking-password" required />

              <Button onClick={(e) => console.log("Linking button clicked")} type="submit" id ="linking-submit"
                aria-label="linking-button">
                Sign in
              </Button> 

          </SignInBox>
        </Container>
     
      </div>
  );
}

export default Linking;
