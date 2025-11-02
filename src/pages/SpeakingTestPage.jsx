// src/pages/SpeakingTestPage.jsx
// (Đã sửa lỗi cú pháp)

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mic,
  Pause,
  ChevronsRight,
  X,
  Lightbulb,
  Download,
  CheckCircle,
} from "lucide-react";

// --- Bộ câu hỏi IELTS Speaking (Giữ nguyên) ---
const SPEAKING_QUESTIONS = [
  // Part 1
  { type: "Part 1", text: "What is your full name?" },
  { type: "Part 1", text: "Can I see your ID?" },
  { type: "Part 1", text: "Where are you from?" },
  { type: "Part 1", text: "Do you work or are you a student?" },
  { type: "Part 1", text: "What subjects are you studying?" },
  // Part 2
  {
    type: "Part 2",
    text: "Describe a website you often visit.\n\nYou should say:\n- What it is about\n- How you found it\n- How often you visit it\n- And explain why you find it useful.",
  },
  // Part 3
  {
    type: "Part 3",
    text: "What are the advantages and disadvantages of the internet?",
  },
  {
    type: "Part 3",
    text: "Do you think older people and younger people use the internet differently?",
  },
  {
    type: "Part 3",
    text: "How much has the internet changed people's lives?",
  },
  {
    type: "Part 3",
    text: "Should the government control the information available on the internet?",
  },
  {
    type: "Part 3",
    text: "What will be the next big development online?",
  },
];

const TOTAL_QUESTIONS = SPEAKING_QUESTIONS.length;

// --- Component Chính ---
function SpeakingTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState("idle"); // idle, recording, paused
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  
  const [finalRecording, setFinalRecording] = useState({
    audioUrl: null,
    blob: null,
  });
  
  const [isFinished, setIsFinished] = useState(false);

  const mediaRecorderRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const streamRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const navigate = useNavigate();

  // --- Logic Hẹn giờ ---
  useEffect(() => {
    if (recordingStatus === "recording") {
      timerIntervalRef.current = setInterval(() => {
        setTotalElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [recordingStatus]);

  // --- Logic Dọn dẹp ---
  useEffect(() => {
    return () => {
      stopMediaStream();
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  // --- Hàm Chức năng Ghi âm ---

  const stopMediaStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const startRecording = async () => {
    if (recordingStatus === "paused" && mediaRecorderRef.current) {
      mediaRecorderRef.current.resume();
      setRecordingStatus("recording");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      recordedChunksRef.current = []; 

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setRecordingStatus("recording");
    } catch (err) {
      console.error("Lỗi khi truy cập micro:", err);
      alert(
        "Không thể truy cập micro. Vui lòng cấp quyền micro cho trang web."
      );
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingStatus("paused");
    }
  };

  // --- Hàm Điều khiển ---

  const handleToggleRecordPause = () => {
    if (isFinished) return;
    if (recordingStatus === "recording") {
      pauseRecording();
    } else {
      startRecording();
    }
  };

  const handleNextQuestion = () => {
    const isLast = currentQuestionIndex === TOTAL_QUESTIONS - 1;

    if (isLast) {
      handleFinishTest();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleFinishTest = () => {
    if (isFinished) return;

    clearInterval(timerIntervalRef.current);

    if (recordingStatus === "idle" && recordedChunksRef.current.length === 0) {
      setFinalRecording({ audioUrl: null, blob: null });
      setIsFinished(true);
      stopMediaStream();
      return;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(blob);
        
        setFinalRecording({ audioUrl, blob });
        
        recordedChunksRef.current = [];
        setIsFinished(true);
        stopMediaStream();
        setRecordingStatus("idle");
      };

      if (recordingStatus !== "idle") {
        mediaRecorderRef.current.stop();
      }
    } else {
      setIsFinished(true);
    }
  };


  const handleClose = () => {
    if (!isFinished && recordingStatus !== "idle") {
      if (!window.confirm("Bạn có chắc muốn thoát? Toàn bộ tiến trình sẽ bị mất.")) {
        return;
      }
    }
    stopMediaStream();
    navigate("/"); 
  };

  // --- Hàm Phụ ---
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const currentQuestion = SPEAKING_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;

  return (
    <div className="flex flex-col h-screen w-full bg-white text-black font-sans">
      {/* 1. Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Lexi<span className="text-blue-600">Prep</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200">
            <Lightbulb size={16} className="text-yellow-500" />
            Tips & Tricks
          </button>
          <div className="text-right text-sm">
            <span className="font-semibold">
              Total: {isFinished ? TOTAL_QUESTIONS : currentQuestionIndex + 1} /{" "}
              {TOTAL_QUESTIONS}
            </span>
            <span className="ml-4 font-mono text-gray-700">
              {formatTime(totalElapsedTime)}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* 2. Main Question Area */}
      <main className="flex-1 flex items-center justify-center p-8">
        {!isFinished ? (
          <div className="text-center">
            <span className="text-sm font-semibold text-blue-600 uppercase">
              {currentQuestion.type}
            </span>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4 whitespace-pre-line max-w-3xl">
              {currentQuestion.text}
            </h1>
          </div>
        ) : (
          <FinishedScreen recording={finalRecording} />
        )}
      </main>

      {/* 3. Footer / Controls */}
      <footer className="flex justify-between items-center p-4 border-t border-gray-200">
        <button
          onClick={handleToggleRecordPause}
          disabled={isFinished}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white transition ${
            isFinished
              ? "bg-gray-400 cursor-not-allowed"
              : recordingStatus === "recording"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {recordingStatus === "recording" ? (
            <Pause size={18} className="fill-white" />
          ) : (
            <Mic size={18} />
          )}
          {recordingStatus === "recording"
            ? "Pause"
            : recordingStatus === "paused"
            ? "Resume"
            : "Record"}
        </button>

        <div className="text-sm font-medium">
          {recordingStatus === "recording" && (
            <span className="flex items-center gap-2 text-red-600">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Recording...
            </span>
          )}
          {recordingStatus === "paused" && (
            <span className="text-red-600">On pause</span>
          )}
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={isFinished}
          className={`flex items-center gap-1.5 px-5 py-3 rounded-lg font-semibold text-white transition ${
            isFinished
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {isLastQuestion ? "Finish" : "Next"}
          <ChevronsRight size={18} />
        </button>
      </footer>
    </div>
  );
}

// --- Component Màn hình Hoàn thành ---
const FinishedScreen = ({ recording }) => {
  return (
    <div className="text-center max-w-2xl w-full">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Test Completed!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Well done. You have completed the Speaking test. You can review your
        recording below.
      </p> {/* <--- ĐÂY LÀ DÒNG ĐÃ SỬA (từ </n> thành </p>) */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left space-y-4 max-h-64 overflow-y-auto">
        <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
          <span className="font-medium text-gray-700">Full Test Recording</span>
          {recording.audioUrl ? (
            <audio src={recording.audioUrl} controls className="h-10" />
          ) : (
            <span className="text-gray-400 text-sm italic">
              No recording found.
            </span>
          )}
          {recording.audioUrl && (
            <a
              href={recording.audioUrl}
              download={`full_speaking_test.webm`}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
              title="Download"
            >
              <Download size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakingTestPage;