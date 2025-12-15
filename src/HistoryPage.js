import React from "react";
import { useNavigate } from "react-router-dom"; // Added for Back button

function HistoryPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f1fb",
        padding: "24px",
        fontFamily: "Ubuntu",
      }}
    >
      <button
        onClick={() => navigate("/")}
        data-testid="back-to-chat-btn"
        style={{ 
          marginBottom: "20px", 
          padding: "8px 15px", 
          border: "none", 
          borderRadius: "8px", 
          backgroundColor: "#c1b4d8", 
          cursor: "pointer" 
        }}
      >
        ← Back to Chat
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }} data-testid="history-header">
        Past Conversations
      </h2>

      {history.length === 0 && <p>No conversations yet</p>}

      {/* Map through each saved conversation (chat) */}
      {history.slice().reverse().map((chat, chatIndex) => (
        <div key={chat.id} style={{ marginBottom: "30px", border: "1px solid #d7c7f4", padding: "15px", borderRadius: "15px" }} data-testid={`conversation-group-${chat.id}`}>
          
          <h4 style={{ 
            marginBottom: "15px", 
            color: "#5d4c82",
            borderBottom: "1px solid #d7c7f4", 
            paddingBottom: "5px" 
          }}>
            Conversation on {new Date(chat.id).toLocaleDateString()} at {new Date(chat.id).toLocaleTimeString()}
          </h4>

          {/* Map through each message within this conversation */}
          {chat.messages.map((msg, index) => (
            <div
              key={chat.id + "-" + index}
              style={{
                backgroundColor: msg.type === "user" ? "#f3f0fa" : "#d7c7f4",
                borderRadius: "12px",
                padding: "12px 16px",
                marginBottom: "8px",
              }}
            >
              <strong>{msg.type === "user" ? "You" : "Soul AI"}</strong>
              
              <p style={{ marginTop: "6px" }}>{msg.text}</p>
              
              <p style={{ fontSize: "10px", color: "#555", marginTop: "4px" }}>
                {msg.time}
                {msg.feedback && (
                  <span style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {msg.feedback === "like" ? "👍" : "👎"}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default HistoryPage;