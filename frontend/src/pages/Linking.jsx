import "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
// import components
import { Container, Background, SignInBox, LogoUNSW, SignInTitle, Input,
  Button } from "../components/LinkingCSS";



const Linking = () => {

  // let emailInput;
  // let passwordInput;
  const context = React.useContext(StoreContext);
  const [emailInput, setEmailInput] = context.emailUNSW;
  const [passwordInput, setPasswordInput] = context.passwordUNSW;
  const [url, ] = context.url;
  // const [loading, setLoading] = useState(false);

  // API request
  const handleLinking = () => {
    console.log(emailInput);
    console.log(passwordInput);

    axios.post(`${url}/linking`, {
      email: emailInput,
      password: passwordInput
    })
    .then((response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });

    // axios.post('auth/linking', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     "email": emailInput,
    //     "password": passwordInput,
    //   })
    // })
    //   .then(r => {
    //     console.log('Login Success');
    //     console.log(r.token);
    //     localStorage.setItem('token', r.token);
    //     history.push("/dashboard/home");
    //   })
    //   .catch(err => {
    //     console.log('Login Failure');
    //     console.log(err);
    //   });
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

              <Button onClick={() => handleLinking()} type="submit" id ="linking-submit"
                aria-label="linking-button">
                Sign in
              </Button> 

          </SignInBox>
        </Container>
     
  );
}

export default Linking;
