import React, { useState } from 'react';

interface IMessage {
    sender: 'user' | 'chatGPT',
    senderName: string,
    content: string
}

const ChatRoom: React.FC = () => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false); // New State for loading status
    const userName = "John";
    const prefecture = localStorage.getItem('prefecture') || '未選択';

    const handleSend = async () => {
        setLoading(true);
        setChatLog([...chatLog, {sender: 'user', senderName: userName, content: message}]);

        const requestBody = {
            prefecture,
            question: message
        };

        const response = await fetch('https://goto-concierge.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const apiResponse = await response.json();
            setChatLog(currentChat => [...currentChat, {sender: 'chatGPT', senderName: 'ChatGPT', content: apiResponse.answer}]);
        } else {
            console.error(`API request failed with status ${response.status}`);
        }

        setMessage("");
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">チャットルーム</h1>
            <h2 className="mt-2 text-gray-800">選択された都道府県: {prefecture}</h2>
            <div className="mt-6 space-y-4">
                {chatLog.map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg ${message.sender === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-gray-800'}`}>
                        <b>{message.senderName}: </b>{message.content}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="flex-grow py-2 px-3 border border-gray-300 bg-white rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {loading ? '...' : '送信'}
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
