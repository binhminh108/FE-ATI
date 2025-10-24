// src/components/CTASection.jsx
import React from "react";

const CTASection = () => {
  return (
    <section className="hero-gradient py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Sẵn sàng chinh phục IELTS?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Tham gia cùng hàng nghìn học viên đã thành công đạt mục tiêu IELTS với Prep IELTS.
          Bắt đầu hành trình của bạn ngay hôm nay!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-full text-lg font-semibold btn-hover">
            Đăng ký học ngay
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold btn-hover">
            Tư vấn miễn phí
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">10,000+</div>
            <div className="text-blue-100">Học viên thành công</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
            <div className="text-blue-100">Tỷ lệ đạt mục tiêu</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">8.2</div>
            <div className="text-blue-100">Điểm trung bình</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;