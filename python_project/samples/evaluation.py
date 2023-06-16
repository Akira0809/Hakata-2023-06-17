from llama_index.evaluation import ResponseEvaluator
from llama_index import (
    LLMPredictor,
    ServiceContext,
    load_index_from_storage,
    StorageContext
)
from langchain.chat_models import ChatOpenAI
import pickle
import redis

r = redis.Redis(host='localhost', port=6379, db=0)

# build service context
llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0, max_tokens=1024))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor,)

# # build index
# prefecture = "愛媛県"
# filepath = "index/" + prefecture
# storage_context = StorageContext.from_defaults(persist_dir=filepath)
# index = load_index_from_storage(storage_context)

# # define evaluator
evaluator = ResponseEvaluator(service_context=service_context)

# # query+ index
# print("reference" + prefecture)
# q = "愛知県の観光産業の概要をおしえて"
# print("prompt: " + q)
# query_engine = index.as_query_engine()
# response = query_engine.query(q)

# # save response to redis

# print("ansewer:\n" + response.response)
# print("####################")
# # print(response.source_nodes[0])
# for res in response.source_nodes:
#     print(res)
# eval_result = evaluator.evaluate_source_nodes(response)
# print(str(eval_result))

# # responseオブジェクトをシリアライズ
# response_pickled = pickle.dumps(response)

# # シリアライズしたレスポンスをRedisに保存
# result = r.set('1234', response_pickled)
data = r.get('1234')

print("-----------------------")
rrres = pickle.loads(data)
nodes_string = []
correctness = []

for res in rrres.source_nodes:
    print(res)
    print()

for res in rrres.source_nodes:
    nodes_string.append(res.node.text)

eval_result = evaluator.evaluate_source_nodes(rrres)

for e in eval_result:
    if (e == 'YES'):
        correctness.append(True)
    else:
        correctness.append(False)

print(nodes_string)
print(correctness)
