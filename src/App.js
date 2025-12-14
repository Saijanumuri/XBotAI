import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import HistoryPage from "./HistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}

export default App;
