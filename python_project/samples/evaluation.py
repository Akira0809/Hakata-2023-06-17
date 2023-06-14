from llama_index.evaluation import ResponseEvaluator
from llama_index import(
    LLMPredictor,
    ServiceContext,
    load_index_from_storage,
    StorageContext
)
from langchain.chat_models import ChatOpenAI


# build service context
llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0,max_tokens=1024))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)

# build index
prefecture = "沖縄県"
filepath = "../data/"+  prefecture  
storage_context = StorageContext.from_defaults(persist_dir=filepath)
index = load_index_from_storage(storage_context)

# define evaluator
evaluator = ResponseEvaluator(service_context=service_context)

# query+ index
print("reference" + prefecture)
q = "北海道の観光産業の概要をおしえて"
print("prompt: " + q)
query_engine = index.as_query_engine()
response = query_engine.query(q)
print("ansewer:\n" + response.response)
print("####################")
# print(response.source_nodes[0])
for res in response.source_nodes:
    print(res)
eval_result =  evaluator.evaluate_source_nodes(response)
print(str(eval_result))