import React from "react";

function HistoryPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div>
      <h1>Past Conversations</h1>

      {history.length === 0 && <p>No conversations found</p>}

      {history.map((chat, index) => (
        <div key={chat.id}>
          <h3>Conversation {index + 1}</h3>

          {chat.messages.map((msg, i) => (
            <p key={i}>{msg.text}</p>
          ))}

          <p>Rating: {chat.rating}</p>
          <p>Feedback: {chat.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default HistoryPage;
