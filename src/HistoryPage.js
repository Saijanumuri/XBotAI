export default function HistoryPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div>
      <h2>Saved Conversations</h2>
      {history.map(c => (
        <div key={c.id}>
          {c.messages.map((m, i) => (
            <p key={i}>{m.text}</p>
          ))}
          <p>Rating: {c.rating}</p>
          <p>Comment: {c.comment}</p>
        </div>
      ))}
    </div>
  );
}
