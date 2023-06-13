import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
      <div>
        <Header />

        <main>
          <h2>サイト概要</h2>
          <p>ここにサイトの概要を記述します。</p>

          <select>
            {Array.from({ length: 47 }, (_, i) => (
                <option value={i + 1} key={i}>{i + 1}都道府県</option>
            ))}
          </select>

          <button>チャットルームへ</button>
        </main>

        <Footer />
      </div>
  );
};

export default App;
