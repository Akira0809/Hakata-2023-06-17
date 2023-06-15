from flask import Flask, Response, request, jsonify
from src.llama import chat

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/llama_chat',methods=['POST'])
def llama_chat_route():
    data = request.json
    if(data['prefecture'] == ''):
        print("unifeaid")
        def generate():
            for response_text in chat.LlamaChatUnified(data['question']):
                yield response_text  # Adding newline character for readability
        return Response(generate(), mimetype='text/plain')
    else:
        # just print hello
        return Response("hello", mimetype='text/plain')


@app.route('/params')
def Get_Query_Params():
    VAR1 = request.args['chat']
    print(VAR1)
    return Response(VAR1, mimetype='text/plain')



@app.route('/ping')
def ping(): return Response('Pong', mimetype='text/plain')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
