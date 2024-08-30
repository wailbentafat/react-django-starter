import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { getcookie } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = getcookie('authToken');
            if (token) {
                const response = await axios.get('http://localhost:8002/check-auth/', { withCredentials: true });
                setUser(response.data);
                console.log(response.data);
                console.log("here")
            }
        } catch (error) {
            if (error.response && (error.response.data === "token expired" || error.response.data === "invalid token")) {
                setUser(null);
                navigate('/login');
            } else {
                console.error(error);
                setError(error);
            }
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
