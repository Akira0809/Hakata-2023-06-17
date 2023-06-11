from flask import Flask, Response
from src.llama import chat

app = Flask(__name__)

@app.route('/llama_chat')
def llama_chat_route():
    q = "愛知県の観光産業についての概要をおしえて"
    def generate():
        for response_text in chat.llama_chat(q):
            yield response_text + ''  # Adding newline character for readability
    return Response(generate(), mimetype='text/plain')

if __name__ == '__main__':
    app.run()