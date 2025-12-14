import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import HistoryPage from "./HistoryPage";
import FeedbackPage from "./FeedbackPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  );
}

export default App;
