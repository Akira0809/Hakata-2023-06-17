from src.llama import chat

def justPrintLlamaChat():
  q = "愛知県の観光産業についての概要をおしえて"
  for response_text in chat.llama_chat(q):
    print(response_text, end="", flush=True)
  return None

justPrintLlamaChat()