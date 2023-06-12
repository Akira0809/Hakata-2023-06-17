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
