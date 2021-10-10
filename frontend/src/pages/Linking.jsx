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
  const [, setCourses] = context.courses;

  const [signInText, setSignInText] = React.useState("Sign in");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // API request
  const handleLinking = () => {
    console.log(emailInput);
    // Loading button
    setIsError(false);
    setSignInText("Loading");
    setLoading(true);

    axios.post(`${url}/linking`, {
      email: emailInput,
      password: passwordInput
    })
    .then((response) => {
      handleSuccess(response);
    })
    .catch( (error) => {
      handleError(error);
    });
  };
  
  // Case 1: API returns success
  const handleSuccess = (response) => {
    // Reset variables
    setLoading(false);
    setSignInText("Sign in");
    console.log(response);
    courses = response.data["courses"];
    console.log(courses);
    setCourses(courses);
  
    // Move to next page
    history.push(`/dashboard/${courses[0]}/chat`);
  };

  // Case 2: API returns error
  const handleError = (error) => {
    // Reset the loading button to signin button
    setLoading(false);
    setSignInText("Sign in");

    // Reset text fields
    setEmailInput("");
    setPasswordInput("");

    // Print error message
    console.log(error);
    setErrorMsg("Error: Incorrect details! Please try again!");
    setIsError(true);
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

              {
                isError && 
                <LoadingWarning display= "hidden">
                  {errorMsg}
                </LoadingWarning>
              }

          </SignInBox>
        </Container>
     
  );
}

export default Linking;
