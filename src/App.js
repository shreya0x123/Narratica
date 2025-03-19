import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import StoryPage from "./StoryPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/stories/:category" element={<StoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
