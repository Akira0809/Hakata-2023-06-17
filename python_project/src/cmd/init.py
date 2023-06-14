import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from llama_index import (
    GPTVectorStoreIndex,
    LLMPredictor,
    ServiceContext,
    SimpleDirectoryReader,
    load_index_from_storage,
)
import os
from src.llama import utils
prefectures = [
    '未選択', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]


def IndexInit(data_path, index_path):
    documents = SimpleDirectoryReader(data_path).load_data()
    index = GPTVectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=index_path)


def LS(data_path):
    dir_list = []
    for dir in os.listdir(data_path) :
        if os.path.isdir(os.path.join(data_path, dir)):
            dir_list.append(os.path.join(data_path, dir))
    return dir_list

def mkdir(prefectures,path):
    for prefecture in prefectures:
        prefecture_path = path + "/" + prefecture
        data_path = "../hakata/data"
        os.makedirs(prefecture, exist_ok=True)
        if (data_path)

if __name__ == '__main__':
    mkdir(prefectures,"../data")
