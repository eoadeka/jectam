import useFormContext from "../../../hooks/useFormContext";
import { Input, Label } from "../FormElement";
import Button from "../../buttons/Button";

const CreateAccount = () => {

    const { data, handleChange } = useFormContext();


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
                name='password1'
                value={data.password1}
                onChange={handleChange}
            />
            <Input 
                placeholder='Password Confirmation'
                type='password'
                name='password2'
                value={data.password2}
                onChange={handleChange}
            />
        
            <div style={{width: "100%", marginTop: "1em"}}>
                <input  
                    name="accepted_terms"
                    type='radio' 
                    id='t&c' 
                    value={data.accepted_terms}
                    onChange={handleChange}
                    style={{marginRight: ".5em"}}
                    // checked={ data.accepted_terms === value } 
                />
                <Label style={{display: "inline-block",  width: "90%", verticalAlign:"top"}} htmlFor='t&c'>I have read, understood, and accept the terms and conditions</Label>
            </div>
      
            {/* <Button style={{width:"100%", margin: "1em 0"}}>Continue</Button>
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
            </div> */}
       
        </div>
    )

    return content
}
export default CreateAccount;