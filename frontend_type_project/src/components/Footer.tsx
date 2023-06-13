import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="title">
                <h2>GoToコンシェルジュ</h2>
            </div>
            <div className="copyright">
                <p>&copy; {new Date().getFullYear()} GoToコンシェルジュ</p>
            </div>
        </footer>
    );
};

export default Footer;
