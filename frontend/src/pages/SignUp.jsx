import "react-router-dom";

// import components
import { SignUpForm, Title, Label, Input, Button } from "../components/AuthCSS";;

let displayInput;
let nameInput;
let emailInput;
let passwordInput;
let passwordConfirmInput;

function SignUp() {
  return (
      <div>
      <SignUpForm>
        <Title>SIGN UP</Title>

        <Label>Display Name</Label>
        <Input value={displayInput} onChange={(e) => console.log(e.target.value)}
          type="text" placeholder="Enter your display name" id="signup-display-name" required />

        <Label>Full Name</Label>
        <Input value={nameInput} onChange={(e) => console.log(e.target.value)}
          type="text" placeholder="Enter your name" id="signup-full-name" required />

        <Label>Email</Label>
        <Input value={emailInput} onChange={(e) => console.log(e.target.value)}
          type="email" placeholder="Enter your email" id="login-email" required />

        <Label>Password</Label>
        <Input value={passwordInput} onChange={(e) => console.log(e.target.value)}
          type="password" placeholder="Enter your password" id="login-password" required />

        <Label>Confirm Password</Label>
        <Input value={passwordConfirmInput} onChange={(e) => console.log(e.target.value)}
          type="password" placeholder="Confirm your Password" id="login-password-confirm" required />
        
        <Button onClick={() => console.log("Link button clicked")} type="submit" id ="link-submit"
          aria-label="link-button">
          Link to myUNSW
        </Button> 

      </SignUpForm>
      </div>
  );
}

export default SignUp;
