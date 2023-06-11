# hakata0617/Dockerfile
FROM golang:1.20

# appディレクトリの作成
RUN mkdir /go/src/go_project

# ワーキングディレクトリの設定
WORKDIR /go/src/app

# Goモジュールの初期化
RUN go mod init example.com/hakata0617

# 必要なパッケージを取得
RUN go get github.com/joho/godotenv

COPY . /go/src/app

RUN go build -o main .

RUN chmod +x main

EXPOSE 8080

CMD ["./main"]