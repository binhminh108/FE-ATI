import React, { useState } from "react";
// KHÔNG import Link, vì nút "Take Test" sẽ là <button>

// --- Dữ liệu (Đã cập nhật) ---
const testSectionsData = [
  {
    title: "Cambridge IELTS Academic 11",
    tests: [
      { id: "c11_t1", title: "C11 Listening Test 1 AC", progress: 0 },
      { id: "c11_t2", title: "C11 Listening Test 2 AC", progress: 0 },
      { id: "c11_t3", title: "C11 Listening Test 3 AC", progress: 0 },
      { id: "c11_t4", title: "C11 Listening Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 12",
    tests: [
      { id: "c12_t1", title: "C12 Listening Test 1 AC", progress: 0 },
      { id: "c12_t2", title: "C12 Listening Test 2 AC", progress: 0 },
      { id: "c12_t3", title: "C12 Listening Test 3 AC", progress: 0 },
      { id: "c12_t4", title: "C12 Listening Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 13",
    tests: [
      { id: "c13_t1", title: "C13 Listening Test 1 AC", progress: 0 },
      { id: "c13_t2", title: "C13 Listening Test 2 AC", progress: 0 },
      { id: "c13_t3", title: "C13 Listening Test 3 AC", progress: 0 },
      { id: "c13_t4", title: "C13 Listening Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 14",
    tests: [
      { id: "c14_t1", title: "C14 Listening Test 1 AC", progress: 0 },
      { id: "c14_t2", title: "C14 Listening Test 2 AC", progress: 0 },
      { id: "c14_t3", title: "C14 Listening Test 3 AC", progress: 0 },
      { id: "c14_t4", title: "C14 Listening Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 15",
    tests: [
      { id: "c15_t1", title: "C15 Listening Test 1 AC", progress: 0 },
      { id: "c15_t2", title: "C15 Listening Test 2 AC", progress: 0 },
      { id: "c15_t3", title: "C15 Listening Test 3 AC", progress: 0 },
      { id: "c15_t4", title: "C15 Listening Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 16",
    tests: [
      { id: "c16_t1", title: "C16 Listening Test 1 AC", progress: 0 },
      { id: "c16_t2", title: "C16 Listening Test 2 AC", progress: 0 },
      { id: "c16_t3", title: "C16 Listening Test 3 AC", progress: 0 },
      { id: "c16_t4", title: "C16 Listening Test 4 AC", progress: 0 },
    ],
  },
];

// --- Icon Components (Giữ nguyên LightningIcon) ---
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

// --- SỬA LỖI: Thêm className để đồng bộ hover style ---
const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    // Thêm class giống Speaking
    className="text-gray-300 hover:text-gray-500 transition-colors"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// --- SỬA LỖI: Thêm className để đồng bộ hover style ---
const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    // Thêm class giống Speaking
    className="text-gray-300 hover:text-gray-500 transition-colors"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

// --- Component Card Đề thi (Cập nhật theme Xanh) ---
const TestCard = ({ test }) => {
  return (
    // === SỬA LỖI: Đổi màu viền sang Xanh ===
    <div className="bg-white border border-blue-300 rounded-lg shadow-sm p-4 flex flex-col items-center text-center h-full">
      {/* Icon 'P' (Đổi màu sang Xanh) */}
      <div className="bg-blue-600 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg mb-2">
        P
      </div>

      <h3 className="text-sm font-semibold text-gray-700 min-h-[2.8rem] flex items-center">
        {test.title}
      </h3>

      {/* === SỬA LỖI: Đổi màu % sang Xanh === */}
      <div className="text-2xl font-bold text-blue-600 my-2">
        {test.progress}%
      </div>

      {/* === SỬA LỖI: Dùng <button> và đổi màu Xanh === */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 btn-hover"
      >
        <LightningIcon />
        Take Test
      </button>

      <div className="flex gap-4 mt-4 text-gray-300">
        <SettingsIcon />
        <FileTextIcon />
      </div>
    </div>
  );
};

// --- Component Nhóm Đề thi (Cập nhật theme Xanh) ---
const TestSection = ({ title, tests }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {/* === SỬA LỖI: Đổi màu viền sang Xanh === */}
      <div className="border border-blue-300 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SỬA LỖI: Thay thế hoàn toàn Pagination để giống style trang Speaking ---
// (Đã đổi theme từ Tím -> Xanh)
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Xử lý nút Prev/Next
  const handlePrev = () => {
    paginate(currentPage - 1);
  };

  const handleNext = () => {
    paginate(currentPage + 1);
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
            : "bg-white text-gray-700 hover:bg-blue-100" // Đổi hover
        } border border-gray-300`}
      >
        Prev
      </button>

      {/* Các nút số trang */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 rounded-md transition-colors border ${
            currentPage === number
              ? "bg-blue-600 text-white border-blue-600" // Đổi active
              : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300" // Đổi hover
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
            : "bg-white text-gray-700 hover:bg-blue-100" // Đổi hover
        } border border-gray-300`}
      >
        Next
      </button>
    </nav>
  );
};


// --- Component chính của trang ---
function IeltsListListening() {
  // State phân trang (Giữ nguyên)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); 

  // Logic tính toán (Giữ nguyên)
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentSections = testSectionsData.slice(
    indexOfFirstSection,
    indexOfLastSection
  );
  const totalSections = testSectionsData.length;

  // Hàm thay đổi trang (Giữ nguyên)
  const paginate = (pageNumber) => {
    // Thêm kiểm tra biên để nút Prev/Next hoạt động đúng
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalSections / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    // === SỬA LỖI: Đổi nền sang 'bg-slate-50' cho giống Speaking ===
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header (Cập nhật theme Xanh) */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Thư viện đề&nbsp;
            {/* === SỬA LỖI: Đổi màu gạch chân sang Xanh === */}
            <span className="inline-block border-b-4 border-blue-400 pb-1">
              IELTS Listening
            </span>
            &nbsp;Academic
          </h1>
          <p className="text-gray-600 mt-2">
            Kho đề IELTS Listening Academic từ Cambridge và bộ đề thi thật
            (Actual Tests).
          </p>
        </header>

        {/* Main Content */}
        <main>
          {/* Map qua 'currentSections' (Giữ nguyên) */}
          {currentSections.map((section) => (
            <TestSection
              key={section.title}
              title={section.title}
              tests={section.tests}
            />
          ))}
        </main>

        {/* Component Pagination (Giữ nguyên) */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalSections}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default IeltsListListening;