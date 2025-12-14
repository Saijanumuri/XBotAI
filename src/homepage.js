import React, { useState } from "react";
import logo from "./assests/Group 1000011095.png";
import newchatimg from "./assests/image 31.png";
import logo1 from "./assests/Group 1000011097.png";
import sampleData from "./sampleData.json";

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  
  const [activeChatId, setActiveChatId] = useState(null);

  const suggestions = [
    "Hi, what is the weather",
    "Hi, what is my location",
    "Hi, what is the temperature",
    "Hi, how are you",
  ];

  const cardStyle = {
    backgroundColor: "white",
    width: "460px",
    height: "110px",
    borderRadius: "10px",
    padding: "18px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    cursor: "pointer",
  };

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const found = sampleData.find(
      item =>
        item.question.toLowerCase().includes(question.toLowerCase())
    );

    setMessages(prev => [
      ...prev,
      { type: "user", text: question },
      {
        type: "bot",
        text: found
          ? found.response
          : "Sorry, Did not understand your query!",
        feedback: null,
      },
    ]);

    setInput("");
  };

 
  const setThumbFeedback = (index, value) => {
    setMessages(prev =>
      prev.map((msg, i) =>
        i === index ? { ...msg, feedback: value } : msg
      )
    );
  };

 
  const saveConversation = () => {
    if (messages.length === 0) return;
    setShowFeedback(true);
  };

  
  const submitFeedback = () => {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    const newChat = {
      id: Date.now(),
      messages,
      rating,
      comment,
    };

    history.push(newChat);
    localStorage.setItem("history", JSON.stringify(history));

    
    setMessages([]);
    setInput("");
    setRating(0);
    setComment("");
    setShowFeedback(false);
    setActiveChatId(null);
  };

  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#e5e0ee",
        fontFamily: "Ubuntu",
      }}
    >
      
      <div
        style={{
          width: "25%",
          backgroundColor: "white",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        }}
      >
       
        <div
          style={{
            height: "64px",
            backgroundColor: "#c1b4d8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 18px",
          }}
        >
          <img src={logo} style={{ height: "42px" }} />

          <p
            style={{ fontSize: "18px", fontWeight: "500", cursor: "pointer" }}
            onClick={() => {
              setMessages([]);
              setInput("");
              setRating(0);
              setComment("");
              setShowFeedback(false);
              setActiveChatId(null);
            }}
          >
            New Chat
          </p>

          <img src={newchatimg} style={{ height: "26px" }} />
        </div>

        
        <div style={{ padding: "12px", overflowY: "auto", flex: 1 }}>
          <p
            style={{
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "10px",
              color: "#9785BA",
            }}
          >
            Previous Chats
          </p>

          {history.length === 0 && (
            <p style={{ fontSize: "13px", color: "#777" }}>
              No conversations yet
            </p>
          )}

          {history.map((conv, index) => (
            <div
              key={conv.id}
              onClick={() => {
                setMessages(conv.messages);
                setRating(conv.rating || 0);
                setComment(conv.comment || "");
                setShowFeedback(false);
                setActiveChatId(conv.id);
              }}
              style={{
                backgroundColor:
                  activeChatId === conv.id ? "#e0d9f6" : "#f6f3fb",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "8px",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "13px", fontWeight: "500" }}>
                Chat {index + 1}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#666",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {conv.messages?.[0]?.text || "Conversation"}
              </p>
            </div>
          ))}
        </div>
      </div>

     
      <div
        style={{
          width: "75%",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: "#9785BA",
            fontWeight: "700",
            fontSize: "28px",
            marginBottom: "16px",
          }}
        >
          Soul AI
        </span>

        
        {messages.length === 0 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "22px", fontWeight: "600" }}>
              How can I help you today?
            </p>

            <img
              src={logo1}
              style={{ width: "65px", height: "69px", margin: "20px 0" }}
            />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "22px",
                justifyContent: "center",
              }}
            >
              {suggestions.map((text, index) => (
                <div
                  key={index}
                  style={cardStyle}
                  onClick={() => handleAsk(text)}
                >
                  <p style={{ fontWeight: "600" }}>{text}</p>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    Get immediate AI generated response
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {messages.length > 0 && (
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "12px",
                  textAlign: msg.type === "user" ? "right" : "left",
                  position: "relative",
                }}
              >
                {msg.type === "user" ? (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "#d7c7f4",
                    }}
                  >
                    {msg.text}
                  </span>
                ) : (
                  <div
                    style={{ display: "inline-block" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.lastChild.style.display = "flex")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.lastChild.style.display = "none")
                    }
                  >
                    <p
                      style={{
                        display: "inline-block",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      {msg.text}
                    </p>

                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        right: "-50px",
                        top: "0",
                        gap: "6px",
                      }}
                    >
                      <button onClick={() => setThumbFeedback(index, "like")}>
                        👍
                      </button>
                      <button onClick={() => setThumbFeedback(index, "dislike")}>
                        👎
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(input);
          }}
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Bot AI…"
            style={{
              width: "700px",
              height: "48px",
              padding: "0 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button type="submit" style={{
              height: "48px",
              padding: "0 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#d7c7f4",
              fontWeight: "600",
              cursor: "pointer",
            }}>Ask</button>
          <button type="button" onClick={saveConversation} style={{
              height: "48px",
              padding: "0 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#d7c7f4",
              fontWeight: "600",
              cursor: "pointer",
            }}>
            Save
          </button>
        </form>

        {showFeedback && (
          <div style={{ marginTop: "20px" }}>
            <p>Rate this conversation</p>

            {[1, 2, 3, 4, 5].map(n => (
              <span
                key={n}
                onClick={() => setRating(n)}
                style={{ cursor: "pointer", fontSize: "24px" }}
              >
                {n <= rating ? "⭐" : "☆"}
              </span>
            ))}

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your feedback..."
              style={{ width: "100%", marginTop: "10px" }}
            />

            <button onClick={submitFeedback}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
