import React from "react";

function ChatMessage({ msg, index, onFeedback }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        padding: "16px",
        borderRadius: "14px",
        backgroundColor: "#f3effa",
        marginBottom: "16px",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget.querySelector(".feedback");
        if (el) el.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget.querySelector(".feedback");
        if (el) el.style.opacity = 0;
      }}
    >
      {/* Avatar */}
      <img
        src={
          msg.type === "user"
            ? "https://i.pravatar.cc/40?img=3"
            : "https://i.imgur.com/7k12EPD.png"
        }
        alt="avatar"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />

      {/* Content */}
      <div style={{ flex: 1 }}>
        <strong>{msg.type === "user" ? "You" : "Soul AI"}</strong>
        <p style={{ margin: "6px 0" }}>{msg.text}</p>

        {/* Timestamp + feedback */}
        <div
          style={{
            fontSize: "12px",
            color: "#777",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {msg.time}

          {msg.type === "bot" && (
            <span
              className="feedback"
              style={{
                opacity: 0,
                transition: "opacity 0.2s",
                display: "flex",
                gap: "6px",
              }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => onFeedback(index, "like")}
              >
                👍
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => onFeedback(index, "dislike")}
              >
                👎
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
