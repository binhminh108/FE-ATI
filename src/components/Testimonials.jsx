// src/components/Testimonials.jsx
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                    name: "Nguyễn Minh Anh",
                    score: "8.0",
                    comment: "Prep IELTS đã giúp tôi từ 5.5 lên 8.0 chỉ trong 6 tháng. Phương pháp học rất khoa học và giảng viên nhiệt tình hỗ trợ."
                },
                {
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                    name: "Trần Đức Minh",
                    score: "7.5",
                    comment: "Hệ thống thi thử rất hay, giúp tôi làm quen với format đề thi và cải thiện kỹ năng làm bài một cách hiệu quả."
                },
                {
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                    name: "Lê Thị Hương",
                    score: "8.5",
                    comment: "Lộ trình học cá nhân hóa rất phù hợp. Tôi đã đạt 8.5 IELTS và được nhận học bổng du học Úc như mong muốn."
                },
                {
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                    name: "Phạm Văn Tùng",
                    score: "7.0",
                    comment: "AI chấm điểm rất chính xác, giúp tôi biết được điểm yếu và cải thiện nhanh chóng. Highly recommended!"
                },
                {
                    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                    name: "Hoàng Thị Mai",
                    score: "8.0",
                    comment: "Khóa học Writing rất chi tiết, từ cấu trúc đến từ vựng. Tôi đã cải thiện Writing từ 5.5 lên 8.0."
                },
                {
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                    name: "Ngô Thanh Sơn",
                    score: "7.5",
                    comment: "Speaking practice với AI rất thú vị và hiệu quả. Tôi tự tin hơn nhiều khi nói tiếng Anh."
                }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Học viên nói gì về chúng tôi?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hàng nghìn học viên đã đạt mục tiêu IELTS và thành công trong hành trình du học, định cư
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">⭐</span>
                    <span className="font-bold text-blue-600">IELTS {testimonial.score}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;