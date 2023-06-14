from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.indices.query.response_synthesis import ResponseSynthesizer


# Load documents from a directory
documents = SimpleDirectoryReader('data').load_data()

# Build an index over the documents
index = GPTVectorStoreIndex.from_documents(documents)

# Create a retriever query engine
retriever = index.as_retriever(
    retriever_mode='llm',
  )
query_engine = RetrieverQueryEngine(retriever )

# Query the index
query = "tell me about the 愛知?"
response = query_engine.query(query)

# Print the response
print(response)