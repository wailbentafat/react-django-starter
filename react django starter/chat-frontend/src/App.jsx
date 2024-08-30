
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signin from './componenets/signin';
import ChatRoom from './componenets/chatroom';
import Roompage from './pages/room';
import Profilepage from './pages/profile';
import Searchpage from './pages/search';
import { AuthProvider } from './context/authcontext';
import { UserProvider } from './context/usercontext';

import MainPage from './pages/main';
const App = () => {
    return (
        <Router>

            <AuthProvider>
                <UserProvider>
                    <Routes>
                    <Route path="/login" element={<Signin />} />

                      <Route path="/" element={<MainPage />} />
                        <Route path="/rooms" element={<Roompage />} />
                        <Route path="/chat/:roomId" element={<ChatRoom />} />
                        <Route path="/profile" element={<Profilepage />} />
                        <Route path="/search" element={<Searchpage />} />

                    </Routes>
                </UserProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;