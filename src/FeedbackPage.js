import React from "react";

function FeedbackPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div>
      <h1>All Feedback</h1>

      {history.map(chat => (
        <div key={chat.id}>
          <p>Rating: {chat.rating}</p>
          <p>{chat.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackPage;
