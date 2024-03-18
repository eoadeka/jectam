import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";

const WithNav = () => {
    const user = useAuthContext();
    if (!user.token) return <Navigate to="/" />;
    // if (!user.token) return <Navigate to="/login" />;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
};

export default WithNav;