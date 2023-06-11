## ご当地コンシェルジュ

## Setup
ローカルPC上でバックエンドとフロントエンドを同時にデバック実行する方法
1. Dockerをインストール
2. 以下のコマンドを実行
```bash
$ docker-compose up -d --build
```
3. コンテナ内のログ確認
```bash
$ docker-compose logs
```
4. (http://localhost/)フロントエンドにアクセス
5. (http://localhost:8080/)バックエンドにアクセス
6. 作業終了時に確実に以下のコマンドを実行
```bash
$ docker-compose down
```