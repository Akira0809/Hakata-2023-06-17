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
    const userName = "John"; // ユーザー名は変更可能な形にすることができます
    const prefecture = localStorage.getItem('prefecture') || '未選択';

    const handleSend = async () => {
        setChatLog(prevLog => [...prevLog, { sender: 'user', senderName: userName, content: message }]);

        const requestBody = {
            prefecture,
            question: message
        };

        const response = await fetch('https://goto-concierge.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "prefecture": "愛媛県",
                "question": "観光スポットはありますか？"
            })
        });

        if (response.ok) {
            const reader = response.body?.getReader();
            const decoder = new TextDecoder('utf-8');

            const processStream = async (result: ReadableStreamReadResult<Uint8Array>) => {
                if (result.done) return;

                const chunk = decoder.decode(result.value);
                try {
                    const parsedChunk = JSON.parse(chunk);
                    if (parsedChunk.answer) {
                        setChatLog(prevLog => [...prevLog, {
                            sender: 'chatGPT',
                            senderName: 'ChatGPT',
                            content: parsedChunk.answer
                        }]);
                    }
                } catch (error) {
                    console.error('Error parsing chunk:', error);
                }

                if (reader) {
                    reader.read().then(processStream);
                }
            }

            if (reader) {
                reader.read().then(processStream);
            }
        } else {
            console.error(`API request failed with status ${response.status}`);
        }

        setMessage("");
    };

    const [center, setCenter] = useState({lat: 35.69575, lng: 139.77521}); // Initialize center to default values


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
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            送信
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}
export default ChatRoom;
