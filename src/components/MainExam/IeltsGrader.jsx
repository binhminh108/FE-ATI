import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChartUpload from "./ChartUpload";
// === THAY ĐỔI 1: Xóa import icon ===
// import { SnippetsOutlined, CloseCircleOutlined } from '@ant-design/icons';

// ... (các state khác giữ nguyên) ...
// === COMPONENT CỘT NHẬP LIỆU (BÊN TRÁI) ===
const InputColumn = ({ onGrade, isLoading }) => {
  const [selectedTask, setSelectedTask] = useState(1);
  const [promptText, setPromptText] = useState(""); // <-- THÊM LẠI DÒNG NÀY
  // ... (các state khác giữ nguyên) ...
  const [essayText, setEssayText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({ prompt: null, essay: null });

  // ... (các hàm handleTaskChange, handleFileChange, handleSubmit giữ nguyên) ...
  const handleTaskChange = (task) => {
    setSelectedTask(task);
    // Xóa lỗi prompt khi đổi task
    setErrors((prev) => ({ ...prev, prompt: null }));
  };

  // Xử lý khi tải file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Xóa lỗi prompt nếu người dùng upload file
      setErrors((prev) => ({ ...prev, prompt: null }));
    } else {
      setUploadedFile(null);
    }
  };

  // Xử lý khi nhấn nút chấm điểm
  const handleSubmit = () => {
    // 1. Validate input
    let hasError = false;
    let newErrors = { prompt: null, essay: null };

    if (selectedTask === 1 && promptText.trim() === "" && !uploadedFile) {
      newErrors.prompt = "Vui lòng nhập đề bài hoặc tải ảnh lên.";
      hasError = true;
    } else if (selectedTask === 2 && promptText.trim() === "") {
      newErrors.prompt = "Vui lòng nhập đề bài.";
      hasError = true;
    }

    if (essayText.trim() === "") {
      newErrors.essay = "Vui lòng nhập bài làm của bạn.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    // 2. Gửi dữ liệu lên component cha (IeltsGrader) để xử lý
    onGrade({
      task: selectedTask,
      prompt: promptText,
      essay: essayText,
      image: uploadedFile,
    });
  };

  // Hàm đếm chữ
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // === THAY ĐỔI 2: Xóa hàm handlePaste ===
  // const handlePaste = async (setter) => { ... };

  // Hàm Clear
  const handleClear = (setter) => {
    setter("");
  };

  // Tính toán số chữ (sẽ được gọi trong JSX)
  const essayWordCount = countWords(essayText);

  return (
    <div className="flex flex-col gap-6 mt-12">
      {/* KHỐI 1: CHỌN LOẠI BÀI VIẾT (Giữ nguyên) */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          Chọn Loại Bài Viết
        </h2>
        <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0">
          <label
            htmlFor="radio-task1"
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              id="radio-task1"
              name="task-type"
              value="1"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              checked={selectedTask === 1}
              onChange={() => handleTaskChange(1)}
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">
              Task 1 - Chart/Graph
            </span>
          </label>
          <label
            htmlFor="radio-task2"
            className="flex items-center cursor-pointer"
          >
            <input
              type="radio"
              id="radio-task2"
              name="task-type"
              value="2"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              checked={selectedTask === 2}
              onChange={() => handleTaskChange(2)}
            />
            <span className="ml-3 text-lg text-gray-700 font-medium">
              Task 2 - Essay
            </span>
          </label>
        </div>
      </div>

      <ChartUpload />
      {/* KHỐI 2: NHẬP ĐỀ BÀI */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Nhập Đề Bài</h2>
          {/* === THAY ĐỔI 3: Xóa nút Paste, thay icon Clear bằng text === */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleClear(setPromptText)}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              title="Xóa"
            >
              Xóa
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Dán (paste) đề bài IELTS Writing của bạn vào đây (nếu là dạng chữ).
        </p>
        <textarea
          id="prompt-input"
          rows="5"
          className={`w-full p-4 rounded-lg border transition ${
            errors.prompt
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Ví dụ: 'The chart below shows the percentage of the population in four Asian countries living in cities from 1970 to 2020...'"
          value={promptText}
          onChange={(e) => {
            setPromptText(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, prompt: null }));
            }
          }}
        />
        {errors.prompt && (
          <div className="text-red-600 text-sm mt-1">{errors.prompt}</div>
        )}
      </div>

      {/* KHỐI 3: NHẬP BÀI LÀM */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Nhập Bài Làm Của Bạn
          </h2>
          <div className="flex space-x-2">
            {/* === THAY ĐỔI 4: Xóa nút Paste, thay icon Clear bằng text === */}
            <button
              onClick={() => handleClear(setEssayText)}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              title="Xóa"
            >
              Xóa
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Dán (paste) toàn bộ bài làm của bạn vào đây.
        </p>
        <textarea
          id="essay-input"
          rows="15"
          className={`w-full p-4 rounded-lg border transition ${
            errors.essay
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Dán bài làm của bạn tại đây..."
          value={essayText}
          onChange={(e) => {
            setEssayText(e.target.value);
            if (e.target.value.trim() !== "") {
              setErrors((prev) => ({ ...prev, essay: null }));
            }
          }}
        />
        {/* === THAY ĐỔI 5: Đổi vị trí đếm chữ và lỗi === */}
        <div className="flex justify-between items-center mt-2">
          <div
            className={`text-sm ${
              essayWordCount > 0 ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Số chữ: <span className="font-semibold">{essayWordCount}</span>
          </div>
          {errors.essay && (
            <div className="text-red-600 text-sm">{errors.essay}</div>
          )}
        </div>
      </div>

      {/* NÚT CHẤM ĐIỂM (Giữ nguyên) */}
      <button
        id="grade-button"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-200 flex items-center justify-center shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span>{isLoading ? "Đang Xử Lý..." : "Chấm Điểm Bằng AI"}</span>
      </button>
    </div>
  );
};

// === COMPONENT IeltsGrader (Chỉ còn Input) (Giữ nguyên) ===
function IeltsGrader() {
  // Chỉ giữ lại state isLoading cho nút bấm, nếu bạn vẫn muốn hiệu ứng này
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhấn nút chấm điểm
  const handleGrade = useCallback(
    (formData) => {
      setIsLoading(true);

      console.log("Đang gửi đi để chấm điểm:", formData);

      // Giả lập 2.5 giây xử lý, sau đó điều hướng tới trang kết quả
      setTimeout(() => {
        setIsLoading(false);
        // Điều hướng tới route /WritingDone và truyền formData bằng location.state
        navigate("/WritingDone", { state: { formData } });
      }, 2500);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-blue-400 to-indigo-400 text-black p-8 md:p-10 rounded-xl shadow-lg mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Trình Chấm Điểm IELTS Writing AI
          </h1>
          <p className="text-lg text-black">
            Tải lên bài viết của bạn và nhận phân tích chi tiết ngay lập tức.
          </p>
        </div>
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Trình Chấm Điểm IELTS Writing AI
        </h1> */}{" "}
        {/* Xóa H1 cũ */}
        <InputColumn onGrade={handleGrade} isLoading={isLoading} />
      </div>
    </div>
  );
}

// === COMPONENT App (root) (Giữ nguyên) ===
export default IeltsGrader;
