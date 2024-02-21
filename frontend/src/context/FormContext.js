import { createContext, useState, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    const title = {
        0: "Create your account",
        1: "Add phone number",
        2: "Confirm your number",
        3: "Setup your account",
        4: "Upload profile photo"
    }

    useEffect(() => {

    })
};

export default FormContext;