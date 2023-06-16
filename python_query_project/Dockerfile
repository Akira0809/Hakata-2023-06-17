# ベースイメージの選択
FROM python:3.9
USER root

RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

COPY . .

# 必要なパッケージのインストール
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "main.py"]