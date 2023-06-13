import React from 'react';
import '../styles/Header.css';

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
        </header>
    );
};

export default Header;

