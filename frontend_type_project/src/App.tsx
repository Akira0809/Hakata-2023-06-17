import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatRoom from './pages/ChatRoom';
import OverView from "./pages/OverView";
import TermsOfService from "./pages/TermsOfService";
import StreamingJsonComponent from './components/streaming';


const App: React.FC = () => {
    return (
        <Router >
            <div>
                {/*<Router basename="/static_goto0617"> */}
                <Header />
                <main>
                    <Routes>
                        {/*<Route path="/index.html" element={<HomePage/>}/>*/}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/chatroom" element={<ChatRoom />} />

                        <Route path="/overview" element={<OverView />} />
                        <Route path="/termsofservice" element={<TermsOfService />} />
                        <Route path="/streaming" element={<StreamingJsonComponent />} /> {/* <-- This is new */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
