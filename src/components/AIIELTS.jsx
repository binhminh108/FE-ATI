// src/components/AIIELTS.jsx
import React from "react";
import { Link } from "react-router-dom"; // <-- THÊM DÒNG NÀY

const AIIELTS = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/images/bee.png"
            alt="Bee Mascot"
            className="w-32 h-auto"
          />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-blue-600">AI IELTS</span>{" "}
          for providing better test preparation
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Instantly get feedback on all four IELTS skills by uploading your
          answers. Our AI IELTS Assistant evaluates Listening, Reading, Writing,
          and Speaking with detailed comments.
        </p>
        <div className="flex justify-center">
          {/* THAY ĐỔI THẺ <a href="#"> BÊN DƯỚI... */}
          <Link
            to="/ai-assessment" // <-- THAY ĐỔI DÒNG NÀY
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg transition"
          >
            Try Now →
          </Link>
          {/* ...THÀNH THẺ <Link> NHƯ TRÊN */}
        </div>
      </div>
    </section>
  );
};

export default AIIELTS;