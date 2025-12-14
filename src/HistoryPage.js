import React from "react";

function HistoryPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f1fb",
        padding: "24px",
        fontFamily: "Ubuntu",
      }}
    >
     
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Conversation History
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
  );
}

export default HistoryPage;
