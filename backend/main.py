# # from fastapi import FastAPI
# # from executor import execute_flow

# # app = FastAPI()

# # @app.post("/execute")
# # def run_flow(payload: dict):
# #     return execute_flow(payload)


# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # from typing import List, Dict, Any
# # import requests

# # app = FastAPI()


# # # ---------- Models ----------

# # class Node(BaseModel):
# #     id: str
# #     type: str
# #     data: Dict[str, Any]


# # class Edge(BaseModel):
# #     source: str
# #     target: str
# #     sourceHandle: str | None = None


# # class FlowRequest(BaseModel):
# #     userMessage: str
# #     nodes: List[Node]
# #     edges: List[Edge]


# # # ---------- Simple AI Logic (Mock LLM) ----------

# # def ai_response(prompt: str) -> str:
# #     # Mock AI logic (replace with OpenAI / Bedrock later)
# #     return f"AI processed: {prompt}"


# # # ---------- Flow Executor ----------

# # @app.post("/execute")
# # def execute_flow(flow: FlowRequest):
# #     user_message = flow.userMessage
# #     keyword = None
# #     webhook_url = None

# #     # Extract condition keyword & webhook
# #     for node in flow.nodes:
# #         if node.type == "condition":
# #             keyword = node.data.get("keyword")
# #         if node.type == "webhook":
# #             webhook_url = node.data.get("url")

# #     # Condition check
# #     condition_true = keyword and keyword.lower() in user_message.lower()

# #     # AI response
# #     ai_reply = ai_response(user_message)

# #     # Webhook only if condition TRUE
# #     if condition_true and webhook_url:
# #         try:
# #             requests.post(
# #                 webhook_url,
# #                 json={
# #                     "message": user_message,
# #                     "ai_reply": ai_reply
# #                 },
# #                 timeout=3
# #             )
# #         except Exception as e:
# #             return {
# #                 "reply": ai_reply,
# #                 "warning": f"Webhook failed: {str(e)}"
# #             }

# #     return {
# #         "reply": ai_reply,
# #         "conditionMatched": condition_true
# #     }

# # from fastapi import FastAPI
# # from pydantic import BaseModel
# # from typing import List, Dict, Any
# # from executor import execute_flow

# # app = FastAPI()

# # class Node(BaseModel):
# #     id: str
# #     type: str
# #     data: Dict[str, Any]

# # class Edge(BaseModel):
# #     source: str
# #     target: str
# #     sourceHandle: str | None = None

# # class FlowRequest(BaseModel):
# #     userMessage: str
# #     nodes: List[Node]
# #     edges: List[Edge]

# # @app.get("/")
# # def health():
# #     return {"status": "Mini AI Workflow Backend Running"}

# # @app.post("/execute")
# # def run_flow(flow: FlowRequest):
# #     return execute_flow(flow.dict())


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from typing import List, Dict, Any
# from executor import execute_flow

# app = FastAPI()

# # ✅ ADD THIS (CORS)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Vite frontend
#     allow_credentials=True,
#     allow_methods=["*"],  # allow POST, OPTIONS, etc
#     allow_headers=["*"],
# )

# class Node(BaseModel):
#     id: str
#     type: str
#     data: Dict[str, Any]

# class Edge(BaseModel):
#     source: str
#     target: str
#     sourceHandle: str | None = None

# class FlowRequest(BaseModel):
#     userMessage: str
#     nodes: List[Node]
#     edges: List[Edge]

# @app.get("/")
# def health():
#     return {"status": "Mini AI Workflow Backend Running"}

# @app.post("/execute")
# def run_flow(flow: FlowRequest):
#     return execute_flow(flow.dict())
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from executor import execute_flow

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: str | None = None

class FlowRequest(BaseModel):
    userMessage: str
    nodes: List[Node]
    edges: List[Edge]

@app.post("/execute")
def run_flow(flow: FlowRequest):
    return execute_flow(flow.dict())
