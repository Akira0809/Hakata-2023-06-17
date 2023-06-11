import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage


# この辺の設計方針疑問です。
def index_init():
  return None

def llama_chat(question):
  FILE_PATH = "data"
  index = None
  if os.path.isfile(FILE_PATH + "/vector_store.json"):
    storage_context = StorageContext.from_defaults(persist_dir=FILE_PATH)
    index = load_index_from_storage(storage_context)
  else:
    documents = SimpleDirectoryReader('data').load_data()
    index = GPTVectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir="data")
  query_engine = index.as_query_engine()
  response = query_engine.query(question)
  
  return response

