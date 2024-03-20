import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("refresh_token") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
        const response = await fetch("'http://localhost:8000/token/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.data) {
            setUser(res.data.user);
            console.log(user)
            setToken(res.token);
            localStorage.setItem("site", res.token);
            navigate("/dashboard");
            return;
        }
        throw new Error(res.message);
        } catch (err) {
        console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;