import requests

def handle_user_input(node, context):
    context["message"] = context["userMessage"]

def handle_condition(node, context):
    keyword = node["data"]["keyword"]
    return keyword.lower() in context["message"].lower()

def handle_ai_response(node, context):
    context["ai_reply"] = f"AI reply to: {context['message']}"

def handle_webhook(node, context):
    url = node["data"]["url"]
    requests.post(url, json={"reply": context["ai_reply"]})
