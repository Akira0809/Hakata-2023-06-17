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
from llama_index.readers import Document
import os


prefectures = [
    '未選択', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]

sample_pre = [
    '福岡県', '長崎県', '宮崎県', '鹿児島県', '沖縄県'
]


def UnifiedIndexInit():
    index_path = os.getenv("INDEX_PATH") + "/unified"
    data_path = os.getenv("DATA_PATH")
    site_data_path = os.getenv("SITE_DATA_PATH")
    print("unified index init" + data_path)
    documents = SimpleDirectoryReader(data_path).load_data()
    site_documents = SimpleDirectoryReader(site_data_path).load_data()
    documents = documents + site_documents
    index = GPTVectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=index_path)
    return index


def PrefectureIndexInit(prefecture):
    docs = []
    index = None
    prefecture_path = os.getenv("INDEX_PATH") + "/" + prefecture
    # prefecture_file = "../hakata/data" + "/" + prefecture + ".txt"
    prefecture_file = os.getenv("DATA_PATH") + "/" + prefecture + ".txt"
    file_pathes = [prefecture_file]
    file_path = prefecture_file
    # file_pathes.append(os.getenv("DATA_PATH") + "/" +
    #                    prefecture + "_sightseeing.txt")
    try:
        if not os.path.isfile(file_path):
            raise FileNotFoundError
        print(prefecture_file)
        os.makedirs(prefecture_path, exist_ok=True)
        for file_path in file_pathes:
            with open(file_path, "r") as f:
                text = f.read()
                docs.append(Document(text))
        index = GPTVectorStoreIndex.from_documents(docs)
        index.storage_context.persist(persist_dir=prefecture_path)
    except FileNotFoundError:
        print(f"file not found about this prefecture on {prefecture_file}")
        # You can add more code here to handle the situation where the file was not found.


def PrefecturesIndexInit(prefectures, path):
    alldocs = None
    for prefecture in prefectures:
        docs = []
        index = None
        prefecture_path = path + "/" + prefecture
        prefecture_file = "../hakata/data" + "/" + prefecture + ".txt"
        if (os.path.isfile(prefecture_file)):
            print(prefecture_file)
            os.makedirs(prefecture_path, exist_ok=True)
            with open(prefecture_file, "r") as f:
                text = f.read()
                docs.append(Document(text))
                # alldocs.append(Document(text))
            index = GPTVectorStoreIndex.from_documents(docs)
            index.storage_context.persist(persist_dir=prefecture_path)

        return index


if __name__ == '__main__':
    PrefectureIndexInit("愛媛県")
    # UnifiedIndexInit()
