import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatRoom from './pages/ChatRoom';




const App: React.FC = () => {
    return (
        <Router  basename="/static_goto0617">
            <div>
                <Header/>
                <main>
                <Routes>
                    <Route  path="/index.html" element={<HomePage />}/>
                    <Route path="/chatroom" element={<ChatRoom/>}/>
                </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
