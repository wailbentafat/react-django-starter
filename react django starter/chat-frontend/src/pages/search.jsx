import React, { useEffect }  from "react";
import { redirect } from "react-router-dom";
import Header from "../componenets/header";
import Search from "../componenets/search";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export default function Searchpage() {
    const {isAuthenticated} = React.useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    if (!isAuthenticated) {
        return null;
    }
    else {
        return (
            <div>
                <Header />
                <div>
                <Search />
                </div>
            </div>
        )
    }
}