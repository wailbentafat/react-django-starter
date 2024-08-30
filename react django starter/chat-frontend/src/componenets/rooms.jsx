import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const RoomsComponent = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roomuser, setRoomuser] = useState({});
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getRooms = async () => {
            console.log('Calling getRooms');
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8002/get_room/');
                const roomsData = response.data;
                console.log('Rooms data:', roomsData);
                setRooms(roomsData);

                
                const filteredRoomUsers = {};
                roomsData.forEach(room => {
                    console.log('Filtering users for room:', room.id);
                    const filteredUsers = room.current_users.filter(current_user => current_user.id !== user?.id);
                    console.log('Filtered users:', filteredUsers);
                    filteredRoomUsers[room.id] = filteredUsers;
                });
                console.log('Setting roomuser:', filteredRoomUsers);
                setRoomuser(filteredRoomUsers);

            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError(error);
            } finally {
                setLoading(false);
                console.log('Finished calling getRooms');
            }
        };

        if (user) {
            getRooms();
        } else {
            
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Rooms</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <ul>
                    {rooms.map(room => (
                        <li key={room.id}>
                            <a href={`/chat/${room.id}`}>
                                {roomuser[room.id] && roomuser[room.id].map(user => `${user.firstname} ${user.secondname}`).join(', ')}
                            </a>
                            <p>{room.last_message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomsComponent;
