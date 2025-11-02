// src/pages/SpeakingTestPage.jsx
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

// --- Bộ câu hỏi IELTS Speaking (Giả lập) ---
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
  const [totalElapsedTime, setTotalElapsedTime] = useState(0); // Tổng thời gian đã ghi âm
  const [audioRecordings, setAudioRecordings] = useState([]); // [{ question, audioUrl, blob }]
  const [isFinished, setIsFinished] = useState(false);

  const mediaRecorderRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const streamRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const navigate = useNavigate();

  // --- Logic Hẹn giờ ---
  useEffect(() => {
    if (recordingStatus === "recording") {
      // Bắt đầu đếm giờ
      timerIntervalRef.current = setInterval(() => {
        setTotalElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      // Dừng đếm giờ
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [recordingStatus]);

  // --- Logic Dọn dẹp ---
  // Đảm bảo tắt mic khi người dùng rời trang
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
      // Nếu đang tạm dừng, tiếp tục
      mediaRecorderRef.current.resume();
      setRecordingStatus("recording");
      return;
    }

    // Nếu bắt đầu mới
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      recordedChunksRef.current = []; // Xóa các chunks cũ

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

  const saveRecording = (questionText) => {
    return new Promise((resolve) => {
      if (recordingStatus === "idle") {
        // Người dùng bỏ qua câu hỏi
        setAudioRecordings((prev) => [
          ...prev,
          { question: questionText, audioUrl: null, blob: null },
        ]);
        resolve();
        return;
      }

      // Đang ghi âm hoặc tạm dừng -> lưu lại
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(blob);
        setAudioRecordings((prev) => [
          ...prev,
          { question: questionText, audioUrl, blob },
        ]);
        recordedChunksRef.current = [];
        resolve();
      };

      mediaRecorderRef.current.stop();
      setRecordingStatus("idle");
    });
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

  const handleNextQuestion = async () => {
    const questionText = SPEAKING_QUESTIONS[currentQuestionIndex].text;
    await saveRecording(questionText);

    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Đây là câu cuối cùng
      handleFinishTest();
    }
  };

  const handleFinishTest = () => {
    setIsFinished(true);
    stopMediaStream(); // Tắt mic
    clearInterval(timerIntervalRef.current);
  };

  const handleClose = () => {
    // Thêm cảnh báo nếu đang thi
    if (!isFinished && recordingStatus !== "idle") {
      if (!window.confirm("Bạn có chắc muốn thoát? Toàn bộ tiến trình sẽ bị mất.")) {
        return;
      }
    }
    stopMediaStream();
    navigate("/"); // Quay về trang chủ
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
          <FinishedScreen recordings={audioRecordings} />
        )}
      </main>

      {/* 3. Footer / Controls */}
      <footer className="flex justify-between items-center p-4 border-t border-gray-200">
        {/* Nút Ghi âm / Tạm dừng */}
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
          {recordingStatus === "recording" ? "Pause" : "Record"}
        </button>

        {/* Trạng thái */}
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

        {/* Nút Next / Finish */}
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
const FinishedScreen = ({ recordings }) => {
  return (
    <div className="text-center max-w-2xl w-full">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Test Completed!
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Well done. You have completed the Speaking test. You can review your
        recordings below.
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-left space-y-4 max-h-64 overflow-y-auto">
        {recordings.map((rec, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
          >
            <span className="font-medium text-gray-700">
              Question {index + 1}
            </span>
            {rec.audioUrl ? (
              <audio src={rec.audioUrl} controls className="h-10" />
            ) : (
              <span className="text-gray-400 text-sm italic">Skipped</span>
            )}
            {rec.audioUrl && (
              <a
                href={rec.audioUrl}
                download={`speaking_q${index + 1}.webm`}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                title="Download"
              >
                <Download size={18} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakingTestPage;
