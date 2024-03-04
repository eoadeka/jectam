import React from 'react';
import LoginForm from '../../components/forms/auth/login/LoginForm';
import ContainerWithoutNav from '../../components/layout/ContainerWithoutNav';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';


// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// https://www.copycat.dev/blog/material-ui-form/
// MMulti-Page Form with React Hooks: https://www.youtube.com/watch?v=QSBc8bABwE0
// https://github.com/gitdagray/react-multi-step-form/blob/main/src/context/FormContext.js


const Login = () => {
  return (
    <ContainerWithoutNav>
        <PageHeaderDiv>
          <PageTitleDiv>
            <PageTitle>Login</PageTitle>
          </PageTitleDiv>
          <PageTitleDiv>
            <PageTitleSpan><small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small></PageTitleSpan>
          </PageTitleDiv>
        </PageHeaderDiv>

        <div>
         <h2> Welcome back!</h2>
         <LoginForm />
        </div>
    </ContainerWithoutNav>
  );
}

export default Login;