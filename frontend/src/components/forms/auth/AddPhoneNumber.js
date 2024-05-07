import useFormContext from "../../../hooks/useFormContext";
import { Input } from "../FormElement";
import Button from "../../buttons/Button";

const AddPhoneNumber = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div>
            {/* <h2>Add phone number</h2> */}
            <p>We will send an OTP verification to you</p>
            <Input 
                placeholder='Phone Number'
                name='phone_number'
                value={data.phone_number}
                onChange={handleChange}
            />
            <br></br>
            {/* <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button> */}
        </div>
    )

    return content
}
export default AddPhoneNumber;