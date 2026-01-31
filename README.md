# Mini AI Workflow Engine

A node-based workflow execution engine built in Python that enables
conditional routing, AI responses, and webhook integrations.

## Features
- Node-based execution (User Input, Condition, AI, Webhook)
- Shared execution context
- Conditional branching
- Execution trace for UI visualization
- Easily extendable architecture

## Tech Stack
- Python
- FastAPI 
- ReactFlow (frontend)
- OpenAI / Azure OpenAI

## How It Works
1. User input enters the workflow
2. Conditions decide execution paths
3. AI nodes generate responses
4. Webhooks trigger external systems


## Run Locally
```bash
pip install -r requirements.txt
python main.py
