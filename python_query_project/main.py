# main.py
from flask import Flask, request, jsonify
from media_classifier import MediaClassifier

app = Flask(__name__)

@app.route('/scripe', methods=['POST'])
def classify():
    print("Pythonすくレイプテスト")

    try:
        data = request.get_json()
    except Exception as e:
        print("Error in getting JSON data from request: ", e)
        return jsonify({"error": "Invalid data in request"}), 400

    response = []
    for item in data:
        try:
            classifier = MediaClassifier(item['link'])
            media_type = classifier.get_media_type()
            response.append({
                'title': item['title'],
                'type': media_type,
                'link': item['link']
            })
        except Exception as e:
            print(f"Error in processing item {item['link']}: ", e)
            return jsonify({"error": f"Error in processing item {item['link']}. Check server logs for details"}), 500

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')