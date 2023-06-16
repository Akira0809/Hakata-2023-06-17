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


### python chat 

```

curl --no-buffer -X POST -H "Content-Type: application/json" -d '{
  "prefecture": "沖縄県",
  "question": "観光スポットはありますか？"
}' http://localhost:5000/llama_chat




```

### go_project

```

curl  --no-buffer  http://localhost:8080/flush


curl --no-buffer -X POST -H "Content-Type: application/json" -d '{
  "prefecture": "沖縄県",
  "question": "観光スポットはありますか？"
}' http://localhost:8080/mock

curl --no-buffer -X POST -H "Content-Type: application/json" -d '{
  "prefecture": "愛媛県",
  "question": "観光スポットはありますか？"
}' http://localhost:8080/chat

```


## json 構造体　chat

{
  prefecture string
  question string
  index string (県名,汎用等)
}

