## フロントエンド構成

## App.tsx構成
```tsx
const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Header/>
                <main>
                    <Routes>
                        <Route  path="/" element={<HomePage />}/>
                        <Route path="/chatroom" element={<ChatRoom/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
};

```
Routesタグ内に各ページの要素をを入れていく形で行きます。

## ページの遷移方法
```tsx
    <Link to="/chatroom">チャットルームへ</Link>
```
Linkタグを使って遷移するようにする。

## GCEのGoコンテナに情報を送信する方法

```ts
// HTTP GETリクエストを送るサンプル
async function fetchData(baseUrl: string, path: string) {
    const url = `${baseUrl}${path}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();  // 返ってきた文字列を受け取るサンプル
}

// 文字列を送るサンプル
async function sendData(baseUrl: string, path: string, data: string) {
    const url = `${baseUrl}${path}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
}

// 特定のものを探して返ってくるサンプル
async function findData(baseUrl: string, path: string, searchValue: string) {
    const data = await fetchData(baseUrl, path);
    if (data.includes(searchValue)) {
        return searchValue;
    }
    return 'Not Found';
}

// これらの関数を使う例:
const baseUrl = 'https://goto-concierge.com';
const getPath = '/get';
const postDataPath = '/post';

fetchData(baseUrl, getPath).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});

const dataToSend = 'Hello, world!';
sendData(baseUrl, postDataPath, dataToSend).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});

const valueToFind = 'specific value';
findData(baseUrl, getPath, valueToFind).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error:', error);
});
```