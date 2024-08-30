import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const [room, setRoom] = useState(null); // Default state to null
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null); // State to track errors
    const { userid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch profile data
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8002/profile/${userid}`);
                setProfile(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userid]); 

    if (loading) return <p>Loading...</p>; 
    if (error) return <p>Error: {error.message}</p>; 
    const handleclick=(userid)=>{
      console.log(userid)
      const response =  axios.post('http://localhost:8002/create_room/', { userid })
      setRoom(response.data);
      navigate(`/chat/${response.data.id}`)
    }
    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <div>
                    <h2>{profile.name}</h2>
                     <button onClick={() => navigate(-1)}>Back</button>
                     <button onClick={(handleclick)}>chat with {profile.name}</button>
                  
                </div>
            ) : (
                <p>No profile data found</p>
            )}
        </div>
    );
};

export default Profile;
