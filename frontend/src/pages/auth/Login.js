import React from 'react';
import Container from '../../components/layout/Container';
import Button from '../../components/buttons/Button';

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// https://www.copycat.dev/blog/material-ui-form/
// MMulti-Page Form with React Hooks: https://www.youtube.com/watch?v=QSBc8bABwE0
// https://github.com/gitdagray/react-multi-step-form/blob/main/src/context/FormContext.js


const Login = () => {
  return (
    <Container>
        <h1>Login</h1>
        <div>
         <h2> Welcome back!</h2>
         <form>
            <input placeholder='Work Email' /><br></br>
            <input placeholder='Password' /><br></br>
            <p>Forgot Password?</p>

            <Button>Continue</Button>

            <hr></hr>
            <Button>Login with Google</Button><br></br><br></br>
            <Button>Login with Apple</Button><br></br>

            <small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small><br></br>
         </form>
        </div>
    </Container>
  );
}

export default Login;