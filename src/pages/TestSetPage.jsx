// src/pages/TestSetPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Headphones, BookOpen, PenSquare, Mic, PlayCircle } from "lucide-react";

import testLibraryImage from "../images/banner1.jpeg";

// --- Dữ liệu giả lập cho trang (Giữ nguyên) ---
const allTestSets = {
  Cambridge: [
    {
      id: "c11_t1",
      title: "Cambridge Academic 11 - Test 1",
      parts: [
        {
          id: "c11_t1_l",
          skill: "Listening",
          title: "C11 Listening Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "c11_t1_r",
          skill: "Reading",
          title: "C11 Reading Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "c11_t1_w",
          skill: "Writing",
          title: "C11 Writing Test 1 AC",
          progress: 50,
          status: "Resume",
          color: "orange",
        },
        {
          id: "c11_t1_s",
          skill: "Speaking",
          title: "C11 Speaking Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
    {
      id: "c11_t2",
      title: "Cambridge Academic 11 - Test 2",
      parts: [
        {
          id: "c11_t2_l",
          skill: "Listening",
          title: "C11 Listening Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "c11_t2_r",
          skill: "Reading",
          title: "C11 Reading Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "c11_t2_w",
          skill: "Writing",
          title: "C11 Writing Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "c11_t2_s",
          skill: "Speaking",
          title: "C11 Speaking Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
    {
      id: "c11_t3",
      title: "Cambridge Academic 11 - Test 3",
      parts: [
        {
          id: "c11_t2_l",
          skill: "Listening",
          title: "C11 Listening Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "c11_t2_r",
          skill: "Reading",
          title: "C11 Reading Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "c11_t2_w",
          skill: "Writing",
          title: "C11 Writing Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "c11_t2_s",
          skill: "Speaking",
          title: "C11 Speaking Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
    {
      id: "c11_t4",
      title: "Cambridge Academic 11 - Test 4",
      parts: [
        {
          id: "c11_t2_l",
          skill: "Listening",
          title: "C11 Listening Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "c11_t2_r",
          skill: "Reading",
          title: "C11 Reading Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "c11_t2_w",
          skill: "Writing",
          title: "C11 Writing Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "c11_t2_s",
          skill: "Speaking",
          title: "C11 Speaking Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
  ],
  Collins: [
    {
      id: "co_t1",
      title: "Collins Academic - Test 1",
      parts: [
        {
          id: "co_t1_l",
          skill: "Listening",
          title: "Collins Listening Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "co_t1_r",
          skill: "Reading",
          title: "Collins Reading Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "co_t1_w",
          skill: "Writing",
          title: "Collins Writing Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "co_t1_s",
          skill: "Speaking",
          title: "Collins Speaking Test 1 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
    {
      id: "co_t2",
      title: "Collins Academic - Test 2",
      parts: [
        {
          id: "co_t1_l",
          skill: "Listening",
          title: "Collins Listening Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "co_t1_r",
          skill: "Reading",
          title: "Collins Reading Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "co_t1_w",
          skill: "Writing",
          title: "Collins Writing Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "co_t1_s",
          skill: "Speaking",
          title: "Collins Speaking Test 2 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
    {
      id: "co_t3",
      title: "Collins Academic - Test 3",
      parts: [
        {
          id: "co_t1_l",
          skill: "Listening",
          title: "Collins Listening Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "co_t1_r",
          skill: "Reading",
          title: "Collins Reading Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "co_t1_w",
          skill: "Writing",
          title: "Collins Writing Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "co_t1_s",
          skill: "Speaking",
          title: "Collins Speaking Test 3 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
    {
      id: "co_t4",
      title: "Collins Academic - Test 4",
      parts: [
        {
          id: "co_t1_l",
          skill: "Listening",
          title: "Collins Listening Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "blue",
        },
        {
          id: "co_t1_r",
          skill: "Reading",
          title: "Collins Reading Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "green",
        },
        {
          id: "co_t1_w",
          skill: "Writing",
          title: "Collins Writing Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "orange",
        },
        {
          id: "co_t1_s",
          skill: "Speaking",
          title: "Collins Speaking Test 4 AC",
          progress: 0,
          status: "Take Test",
          color: "purple",
        },
      ],
    },
  ],
};

// --- Icon Components (Giữ nguyên) ---
const SettingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-300 hover:text-gray-500 transition-colors"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);
const FileTextIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-300 hover:text-gray-500 transition-colors"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
);

// --- Component Card (Giữ nguyên) ---
const TestPartCard = ({ part }) => {
  const isResume = part.status === "Resume";
  const colors = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
      text: "text-blue-600",
      icon: Headphones,
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-600",
      hover: "hover:bg-green-700",
      text: "text-green-600",
      icon: BookOpen,
    },
    orange: {
      border: "border-orange-500",
      bg: "bg-orange-600",
      hover: "hover:bg-orange-700",
      text: "text-orange-600",
      icon: PenSquare,
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-600",
      hover: "hover:bg-purple-700",
      text: "text-purple-600",
      icon: Mic,
    },
  };
  const color = colors[part.color] || colors.blue;
  const Icon = color.icon;

  const getLink = (skill) => {
    switch (skill.toLowerCase()) {
      case "listening":
        return "/listening";
      case "reading":
        return "/reading";
      case "writing":
        return "/ai-assessment";
      case "speaking":
        return "/ai-assessment";
      default:
        return "#";
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border ${color.border} shadow-sm p-5 text-center flex flex-col`}
    >
      <div className="flex justify-center items-center gap-2 mb-3">
        <span
          className={`w-7 h-7 flex items-center justify-center font-bold text-lg rounded-md ${color.bg} text-white`}
        >
          P
        </span>
        <Icon className={`w-6 h-6 ${color.text}`} />
      </div>
      <h3 className="text-sm font-semibold text-gray-700 min-h-[2.8rem] flex items-center justify-center">
        {part.title}
      </h3>
      <div className="text-2xl font-bold text-gray-500 my-2">
        {part.progress}%
      </div>
      <Link
        to={getLink(part.skill)}
        className={`w-full ${
          isResume ? "bg-orange-600 hover:bg-orange-700" : color.bg
        } ${
          isResume ? "" : color.hover
        } text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-200 btn-hover`}
      >
        <PlayCircle size={16} />
        {part.status}
      </Link>
    </div>
  );
};

// --- Component Pagination (Giữ nguyên) ---
const Pagination = ({ currentPage = 1, totalPages = 8 }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex justify-center items-center space-x-2 mt-12">
      {pages.map((page) => (
        <button
          key={page}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-colors ${
            page === currentPage
              ? "bg-blue-950 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

// --- Component Trang chính ---
function TestSetPage({ collection = "Cambridge" }) {
  const testSets = allTestSets[collection] || [];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section
        className="hero-gradient pt-16 flex items-center"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-gray-800">
              {/* === SỬA LỖI: THAY ĐỔI TIÊU ĐỀ ĐỘNG === */}
              <h1 className="text-blue-950 text-[56px] font-semibold leading-[120%] tracking-tighter mb-6">
                {collection} {/* Thay vì "Cambridge" */}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #3b82f6, #22d3ee)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  className="inline-block font-bold"
                >
                  IELTS
                </span>{" "}
                Online Tests
              </h1>
              {/* === HẾT SỬA LỖI === */}
              <p className="text-gray-700 md:text-2xl mb-8 leading-relaxed">
                LexiPrep for IELTS – Practice & take mock tests online with a
                free test bank, including real & {collection} tests. Simulated
                computer-based interface, with instant scoring.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="#tests"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[8px] text-lg font-semibold btn-hover"
                >
                  Take Test Set
                </Link>
                <Link
                  to="/skills"
                  className="bg-white border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 px-8 py-4 rounded-[8px] text-lg font-semibold btn-hover"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg h-full min-h-[400px]">
              <div className="relative z-10 p-4">
                <img
                  src={testLibraryImage} // Biến đã được import
                  alt="Test Library"
                  className="rounded-2xl shadow-2xl w-full h-auto object-contain transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Phần Danh sách Test (Giữ nguyên) */}
      <section id="tests" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {testSets.length === 0 && (
            <p className="text-center text-gray-500">
              No tests found for {collection}.
            </p>
          )}

          {testSets.map((testSet) => (
            <div
              key={testSet.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {testSet.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {testSet.parts.map((part) => (
                  <TestPartCard key={part.id} part={part} />
                ))}
              </div>
            </div>
          ))}

          <Pagination />
        </div>
      </section>
    </div>
  );
}

export default TestSetPage;
