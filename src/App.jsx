import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WritingUI from "./components/MainExam/WritingUI";
import IELTSScoringApp from "./components/DonePage/IELTSScoringApp";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |<Link to="/graders">Writing Grader</Link>
      </nav>
      <Routes>
        <Route path="/" element={<WritingUI />} />
        <Route path="/graders" element={<IELTSScoringApp />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
