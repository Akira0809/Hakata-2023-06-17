import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const prefectures = [
    '未選択', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const HomePage: React.FC = () => {
    const [selectedPrefecture, setSelectedPrefecture] = useState("未選択");
    useEffect(() => {
        // コンポーネントがマウントされたときに初期値をローカルストレージにセットします
        localStorage.setItem('prefecture', selectedPrefecture);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPrefecture(event.target.value);
        localStorage.setItem('prefecture', event.target.value);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">サイト概要</h2>
            <p className="mt-4 text-gray-600">ここにサイトの概要を記述します。</p>
            <select value={selectedPrefecture} onChange={handleChange} className="mt-4 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {prefectures.map((prefecture, i) => (
                    <option value={prefecture} key={i}>{prefecture}</option>
                ))}
            </select>
            <Link to="/chatroom" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">チャットルームへ</Link>
        </div>
    )
}

export default HomePage;