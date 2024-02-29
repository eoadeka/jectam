import SelectRole from "./SelectRole";
import CreateAccount from "./CreateAccount";
import AddPhoneNumber from "./AddPhoneNumber";
import ConfirmPhoneNumber from "./ConfirmPhoneNumber";
import SetupAccount from "./SetupAccount";
import UploadProfilePhoto from "./UploadProfilePhoto";
import useFormContext from "../../../hooks/useFormContext";

const AuthFormList = () => {

    const { page } = useFormContext()

    const display = {
        0: <SelectRole />,
        1: <CreateAccount />,
        2: <AddPhoneNumber />,
        3: <ConfirmPhoneNumber />,
        4: <SetupAccount />,
        5: <UploadProfilePhoto />,
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )


    return content
}
export default AuthFormList;