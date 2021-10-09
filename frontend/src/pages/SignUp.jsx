import React from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import { useHistory } from 'react-router-dom'
// import components
import { SignUpForm, Title, Label, Input, Button } from "../components/AuthCSS";;


const SignUp = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [displayName, setDisplayName] = context.displayName;
  const [emailInput, setEmail] = context.email;
  const [passwordInput, setPassword] = context.password;
  const [passwordConfirmInput, setPasswordConfirm] = context.passwordConfirm;

  // Resetting email and password if they came from SignUp
  setEmail("");
  setPassword("");

  const handleSignUpSubmit = () => {
    console.log("Linking button clicked")

    axios.post(`${url}/signup`, {
      displayName: displayName,
      email: emailInput,
      password: passwordInput,
      passwordConfirm: passwordConfirmInput,
    })
      .then(r => {
        console.log('SignUp Success');
        // console.log(r.token);
        // localStorage.setItem('token', r.token);
        // handleLinking();
        history.push('/linking');
      })
      .catch(err => {
        console.log('SignUp Failure');
        console.log(err);
      });
  };
    
  // const handleLinking = () => {
  //   console.log("Attempting to link")
    
  //   axios.post(`${url}`, {
  //     displayName: displayName,
  //     email: emailInput,
  //     password: passwordInput,
  //     passwordConfirm: passwordConfirmInput,
  //   })
  //   .then(r => {
  //     console.log('SignUp Success');
  //       console.log(r.token);
  //       localStorage.setItem('token', r.token);
  //       history.push("/linking");
  //     })
  //     .catch(err => {
  //       console.log('Login Failure');
  //       console.log(err);
  //     });
  // };


  return (
      <div>
      <SignUpForm>
        <Title>SIGN UP</Title>

        <Label>Display Name</Label>
        <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)}
          type="text" placeholder="Enter your display name" id="signup-display-name" required />

        <Label>Email</Label>
        <Input value={emailInput} onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="Enter your email" id="signup-email" required />

        <Label>Password</Label>
        <Input value={passwordInput} onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder="Enter your password" id="signup-password" required />

        <Label>Confirm Password</Label>
        <Input value={passwordConfirmInput} onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password" placeholder="Confirm your Password" id="signup-password-confirm" required />
        
        <Button onClick={() => handleSignUpSubmit()} type="submit" id ="signup-submit"
          aria-label="link-button">
          Link to myUNSW
        </Button> 

      </SignUpForm>
      </div>
  );
}

export default SignUp;
