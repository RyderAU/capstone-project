import { useHistory } from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import Spinner from 'react-spinner-material';
// import components
import { Container, Background, SignInBox, LogoUNSW, SignInTitle, Input,
  Button, SpinnerContainer, LoadingWarning } from "../components/LinkingCSS";



const Linking = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [emailInput, setEmailInput] = context.emailUNSW;
  const [passwordInput, setPasswordInput] = context.passwordUNSW;
  const [url, ] = context.url;

  const [signInText, setSignInText] = React.useState("Sign in");
  const [loading, setLoading] = useState(false);

  // API request
  const handleLinking = () => {
    console.log(emailInput);
    // Loading button
    setSignInText("Loading");
    setLoading(true);

    axios.post(`${url}/linking`, {
      email: emailInput,
      password: passwordInput
    })
    .then((response) => {
      // Reset variables
      setLoading(false);
      setSignInText("Sign in");
      console.log(response);
      console.log(response.data["courses"]);

      // Move to next page
      history.push('/dashboard');
    })
    .catch( (error) => {
      console.log(error);
    });

  };


  return (
        <Container> 
          <Background />
          <SignInBox>
            <LogoUNSW />
              <SignInTitle>Sign In</SignInTitle>
              <Input value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
                type="email" placeholder="zID@ad.unsw.edu.au" id="linking-email" required />
                
              <Input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                type="password" placeholder="Enter Password" id="linking-password" required />

              <SpinnerContainer>                
                <Spinner size={40} spinnerColor={"#005EA6"} spinnerWidth={2} visible={loading} />
                <Button onClick={() => handleLinking()} type="submit" id ="linking-submit"
                  aria-label="linking-button" disabled={loading}>
                  {signInText}
                </Button>
              </SpinnerContainer>

              {
                loading && 
                <LoadingWarning display= "hidden">
                  Linking might take up to 30 seconds!
                </LoadingWarning>
              }


          </SignInBox>
        </Container>
     
  );
}

export default Linking;
