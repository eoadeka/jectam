import React from 'react';
import Container from '../../components/layout/Container';
import Button from '../../components/buttons/Button';
import LoginForm from '../../components/forms/auth/login/LoginForm';

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
         <LoginForm />
        </div>
    </Container>
  );
}

export default Login;