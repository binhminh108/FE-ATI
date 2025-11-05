import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// --- THAY ĐỔI: Import thêm icons mới ---
import {
  ClockCircleOutlined,
  EyeOutlined, // Icon mới
  MessageOutlined, // Icon mới
} from "@ant-design/icons";

// --- THAY ĐỔI: Cập nhật cấu trúc dữ liệu để khớp với UI mới ---
const testSectionsData = [
  {
    title: "BC IELTS writing", // Đổi tên section
    tests: [
      {
        id: "c15_t1",
        title: "BC IELTS writing test 1",
        taskType: 1,
        promptText:
          "The chart below shows the percentage of the population in four Asian countries living in cities from 1970 to 2020, with projections for 2030 and 2040.",
        promptImage: "https://i.imgur.com/g0P21G5.png",
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 6420,
        comments: 34,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c15_t2",
        title: "BC IELTS writing test 2",
        taskType: 2,
        promptText:
          "Some people say that advertising is extremely successful at persuading us to buy things. Other people think that advertising is so common that we no longer pay attention to it. Discuss both these views and give your own opinion.",
        promptImage: null,
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 2589,
        comments: 12,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c15_t3",
        title: "BC IELTS writing test 3",
        taskType: 1, // Giả lập data
        promptText: "Some other task 1 prompt.",
        promptImage: "https://i.imgur.com/g0P21G5.png",
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 2352,
        comments: 12,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c15_t4",
        title: "BC IELTS writing test 4",
        taskType: 2, // Giả lập data
        promptText: "Some other task 2 prompt.",
        promptImage: null,
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 2289,
        comments: 3,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c14_t1",
        title: "BC IELTS writing test 5",
        taskType: 1, // Giả lập data
        promptText: "C14 Task 1 prompt.",
        promptImage: "https://i.imgur.com/g0P21G5.png",
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 1338,
        comments: 1,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c14_t2",
        title: "BC IELTS writing test 6",
        taskType: 2, // Giả lập data
        promptText: "C14 Task 2 prompt.",
        promptImage: null,
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 1284,
        comments: 1,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c14_t3",
        title: "BC IELTS writing test 7",
        taskType: 1, // Giả lập data
        promptText: "C14 Task 3 prompt.",
        promptImage: "https://i.imgur.com/g0P21G5.png",
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 1167,
        comments: 2,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
      {
        id: "c14_t4",
        title: "BC IELTS writing test 8",
        taskType: 2, // Giả lập data
        promptText: "C14 Task 4 prompt.",
        promptImage: null,
        // --- Dữ liệu mới ---
        duration: "60 phút",
        views: 1245,
        comments: 3,
        description: "2 phần thi | 2 câu hỏi",
        tags: ["IELTS Academic", "Writing"],
      },
    ],
  },
  // ... (Các section khác)
];

// --- THAY ĐỔI: Component Card Đề thi (Giao diện mới) ---
const TestCard = ({ test, onTakeTest }) => {
  const hasData = !!test.taskType; // Kiểm tra xem có dữ liệu test không

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col h-full space-y-4 transition-shadow hover:shadow-lg">
      {/* Tiêu đề */}
      <h3 className="text-lg font-bold text-gray-900 min-h-[2.8rem] line-clamp-2">
        {test.title}
      </h3>

      {/* Thông tin meta (views, comments...) */}
      <div className="flex items-center text-gray-500 text-sm space-x-4 border-b border-gray-100 pb-4">
        <span className="flex items-center gap-1.5" title="Thời gian">
          <ClockCircleOutlined />
          {test.duration}
        </span>
        <span className="flex items-center gap-1.5" title="Lượt xem">
          <EyeOutlined />
          {test.views}
        </span>
        <span className="flex items-center gap-1.5" title="Bình luận">
          <MessageOutlined />
          {test.comments}
        </span>
      </div>

      {/* Mô tả (phần thi, câu hỏi) */}
      <div className="text-sm text-gray-700">{test.description}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {test.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Nút Chi tiết (đẩy xuống dưới cùng) */}
      <div className="flex-grow"></div>
      <button
        onClick={() => onTakeTest(test)}
        className="w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50"
        disabled={!hasData}
        title={
          !hasData ? "Đề bài này chưa có dữ liệu" : "Bắt đầu làm bài thi này"
        }
      >
        Take Test
      </button>
    </div>
  );
};

// --- THAY ĐỔI: Component Nhóm Đề thi (Bỏ viền cam) ---
const TestSection = ({ title, tests, onTakeTest }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">{title}</h2>
      {/* Bỏ viền cam và padding thừa */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} onTakeTest={onTakeTest} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component Pagination (Giữ nguyên) ---
const Pagination = (
  {
    /* ... props ... */
  }
) => {
  // ... (Code giữ nguyên)
  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {/* ... (Code giữ nguyên) */}
    </nav>
  );
};

// --- Component chính của trang ---
function IeltsListWriting() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sectionsPerPage] = useState(4);
  const navigate = useNavigate();

  // Logic tính toán các section (Giữ nguyên)
  const indexOfLastSection = currentPage * sectionsPerPage;
  const indexOfFirstSection = indexOfLastSection - sectionsPerPage;
  const currentSections = testSectionsData.slice(
    indexOfFirstSection,
    indexOfLastSection
  );

  // Hàm xử lý khi nhấn Take Test (GiMũ nguyên)
  // Nút "Chi tiết" sẽ gọi hàm này
  const handleTakeTest = (testData) => {
    if (!testData || !testData.taskType) {
      console.warn("Test data không hợp lệ hoặc không có taskType.");
      return;
    }
    // Route điều hướng vẫn giữ nguyên
    navigate("/ai-assessment", { state: { lockedPrompt: testData } });
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header (Giữ nguyên) */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Thư viện đề&nbsp;
            <span className="inline-block border-b-4 border-blue-500 pb-1">
              IELTS Writing
            </span>
            &nbsp;Academic
          </h1>
          <p className="text-gray-600 mt-2">
            Kho đề IELTS Writing Academic từ Cambridge và bộ đề thi thật (Actual
            Tests).
          </p>
        </header>

        <main>
          {currentSections.map((section) => (
            <TestSection
              key={section.title}
              title={section.title}
              tests={section.tests}
              onTakeTest={handleTakeTest}
            />
          ))}
        </main>

        {/* Pagination (Giữ nguyên) */}
        <Pagination
          sectionsPerPage={sectionsPerPage}
          totalSections={testSectionsData.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default IeltsListWriting;
