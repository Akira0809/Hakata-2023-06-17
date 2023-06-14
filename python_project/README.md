pip install -e .

pip install -r requirements.txt

```

export OPENAI_API_KEY=
export DATA_PATH=data
export INDEX_PATH=index

```

docker build -t hakata_backend .

docker run  --env-file .env -rm -p 5000:5000 hakata_backend


## commands
```

curl --no-buffer http://localhost:5000/llama_chat

クエリパラメータ

curl -G --data-urlencode "chat=愛知県の観光産業についての概要をおしえて" http://localhost:5000/params

```