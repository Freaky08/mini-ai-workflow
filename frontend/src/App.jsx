// import React, { useState } from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   addEdge,
//   useNodesState,
//   useEdgesState
// } from "reactflow";
// import "reactflow/dist/style.css";
// import { nodeTypes } from "./nodes";

// export default function App() {
//   const initialNodes = [
//     { id: "1", type: "userInput", position: { x: 0, y: 200 }, data: {} },
//     { id: "2", type: "condition", position: { x: 200, y: 200 }, data: { keyword: "alert" } },
//     { id: "3", type: "aiResponse", position: { x: 400, y: 100 }, data: {} },
//     { id: "4", type: "webhook", position: { x: 600, y: 100 }, data: { url: "https://webhook.site/6c7c1e1c-e807-46c5-ab9d-b21601b8b4cd" } },
//     { id: "5", type: "aiResponse", position: { x: 400, y: 300 }, data: {} },
//     { id: "6", type: "end", position: { x: 800, y: 200 }, data: {} }
//   ];

//   const initialEdges = [
//     { source: "1", target: "2" },
//     { source: "2", target: "3", sourceHandle: "true", label: "TRUE" },
//     { source: "3", target: "4" },
//     { source: "4", target: "6" },
//     { source: "2", target: "5", sourceHandle: "false", label: "FALSE" },
//     { source: "5", target: "6" }
//   ];

//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const [message, setMessage] = useState("");
//   const [result, setResult] = useState("");

//   const onConnect = (params) =>
//     setEdges((eds) => addEdge(params, eds));

//   const runFlow = async () => {
//     const res = await fetch("http://127.0.0.1:8000/execute", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userMessage: message,
//         nodes,
//         edges
//       })
//     });

//     const data = await res.json();
//     setResult(data.reply);
//   };

//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <div style={{ padding: 10 }}>
//         <input
//           placeholder="User message"
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={runFlow}>Run Flow</button>
//         <p><b>AI Reply:</b> {result}</p>
//       </div>

//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// }


import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "./nodes";

export default function App() {
  const initialNodes = [
    { id: "1", type: "userInput", position: { x: 0, y: 200 }, data: {} },
    { id: "2", type: "condition", position: { x: 200, y: 200 }, data: { keyword: "alert" } },
    { id: "3", type: "aiResponse", position: { x: 400, y: 100 }, data: {} },
    { id: "4", type: "webhook", position: { x: 600, y: 100 }, data: { url: "https://webhook.site/xxxx" } },
    { id: "5", type: "aiResponse", position: { x: 400, y: 300 }, data: {} },
    { id: "6", type: "end", position: { x: 800, y: 200 }, data: {} }
  ];

  const initialEdges = [
    { source: "1", target: "2" },
    { source: "2", target: "3", sourceHandle: "true", label: "TRUE" },
    { source: "3", target: "4" },
    { source: "4", target: "6" },
    { source: "2", target: "5", sourceHandle: "false", label: "FALSE" },
    { source: "5", target: "6" }
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [executedNodes, setExecutedNodes] = useState([]);
  const [executedEdges, setExecutedEdges] = useState([]);

  const runFlow = async () => {
    const res = await fetch("http://127.0.0.1:8000/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: message,
        nodes,
        edges
      })
    });

    const data = await res.json();
    setResult(data.reply);
    setExecutedNodes(data.executedNodes || []);
    setExecutedEdges(data.executedEdges || []);
  };

  const styledNodes = nodes.map((node) => ({
    ...node,
    style: executedNodes.includes(node.id)
      ? { border: "2px solid green", background: "#e6ffe6" }
      : {}
  }));

  const styledEdges = edges.map((edge) => {
    const isExecuted = executedEdges.some(
      (e) => e.source === edge.source && e.target === edge.target
    );

    return {
      ...edge,
      style: isExecuted ? { stroke: "green", strokeWidth: 3 } : {}
    };
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ padding: 10 }}>
        <input
          placeholder="User message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={runFlow}>Run Flow</button>
        <p><b>AI Reply:</b> {result}</p>
      </div>

      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
