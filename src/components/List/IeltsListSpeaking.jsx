import React from "react";

// --- Data giả lập cho các đề thi (Đã cập nhật sang Speaking) ---
const testSectionsData = [
  {
    title: "Cambridge IELTS Academic 11",
    tests: [
      { id: "c11_t1", title: "C11 Speaking Test 1 AC", progress: 0 },
      { id: "c11_t2", title: "C11 Speaking Test 2 AC", progress: 0 },
      { id: "c11_t3", title: "C11 Speaking Test 3 AC", progress: 0 },
      { id: "c11_t4", title: "C11 Speaking Test 4 AC", progress: 0 },
    ],
  },
  {
    title: "Cambridge IELTS Academic 12",
    tests: [
      { id: "c12_t1", title: "C12 Speaking Test 1 AC", progress: 0 },
      { id: "c12_t2", title: "C12 Speaking Test 2 AC", progress: 0 },
      { id: "c12_t3", title: "C12 Speaking Test 3 AC", progress: 0 },
      { id: "c12_t4", title: "C12 Speaking Test 4 AC", progress: 0 },
    ],
  },
];

// --- Icon Components (SVG nhúng trực tiếp) ---

// Icon Sét cho nút "Take Test"
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

// Icon Cài đặt
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
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0 2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

// Icon Văn bản
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

// --- Component Card Đề thi (Đã cập nhật màu tím) ---
const TestCard = ({ test }) => {
  return (
    <div className="bg-white border border-purple-200 rounded-lg shadow-sm p-4 flex flex-col items-center text-center h-full">
      {/* Icon 'P' */}
      <div className="bg-teal-500 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg mb-2">
        P
      </div>

      {/* Tiêu đề Test */}
      <h3 className="text-sm font-semibold text-gray-700 min-h-[2.8rem] flex items-center">
        {test.title}
      </h3>

      {/* Tiến độ (Đổi màu) */}
      <div className="text-2xl font-bold text-purple-600 my-2">
        {test.progress}%
      </div>

      {/* Nút Take Test (Đổi màu) */}
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200">
        <LightningIcon />
        Take Test
      </button>

      {/* Icons phụ */}
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
      {/* Tiêu đề Nhóm */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>

      {/* Lưới các Card (Đổi màu viền) */}
      <div className="border border-purple-200 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Component chính của trang (Đổi tên thành IeltListSpeaking) ---
function IeltsListSpeaking() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header (Đã cập nhật sang Speaking) */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Thư viện đề&nbsp;
            <span className="inline-block border-b-4 border-teal-400 pb-1">
              IELTS Speaking
            </span>
            &nbsp;Academic
          </h1>
          <p className="text-gray-600 mt-2">
            Kho đề IELTS Speaking Academic từ Cambridge và bộ đề thi thật
            (Actual Tests).
          </p>
        </header>

        {/* Main Content */}
        <main>
          {testSectionsData.map((section) => (
            <TestSection
              key={section.title}
              title={section.title}
              tests={section.tests}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

/**
 * Đây là component App chính.
 * Nó gọi component IeltListSpeaking, được định nghĩa trong cùng file này.
 */
export default IeltsListSpeaking;
