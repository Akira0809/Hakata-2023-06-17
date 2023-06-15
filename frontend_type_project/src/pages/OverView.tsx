import React from "react";

const Overview: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">サービス概要</h2>
            <p className="mt-4 text-gray-600">
                このサービスでは、各県の観光情報をチャット形式で提供します。
                情報はLambda Indexを利用して保存されており、ChatGPT APIを使用して回答を提供します。
                サービスはスレッド形式になっており、過去の回答も参照可能です。
            </p>
        </div>
    )
}

export default Overview;

