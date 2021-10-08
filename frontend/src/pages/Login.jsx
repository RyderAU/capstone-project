import "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import components
import { LoginForm, Title, Label, Input, Button, ButtonSecondary } from "../components/login/LoginCSS";

let emailInput;
let passwordInput;

function Login() {
  return (
      <div>
     
      <LoginForm>
        <Title>LOGIN</Title>
        <Label>Email</Label>
        <Input value={emailInput} onChange={(e) => console.log(e.target.value)}
          type="email" placeholder="Enter email" id="login-email" required />

        <Label>Password</Label>
        <Input value={passwordInput} onChange={(e) => console.log(e.target.value)}
          type="password" placeholder="Enter password" id="login-password" required />

        <Button onClick={() => console.log("Login button clicked")} type="submit" id ="login-submit"
          aria-label="login-button">
          Login
        </Button> 
        <ButtonSecondary onClick={() => console.log(`Register button blicked`)}
          type="submit" id ="signup-redirect"
          aria-label="signup-button">
          Sign Up
        </ButtonSecondary>
      </LoginForm>
      </div>
  );
}

export default Login;
