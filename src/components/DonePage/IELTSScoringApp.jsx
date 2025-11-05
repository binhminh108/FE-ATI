import React, { useState, useRef, useEffect } from "react";
import Header from "../MainExam/Header.jsx";
import { useLocation } from "react-router-dom";

export default function IELTSScoringApp() {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const [promptImageUrl, setPromptImageUrl] = useState(null);

  const location = useLocation();
  const formData = location.state?.formData;

  const wordCount = formData?.essay
    ? formData.essay.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // Dữ liệu mock cho phân tích lỗi AI
  const essayErrors = [
    {
      text: "technology made our lives more complicated",
      suggestion: "technology has made our lives more complicated",
      type: "grammar",
      typeVi: "Ngữ pháp",
      location: "Đoạn 1, câu 2",
      explanation:
        "Cần sử dụng thì hiện tại hoàn thành để diễn tả tác động kéo dài đến hiện tại",
      color: "red",
    },
    {
      text: "For example",
      suggestion: "For instance",
      type: "vocabulary",
      typeVi: "Từ vựng",
      location: "Đoạn 2, câu 2",
      explanation:
        'Sử dụng "For instance" sẽ trang trọng và học thuật hơn trong bài viết IELTS',
      color: "yellow",
    },
    {
      text: "Communication",
      suggestion: "Additionally, communication",
      type: "coherence",
      typeVi: "Liên kết",
      location: "Đoạn 3, câu 2",
      explanation: "Thêm liên từ để tăng tính liên kết giữa các ý",
      color: "blue",
    },
    {
      text: "Instead of letting technology control us",
      suggestion: "Rather than allowing technology to control us",
      type: "vocabulary",
      typeVi: "Phong cách",
      location: "Đoạn 4, câu 2",
      explanation:
        "Sử dụng cấu trúc trang trọng hơn phù hợp với văn phong học thuật",
      color: "purple",
    },
  ];

  // useEffect để xử lý URL ảnh (Đã sửa lỗi createObjectURL)
  useEffect(() => {
    let imageUrl = null;
    const imageSource = formData?.image;

    if (imageSource) {
      if (typeof imageSource === "string") {
        imageUrl = imageSource;
      } else if (imageSource instanceof File || imageSource instanceof Blob) {
        imageUrl = URL.createObjectURL(imageSource);
      }
    }

    setPromptImageUrl(imageUrl);

    return () => {
      if (
        imageUrl &&
        (imageSource instanceof File || imageSource instanceof Blob)
      ) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [formData?.image]);

  // useEffect cho Resizer (Giữ nguyên)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth);
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  // Bộ kiểm tra (Guard Clause)
  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Không tìm thấy dữ liệu bài làm
        </h1>
        <p className="text-gray-600">
          Vui lòng quay lại trang nộp bài và chấm điểm trước.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {/* <Header /> */} {/* Bạn có thể mở lại Header nếu cần */}
      {/* Main Content */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden mt-2">
        {/* Left Panel - Cột đề bài và bài làm */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="bg-white overflow-hidden flex flex-col"
        >
          <div className="bg-gray-100 px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Đề bài và bài làm
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ĐỀ BÀI */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-md font-semibold text-blue-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Đề bài (Task {formData.task})
              </h3>
              <div className="text-gray-700 leading-relaxed">
                {/* Hiển thị ảnh (Đã sửa) */}
                {formData.task === 1 && promptImageUrl && (
                  <div className="mb-4">
                    <img
                      src={promptImageUrl}
                      alt="Đề bài Task 1"
                      className="w-full rounded-lg shadow-md" // Sửa thành w-full
                    />
                  </div>
                )}
                {/* Hiển thị text đề bài (Đã sửa) */}
                {formData.prompt && (
                  <p className="mb-4" style={{ fontSize: "18px" }}>
                    <strong>{formData.prompt}</strong>
                  </p>
                )}
                {formData.task === 2 && (
                  <p className="text-sm text-blue-600">
                    <em>Write at least 250 words.</em>
                  </p>
                )}
              </div>
            </div>

            {/* BÀI LÀM */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Bài làm của bạn
                </span>
                <span className="text-sm text-gray-500">{wordCount} từ</span>
              </h3>
              <div className="text-gray-700 leading-relaxed space-y-4 whitespace-pre-wrap">
                <p>{formData.essay}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resizer (Giữ nguyên) */}
        <div
          className="w-1 bg-gray-300 hover:bg-teal-500 cursor-col-resize transition-colors relative group"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-10 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* === SỬA: KHÔI PHỤC LẠI CỘT BÊN PHẢI === */}
        {/* Right Panel - Cột Phân Tích AI */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="bg-gray-50 overflow-hidden flex flex-col"
        >
          <div className="bg-gradient-to-b from-blue-400 to-indigo-400 text-black px-6 py-4">
            <h2 className="text-lg font-semibold">Đánh giá AI chi tiết</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Overall Score */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Điểm số tổng quan
              </h3>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-2">
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center"
                      style={{
                        background: `conic-gradient(from 0deg, #14b8a6 0deg, #14b8a6 300deg, #e5e7eb 300deg, #e5e7eb 360deg)`,
                      }}
                    >
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-teal-600">
                          7.5
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Điểm tổng</p>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="mb-2">
                    <strong>Mức độ:</strong> Giỏi
                  </div>
                  <div className="mb-2">
                    <strong>Thời gian:</strong> 2 phút 34 giây
                  </div>
                  <div>
                    <strong>Trạng thái:</strong>{" "}
                    <span className="text-green-600 font-medium">
                      Đạt yêu cầu
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Phân tích lỗi (4 lỗi được tìm thấy)
              </h3>
              <div className="space-y-4">
                {essayErrors.map((error, index) => (
                  <div
                    key={index}
                    className={`border-l-4 border-${error.color}-400 bg-${error.color}-50 p-4 rounded-r-lg`}
                  >
                    <div className="flex items-center mb-2">
                      <span
                        className={`bg-${error.color}-100 text-${error.color}-800 text-xs font-medium px-2 py-1 rounded`}
                      >
                        {error.typeVi}
                      </span>
                      <span className="ml-2 text-sm text-gray-600">
                        {error.location}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Lỗi:</strong> "{error.text}" →{" "}
                      <strong>Sửa:</strong> "{error.suggestion}"
                    </p>
                    <p className="text-xs text-gray-600">{error.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.548-1.146l-.548-.547z"
                  />
                </svg>
                Gợi ý cải thiện
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-transparent hover:border-teal-500 transition-all">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Điểm mạnh cần duy trì
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>
                      • Cấu trúc bài viết rõ ràng với mở bài, thân bài và kết
                      luận
                    </li>
                    <li>
                      • Trả lời đầy đủ cả hai quan điểm và đưa ra ý kiến cá nhân
                    </li>
                    <li>• Sử dụng từ vựng phong phú và chính xác</li>
                    <li>• Đạt yêu cầu về số từ ({wordCount} từ)</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-transparent hover:border-teal-500 transition-all">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Cải thiện ngữ pháp
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Chú ý sử dụng đúng thì trong các câu phức</li>
                    <li>• Kiểm tra lại cấu trúc câu trước khi hoàn thành</li>
                    <li>• Luyện tập thêm về thì hiện tại hoàn thành</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-transparent hover:border-teal-500 transition-all">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Nâng cao từ vựng
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Sử dụng từ đồng nghĩa để tránh lặp từ</li>
                    <li>• Học thêm các cụm từ học thuật</li>
                    <li>
                      • Chọn từ vựng trang trọng phù hợp với văn phong IELTS
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-transparent hover:border-teal-500 transition-all">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    Tăng tính liên kết
                  </h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Sử dụng thêm các liên từ nối ý</li>
                    <li>
                      • Tham khảo từ nối: Furthermore, Moreover, Nevertheless
                    </li>
                    <li>• Đảm bảo mỗi đoạn có chủ đề rõ ràng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* === KẾT THÚC KHÔI PHỤC === */}
      </div>
    </div>
  );
}
