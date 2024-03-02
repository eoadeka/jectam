import useFormContext from "../../../hooks/useFormContext";
import { Select, Input, Label } from "../FormElement";
import Button from "../../buttons/Button";

const CreateAccount = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div>
            {/* <h2>Setup your account</h2> */}
            <p>Let's complete your account</p>
            <Input 
                placeholder='First Name'  
                type='text'
                name='firstName'
                value={data.firstName}
                onChange={handleChange}
            />
            <Input 
                placeholder='Last Name'
                type='text'
                name='lastName'
                value={data.lastName}
                onChange={handleChange}
            />
            <Input 
                placeholder='Birth date' 
                type='date'
                name='birthDate'
                value={data.birthDate}
                onChange={handleChange}
            />
            <Label htmlFor="gender">Gender:</Label>
            <Select 
                id="gender" 
                name="gender"
                value={data.gender}
                onChange={handleChange}
            >
                <option value="female" selected>Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </Select>
            <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button>
        </div>

    )

    return content
}
export default CreateAccount;