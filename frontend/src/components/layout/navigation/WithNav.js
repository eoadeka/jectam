import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const WithNav = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
};

export default WithNav;