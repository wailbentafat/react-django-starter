// src/pages/ChatRoom.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/usercontext';

const Chatroom = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [oldMessages, setOldMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8002/messages/${roomId}`);
                setOldMessages(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching messages:', err);
            } finally {
                setLoading(false);
            }
        };

        const getRoomUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8002/get_user/${roomId}/`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
        getRoomUsers();

        const wsUrl = `ws://localhost:8002/ws/chat/${roomId}/`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('WebSocket connection established');
            const testMessage = JSON.stringify({ action: 'test', content: 'Hello, WebSocket!' });
            ws.send(testMessage);
        };

        ws.onmessage = (event) => {
            console.log('Message received from server:', event.data);
            const parsedData = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, parsedData.message]);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [roomId, setUser]);

    const handleSendMessage = () => {
        if (socket && message.trim() !== '') {
            socket.send(JSON.stringify({ message }));
            setMessage('');
        }
    };

    if (loading) return <p>Loading old messages...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleClick = (userId) => {
        console.log(userId);
        navigate(`/profile/${userId}`);
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <div>
                <h3>Old Messages</h3>
                {oldMessages.map((msg, index) => (
                    <div key={index} className={msg.user_id === user?.user_id ? 'sent' : 'received'}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div>
                <h3>New Messages</h3>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.user_id === user?.user_id ? 'sent' : 'received'}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
            {user && (
                <a href="#" onClick={() => handleClick(user.user_id)}>Profile</a>
            )}
        </div>
    );
};

export default Chatroom;
