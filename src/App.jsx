import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Speaking from "./pages/Speaking";
import Chatbot from "./components/Chatbot";
import AIAssessmentPage from "./pages/AIAssessmentPage";
import LoginPage from "./pages/LoginPage"; // <-- THÊM DÒNG NÀY
import SignupPage from "./pages/SignupPage"; // <-- THÊM DÒNG NÀY
import "./App.css";
import WrittingUI from "./components/MainExam/WritingUI.jsx";
import IELTSScoringApp from "./components/DonePage/IELTSScoringApp.jsx";
import IeltsListWriting from "./components/List/IeltsListWriting.jsx";
import IeltsListListening from "./components/List/IeltsListListening.jsx";
import IeltsListReading from "./components/List/IeltsListReading.jsx";
import IeltsListSpeaking from "./components/List/IeltsListSpeaking.jsx";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* Các trang con cho từng kỹ năng */}
            <Route path="/listening" element={<IeltsListListening />} />
            <Route path="/reading" element={<IeltsListReading />} />
            <Route path="/writing" element={<IeltsListWriting />} />
            <Route path="/speaking" element={<IeltsListSpeaking />} />
            {/* Trang AI Assessment */}
            <Route path="/ai-assessment" element={<WrittingUI />} />
            {/* Trang Login/Signup */}
            <Route path="/login" element={<LoginPage />} />{" "}
            {/* <-- THÊM DÒNG NÀY */}
            <Route path="/signup" element={<SignupPage />} />{" "}
            {/* <-- THÊM DÒNG NÀY */}
            <Route path="/WritingDone" element={<IELTSScoringApp />} />
            <Route path="/ai-assessment-page" element={<AIAssessmentPage />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
