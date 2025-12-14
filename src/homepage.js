import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assests/Group 1000011095.png";
import newchatimg from "./assests/image 31.png";
import logo1 from "./assests/Group 1000011097.png";
import sampleData from "./sampleData.json";

function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

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
      item => item.question.toLowerCase() === question.toLowerCase()
    );

    const updatedMessages = [
      ...messages,
      { type: "user", text: question },
      {
        type: "bot",
        text: found
          ? found.response
          : "Sorry, Did not understand your query!",
      },
    ];

    setMessages(updatedMessages);
    setInput("");
  };

  const saveConversation = () => {
    if (messages.length === 0) return;

    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ id: Date.now(), messages });
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#e5e0ee" }}>
      
      <div style={{ width: "25%", backgroundColor: "white" }}>
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
            style={{ cursor: "pointer", fontWeight: "500" }}
            onClick={() => {
              setMessages([]);
              setInput("");
            }}
          >
            New Chat
          </p>

          <img src={newchatimg} style={{ height: "26px" }} />
        </div>

       
        <div style={{ padding: "16px" }}>
          <button
            type="button"
            onClick={() => navigate("/history")}
            style={{
              backgroundColor: "#d7c7f4",
              border: "none",
              padding: "10px 16px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Past Conversations
          </button>
        </div>
      </div>

      
      <div style={{ width: "75%", padding: "24px", display: "flex", flexDirection: "column" }}>
       
        <span style={{ fontSize: "28px", fontWeight: "700", color: "#9785BA" }}>
          Bot AI
        </span>

        {messages.length === 0 && (
          <div style={{ flex: 1, textAlign: "center" }}>
            <p style={{ fontSize: "22px", fontWeight: "600" }}>
              How Can I Help You Today?
            </p>
            <img src={logo1} style={{ margin: "20px 0" }} />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "22px", justifyContent: "center" }}>
              {suggestions.map((text, i) => (
                <div key={i} style={cardStyle} onClick={() => handleAsk(text)}>
                  <p style={{ fontWeight: "600" }}>{text}</p>
                  <p style={{ color: "#666" }}>
                    Get immediate AI generated response
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.type === "user" ? (
                  <span>{msg.text}</span>
                ) : (
                  <p>{msg.text}</p>
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
          style={{ display: "flex", gap: "12px", marginTop: "12px" }}
        >
          <input
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
           
             style={{
              flex: 1,
              width: "700px",
              height: "48px",
              padding: "0 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
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
      </div>
    </div>
  );
}

export default HomePage;
