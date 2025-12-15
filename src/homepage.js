import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assests/Group 1000011095.png";
import newchatimg from "./assests/image 31.png";
import logo1 from "./assests/Group 1000011097.png";
import sampleData from "./sampleData.json";
import {Link} from "react-router-dom"; 

function HomePage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const suggestions = [
    "Hi, what is the weather",
    "Hi, what is my location",
    "Hi, what is the temperature",
    "Hi, how are you",
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const found = sampleData.find(
      (item) => item.question.toLowerCase() === question.toLowerCase()
    );

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { type: "user", text: question, time },
      {
        type: "bot",
        text: found
          ? found.response
          : "Sorry, Did not understand your query!",
        feedback: null,
        time,
      },
    ]);

    setInput("");
  };

  const saveConversation = () => {
    if (!messages.length) return;

    const updated = [...history, { id: Date.now(), messages }];
    localStorage.setItem("history", JSON.stringify(updated));
    setHistory(updated);
    setMessages([]);
  };

  const handleFeedback = (index, value) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, feedback: value } : m))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#e5e0ee",
        fontFamily: "Ubuntu",
        overflow: "hidden",
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
          <img src={logo} alt="" style={{ height: "42px" }} />
          {/* <p
            style={{ fontWeight: "600", cursor: "pointer" }}
            onClick={() => setMessages([])}
          >
            New Chat
          </p> */}
          <button onClick={() => setMessages([])} style={{ fontWeight: "600", cursor: "pointer" ,border:"none",backgroundColor:"transparent",fontSize:"20px"}} >New Chat</button>
          <img src={newchatimg} alt="" style={{ height: "26px" }} />
        </div>

        

       
        <div style={{ padding: "12px" }}>
          <Link
            to="/history" 
            data-testid="past-conversations-btn" 
            style={{
             
              display: "block", 
              textAlign: "center",
              textDecoration: "none", 
              color: "inherit", 
              width: "100%",
              backgroundColor: "#d7c7f4",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Past Conversations
          </Link>
        </div>
      </div>


      <div
        style={{
          width: "75%",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#9785BA",
            marginBottom: "12px",
          }}
        >Bot AI
        </h1>


        {messages.length === 0 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <p style={{ fontSize: "26px", fontWeight: "600", marginBottom: "16px" }}>
              How Can I Help You Today?
            </p>

            <img src={logo1} alt="" style={{ marginBottom: "30px" }} />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {suggestions.map((text, i) => (
                <div
                  key={i}
                  onClick={() => handleAsk(text)}
                  style={{
                    backgroundColor: "white",
                    width: "460px",
                    height: "110px",
                    borderRadius: "10px",
                    padding: "18px",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}
                >
                  <p style={{ fontWeight: "600", marginBottom: "6px" }}>{text}</p>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    Get immediate AI generated response
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


        {messages.length > 0 && (
          <div style={{ flex: 1, overflowY: "auto", marginTop: "12px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#f3f0fa",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  marginBottom: "14px",
                }}
              >
                <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                  {msg.type === "user" ? "You" : "Soul AI"}
                </p>

                <p style={{ marginBottom: "6px" }}>{msg.text}</p>

                <div style={{ display: "flex", gap: "10px", fontSize: "12px", color: "#777" }}>
                  <span>{msg.time}</span>
                  {msg.type === "bot" && (
                    <>
                      <span style={{ cursor: "pointer" }} onClick={() => handleFeedback(i, "like")}>👍</span>
                      <span style={{ cursor: "pointer" }} onClick={() => handleFeedback(i, "dislike")}>👎</span>
                    </>
                  )}
                </div>
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
            display: "flex",
            gap: "12px",
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid #ddd",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Bot AI..."
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "0 16px",
              fontSize: "15px",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#d7c7f4",
              border: "none",
              borderRadius: "8px",
              padding: "0 20px",
              fontWeight: "600",
            }}
          >
            Ask
          </button>

          <button
            type="button"
            onClick={saveConversation}
            style={{
              backgroundColor: "#d7c7f4",
              border: "none",
              borderRadius: "8px",
              padding: "0 20px",
              fontWeight: "600",
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
