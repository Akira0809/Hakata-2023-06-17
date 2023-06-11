from src.llama import chat
def main():
  print("Start scraping...")
  q = "愛知県の観光産業についての概要をおしえて"
  # q2 = "ミシュランガイドに選出されたレストランを教えて"
  print(chat.llama_chat(q))


if __name__ == '__main__':
  main()
