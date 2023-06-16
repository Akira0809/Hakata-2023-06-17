import React, {useEffect, useState} from 'react';
import {GoogleMap, LoadScript} from "@react-google-maps/api";

interface IMessage {
    sender: 'user' | 'chatGPT',
    senderName: string,
    content: string
}

const containerStyle = {
    width: "100vw",
    height: "40vw", // Adjust this value based on your needs to maintain aspect ratio
};

const ChatRoom: React.FC = () => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false); // New State for loading status
    const userName = "自分";
    const prefecture = localStorage.getItem('prefecture') || '未選択';

    const handleSend = async () => {
        setLoading(true);
        setChatLog([...chatLog, {sender: 'user', senderName: userName, content: message}]);

        const requestBody = {
            prefecture,
            question: message
        };

        const response = await fetch('http://localhost:8080/chatgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const apiResponse = await response.json();
            setChatLog(currentChat => [...currentChat, {
                sender: 'chatGPT',
                senderName: 'ChatGPT',
                content: apiResponse.answer
            }]);
        } else {
            console.error(`API request failed with status ${response.status}`);
        }

        setMessage("");
        setLoading(false);
    };

    const [center, setCenter] = useState({lat: 35.69575, lng: 139.77521}); // Initialize center to default values

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }, (error) => {
                console.error(error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <><LoadScript googleMapsApiKey="AIzaSyDheL3RHziVaMVYE-HC-nerJCytK_qRaTQ">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            ></GoogleMap>
        </LoadScript>
            <div className="flex flex-col h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">チャットルーム</h1>
                    <h2 className="mt-2 text-gray-800">選択された都道府県: {prefecture}</h2>
                </div>
                <div className="flex-grow overflow-auto flex flex-col-reverse pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
                        {chatLog.map((message, index) => (
                            <div key={index}
                                 className={`p-4 rounded-lg ${message.sender === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-gray-800'}`}>
                                <b>{message.senderName}: </b>{message.content}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white fixed bottom-0 left-0">
                    <div className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="flex-grow py-2 px-3 border border-gray-300 bg-white rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {loading ? '...' : '送信'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}
export default ChatRoom;
