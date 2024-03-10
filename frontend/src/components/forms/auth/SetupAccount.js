import useFormContext from "../../../hooks/useFormContext";
import { Select, Input, Label } from "../FormElement";
import Button from "../../buttons/Button";

const CreateAccount = () => {

    const { data, handleChange } = useFormContext();
    const options =[
        [ "Female", "female" ], 
        [ "Male", "male" ], 
        [ "Other", "other" ], 
    ]

    const content = (
        <div>
            {/* <h2>Setup your account</h2> */}
            <p>Let's complete your account</p>
            <Input 
                placeholder='First Name'  
                type='text'
                name='first_name'
                value={data.first_name}
                onChange={handleChange}
            />
            <Input 
                placeholder='Last Name'
                type='text'
                name='last_name'
                value={data.last_name}
                onChange={handleChange}
            />
            <Input 
                placeholder='Birth date' 
                type='date'
                name='birth_date'
                value={data.birth_date}
                onChange={handleChange}
            />
            <Label htmlFor="gender">Gender:</Label>
            <Select 
                id="gender" 
                name="gender"
                multiple
                value={data.gender}
                onChange={handleChange}
            >
                {options.map(([text, value], i) => (
                    <option key={i} className='role-btn' value={value} defaultValue={value}>{text}</option>
                ))}
                {/* <option value="female" selected>Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option> */}
            </Select>
            <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button>
        </div>

    )

    return content
}
export default CreateAccount;