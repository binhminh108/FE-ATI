// src/components/Hero.jsx
import React from "react";
import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom"; // Import Link

const Hero = () => {
  return (
    <section
      // === THAY ĐỔI 1: Đổi nền sang 'cta-gradient' (xanh nhạt) ===
      className="hero-gradient pt-16 flex items-center"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* === THAY ĐỔI 2: Đổi màu chữ và dịch sang Tiếng Anh === */}
          {/* Left Content */}
          <div className="text-gray-800">
            <h1 className="text-blue-950 text-[56px] font-semibold   leading-[120%] tracking-tighter mb-6">
              Free Online IELTS Practice Tests
            </h1>
            <p className="text-gray-700 md:text-2xl mb-8 leading-relaxed">
              LexiPrep for IELTS – Practice & take mock tests online with a free
              test bank, including real & Cambridge tests. Simulated computer-based
              interface, with instant scoring.
            </p>
            {/* === THAY ĐỔI 3: Cập nhật style nút === */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup" // Thêm Link
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[8px] text-lg font-semibold btn-hover"
              >
                Start Learning Now
              </Link>
              <Link
                to="/ai-assessment" // Thêm Link
                className="bg-white border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:border-gray-500 px-8 py-4 rounded-[8px] text-lg font-semibold btn-hover"              >
                Take a Free Test
              </Link>
            </div>
          </div>

          {/* Right Image (sử dụng Carousel) */}
          <ImageCarousel />

        </div>
      </div>
    </section>
  );
};

export default Hero;