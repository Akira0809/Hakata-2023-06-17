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

        // ここでAPIを呼び出し、結果をchatLogに追加します
        // この例では、API呼び出しは模擬しています
        const apiResponse = 'これはChatGPTからの応答です。';

        setChatLog(currentChat => [...currentChat, {sender: 'chatGPT', senderName: 'ChatGPT', content: apiResponse}]);
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
