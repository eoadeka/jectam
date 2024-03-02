import { createContext, useState, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    const title = {
        0: "Select role",
        1: "Create your account",
        2: "Add phone number",
        3: "Confirm your number",
        4: "Setup your account",
        5: "Upload profile photo"
    }

    const [data, setData] = useState({
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

    useEffect(() => {

    });

    const handleChange = e => {
        const type = e.target.type

        const name = e.target.name

        const value = type === "checkbox"
            ? e.target.checked
            : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const {
        role,
        email,
        phoneNumber,
        otp,
        firstName,
        profilePhoto,
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