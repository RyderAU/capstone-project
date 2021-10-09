import React from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import { useHistory } from 'react-router-dom'
// import components
import { LoginForm, Title, Label, Input, Button,
  ButtonSecondary } from "../components/AuthCSS";

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

  // Resetting email and password if they came from SignUp
  setEmail("");
  setPassword("");

  // Send request to backend, if request successful move to /linking
  const handleLogin = () => {
    console.log("Login Button Clicked");

    axios.post(`${url}/login`, {
      email: emailInput,
      password: passwordInput,
    })
      .then(r => {
        console.log('Login Success');
        // console.log(r.token);
        // localStorage.setItem('token', r.token);
        history.push("/dashboard");
      })
      .catch(err => {
        console.log('Login Failure');
        console.log(err);
      });
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
      </LoginForm>
      </div>
  );
}

export default Login;
