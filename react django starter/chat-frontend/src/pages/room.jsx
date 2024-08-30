

import React, { useContext , useEffect} from "react";
import { AuthContext } from "../context/authcontext";
import Chatroom from "../componenets/chatroom"; 
import { useNavigate } from "react-router-dom";

const Roompage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("Not authenticated");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

   
    return (
        <div>               
            <Chatroom /> 
        </div>
    );
};

export default Roompage; 
