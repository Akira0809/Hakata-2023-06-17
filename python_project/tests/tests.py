from src.llama import chat
from llama_index import (
    ServiceContext,
)
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from llama_index.evaluation import QueryResponseEvaluator
import pandas as pd

def justPrintLlamaChat():
  q = "愛知県の観光産業についての概要をおしえて"
  for response_text in chat.llama_chat(q):
    print(response_text, end="", flush=True)

def evaluateTest():
  api_key = os.getenv("OPENAI_API_KEY")  # Replace with your actual OpenAI API k
  q = "沖縄の観光産業について概要をおしえて"
  res ="" 
  for response_text in chat.llama_chat(q):
    res = res +response_text
  print(res)
  llm_predictor_gpt4 = chat.get_llm(model_name="gpt-4",model_temperature=0.5,api_key=api_key)
  service_context_gpt4 = ServiceContext.from_defaults(llm_predictor=llm_predictor_gpt4)
  evaluator_gpt4 = QueryResponseEvaluator(service_context=service_context_gpt4)


evaluateTest()