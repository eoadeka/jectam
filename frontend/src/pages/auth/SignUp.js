import React from 'react';
import AuthForm from '../../components/forms/auth/AuthForm';
import { FormProvider } from '../../context/FormContext';
import ContainerWithoutNav from '../../components/layout/ContainerWithoutNav';
import { PageHeaderDiv, PageTitle, PageTitleDiv, PageTitleSpan } from '../../components/layout/PageHeader';
import Overlay from '../../components/layout/Overlay';
// import background from "../../assets/images/doodle.png";
import background from "../../assets/images/apms.png";

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
    <div style={{backgroundImage: `url(${background})`, backgroundSize: "contain", height : "100vh", overflowY: "hidden"}}>
        <ContainerWithoutNav>
        <Overlay>
          <div className="tags" style={{padding: "1em 0 2em 0",  justifyContent:"right"}}>
              <span className="tag tag-1"  style={{width:"60%", fontSize: "2em"}} >SignUp</span>
              <span className="tag tag-1"   style={{width:"40%", textAlign: "right"}}><small>Already signed up? <a href='/login' style={{textDecoration: "underline"}}>Login</a></small></span>
            </div>

          <div>
            <FormProvider>
              <AuthForm />
            </FormProvider>

           
          </div>

          </Overlay>
        </ContainerWithoutNav>
    </div>
  );
}

export default SignUp;