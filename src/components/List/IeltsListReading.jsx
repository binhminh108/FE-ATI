import React, { useState } from "react";

// --- THAY ĐỔI 1: Thêm dữ liệu cho Cam 13, 14, 15, 16 ---
const testSectionsData = [
  {
    title: "Cambridge IELTS Academic 11",
    tests: [
      { id: "c11_t1", title: "C11 Reading Test 1 AC", progress: 0 },
      { id: "c11_t2", title: "C11 Reading Test 2 AC", progress: 0 },
      { id: "c11_t3", title: "C11 Reading Test 3 AC", progress: 0 },
      { id: "c11_t4", title: "C11 Reading Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 12",
    tests: [
      { id: "c12_t1", title: "C12 Reading Test 1 AC", progress: 0 },
      { id: "c12_t2", title: "C12 Reading Test 2 AC", progress: 0 },
      { id: "c12_t3", title: "C12 Reading Test 3 AC", progress: 0 },
      { id: "c12_t4", title: "C12 Reading Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 13",
    tests: [
      { id: "c13_t1", title: "C13 Reading Test 1 AC", progress: 0 },
      { id: "c13_t2", title: "C13 Reading Test 2 AC", progress: 0 },
      { id: "c13_t3", title: "C13 Reading Test 3 AC", progress: 0 },
      { id: "c13_t4", title: "C13 Reading Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 14",
    tests: [
      { id: "c14_t1", title: "C14 Reading Test 1 AC", progress: 0 },
      { id: "c14_t2", title: "C14 Reading Test 2 AC", progress: 0 },
      { id: "c14_t3", title: "C14 Reading Test 3 AC", progress: 0 },
      { id: "c14_t4", title: "C14 Reading Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 15",
    tests: [
      { id: "c15_t1", title: "C15 Reading Test 1 AC", progress: 0 },
      { id: "c15_t2", title: "C15 Reading Test 2 AC", progress: 0 },
      { id: "c15_t3", title: "C15 Reading Test 3 AC", progress: 0 },
      { id: "c15_t4", title: "C15 Reading Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 16",
    tests: [
      { id: "c16_t1", title: "C16 Reading Test 1 AC", progress: 0 },
      { id: "c16_t2", title: "C16 Reading Test 2 AC", progress: 0 },
      { id: "c16_t3", title: "C16 Reading Test 3 AC", progress: 0 },
      { id: "c16_t4", title: "C16 Reading Test 4 AC", progress: 0 },
    ],
  },
];

// --- Icon Components (Giữ nguyên) ---
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
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);
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
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

// --- Component Card Đề thi (Đã cập nhật màu xanh) ---
const TestCard = ({ test }) => {
  return (
    <div className="bg-white border border-green-200 rounded-lg shadow-sm p-4 flex flex-col items-center text-center h-full">
      <div className="bg-green-500 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg mb-2">
        P
      </div>
      <h3 className="text-sm font-semibold text-gray-700 min-h-[2.8rem] flex items-center">
        {test.title}
      </h3>
      <div className="text-2xl font-bold text-green-600 my-2">
        {test.progress}%
      </div>
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200">
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

// --- Component Nhóm Đề thi (Đã cập nhật màu) ---
const TestSection = ({ title, tests }) => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="border border-green-200 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- THAY ĐỔI 2: Component Phân trang ---
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                currentPage === number
                  ? "text-green-600 border border-green-300 bg-green-50 hover:bg-green-100 hover:text-green-700"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } ${pageNumbers.length === 1 ? "rounded-lg" : ""} ${
                number === 1 ? "rounded-l-lg" : ""
              } ${number === pageNumbers.length ? "rounded-r-lg" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// --- Component chính của trang ---
function IeltsListReading() {
  // --- THAY ĐỔI 3: Thêm state cho phân trang ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Hiển thị 2 section mỗi trang

  // Logic tính toán các section cho trang hiện tại
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentSections = testSectionsData.slice(
    indexOfFirstSection,
    indexOfLastSection
  );
  const totalSections = testSectionsData.length;

  // Hàm thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header (Đã cập nhật sang Reading) */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Thư viện đề&nbsp;
            <span className="inline-block border-b-4 border-teal-400 pb-1">
              IELTS Reading
            </span>
            &nbsp;Academic
          </h1>
          <p className="text-gray-600 mt-2">
            Kho đề IELTS Reading Academic từ Cambridge và bộ đề thi thật (Actual
            Tests).
          </p>
        </header>

        {/* Main Content */}
        <main>
          {/* --- THAY ĐỔI 4: Map qua 'currentSections' --- */}
          {currentSections.map((section) => (
            <TestSection
              key={section.title}
              title={section.title}
              tests={section.tests}
            />
          ))}
        </main>

        {/* --- THAY ĐỔI 5: Thêm component Pagination --- */}
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

export default IeltsListReading;
