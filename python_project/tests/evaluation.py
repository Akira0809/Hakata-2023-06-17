from llama_index.evaluation import ResponseEvaluator
from llama_index import(
    LLMPredictor,
    ServiceContext,
    load_index_from_storage,
    StorageContext
)
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI


# build service context
llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)

# build index
storage_context = StorageContext.from_defaults(persist_dir="data")
index = load_index_from_storage(storage_context)

# define evaluator
evaluator = ResponseEvaluator(service_context=service_context)

# query index
query_engine = index.as_query_engine()
response = query_engine.query("愛知の観光産業の概要をおしえて")
print(response)
eval_result = evaluator.evaluate(response)
print(str(eval_result))