export default function FeedbackPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div>
      <h2>All Feedback</h2>
      {history.map(c => (
        <p key={c.id}>⭐ {c.rating} – {c.comment}</p>
      ))}
    </div>
  );
}
