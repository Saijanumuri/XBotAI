import React from "react";

function HistoryPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Conversation History</h1>

      {history.length === 0 && <p>No conversations found</p>}

      {history.map((chat, index) => (
        <div key={chat.id} style={{ marginBottom: "16px" }}>
          <h3>Chat {index + 1}</h3>
          {chat.messages.map((msg, i) => (
            <p key={i}>{msg.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HistoryPage;
