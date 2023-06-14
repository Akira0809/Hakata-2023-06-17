from llama_index.readers import Document
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
import os


if(os.path.isfile("data/aiti.txt")):
  with open("data/aiti.txt", "r") as f:
      text = f.read()

  doc = Document(text)
  index = GPTVectorStoreIndex.from_documents([doc])
  index.storage_context.persist(persist_dir="test")