// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// XÓA: Header, Footer, Chatbot, ScrollToTop (đã chuyển sang MainLayout)
import Homepage from "./pages/Homepage";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
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
import TestSetPage from "./pages/TestSetPage.jsx";
import SpeakingTestPage from "./pages/SpeakingTestPage.jsx";
import IeltsGrader from "./components/MainExam/IeltsGrader.jsx";
// === BƯỚC 1: Import layout mới ===
import MainLayout from "./MainLayout";

function App() {
  return (
    <Router>
      {/* XÓA ScrollToTop, Header, Footer, Chatbot khỏi đây */}
      
      <Routes>
        {/* === BƯỚC 2: Các route CÓ Header/Footer === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/listening" element={<IeltsListListening />} />
          <Route path="/reading" element={<IeltsListReading />} />
          <Route path="/writing" element={<IeltsListWriting />} />
          <Route path="/speaking" element={<IeltsListSpeaking />} />
          <Route path="/ai-assessment" element={<IeltsGrader />} />
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
        </Route>

        {/* === BƯỚC 3: Route KHÔNG CÓ Header/Footer (Focus Mode) === */}
        <Route path="/speaking-test" element={<SpeakingTestPage />} />
      </Routes>
      
    </Router>
  );
}

export default App;