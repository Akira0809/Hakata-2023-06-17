import React, { useState } from 'react';

const ChatRoom: React.FC = () => {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState<string[]>([]);

    const handleSend = () => {
        // ここでAPIを呼び出し、結果をchatLogに追加します
        // 仮の結果を表示する
        setChatLog([...chatLog, message]);
        setMessage("");
    };

    return (
        <div>
            <h1>チャットルーム</h1>

            <div>
                {chatLog.map((message, index) => (
                    <p key={index}>{message}</p>
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
