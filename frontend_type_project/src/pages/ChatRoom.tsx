import React, { useState } from 'react';

interface IMessage {
    sender: 'user' | 'chatGPT',
    senderName: string,
    content: string
}

const ChatRoom: React.FC = () => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState<IMessage[]>([]);
    const userName = "John"; // ユーザー名は変更可能な形にすることができます
    const prefecture = localStorage.getItem('prefecture') || '未選択';

    const handleSend = async () => {
        // ユーザーのメッセージをchatLogに追加
        setChatLog([...chatLog, {sender: 'user', senderName: userName, content: message}]);

        // POSTリクエストを送信
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
    };

    return (
        <div>
            <h1>チャットルーム</h1>
            <h2>選択された都道府県: {prefecture}</h2>
            <div>
                {chatLog.map((message, index) => (
                    <div key={index} className={message.sender}>
                        <b>{message.senderName}: </b>{message.content}
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />

            <button onClick={handleSend}>送信</button>
        </div>
    );
};

export default ChatRoom;
