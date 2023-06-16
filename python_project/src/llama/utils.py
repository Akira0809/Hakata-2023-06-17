import os
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI

def get_llm(model_name, model_temperature, api_key, max_tokens=512):
    os.environ["OPENAI_API_KEY"] = api_key
    if model_name == "text-davinci-003":
        return OpenAI(
            temperature=model_temperature, model_name=model_name, max_tokens=max_tokens,streaming=True
        )
    else:
        return ChatOpenAI(
            temperature=model_temperature, model_name=model_name, max_tokens=max_tokens
        )

prefectures = [
    '未選択', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
    '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]