import React from "react";

const Overview: React.FC = () => {
    return (
        <div>
            <h2>サービス概要</h2>
            <p>
                このサービスでは、各県の観光情報をチャット形式で提供します。
                情報はLambda Indexを利用して保存されており、ChatGPT APIを使用して回答を提供します。
                サービスはスレッド形式になっており、過去の回答も参照可能です。
            </p>
        </div>
    )
}

export default Overview;
