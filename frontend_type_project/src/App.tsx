import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatRoom from './pages/ChatRoom';
import OverView from "./pages/OverView";
import TermsOfService from "./pages/TermsOfService";


const App: React.FC = () => {
    return (
        <Router basename="/static_goto0617">
            <div>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/chatroom" element={<ChatRoom/>}/>
                        <Route path="/overview" element={<OverView/>}/>
                        <Route path="/termsofservice" element={<TermsOfService/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
