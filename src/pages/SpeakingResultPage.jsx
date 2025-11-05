// src/pages/SpeakingResultPage.jsx
// (Trang mới dành riêng cho Loading và Kết quả)

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Check,
  Waves,
  Volume2,
  Download,
  X,
} from "lucide-react";

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
// --- Hết Mock Data ---

function SpeakingResultPage() {
  const location = useLocation();
  const [assessmentStatus, setAssessmentStatus] = useState("loading"); // Bắt đầu ở trạng thái loading
  const [assessmentResult, setAssessmentResult] = useState(null);
  
  // Lấy dữ liệu ghi âm được truyền từ trang trước
  const recording = location.state?.recording;

  useEffect(() => {
    // Nếu không có file ghi âm (người dùng tự gõ URL), báo lỗi
    if (!recording || !recording.audioUrl) {
      setAssessmentStatus("error");
      return;
    }

    // Giả lập 3 giây gọi API chấm điểm
    const timer = setTimeout(() => {
      setAssessmentResult(MOCK_ASSESSMENT_DATA);
      setAssessmentStatus("completed");
    }, 3000);

    return () => clearTimeout(timer);
  }, [recording]);

  // 1. Trạng thái LOADING
  if (assessmentStatus === "loading") {
    return (
      <div className="flex flex-col h-screen w-full bg-white text-black font-sans items-center justify-center p-4">
        <div className="text-center max-w-2xl w-full mx-auto p-10 bg-white rounded-xl">
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
      </div>
    );
  }

  // 2. Trạng thái ERROR
  if (assessmentStatus === "error") {
    return (
      <div className="flex flex-col h-screen w-full bg-white text-black font-sans items-center justify-center p-4">
        <div className="text-center max-w-2xl w-full mx-auto p-10">
          <X size={64} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Không tìm thấy bài thi
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Không tìm thấy dữ liệu ghi âm. Vui lòng thực hiện lại bài thi.
          </p>
          <Link
            to="/speaking"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  // 3. Trạng thái COMPLETED
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 text-black font-sans">
      {/* Header riêng của trang kết quả */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Lexi<span className="text-blue-600">Prep</span>
        </Link>
        <Link
          to="/speaking"
          className="flex items-center gap-1.5 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <X size={18} />
          Đóng
        </Link>
      </header>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <AssessmentResult
          result={assessmentResult}
          recordingUrl={recording.audioUrl}
        />
      </main>
    </div>
  );
}

// --- Component Hiển thị kết quả (Tách ra từ file trước) ---
const AssessmentResult = ({ result, recordingUrl }) => {
  const { scores, feedback, transcript } = result;
  const criteria = [
    { key: "task_response", title: "Task Response", score: scores.task_response, icon: <Check />, color: "green", feedback: feedback.task_response },
    { key: "fluency", title: "Fluency", score: scores.fluency, icon: <Waves />, color: "cyan", feedback: feedback.fluency },
    { key: "pronunciation", title: "Pronunciation", score: scores.pronunciation, icon: <Volume2 />, color: "purple", feedback: feedback.pronunciation },
    { key: "grammar", title: "Grammar", score: scores.grammar, icon: <BookOpen />, color: "red", feedback: feedback.grammar },
    { key: "vocabulary", title: "Vocabulary", score: scores.vocabulary, icon: <BookOpen />, color: "orange", feedback: feedback.vocabulary },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 slide-up">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
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
        <FeedbackCard
          icon={<GraduationCap />}
          title="Nhận Xét Chung (Overall)"
          content={feedback.overall}
          color="blue"
          isMain={true}
        />
      </div>
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

// Component phụ
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

// Component phụ
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

export default SpeakingResultPage;