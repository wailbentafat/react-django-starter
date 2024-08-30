import React from "react";
import { Link } from "react-router-dom";
const  Header=() => {
    return (
        <div className="header">
            <h1>Chat App</h1>
            <p>Chat with your friends</p>

            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/search">Search</Link>
            <Link to="/rooms">Rooms</Link>

        </div>
    );
};
export default Header;