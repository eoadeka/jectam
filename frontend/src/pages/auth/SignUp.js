import React from 'react';
import AuthForm from '../../components/forms/auth/AuthForm';
import { FormProvider } from '../../context/FormContext';
import ContainerWithoutNav from '../../components/layout/ContainerWithoutNav';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';


const SignUp = () => {

  // const [formData, setFormData ] = useState({
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   phoneNumber: '',
  //   otp: '',
  //   firstName: '',
  //   lastName: '',
  //   birthDate: '',
  //   gender: '',
  //   profilePhoto:''
  // })



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submitted");
  //   console.log(formData);
  //   setFormData({
  //     email: '',
  //     password: '',
  //     passwordConfirmation: '',
  //     phoneNumber: '',
  //     otp: '',
  //     firstName: '',
  //     lastName: '',
  //     birthDate: '',
  //     gender: '',
  //     profilePhoto:''
  //   });
  // };
  return (
    <div>
        <ContainerWithoutNav>
          <PageHeaderDiv>
            <PageTitleDiv>
              <PageTitle>SignUp</PageTitle>
            </PageTitleDiv>
            <PageTitleDiv>
              <PageTitleSpan><small>Already signed up?<a href='/login' style={{textDecoration: "underline"}}>Login</a></small></PageTitleSpan>
            </PageTitleDiv>
          </PageHeaderDiv>

          <div>
            <FormProvider>
              <AuthForm />
            </FormProvider>

            <div className='new-project-form' style={{ width:"25%",border: "2px dashed gray", borderRadius:"5px", background:"gainsboro", position: "fixed", right: "0", paddingLeft: "1em"}}>
                <h5>1. Select Role</h5>
                <h5>2. Create Your Account</h5>
                <h5>3. Add phone number</h5>
                <h5>4. Confirm your number</h5>
                <h5>5. Setup your account</h5>
                <h5>6. Upload profile photo</h5>
            </div>
          </div>
        </ContainerWithoutNav>
    </div>
  );
}

export default SignUp;