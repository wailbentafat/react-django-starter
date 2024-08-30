import Profile from "../componenets/profile";
import { AuthContext } from "../context/authcontext";
import React from "react";
import Header from "../componenets/header";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Profilepage() {
    const {isAuthenticated} = React.useContext(AuthContext)
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);  
    if (!isAuthenticated) {
        return null;
    } else {
        return (
            <div>
                <Header />
                <div>
                <Profile />
                </div>
            </div>
        )
    }
}