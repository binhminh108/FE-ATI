// src/pages/SpeakingTestPage.jsx
// (Cập nhật lần cuối: Thêm màn hình "Submit" và Modal "Tips")

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
  GraduationCap,
} from "lucide-react";

// --- Bộ câu hỏi (Giữ nguyên) ---
const SPEAKING_QUESTIONS = [
  { type: "Part 1", text: "What is your full name?" },
  { type: "Part 1", text: "Can I see your ID?" },
  { type: "Part 1", text: "Where are you from?" },
  { type: "Part 1", text: "Do you work or are you a student?" },
  { type: "Part 1", text: "What subjects are you studying?" },
  {
    type: "Part 2",
    text: "Describe a website you often visit.\n\nYou should say:\n- What it is about\n- How you found it\n- How often you visit it\n- And explain why you find it useful.",
  },
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

// --- DỮ LIỆU MỚI: Sample Answers cho Tips & Tricks ---
const SAMPLE_ANSWERS = [
  "My full name is [Your Name]. Please, you can just call me [Your First Name].", // Q1
  "Of course, here is my passport/ID card.", // Q2
  "I'm originally from [Your City], which is a [brief description, e.g., 'bustling city' or 'quiet town'] in the [region] of Vietnam.", // Q3
  "Currently, I am a [Your Job Title, e.g., 'software developer'] at [Your Company]. / Currently, I am a final-year student at [Your University], majoring in [Your Major].", // Q4
  "I'm studying [Your Major]. My main subjects include [Subject 1], [Subject 2], and [Subject 3]. I find [Favorite Subject] particularly interesting because [reason].", // Q5
  "The website I visit most frequently is probably Wikipedia. It's a free online encyclopedia... (Và tiếp tục bài mẫu Part 2)", // Q6
  "The most obvious advantage is the instant access to information. However, a significant drawback is the spread of misinformation and 'fake news'...", // Q7
  "Yes, absolutely. Younger generations, or 'digital natives,' tend to use the internet for entertainment, social media, and gaming. In contrast, older people often use it for more practical purposes like reading news, sending emails, or managing finances.", // Q8
  "It has fundamentally revolutionized almost every aspect of our lives, from how we communicate with loved ones via video calls to how we work remotely...", // Q9
  "That's a complex issue. On one hand, government control is necessary to prevent illegal activities and protect children. On the other hand, strict censorship can stifle freedom of speech...", // Q10
  "I believe the next major development will be the 'metaverse' or more advanced, integrated AI. We might see virtual reality environments where we can work and socialize...", // Q11
];

// --- Component Chính ---
function SpeakingTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  
  // === THÊM LẠI: State để quản lý hoàn thành VÀ modal ===
  const [isFinished, setIsFinished] = useState(false);
  const [finalRecording, setFinalRecording] = useState({
    audioUrl: null,
    blob: null,
  });
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  const mediaRecorderRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const streamRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const navigate = useNavigate();

  // --- Logic Hẹn giờ (Giữ nguyên) ---
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

  // --- Logic Dọn dẹp (Giữ nguyên) ---
  useEffect(() => {
    return () => {
      stopMediaStream();
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  // --- Hàm Ghi âm (Giữ nguyên) ---
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

  // --- Hàm Điều khiển (Cập nhật) ---
  const handleToggleRecordPause = () => {
    if (isFinished) return; // Thêm kiểm tra
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

  // === THAY ĐỔI: `handleFinishTest` KHÔNG navigate, chỉ set state ===
  const handleFinishTest = () => {
    if (isFinished) return; // Chặn chạy lại
    clearInterval(timerIntervalRef.current);

    if (recordingStatus === "idle" && recordedChunksRef.current.length === 0) {
      setFinalRecording({ audioUrl: null, blob: null });
      setIsFinished(true); // Hiển thị màn hình "Submit"
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
        setIsFinished(true); // Hiển thị màn hình "Submit"

        recordedChunksRef.current = [];
        stopMediaStream();
        setRecordingStatus("idle");
      };
      if (recordingStatus !== "idle") {
        mediaRecorderRef.current.stop();
      }
    } else {
      setIsFinished(true); // Failsafe
      stopMediaStream();
    }
  };

  // === MỚI: Hàm này được gọi từ nút "Submit" trên FinishedScreen ===
  const handleSubmitForGrading = () => {
    // Chuyển sang trang kết quả và mang theo dữ liệu
    navigate("/speaking-result", {
      state: { recording: finalRecording },
    });
  };

  const handleClose = () => {
    if (!isFinished && recordingStatus !== "idle") { // Thêm check isFinished
      if (
        !window.confirm(
          "Bạn có chắc muốn thoát? Toàn bộ tiến trình sẽ bị mất."
        )
      ) {
        return;
      }
    }
    stopMediaStream();
    navigate("/");
  };

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
      {/* 1. Header (Cập nhật nút Tips) */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Lexi<span className="text-blue-600">Prep</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTipsModalOpen(true)} // Mở Modal
            className="flex items-center gap-1.5 text-sm font-medium bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200"
          >
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

      {/* 2. Main Area (Hiển thị câu hỏi HOẶC màn hình submit) */}
      <main className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
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
          <FinishedScreen
            recording={finalRecording}
            onSubmit={handleSubmitForGrading}
          />
        )}
      </main>

      {/* 3. Footer / Controls (Ẩn khi thi xong) */}
      {!isFinished && (
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
      )}

      {/* MODAL CHO TIPS & TRICKS (Render ở cuối) */}
      <TipsModal
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
        question={currentQuestion}
        sampleAnswer={SAMPLE_ANSWERS[currentQuestionIndex]}
      />
    </div>
  );
}

// --- Component Màn hình Hoàn thành (Nút Submit) ---
const FinishedScreen = ({ recording, onSubmit }) => {
  return (
    <div className="text-center max-w-2xl w-full mx-auto">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Test Completed!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Well done. You can review your recording below or submit for AI grading.
      </p>

      {/* Audio Player */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left space-y-4 mb-8 shadow-sm">
        <div className="flex items-center justify-between p-3">
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

      {/* Nút Submit (CĂN GIỮA) */}
      <button
        onClick={onSubmit} // Gọi hàm navigate được truyền từ cha
        disabled={!recording.audioUrl}
        className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition shadow-md hover:shadow-lg disabled:bg-gray-400"
      >
        <GraduationCap size={20} />
        Submit for AI Grading
      </button>
    </div>
  );
};

// --- Component MỚI: Modal cho Tips & Tricks ---
const TipsModal = ({ isOpen, onClose, question, sampleAnswer }) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Ngăn backdrop click khi bấm vào modal
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col slide-up"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Lightbulb size={20} className="text-yellow-500" />
            Tips & Sample Answer
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        {/* Body (scrollable) */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Câu hỏi ({question.type}):
            </p>
            <p className="text-gray-800 whitespace-pre-line">{question.text}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Câu trả lời mẫu (Sample Answer):
            </p>
            <p className="text-gray-600 leading-relaxed">{sampleAnswer}</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingTestPage;