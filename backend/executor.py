# from node_handlers import (
#     handle_user_input,
#     handle_condition,
#     handle_ai_response,
#     handle_webhook
# )

# def find_start_node(nodes):
#     for node_id, node in nodes.items():
#         if node["type"] == "userInput":
#             return node_id
#     return None

# def get_next_node(edges, current, condition=None):
#     for edge in edges:
#         if edge["source"] == current:
#             if condition is None:
#                 return edge["target"]
#             if edge.get("sourceHandle") == str(condition).lower():
#                 return edge["target"]
#     return None

# def execute_flow(payload):
#     nodes = {n["id"]: n for n in payload["nodes"]}
#     edges = payload["edges"]

#     context = {
#         "userMessage": payload["userMessage"]
#     }

#     current = find_start_node(nodes)

#     while current:
#         node = nodes[current]

#         if node["type"] == "userInput":
#             handle_user_input(node, context)
#             current = get_next_node(edges, current)

#         elif node["type"] == "condition":
#             result = handle_condition(node, context)
#             current = get_next_node(edges, current, result)

#         elif node["type"] == "aiResponse":
#             handle_ai_response(node, context)
#             current = get_next_node(edges, current)

#         elif node["type"] == "webhook":
#             handle_webhook(node, context)
#             current = get_next_node(edges, current)

#         elif node["type"] == "end":
#             return {"reply": context["ai_reply"]}

#     return context
from node_handlers import (
    handle_user_input,
    handle_condition,
    handle_ai_response,
    handle_webhook
)

def find_start_node(nodes):
    for node_id, node in nodes.items():
        if node["type"] == "userInput":
            return node_id
    return None


def find_next_edge(edges, current, condition=None):
    for edge in edges:
        if edge["source"] == current:
            if condition is None:
                return edge
            if edge.get("sourceHandle") == str(condition).lower():
                return edge
    return None


def execute_flow(payload):
    nodes = {n["id"]: n for n in payload["nodes"]}
    edges = payload["edges"]

    context = {
        "userMessage": payload["userMessage"]
    }

    executed_nodes = []
    executed_edges = []

    current = find_start_node(nodes)

    while current:
        node = nodes[current]
        executed_nodes.append(current)

        if node["type"] == "userInput":
            handle_user_input(node, context)
            edge = find_next_edge(edges, current)

        elif node["type"] == "condition":
            result = handle_condition(node, context)
            edge = find_next_edge(edges, current, result)

        elif node["type"] == "aiResponse":
            handle_ai_response(node, context)
            edge = find_next_edge(edges, current)

        elif node["type"] == "webhook":
            handle_webhook(node, context)
            edge = find_next_edge(edges, current)

        elif node["type"] == "end":
            break

        if edge:
            executed_edges.append({
                "source": edge["source"],
                "target": edge["target"]
            })
            current = edge["target"]
        else:
            break

    return {
        "reply": context.get("ai_reply", ""),
        "executedNodes": executed_nodes,
        "executedEdges": executed_edges
    }
