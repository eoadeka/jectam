import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const WithNav = () => {
    // const user = useAuthContext();
    // if (!user.token) return <Navigate to="/" />;

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
};

export default WithNav;