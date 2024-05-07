import { createContext, useState, useEffect } from "react";
import axios from "axios";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    const title = {
        0: "Select your role",
        1: "Create your account",
        2: "Add phone number",
        3: "Confirm your number",
        4: "Setup your account",
        5: "Upload profile photo"
    }

    const [data, setData] = useState({
        role: '',
        email: '',
        password1: '',
        password2: '',
        accepted_terms: null,
        phone_number: '',
        otp: 0,
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        profile_picture:null
    })

    useEffect(() => {

    });

    const handleChange = e => {
        
        
        const { name, value, type, files } = e.target;
        let newValue;

        if (type === 'radio') {
            newValue = e.target.checked;
        } else if (type === 'file') {
            newValue = files ? files[0] : null;
        } else {
            newValue = value;
        }

        setData(prevData => ({
            ...prevData,
            [name]: newValue
        }))
    }


    // const handleSubmit = async event => {
    //     event.preventDefault();

        
    // };

    const {
        role,
        email,
        password,
        password2,
        accepted_terms,
        phone_number,
        otp,
        first_name,
        last_name,
        birth_date,
        gender,
        profile_picture,
        ...requiredInputs } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('role') && key !== 'email')
        .map(key => data[key])
        .every(Boolean)

    const canNextPage2 = Object.keys(data)
        .filter(key => key.startsWith('email') && key !== 'shipping')
        .map(key => data[key])
        .every(Boolean)

    // const canNextPage3 = Object.keys(data)
    //     .filter(key => key.startsWith('phoneNumber') && key !== 'otp')
    //     .map(key => data[key])
    //     .every(Boolean)

    // const canNextPage4 = Object.keys(data)
    //     .filter(key => key.startsWith('otp') && key !== 'firstName')
    //     .map(key => data[key])
    //     .every(Boolean)

    // const canNextPage5 = Object.keys(data)
    //     .filter(key => key.startsWith('profilePhoto') && key !== 'firstName')
    //     .map(key => data[key])
    //     .every(Boolean)

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)
        // || (page === 2 && !canNextPage3)
        // || (page === 3 && !canNextPage4)
        // || (page === 4 && !canNextPage5)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(title).length - 1 && "remove-button"

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, submitHide }}>
            {children}
        </FormContext.Provider>
    )
};

export default FormContext;