// import React from "react";

// export const nodeTypes = {
//   userInput: ({ data }) => (
//     <div style={{ padding: 10, border: "1px solid #555", borderRadius: 5 }}>
//       User Input
//     </div>
//   ),

//   condition: ({ data }) => (
//     <div style={{ padding: 10, border: "1px solid #555", borderRadius: 5 }}>
//       Condition<br />
//       Keyword: <b>{data.keyword}</b>
//     </div>
//   ),

//   aiResponse: () => (
//     <div style={{ padding: 10, border: "1px solid #555", borderRadius: 5 }}>
//       AI Response
//     </div>
//   ),

//   webhook: ({ data }) => (
//     <div style={{ padding: 10, border: "1px solid #555", borderRadius: 5 }}>
//       Webhook
//     </div>
//   ),

//   end: () => (
//     <div style={{ padding: 10, border: "1px solid #555", borderRadius: 5 }}>
//       End
//     </div>
//   )
// };
// import React from "react";

// const boxStyle = {
//   padding: 10,
//   border: "1px solid #555",
//   borderRadius: 6,
//   background: "#fff",
//   minWidth: 120,
//   textAlign: "center"
// };

// export const nodeTypes = {
//   userInput: () => (
//     <div style={boxStyle}>
//       <b>User Input</b>
//     </div>
//   ),

//   condition: ({ data }) => (
//     <div style={boxStyle}>
//       <b>Condition</b>
//       <div>Keyword: {data.keyword}</div>
//     </div>
//   ),

//   aiResponse: () => (
//     <div style={boxStyle}>
//       <b>AI Response</b>
//     </div>
//   ),

//   webhook: ({ data }) => (
//     <div style={boxStyle}>
//       <b>Webhook</b>
//       <div style={{ fontSize: 12 }}>{data.url}</div>
//     </div>
//   ),

//   end: () => (
//     <div style={boxStyle}>
//       <b>End</b>
//     </div>
//   )
// };

// import React from "react";

// const style = {
//   padding: 10,
//   border: "1px solid #444",
//   borderRadius: 6,
//   background: "#fff",
//   minWidth: 120,
//   textAlign: "center"
// };

// export const nodeTypes = {
//   userInput: () => <div style={style}><b>User Input</b></div>,

//   condition: ({ data }) => (
//     <div style={style}>
//       <b>Condition</b>
//       <div>Keyword: {data.keyword}</div>
//     </div>
//   ),

//   aiResponse: () => <div style={style}><b>AI Response</b></div>,

//   webhook: ({ data }) => (
//     <div style={style}>
//       <b>Webhook</b>
//       <div style={{ fontSize: 12 }}>{data.url}</div>
//     </div>
//   ),

//   end: () => <div style={style}><b>End</b></div>
// };
import React from "react";

const style = {
  padding: 10,
  border: "1px solid #444",
  borderRadius: 6,
  background: "#fff",
  minWidth: 120,
  textAlign: "center"
};

export const nodeTypes = {
  userInput: () => <div style={style}><b>User Input</b></div>,

  condition: ({ data }) => (
    <div style={style}>
      <b>Condition</b>
      <div>Keyword: {data.keyword}</div>
    </div>
  ),

  aiResponse: () => <div style={style}><b>AI Response</b></div>,

  webhook: ({ data }) => (
    <div style={style}>
      <b>Webhook</b>
      <div style={{ fontSize: 12 }}>{data.url}</div>
    </div>
  ),

  end: () => <div style={style}><b>End</b></div>
};
