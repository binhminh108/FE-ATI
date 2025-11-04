// src/pages/SpeakingTestPage.jsx
// (Đã thiết kế lại hoàn toàn màn hình kết quả)

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
  Loader2,
  GraduationCap,
  BookOpen,
  Check, // Icon cho Task Response
  Waves, // Icon cho Fluency
  Volume2, // Icon cho Pronunciation
} from "lucide-react";

// --- Bộ câu hỏi (Giữ nguyên) ---
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

// --- Dữ liệu chấm điểm AI giả lập (Mock Data) ---
const MOCK_ASSESSMENT_DATA = {
  submission_id: "GyrCkqnqntmnJVitatmZD3",
  user_id: "user123",
  status: "COMPLETED",
  topic_prompt: "wedding",
  transcript:
    "I'm a wedding planner. My job brings me a lot of pleasure. Today is an amazing day. I am planning my sister's wedding. She will wear a beautiful white dress. I also get to wear a lovely dress. After the wedding, all the guests will have a nice dinner and will dance for hours. In the evening, my sister and her new husband will cut a cake that I designed. I hope they like it a lot.",
  scores: {
    fluency: 8.0,
    pronunciation: 5.0,
    task_response: 6.0,
    grammar: 6.0,
    vocabulary: 5.5,
    overall: 6.1,
  },
  feedback: {
    task_response:
      "The candidate addresses the topic directly and maintains relevance throughout. The ideas are logically connected, providing a clear narrative flow (job description → current task → specific wedding events). The response is coherent, with clear sequencing (e.g., 'After the wedding,' 'In the evening'). However, the response is brief, limiting the opportunity to fully develop complex points or demonstrate sustained discourse. For higher scores, the candidate would need to extend the response, perhaps by elaborating on the challenges of planning or the emotional significance of the event, rather than just listing activities.",
    grammar:
      "Grammatical accuracy is very high; there are virtually no errors in this sample. The candidate controls simple tenses (simple present: 'brings,' 'am planning') and the simple future ('will wear,' 'will dance') effectively. However, the range is limited. The response consists primarily of simple, short sentences connected by basic coordination. There is a lack of complex grammatical structures, such as subordinate clauses, passive voice, or varied relative clauses, which is necessary to achieve scores of 7.0 and above. The candidate needs to practice embedding ideas using complex structures to demonstrate flexibility.",
    vocabulary:
      "The candidate uses adequate vocabulary for the topic, including 'wedding planner' and specific terms like 'designed' (the cake). However, the vocabulary tends to be basic and common, relying heavily on simple adjectives such as 'amazing,' 'beautiful,' 'lovely,' and 'nice.' There is no evidence of sophisticated or low-frequency vocabulary, precise collocations, or idiomatic language (e.g., 'tying the knot,' 'a momentous occasion'). To improve, the candidate should aim to replace vague adjectives (like 'nice') with more precise descriptive language and incorporate a wider range of academic or specialized terminology.",
    overall:
      "The candidate delivers a clear, accurate, and relevant response. The main strength is the high level of accuracy in basic grammar. The primary limitation is the lack of complexity and extension across all criteria. To reach a higher band, the candidate must actively practice extending their answers using a variety of complex sentence structures and demonstrating a broader, more nuanced vocabulary repertoire. The response is currently too short and structurally simple for advanced levels.",
    fluency:
      "Fluency is strong, with speech delivered at a natural pace. There is minimal hesitation.",
    pronunciation:
      "Pronunciation has some inaccuracies with certain vowel sounds and word stress, which occasionally impacts clarity.",
  },
};

// --- Component Chính (Giữ nguyên logic ghi âm) ---
function SpeakingTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingStatus, setRecordingStatus] = useState("idle");
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

  useEffect(() => {
    return () => {
      stopMediaStream();
      clearInterval(timerIntervalRef.current);
    };
  }, []);

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
      {/* 1. Header (Giữ nguyên) */}
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

      {/* 2. Main Area (Cập nhật để cuộn) */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50">
        {!isFinished ? (
          <div className="flex items-center justify-center min-h-full">
            <div className="text-center">
              <span className="text-sm font-semibold text-blue-600 uppercase">
                {currentQuestion.type}
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mt-4 whitespace-pre-line max-w-3xl">
                {currentQuestion.text}
              </h1>
            </div>
          </div>
        ) : (
          <FinishedScreen recording={finalRecording} />
        )}
      </main>

      {/* 3. Footer / Controls (Ẩn đi khi đã xong) */}
      {!isFinished && (
        <footer className="flex justify-between items-center p-4 border-t border-gray-200 bg-white">
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
    </div>
  );
}

// --- Component Màn hình Hoàn thành (ĐÃ CẬP NHẬT) ---
const FinishedScreen = ({ recording }) => {
  const [assessmentStatus, setAssessmentStatus] = useState("idle");
  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleSubmitForGrading = () => {
    if (!recording.audioUrl) {
      alert("Không tìm thấy file ghi âm để chấm điểm.");
      return;
    }
    setAssessmentStatus("loading");
    setTimeout(() => {
      setAssessmentResult(MOCK_ASSESSMENT_DATA);
      setAssessmentStatus("completed");
    }, 3000);
  };

  // 1. Trạng thái IDLE (Chờ bấm submit)
  if (assessmentStatus === "idle") {
    return (
      <div className="text-center max-w-2xl w-full mx-auto">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Test Completed!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Well done. You can review your recording below or submit for AI
          grading.
        </p>

        {/* Audio Player */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-left space-y-4 mb-8 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <span className="font-medium text-gray-700">
              Full Test Recording
            </span>
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
          onClick={handleSubmitForGrading}
          disabled={!recording.audioUrl}
          className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition shadow-md hover:shadow-lg disabled:bg-gray-400"
        >
          <GraduationCap size={20} />
          Submit for AI Grading
        </button>
      </div>
    );
  }

  // 2. Trạng thái LOADING (Thiết kế lại chuyên nghiệp)
  if (assessmentStatus === "loading") {
    return (
      <div className="text-center max-w-2xl w-full mx-auto p-10 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Đang đánh giá bài thi...
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          LexiBot AI đang phân tích âm điệu, sự trôi chảy, và từ vựng của bạn.
        </p>
        <div className="flex justify-center items-center space-x-2">
          <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  // 3. Trạng thái COMPLETED (Hiển thị kết quả)
  if (assessmentStatus === "completed") {
    return (
      <AssessmentResult
        result={assessmentResult}
        recordingUrl={recording.audioUrl}
      />
    );
  }

  return null;
};

// --- COMPONENT MỚI: Hiển thị kết quả (THIẾT KẾ LẠI HOÀN TOÀN) ---
const AssessmentResult = ({ result, recordingUrl }) => {
  const { scores, feedback, transcript } = result;

  // Map cho các tiêu chí
  const criteria = [
    { key: "task_response", title: "Task Response", score: scores.task_response, icon: <Check />, color: "green", feedback: feedback.task_response },
    { key: "fluency", title: "Fluency", score: scores.fluency, icon: <Waves />, color: "cyan", feedback: feedback.fluency },
    { key: "pronunciation", title: "Pronunciation", score: scores.pronunciation, icon: <Volume2 />, color: "purple", feedback: feedback.pronunciation },
    { key: "grammar", title: "Grammar", score: scores.grammar, icon: <BookOpen />, color: "red", feedback: feedback.grammar },
    { key: "vocabulary", title: "Vocabulary", score: scores.vocabulary, icon: <BookOpen />, color: "orange", feedback: feedback.vocabulary },
  ];

  return (
    // Thêm class 'slide-up' để mượt mà
    <div className="w-full max-w-7xl mx-auto space-y-6 slide-up">
      {/* KHỐI 1: ĐIỂM SỐ (NGANG NHAU) */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Điểm tổng (Bên trái) */}
          <div className="lg:w-1/3 p-6 text-center flex flex-col justify-center items-center bg-blue-600 text-white">
            <p className="text-lg font-medium text-blue-100 uppercase tracking-wide">
              Overall Band Score
            </p>
            <div className="text-8xl font-bold my-2">
              {scores.overall.toFixed(1)}
            </div>
            <div className="w-full h-2 bg-blue-800 rounded-full overflow-hidden">
              <div
                className="h-2 bg-white rounded-full"
                style={{ width: `${(scores.overall / 9) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Điểm thành phần (Bên phải - Grid) */}
          <div className="lg:w-2/3 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Điểm thành phần
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {criteria.map((item) => (
                <SubScoreCard
                  key={item.key}
                  title={item.title}
                  score={item.score}
                  icon={item.icon}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KHỐI 2: TRANSCRIPT & AUDIO (NGANG NHAU) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Audio Của Bạn
          </h3>
          <audio src={recordingUrl} controls className="w-full h-12" />
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">
            Transcript
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              "{transcript}"
            </p>
          </div>
        </div>
        
        {/* Nhận xét chung */}
        <FeedbackCard
          icon={<GraduationCap />}
          title="Nhận Xét Chung (Overall)"
          content={feedback.overall}
          color="blue"
          isMain={true} // Làm cho thẻ này nổi bật
        />
      </div>

      {/* KHỐI 3: NHẬN XÉT CHI TIẾT (LƯỚI NGANG) */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Phân Tích Chi Tiết
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteria.map((item) => (
            <FeedbackCard
              key={item.key}
              icon={item.icon}
              title={item.title}
              content={item.feedback}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Component phụ cho Thẻ Điểm thành phần
const SubScoreCard = ({ title, score, icon, color }) => {
   const colors = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
    cyan: "text-cyan-600 bg-cyan-50",
    gray: "text-gray-600 bg-gray-50",
  };
  
  return (
    <div className={`p-4 rounded-lg flex items-center gap-3 ${colors[color]}`}>
       <div className="flex-shrink-0">
          {React.cloneElement(icon, { className: "w-6 h-6" })}
       </div>
       <div>
          <div className="text-sm font-medium opacity-80">{title}</div>
          <div className="text-2xl font-bold">
            {score.toFixed(1)}
          </div>
       </div>
    </div>
  );
};

// Component phụ cho Thẻ Feedback (Cập nhật)
const FeedbackCard = ({ icon, title, content, color = "gray", isMain = false }) => {
  const colors = {
    blue: "border-blue-500 bg-blue-50 text-blue-800",
    green: "border-green-500 bg-green-50 text-green-800",
    red: "border-red-500 bg-red-50 text-red-800",
    orange: "border-orange-500 bg-orange-50 text-orange-800",
    purple: "border-purple-500 bg-purple-50 text-purple-800",
    cyan: "border-cyan-500 bg-cyan-50 text-cyan-800",
    gray: "border-gray-500 bg-gray-50 text-gray-800",
  };
  
  const mainClass = isMain 
    ? "bg-white rounded-xl shadow-xl border border-gray-200" 
    : `rounded-lg ${colors[color]} border-l-4`;

  return (
    <div className={`p-6 ${mainClass}`}>
      <h4 className={`font-bold text-xl mb-3 flex items-center gap-3 ${isMain ? colors[color] : ''}`}>
        {React.cloneElement(icon, { className: "w-6 h-6 flex-shrink-0" })}
        {title}
      </h4>
      <p className="text-md text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default SpeakingTestPage;