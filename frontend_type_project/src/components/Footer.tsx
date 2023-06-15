import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white shadow-inner mt-10 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900">GoToコンシェルジュ</h2>
                <div className="mt-3 text-gray-500">
                    <p>&copy; {new Date().getFullYear()} GoToコンシェルジュ</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

