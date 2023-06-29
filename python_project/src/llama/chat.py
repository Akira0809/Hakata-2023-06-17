import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from llama_index import (
    GPTVectorStoreIndex,
    LLMPredictor,
    ServiceContext,
    StorageContext,
    load_index_from_storage,
)
from src.llama import utils
from src.cmd import init
import redis
import pickle

def InitIndex(prefecture):
    index_path = os.getenv("INDEX_PATH")
    prefecture_index_path = index_path + "/" + prefecture
    print(prefecture_index_path)
    # indexが存在する場合
    if os.path.isfile(prefecture_index_path + "/vector_store.json"):
        print("index exists")
        storage_context = StorageContext.from_defaults(
            persist_dir=prefecture_index_path)
        index = load_index_from_storage(storage_context)
    else:
        print("index not found")
        if (prefecture == "unified"):
            index = init.UnifiedIndexInit()
        else:
            index = init.PrefectureIndexInit(prefecture=prefecture)
    return index


def LlamaChat(prefecture, question):
    model_name = "text-davinci-003"
    model_temperature = 0
    # Replace with your actual OpenAI API k
    api_key = os.getenv("OPENAI_API_KEY")
    redis_path =os.getenv("REDIS_PATH")
    if(redis_path == None): redis_path="localhost"
    r = redis.Redis(host=redis_path, port=6379, db=0)

    print(prefecture)
    index = InitIndex(prefecture=prefecture)
    print(index)
    llm = utils.get_llm(model_name, model_temperature, api_key)
    service_context = ServiceContext.from_defaults(
        llm_predictor=LLMPredictor(llm=llm))
    if (index == None):
        yield f"Error: Index is not found about this prefecture:{prefecture}"
        return

    query_engine = index.as_query_engine(
        streaming=True,
        similarity_top_k=2,
        service_context=service_context
    )
    response = query_engine.query(question)


     # シリアライズしたレスポンスをRedisに保存
    for text in response.response_gen:
        yield text
# test llamachatunified
