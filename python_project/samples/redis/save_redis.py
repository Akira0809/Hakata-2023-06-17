import redis
import pickle

# MyClassの定義を追加


class MyClass:
    def __init__(self, value):
        self.value = value


# Redisに接続
r = redis.Redis(host='localhost', port=6379, db=0)

# Redisからpickle化したインスタンスを取得
pickled_instance = r.get('1234')  # ここを修正

# pickle化したインスタンスをデシリアライズ
my_instance = pickle.loads(pickled_instance)

# 値を表示
print(my_instance.value)  # my_instanceの値を出力
