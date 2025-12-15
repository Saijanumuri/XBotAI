import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assests/Group 1000011095.png"; 
import editIcon from "./assests/image 31.png"; 

function HistoryPage() {
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f4f1fb",
        fontFamily: "Ubuntu",
      }}
    >
      
      <div
        style={{
          width: "25%",
          backgroundColor: "#ffffff",
          padding: "16px",
          borderRight: "1px solid #ddd",
        }}
      >
       
        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#cfc3e6",
            padding: "14px 16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#bfb0e0")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#cfc3e6")
          }
        >
         
          <img
            src={logo}
            alt="logo"
            style={{ width: "28px", height: "28px" }}
          />

          
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#000",
            }}
          >
            New Chat
          </span>

         
          <img
            src={editIcon}
            alt="edit"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>

      
      <div
        style={{
          width: "75%",
          padding: "24px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Past Conversations
        </h2>

        <h4 style={{ marginBottom: "16px" }}>Today’s Chats</h4>

        {history.length === 0 && <p>No conversations yet</p>}

        {history.map((chat) =>
          chat.messages.map((msg, index) => (
            <div
              key={chat.id + "-" + index}
              style={{
                backgroundColor: "#d7c7f4",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "14px",
              }}
            >
              <strong>{msg.type === "user" ? "You" : "Soul AI"}</strong>

              <p style={{ marginTop: "6px" }}>{msg.text}</p>

              <p style={{ fontSize: "12px", color: "#555" }}>
                {new Date(chat.id).toLocaleTimeString()}
              </p>

              {msg.type === "bot" && (
                <>
                  {chat.rating > 0 && (
                    <p style={{ marginTop: "6px" }}>
                      {"⭐".repeat(chat.rating)}
                    </p>
                  )}

                  {msg.feedback && (
                    <p style={{ fontSize: "14px" }}>
                      {msg.feedback === "like" ? "👍" : "👎"}
                    </p>
                  )}

                  {chat.comment && (
                    <p style={{ marginTop: "6px", fontSize: "14px" }}>
                      <strong>Feedback:</strong> {chat.comment}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
