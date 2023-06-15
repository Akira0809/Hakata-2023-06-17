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


python chat 

curl --no-buffer -X POST -H "Content-Type: application/json" -d '{
  "prefecture": "",
  "question": "愛知県の観光スポットはありますか？"
}' http://localhost:5000/llama_chat


```


## json 構造体　chat

{
  prefecture string
  question string
  index string (県名,汎用等)
}

