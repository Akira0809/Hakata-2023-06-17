import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from llama_index import (
    Document,
    GPTVectorStoreIndex,
    GPTListIndex,
    LLMPredictor,
    ServiceContext,
    SimpleDirectoryReader,
    PromptHelper,
    StorageContext,
    load_index_from_storage,
    download_loader,
)


# この辺の設計方針疑問です。
def get_llm(llm_name, model_temperature, api_key, max_tokens=256):
    os.environ["OPENAI_API_KEY"] = api_key
    if llm_name == "text-davinci-003":
        return OpenAI(
            temperature=model_temperature, model_name=llm_name, max_tokens=max_tokens
        )
    else:
        return ChatOpenAI(
            temperature=model_temperature, model_name=llm_name, max_tokens=max_tokens
        )

def index_init():
  return None

def llama_chat(question):
  llm_name = "text-davinci-003"
  model_temperature = 0.5
  api_key = os.getenv("OPENAI_API_KEY")  # Replace with your actual OpenAI API k
  FILE_PATH = "data"
  index = None
  if os.path.isfile(FILE_PATH + "/vector_store.json"):
    storage_context = StorageContext.from_defaults(persist_dir=FILE_PATH)
    index = load_index_from_storage(storage_context)
  else:
    llm = get_llm(llm_name, model_temperature, api_key)
    service_context = ServiceContext.from_defaults(llm_predictor=LLMPredictor(llm=llm))
    index = load_index_from_storage(
        StorageContext.from_defaults(persist_dir="./initial_index"),
        service_context=service_context,
    )
    documents = SimpleDirectoryReader('scripts').load_data()
    index = GPTVectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir="data")

  query_engine = index.as_query_engine(
    # streaming=True,
    # similarity_top_k=1
  )
  response = query_engine.query(question)
  # for text in response.response_gen:
  #   print(text)
  
  return response

