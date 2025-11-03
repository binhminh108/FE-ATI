import React, { useState } from "react";
// --- THAY ĐỔI: Import thêm BrowserRouter và các icon Ant Design ---
import { Link, BrowserRouter } from "react-router-dom";
import {
  HighlightOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  FieldTimeOutlined,
  CloseOutlined,
} from "@ant-design/icons";

// --- Data giả lập cho các đề thi (Giữ nguyên) ---
const testSectionsData = [
  {
    title: "Cambridge IELTS Academic 1",
    tests: [
      { id: "c15_t1", title: "C15 Writing Test 1 AC", progress: 0 },
      { id: "c15_t2", title: "C15 Writing Test 2 AC", progress: 0 },
      { id: "c15_t3", title: "C15 Writing Test 3 AC", progress: 0 },
      { id: "c15_t4", title: "C15 Writing Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 2",
    tests: [
      { id: "c14_t1", title: "C14 Writing Test 1 AC", progress: 0 },
      { id: "c14_t2", title: "C14 Writing Test 2 AC", progress: 0 },
      { id: "c14_t3", title: "C14 Writing Test 3 AC", progress: 0 },
      { id: "c14_t4", title: "C14 Writing Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 3",
    tests: [
      { id: "c13_t1", title: "C13 Writing Test 1 AC", progress: 0 },
      { id: "c13_t2", title: "C13 Writing Test 2 AC", progress: 0 },
      { id: "c13_t3", title: "C13 Writing Test 3 AC", progress: 0 },
      { id: "c13_t4", title: "C13 Writing Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 4",
    tests: [
      { id: "c12_t1", title: "C12 Writing Test 1 AC", progress: 0 },
      { id: "c12_t2", title: "C12 Writing Test 2 AC", progress: 0 },
      { id: "c12_t3", title: "C12 Writing Test 3 AC", progress: 0 },
      { id: "c12_t4", title: "C12 Writing Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 5",
    tests: [
      { id: "c11_t1", title: "C11 Writing Test 1 AC", progress: 0 },
      { id: "c11_t2", title: "C11 Writing Test 2 AC", progress: 0 },
      { id: "c11_t3", title: "C11 Writing Test 3 AC", progress: 0 },
      { id: "c11_t4", title: "C11 Writing Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 6",
    tests: [
      { id: "c10_t1", title: "C10 Writing Test 1 AC", progress: 0 },
      { id: "c10_t2", title: "C10 Writing Test 2 AC", progress: 0 },
      { id: "c10_t3", title: "C10 Writing Test 3 AC", progress: 0 },
      { id: "c10_t4", title: "C10 Writing Test 4 AC", progress: 0 },
    ],
  },
];

// --- Icon Components (SVG nhúng trực tiếp) (Giữ nguyên) ---
const LightningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

// ... (Các icon SettingsIcon, FileTextIcon giữ nguyên) ...

// --- THÊM MỚI: Component Modal Lựa Chọn Chế Độ ---
const TestModeModal = ({ onClose }) => {
  return (
    // Lớp phủ mờ
    // === THAY ĐỔI: Chuyển từ 'bg-black bg-opacity-60' thành 'bg-black/60' ===
    // (Tailwind v3.x syntax) để đảm bảo độ mờ được áp dụng.
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Đóng khi click ra ngoài
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 relative"
        onClick={(e) => e.stopPropagation()} // Ngăn click bên trong modal đóng modal
      >
        {/* Nút X để đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <CloseOutlined style={{ fontSize: "20px" }} />
        </button>

        {/* Nội dung modal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-6 md:p-10">
          {/* Cột 1: Chế độ luyện tập */}
          <div className="border border-gray-200 rounded-lg p-8 text-center flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <HighlightOutlined style={{ fontSize: "32px" }} />
            </div>
            <h3 className="text-2xl font-semibold my-3 text-gray-800">
              Chế độ luyện tập
            </h3>
            <p className="text-gray-500 mb-8 flex-grow">
              Luyện tập với thời gian gian tùy chỉnh cùng sự hỗ trợ của AI.
            </p>
            <Link
              to="/ai-assessment" // Đường link cho Chế độ 1
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <RocketOutlined />
              Luyện tập với AI
            </Link>
          </div>

          {/* Cột 2: Chế độ thi thử */}
          <div className="border border-gray-200 rounded-lg p-8 text-center flex flex-col items-center mt-6 md:mt-0 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
              <ClockCircleOutlined style={{ fontSize: "32px" }} />
            </div>
            <h3 className="text-2xl font-semibold my-3 text-gray-800">
              Chế độ thi thử
            </h3>
            <p className="text-gray-500 mb-8 flex-grow">
              Mô phỏng thi thật với thời gian giới hạn và không có AI hỗ trợ.
            </p>
            <Link
              to="/timed-test" // Đường link cho Chế độ 2
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FieldTimeOutlined />
              Thi thử tính giờ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- THAY ĐỔI: Component Card Đề thi (Theme: Orange) ---
const TestCard = ({ test, onTakeTest }) => {
  // Thêm prop onTakeTest
  return (
    <div className="bg-white border border-orange-300 rounded-lg shadow-sm p-4 flex flex-col items-center text-center h-full">
      <div className="bg-orange-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg mb-2">
        P
      </div>
      <h3 className="text-sm font-semibold text-gray-700 min-h-[2.8rem] flex items-center">
        {test.title}
      </h3>
      <div className="text-2xl font-bold text-orange-600 my-2">
        {test.progress}%
      </div>
      {/* THAY ĐỔI: Chuyển <Link> thành <button> */}
      <button
        onClick={onTakeTest} // Gọi hàm được truyền từ component cha
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 btn-hover"
      >
        <LightningIcon />
        Take Test
      </button>
    </div>
  );
};

// --- THAY ĐỔI: Component Nhóm Đề thi (Theme: Orange) ---
const TestSection = ({ title, tests, onTakeTest }) => {
  // Thêm prop onTakeTest
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="border border-orange-300 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onTakeTest={onTakeTest} // Truyền prop xuống
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component Pagination (Theme: Orange) (Giữ nguyên) ---
const Pagination = ({
  sectionsPerPage,
  totalSections,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalSections / sectionsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Xử lý nút Prev/Next
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {/* Nút Previous */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-100"
        } border border-gray-300`}
      >
        Prev
      </button>

      {/* Các nút số trang */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 rounded-md transition-colors border ${
            currentPage === number
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-gray-700 hover:bg-orange-100 border-gray-300"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-100"
        } border border-gray-300`}
      >
        Next
      </button>
    </nav>
  );
};

// --- Component chính của trang ---
function IeltsListWriting() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sectionsPerPage] = useState(4); // Hiển thị 4 quyển mỗi trang
  // --- THÊM MỚI: State quản lý modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic tính toán các section cho trang hiện tại (Giữ nguyên)
  const indexOfLastSection = currentPage * sectionsPerPage;
  const indexOfFirstSection = indexOfLastSection - sectionsPerPage;
  const currentSections = testSectionsData.slice(
    indexOfFirstSection,
    indexOfLastSection
  );

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header (Giữ nguyên) */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Thư viện đề&nbsp;
            <span className="inline-block border-b-4 border-orange-400 pb-1">
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
          {/* THAY ĐỔI: Truyền prop onTakeTest */}
          {currentSections.map((section) => (
            <TestSection
              key={section.title}
              title={section.title}
              tests={section.tests}
              onTakeTest={() => setIsModalOpen(true)} // Hàm để mở modal
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

      {/* --- THÊM MỚI: Render modal nếu isModalOpen là true --- */}
      {isModalOpen && <TestModeModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

// Component App mới để bọc BrowserRouter

export default IeltsListWriting;
