// src/App.jsx
// (Cập nhật file này)

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// (Tất cả các import khác của bạn)
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

import MainLayout from "./MainLayout";

// === BƯỚC 1: Import trang kết quả mới ===
import SpeakingResultPage from "./pages/SpeakingResultPage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        {/* === Các route CÓ Header/Footer === */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
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
        </Route>

        {/* === Các route KHÔNG CÓ Header/Footer (Focus Mode) === */}
        <Route path="/speaking-test" element={<SpeakingTestPage />} />
        
        {/* === BƯỚC 2: Thêm route cho trang kết quả === */}
        <Route path="/speaking-result" element={<SpeakingResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;