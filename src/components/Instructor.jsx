// src/components/Instructor.jsx
import React from "react";

// Dữ liệu giả lập cho giảng viên
const instructors = [
  {
    name: "Cô Minh Anh",
    ieltsScore: "8.5 IELTS",
    role: "Trưởng nhóm Writing",
    bio: "Cử nhân Ngôn ngữ Anh tại Đại học Cambridge, 5 năm kinh nghiệm luyện thi IELTS Writing.",
    avatar: "https://placehold.co/150x150/EBF4FF/3B82F6?text=GV+1", // Đổi màu
  },
  {
    name: "Thầy Đức Trung",
    ieltsScore: "9.0 IELTS",
    role: "Chuyên gia Speaking",
    bio: "Thạc sĩ TESOL tại Đại học Melbourne, cựu giám khảo IELTS với 8 năm kinh nghiệm.",
    avatar: "https://placehold.co/150x150/EBF4FF/3B82F6?text=GV+2", // Đổi màu
  },
  {
    name: "Cô Quỳnh Hương",
    ieltsScore: "8.5 IELTS",
    role: "Chuyên gia Reading",
    bio: "Tốt nghiệp loại Giỏi Đại học Ngoại Ngữ, chuyên gia về chiến thuật làm bài Reading.",
    avatar: "https://placehold.co/150x150/EBF4FF/3B82F6?text=GV+3", // Đổi màu
  },
  {
    name: "Thầy Hoàng Nam",
    ieltsScore: "8.5 IELTS",
    role: "Chuyên gia Listening",
    bio: "Phát âm chuẩn bản xứ (Úc), 6 năm kinh nghiệm giảng dạy Listening và luyện phát âm.",
    avatar: "https://placehold.co/150x150/EBF4FF/3B82F6?text=GV+4", // Đổi màu
  },
];

const Instructors = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đội ngũ giảng viên
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Đội ngũ chuyên gia 8.0+ IELTS với nhiều năm kinh nghiệm, luôn sẵn
            sàng đồng hành cùng bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              // === THAY ĐỔI Ở ĐÂY ===
              className="bg-white p-8 rounded-2xl shadow-lg card-hover text-center group overflow-hidden"
              // Thêm 'group' và 'overflow-hidden'
            >
              <img
                src={instructor.avatar}
                alt={instructor.name}
                // Thêm hiệu ứng zoom khi hover vào 'group'
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100 transition-transform duration-300 group-hover:scale-105"
              />
              {/* === HẾT THAY ĐỔI === */}
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {instructor.name}
              </h3>
              <span className="font-bold text-blue-600 text-lg mb-3 block">
                {instructor.ieltsScore}
              </span>
              <span className="text-sm font-medium text-gray-500 mb-4 block">
                {instructor.role}
              </span>
              <p className="text-gray-600 leading-relaxed text-sm">
                {instructor.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;