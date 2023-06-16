import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">利用規約</h2>
            <p className="mt-4 text-gray-600">
                このサービス（以下、"サービス"）は、チャット形式で各県の観光情報を提供します。
                本サービスを使用することで、以下の利用規約に同意したものとみなされます。
            </p>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">サービス内容</h3>
            <p className="mt-2 text-gray-600">
                サービスは、Lambda Indexに保存された情報を基に、ChatGPT APIを使用して回答を提供します。
                サービスはスレッド形式になっており、過去の回答も参照可能です。
            </p>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">免責事項</h3>
            <p className="mt-2 text-gray-600">
                サービスの情報は信頼性を保つよう努力していますが、その内容の正確性や完全性を保証するものではありません。
                サービスから得られた情報に基づいて行われる行動について、サービスは責任を負いません。
            </p>
            <h3 className="mt-6 text-xl font-semibold text-gray-800">著作権</h3>
            <p className="mt-2 text-gray-600">
                サービスに含まれる情報、コンテンツは著作権法により保護されており、無断での複製や再配布は禁止されています。
            </p>
        </div>
    )
}

export default TermsOfService;
