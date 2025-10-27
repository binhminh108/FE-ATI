import React, { useState, useMemo, useCallback } from "react";
import Header from "../MainExam/Header.jsx";
import QuestionInput from "../MainExam/QuestionInput.jsx";
import TaskSelector from "../MainExam/TaskSelector.jsx";
import ChartUpload from "../MainExam/ChartUpload.jsx";
import WritingInput from "../MainExam/WritingInput.jsx";
import TargetScore from "../MainExam/TargetScore.jsx";
import ActionButtons from "../MainExam/ActionButtons.jsx";
import OverallScore from "../MainExam/OverallScore.jsx";
import ScoreDetails from "../MainExam/ScoreDetails.jsx";
import Feedback from "../MainExam/Feedback.jsx";
import { message, Upload } from "antd";
const { Dragger } = Upload;

const WritingUI = () => {
  // Utility functions
  const getScoreCircleStyle = (overallScore) => {
    const percentage = (overallScore / 9) * 360;
    return {
      "--percentage": `${percentage}deg`,
      background: `conic-gradient(from 0deg, #14b8a6 0deg, #14b8a6 ${percentage}deg, #e5e7eb ${percentage}deg, #e5e7eb 360deg)`,
    };
  };

  const getScoreLevel = (score) => {
    if (score >= 8.0) return "Xuất sắc";
    if (score >= 7.0) return "Giỏi";
    if (score >= 6.0) return "Khá";
    if (score >= 4.5) return "Cơ bản";
    if (score >= 3.0) return "Cần luyện tập";
    return "Chưa chấm điểm";
  };

  // State Management
  const [taskType, setTaskType] = useState("task1");
  const [question, setQuestion] = useState("Nhập đề bài IELTS Writing...");
  const [writing, setWriting] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [targetScore, setTargetScore] = useState("6.5");
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [scores, setScores] = useState({
    overall: 0,
    task: 0,
    coherence: 0,
    grammar: 0,
    lexical: 0,
  });

  // File handling functions
  const handleFile = useCallback((file) => {
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const file = e.target.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  // Word count calculation
  const wordCount = useMemo(() => {
    return writing.trim().split(/\s+/).filter(Boolean).length;
  }, [writing]);

  // Assessment readiness check
  const isReadyToAssess = useMemo(() => {
    return (
      question !== "Nhập đề bài IELTS Writing..." &&
      question.length > 10 &&
      writing.length > 50 &&
      (taskType === "task2" || filePreview !== null)
    );
  }, [question, writing, taskType, filePreview]);

  // Assessment handler
  const handleAssess = useCallback(async () => {
    if (!isReadyToAssess || isLoading) return;

    setIsLoading(true);
    try {
      // Mô phỏng API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response data
      setScores({
        overall: 6.5,
        task: 6.0,
        coherence: 7.0,
        grammar: 6.5,
        lexical: 6.5,
      });
    } catch (error) {
      console.error("Error assessing writing:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isReadyToAssess, isLoading]);

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <Header />
      <div className="w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-full max-w-7xl mx-auto px-6">
          {/* Left Column */}
          <div className="space-y-6 bg-gray-100 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Hoạt động của người dùng
            </h2>
            <QuestionInput question={question} setQuestion={setQuestion} />
            <TaskSelector taskType={taskType} setTaskType={setTaskType} />
            {taskType === "task1" && (
              <ChartUpload
                filePreview={filePreview}
                handleFileDrop={handleFileDrop}
                handleFileSelect={handleFileSelect}
              />
            )}
            <WritingInput
              writing={writing}
              setWriting={setWriting}
              wordCount={wordCount}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6 bg-teal-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Điểm số và đánh giá
            </h2>
            <TargetScore
              targetScore={targetScore}
              setTargetScore={setTargetScore}
            />
            <ActionButtons
              handleAssess={handleAssess}
              isLoading={isLoading}
              isReadyToAssess={isReadyToAssess}
              showFeedback={showFeedback}
              setShowFeedback={setShowFeedback}
              scores={scores}
            />
            <OverallScore
              scores={scores}
              getScoreCircleStyle={getScoreCircleStyle}
              getScoreLevel={getScoreLevel}
            />
            <ScoreDetails scores={scores} />
            <Feedback showFeedback={showFeedback} scores={scores} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingUI;
