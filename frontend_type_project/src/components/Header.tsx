import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h1 className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">GoToコンシェルジュ</h1>
                <nav className="flex">
                    <ul className="flex space-x-10">
                        <li><Link className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-gray-500 hover:text-gray-700" to="/">ホーム</Link></li>
                        <li><Link className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-gray-500 hover:text-gray-700" to="/overview">概要</Link></li>
                        <li><Link className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-gray-500 hover:text-gray-700" to="/termsofservice">規約</Link></li>
                        <li><Link className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-gray-500 hover:text-gray-700" to="/contact">コンタクト</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;



