import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Chatbot from "./components/Chatbot";
import AIAssessmentPage from "./pages/AIAssessmentPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import WrittingUI from "./components/MainExam/WritingUI.jsx";
import IELTSScoringApp from "./components/DonePage/IELTSScoringApp.jsx";
import IeltsListWriting from "./components/List/IeltsListWriting.jsx";
import IeltsListListening from "./components/List/IeltsListListening.jsx";
import IeltsListReading from "./components/List/IeltsListReading.jsx";
import IeltsListSpeaking from "./components/List/IeltsListSpeaking.jsx";
import ScrollToTop from "./components/ScrollToTop";
import TestSetPage from "./pages/TestSetPage.jsx";

// === BƯỚC 1: Import trang thi Speaking mới ===
import SpeakingTestPage from "./pages/SpeakingTestPage.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
            
            <Route path="/ai-assessment" element={<WrittingUI />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/WritingDone" element={<IELTSScoringApp />} />
            <Route path="/ai-assessment-page" element={<AIAssessmentPage />} />

            <Route 
              path="/cambridge-tests" 
              element={<TestSetPage collection="Cambridge" />} 
            />
            <Route 
              path="/collins-tests" 
              element={<TestSetPage collection="Collins" />} 
            />

            {/* === BƯỚC 2: Thêm Route cho trang thi Speaking === */}
            <Route path="/speaking-test" element={<SpeakingTestPage />} />

          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;

