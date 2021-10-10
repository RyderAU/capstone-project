import React, { useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import { useHistory } from 'react-router-dom'
// import components
import { LoginForm, Title, Label, Input, Button,
  ButtonSecondary, ErrorWarning } from "../components/AuthCSS";

/**
 * Login page
 * @returns 
 */
 const Login = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [emailInput, setEmail] = context.email;
  const [passwordInput, setPassword] = context.password;
  const [courses] = context.courses;
  const [, setToken] = context.token;

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Erorr: Input invalid");

  // Send request to backend, if request successful move to /linking
  const handleLogin = () => {
    console.log("Login Button Clicked");
    setIsError(false);
    console.log(emailInput);
    console.log(passwordInput);


    axios.post(`${url}/login`, {
      email: emailInput,
      password: passwordInput,
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
    console.log('Login Success');
    console.log(response);
    console.log(response.data["token"]);
    console.log(response.data["courses"]);

    // Stores token
    setToken(response.data["token"]);
    // Resets all text fields
    resetFields();
    history.push(`/dashboard/${courses[0]}/chat`);
  };
  
  // Case 2: API returns error
  const handleError = (error) => {
    console.log('Login Failure');
    // Resets all text fields
    resetFields();
    
    // Print error message
    console.log(error);
    setErrorMsg("Error: Incorrect details! Please try again!");
    setIsError(true);
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };


  // SignUp button redirections to /signup
  const handleSignUp = () => {
    console.log("Sign Up Button Clicked");
    history.push("/signup");
  };

  return (
      <div>
     
      <LoginForm>
        <Title>LOGIN</Title>
        <Label>Email</Label>
        <Input value={emailInput} onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="Enter email" id="login-email" required />

        <Label>Password</Label>
        <Input value={passwordInput} onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder="Enter password" id="login-password" required />

        <Button onClick={() => handleLogin("Login button clicked")} type="submit" id ="login-submit"
          aria-label="login-button-from-login">
          Login
        </Button> 

        <ButtonSecondary onClick={() => handleSignUp(`SignUp button blicked`)}
          type="submit" id ="signup-login-redirect"
          aria-label="signup-button-from-login">
          Sign Up
        </ButtonSecondary>

        {
          isError && 
          <ErrorWarning display= "hidden">
            {errorMsg}
          </ErrorWarning>
        }
      </LoginForm>
      </div>
  );
}

export default Login;
