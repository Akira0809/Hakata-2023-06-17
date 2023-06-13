from src.llama import chat

import sys
from src.llama import chat

def justPrintLlamaChat(location):
  q = f"{location}の観光産業についての概要をおしえて"
  for response_text in chat.llama_chat(q):
    print(response_text, end="", flush=True)
  return None

if __name__ == '__main__':
    location = sys.argv[1] if len(sys.argv) > 1 else '愛媛県'
    justPrintLlamaChat(location)