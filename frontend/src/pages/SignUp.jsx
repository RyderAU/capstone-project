import React, { useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Store';
import { useHistory } from 'react-router-dom'
// import components
import { SignUpForm, Title, Label, Input, Button,
  ErrorWarning } from "../components/AuthCSS";;


const SignUp = () => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const [url, ] = context.url;
  const [displayName, setDisplayName] = context.displayName;
  const [emailInput, setEmail] = context.email;
  const [passwordInput, setPassword] = context.password;
  const [passwordConfirmInput, setPasswordConfirm] = context.passwordConfirm;

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Erorr: Input invalid");

  // Executed when button clicked
  const handleSignUpSubmit = () => {
    console.log("Linking button clicked");
    setIsError(false);

    axios.post(`${url}/signup`, {
      displayName: displayName,
      email: emailInput,
      password: passwordInput,
      passwordConfirm: passwordConfirmInput,
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
      console.log('SignUp Success');
      console.log(response);
      
      // Move to next page
      history.push('/linking');
    };
    
    // Case 2: API returns error
    const handleError = (error) => {
      console.log('SignUp Failure');

      // Reset text fields
      setDisplayName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");

      // Print error message
      console.log(error);
      setErrorMsg("Error: Incorrect details! Please try again!");
      setIsError(true);
    };

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

        {
          isError && 
          <ErrorWarning display= "hidden">
            {errorMsg}
          </ErrorWarning>
        }

      </SignUpForm>
      </div>
  );
}

export default SignUp;
