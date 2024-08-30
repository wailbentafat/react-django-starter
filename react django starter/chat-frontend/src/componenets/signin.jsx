import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState(''); 
    const [secondname, setSecondname] = useState(''); 
    const [remember_me, setRememberMe] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/auth/', {
                email,
                first_name: firstname, 
                second_name: secondname,
                
                password,
                
            });
            console.log(response.data);  // Print response from the API call in dex
            const { authtoken } = response.data;

            // Set the token in a cookie
            if (authtoken) {
                Cookies.set('authToken', authtoken, { expires: 7 });  // Cookie expires in 7 days
            }

            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </label>
                <label>
                    Second Name:
                    <input
                        type="text"
                        value={secondname}
                        onChange={(e) => setSecondname(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={remember_me}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                </label>
                <button type="submit">Signin</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Signin;
