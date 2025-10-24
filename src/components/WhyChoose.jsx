// src/components/WhyChoose.jsx
import React from "react";

const WhyChoose = () => {
  const features = [
    {
      icon: "🎯",
      title: "Lộ trình cá nhân hóa",
      description: "Đánh giá năng lực và xây dựng lộ trình học phù hợp với từng học viên",
    },
    {
      icon: "👨‍🏫",
      title: "Giảng viên 8.0+ IELTS",
      description: "Đội ngũ giảng viên có chứng chỉ IELTS 8.0+ và kinh nghiệm giảng dạy lâu năm",
    },
    {
      icon: "📊",
      title: "Phân tích 4 kỹ năng",
      description: "Theo dõi và phân tích chi tiết tiến độ học tập qua 4 kỹ năng Listening, Reading, Writing, Speaking",
    },
    {
      icon: "🏆",
      title: "Thi thử không giới hạn",
      description: "Hệ thống thi thử mô phỏng 100% kỳ thi thật với kho đề thi cập nhật liên tục",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến phương pháp học IELTS hiệu quả nhất với công nghệ hiện đại và đội ngũ chuyên gia hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;