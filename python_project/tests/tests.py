from src.llama import chat

def justPrintLlamaChat():
  q = "愛知県の観光産業についての概要をおしえて"
  for response_text in chat.llama_chat(q):
    print(response_text, end="", flush=True)

def evaluateTest():
  q = "沖縄の観光産業について概要をおしえて"
  res ="" 
  for response_text in chat.llama_chat(q):
    res = res +response_text
  print(res)

evaluateTest()