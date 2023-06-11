from src.llama import chat

def test_llama_chat():
  q = "愛知県の観光産業についての概要をおしえて"
  for response_text in chat.llama_chat(q):
    print(response_text)

test_llama_chat()