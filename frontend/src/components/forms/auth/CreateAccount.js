import useFormContext from "../../../hooks/useFormContext";
import { Input, Label } from "../FormElement";
import Button from "../../buttons/Button";

const CreateAccount = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div>
            {/* <h2>Create your account</h2> */}
            <p>Fill the form below to create an account</p>
            <Input 
                placeholder='Work email'
                type='email'
                name='email'
                value={data.email}
                onChange={handleChange}
            />
            <Input 
                placeholder='Password'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
            />
            <Input 
                placeholder='Password Confirmation'
                type='password'
                name='passwordConfirmation'
                value={data.passwordConfirmation}
                onChange={handleChange}
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
    )

    return content
}
export default CreateAccount;