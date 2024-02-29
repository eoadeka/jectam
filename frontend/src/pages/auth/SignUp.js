import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Container from '../../components/layout/Container';
import AuthForm from '../../components/forms/auth/AuthForm';
import { FormProvider } from '../../context/FormContext';
// import Button from '../../components/buttons/Button';
// import { Input, Label, Select } from '../../components/forms/FormElement';


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
        <Container>
          <h1>SignUp</h1>
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
        </Container>
    </div>
  );
}

export default SignUp;