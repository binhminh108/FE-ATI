// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="hero-gradient pt-16 flex items-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Nâng cao điểm IELTS cùng
              <span className="text-yellow-300"> chuyên gia</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Phương pháp học hiệu quả, lộ trình cá nhân hóa và đội ngũ giảng viên 8.0+ IELTS giúp bạn đạt mục tiêu nhanh chóng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-full text-lg font-semibold btn-hover">
                Bắt đầu học ngay
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold btn-hover">
                Thi thử miễn phí
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Students studying IELTS"
              className="rounded-2xl shadow-2xl w-full"
            />
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold shadow-lg">
              🎯 Mục tiêu 7.0+
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              ✅ Cam kết đầu ra
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;