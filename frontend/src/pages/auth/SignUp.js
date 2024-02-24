import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Container from '../../components/layout/Container';
import Button from '../../components/buttons/Button';
import { Input, Label, Select } from '../../components/forms/FormElement';


const SignUp = () => {

  const [formData, setFormData ] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    phoneNumber: '',
    otp: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    profilePhoto:''
  })

   // Function to handle form input changes
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(formData);
    setFormData({
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: '',
      otp: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      profilePhoto:''
    });
  };
  return (
    <div>
        <Container>
          <h1>SignUp</h1>
          <div>
            <form action={<Link to="/login" />} onSubmit={handleSubmit} className='new-project-form' style={{width:"65%", height:"100vh"}}>
              <div>
                <h2>Create your account</h2>
                <p>Fill the form below to create an account</p>
                <Input 
                  placeholder='Work email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Input 
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Input 
                  placeholder='Password Confirmation'
                  type='password'
                  name='passwordConfirmation'
                  value={formData.passwordConfirmation}
                  onChange={handleInputChange}
                />
              
                <div style={{width: "100%", marginTop: "1em"}}>
                  <input  type='radio' id='t&c' value='I have read, understood, and accept the terms and conditions' />
                  <Label style={{display: "inline-block",  width: "96%"}} htmlFor='t&c'>I have read, understood, and accept the terms and conditions</Label>
                </div>
              
                <Button style={{width:"100%", margin: "1em 0"}}>Continue</Button>
                <br></br>
                <div style={{textAlign:"center",marginTop: "1em"}}>
                  <small>Or signup with</small>
                  <br></br>
                  <br></br>
                  <Button>Google</Button>
                </div>
                <br></br>
                <div style={{textAlign:"center", margin: "1em 0"}}>

                
                <small >Already have an account? <a href='/login' style={{textDecoration: "underline"}}>Log in</a></small>


                </div>
               
              </div>

              <div>
                <h2>Add phone number</h2>
                <p>We will send an OTP verification to you</p>
                <Input 
                  placeholder='Phone Number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                /><br></br>
                <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button>
              </div>

              <div>
                <h2>Confirm your number</h2>
                <p>Enter the code we sent to your number ending <b>001</b></p>
                <Input 
                  placeholder='+233'
                  name='phoneNumber'
                  value={formData.otp}
                  onChange={handleInputChange}
                /><br></br>
                <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button>
                <p style={{textDecoration: "underline", textAlign: "center"}}>Resend Code</p>
              </div>

              <div>
                <h2>Setup your account</h2>
                <p>Let's complete your account</p>
                <Input 
                  placeholder='First Name'  
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <Input 
                  placeholder='Last Name'
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input 
                  placeholder='Birth date' 
                  type='date'
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
                <Label htmlFor="gender">Gender:</Label>
                <Select 
                  id="gender" 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Select>
                <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button>
              </div>

              
              <div>
                <h2>Upload profile photo</h2>
                <p>Choose from your gallery</p>
                <div className="box__input">
                  <input 
                    id='file' 
                    type='file'
                    name='profilePhoto'
                    value={formData.profilePhoto}
                    onChange={handleInputChange}
                  /><br></br>
                  <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
                </div>
                  <p>1 profile photo required</p>

                  <input style={{width:"100%", margin: "2em 0"}} type='submit' value="Submit" />
              </div>
            </form>

            <div className='new-project-form' style={{ width:"25%",border: "2px dashed gray", borderRadius:"5px", background:"gainsboro", position: "absolute", right: "0", paddingLeft: "1em"}}>
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