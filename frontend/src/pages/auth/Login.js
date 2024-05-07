import React from 'react';
import LoginForm from '../../components/forms/auth/login/LoginForm';
import ContainerWithoutNav from '../../components/layout/ContainerWithoutNav';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import Overlay from '../../components/layout/Overlay';
// import background from "../../assets/images/doodle.png";
import background from "../../assets/images/apms.png";

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// https://www.copycat.dev/blog/material-ui-form/
// MMulti-Page Form with React Hooks: https://www.youtube.com/watch?v=QSBc8bABwE0
// https://github.com/gitdagray/react-multi-step-form/blob/main/src/context/FormContext.js

// https://testdriven.io/blog/django-rest-auth/

const Login = () => {
  return (
    <div  style={{backgroundImage: `url(${background})`, backgroundSize: "contain", height : "100vh", overflowY: "hidden"}}>
      <ContainerWithoutNav>
          <Overlay>
            {/* <PageHeaderDiv>
              <PageTitleDiv>
                <PageTitle>Login</PageTitle>
              </PageTitleDiv>
              <PageTitleDiv>
                <PageTitleSpan><small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small></PageTitleSpan>
              </PageTitleDiv>
            </PageHeaderDiv> */}

            <div className="tags" style={{padding: "1em 0 2em 0",  justifyContent:"right"}}>
                <span className="tag tag-1"  style={{width:"60%", fontSize: "2em"}} >Login</span>
                <span className="tag tag-1"   style={{width:"40%", textAlign: "right"}}><small>Haven't signed up yet? <a href='/sign-up' style={{textDecoration: "underline"}}>Sign Up</a></small></span>
            </div>

            <div>
            <h2> Welcome back!</h2>
            <LoginForm />
            </div>
          </Overlay>
          {/* <h1>Login</h1> */}
      </ContainerWithoutNav>
    </div>
  );
}

export default Login;