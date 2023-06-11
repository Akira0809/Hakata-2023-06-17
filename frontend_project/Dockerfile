# ビルドステージ
FROM node:16-alpine as build-stage

# ワーキングディレクトリを設定
WORKDIR /app

# 依存関係のファイルをコピー
COPY package*.json ./

# パッケージをインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 実行ステージ
FROM nginx:stable-alpine as production-stage

# ビルド成果物をNginxにコピー
COPY --from=build-stage /app/build /usr/share/nginx/htmls

# Nginxの設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80番ポートを開放
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]