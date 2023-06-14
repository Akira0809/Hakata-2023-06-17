import React from 'react';
import '../styles/Header.css';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="title">
                <h1>GoToコンシェルジュ</h1>
            </div>
            <nav className="menu">
                <ul>
                    <li><Link to="/">ホーム</Link></li>
                    <li><Link to="/overview">概要</Link></li>
                    <li><Link to="/termsofservice">規約</Link></li>
                    <li><Link to="/contact">コンタクト</Link></li>
                </ul>
            </nav>
            <div className="header-right">
                <Link to="/chatroom">チャットルームへ</Link>
            </div>
        </header>
    );
};
export default Header;

