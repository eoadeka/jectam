import useFormContext from "../../../hooks/useFormContext";
import { Input } from "../FormElement";
import Button from "../../buttons/Button";

const ConfirmPhoneNumber = () => {

    const { data, handleChange } = useFormContext()

    const content = (
        <div>
            {/* <h2>Confirm your number</h2> */}
            <p>Enter the code we sent to your number ending <b>001</b></p>
            <Input 
                placeholder='+233'
                name='otp'
                value={data.otp}
                onChange={handleChange}
            /><br></br>
            <Button style={{width:"100%", margin: "2em 0"}}>Continue</Button>
            <p style={{textDecoration: "underline", textAlign: "center"}}>Resend Code</p>
        </div>
    )

    return content
}
export default ConfirmPhoneNumber;