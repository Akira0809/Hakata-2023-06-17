from flask import Flask, Response, request
from src.llama import chat

app = Flask(__name__)


@app.route('/llama_chat')
def llama_chat_route():
    q = request.args['question']
    p = request.args['prefucture']
    if(q == ''):
        q = "愛知県の観光産業についての概要をおしえて"

    def generate():
        for response_text in chat.llama_chat(q):
            yield response_text  # Adding newline character for readability
    return Response(generate(), mimetype='text/plain')


@app.route('/params')
def Get_Query_Params():
    VAR1 = request.args['chat']
    print(VAR1)
    return Response(VAR1, mimetype='text/plain')


@app.route('/ping')
def ping(): return Response('Pong', mimetype='text/plain')


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000)
