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
                    <li>ホーム</li>
                    <li>概要</li>
                    <li>規約</li>
                    <li>コンタクト</li>
                </ul>
            </nav>
            <div className="header-right">
                <Link to="/chatroom">チャットルームへ</Link>
            </div>
        </header>
    );
};

export default Header;

