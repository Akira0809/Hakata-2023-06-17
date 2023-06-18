import os
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from llama_index.evaluation import ResponseEvaluator
from llama_index import (
    GPTVectorStoreIndex,
    LLMPredictor,
    ServiceContext,
    StorageContext,
    load_index_from_storage,
)
import redis
import pickle

def Evaluate(id):
  redis_path =os.getenv("REDIS_PATH")
  if(redis_path == None): redis_path="localhost"
  r = redis.Redis(host=redis_path, port=6379, db=0)
  data = r.get(id)
  llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0, max_tokens=1024))
  service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor,)
  evaluator = ResponseEvaluator(service_context=service_context)

  print("-----------------------")
  rrres = pickle.loads(data)
  nodes_string = []
  correctness = []

  for res in rrres.source_nodes:
      print(res)
      print()

  for res in rrres.source_nodes:
      nodes_string.append(res.node.text)

  eval_result = evaluator.evaluate_source_nodes(rrres)

  for e in eval_result:
      if (e == 'YES'):
          correctness.append(True)
      else:
          correctness.append(False)

  print(nodes_string)
  print(correctness)
  r ={
     'nodes': nodes_string,
     'correctness':correctness
  }
  return r

if (__name__ == "__main__"):
    print(Evaluate("1234"))