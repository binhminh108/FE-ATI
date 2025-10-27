import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ActionButtons = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  const essayErrors = [
    {
      typeVi: "Ngữ pháp",
      color: "red",
      location: "Đoạn 2, câu 3",
      text: "have became",
      suggestion: "have become",
      explanation:
        "Động từ 'become' ở dạng quá khứ phân từ là 'become', không phải 'became'.",
    },
    {
      typeVi: "Từ vựng",
      color: "yellow",
      location: "Đoạn 1, câu 2",
      text: "very important",
      suggestion: "crucial/vital",
      explanation:
        "Nên sử dụng từ vựng học thuật mạnh hơn thay vì 'very important'.",
    },
    {
      typeVi: "Ngữ pháp",
      color: "red",
      location: "Đoạn 3, câu 1",
      text: "Despite of",
      suggestion: "Despite",
      explanation: "'Despite' không cần 'of' phía sau.",
    },
    {
      typeVi: "Liên kết",
      color: "blue",
      location: "Đoạn 2",
      text: "Thiếu liên từ",
      suggestion: "Thêm 'Furthermore' hoặc 'Moreover'",
      explanation: "Cần có từ nối để kết nối ý giữa các câu.",
    },
  ];

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <Link to="/graders" className="flex-1">
          <button className="w-full font-semibold py-3 px-6 rounded-lg transition duration-200 bg-teal-600 hover:bg-teal-700 text-white">
            Chấm điểm
          </button>
        </Link>
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 bg-gray-600 hover:bg-gray-700 text-white"
        >
          {showFeedback ? "Ẩn chi tiết" : "Xem chi tiết"}
        </button>
      </div>

      {/* Hiện khi showFeedback = true */}
      {showFeedback && (
        <div className="space-y-6 mt-6">
          {/* Error Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Phân tích lỗi ({essayErrors.length} lỗi được tìm thấy)
            </h3>
            <div className="space-y-4">
              {essayErrors.map((error, index) => (
                <div
                  key={index}
                  className={`border-l-4 ${
                    error.color === "red"
                      ? "border-red-400 bg-red-50"
                      : error.color === "yellow"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-blue-400 bg-blue-50"
                  } p-4 rounded-r-lg`}
                >
                  <div className="flex items-center mb-2">
                    <span
                      className={`${
                        error.color === "red"
                          ? "bg-red-100 text-red-800"
                          : error.color === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      } text-xs font-medium px-2 py-1 rounded`}
                    >
                      {error.typeVi}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {error.location}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Lỗi:</strong> "{error.text}" → <strong>Sửa:</strong>{" "}
                    "{error.suggestion}"
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
                    • Cấu trúc bài viết rõ ràng với mở bài, thân bài và kết luận
                  </li>
                  <li>
                    • Trả lời đầy đủ cả hai quan điểm và đưa ra ý kiến cá nhân
                  </li>
                  <li>• Sử dụng từ vựng phong phú và chính xác</li>
                  <li>• Đạt yêu cầu về số từ (287 từ)</li>
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
      )}
    </div>
  );
};

export default ActionButtons;
