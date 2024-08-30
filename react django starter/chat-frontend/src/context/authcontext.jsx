import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        setIsAuthenticated(false);
        Cookies.remove('authToken');  // Use js-cookie to remove the token
        navigate('/login');
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('authToken');  // Use js-cookie to get the token

            console.log("Checking authentication...");
            try {
                console.log("Token:", token);
                if (!token) {
                    console.log("No token found, redirecting to login page");
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:8000/get_user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data;

                console.log("Authentication response:", data);

                if (data.authenticated) {
                    setIsAuthenticated(true);
                    console.log("User is authenticated");
                } else {
                    console.log("User is not authenticated, redirecting to login page");
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                console.log("Redirecting to login page");
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
