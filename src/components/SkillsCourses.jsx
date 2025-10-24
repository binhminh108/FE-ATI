// src/components/SkillsCourses.jsx
import React, { useState } from "react";

const SkillsCourses = () => {
  const [activeSkill, setActiveSkill] = useState("listening");

  const skills = [
    { id: "listening", name: "Listening", icon: "🎧" },
    { id: "reading", name: "Reading", icon: "📖" },
    { id: "writing", name: "Writing", icon: "✍️" },
    { id: "speaking", name: "Speaking", icon: "🗣️" },
  ];

  const courses = {
    listening: [
      {
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
        title: "IELTS Listening Foundation",
        description: "Nắm vững kỹ thuật nghe hiểu cơ bản, phân biệt giọng điệu và từ vựng chuyên ngành",
        lessons: "24 bài học",
        duration: "6 tuần",
      },
      {
                        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
                        title: "IELTS Listening Advanced",
                        description: "Luyện tập với đề thi thật, kỹ thuật nghe chi tiết và tổng quát nâng cao",
                        lessons: "32 bài học",
                        duration: "8 tuần"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
                        title: "IELTS Listening Practice Tests",
                        description: "Bộ đề thi thử Listening với 100+ bài test mô phỏng kỳ thi thật",
                        lessons: "100+ tests",
                        duration: "Không giới hạn"
                    }
                ],
    reading: [
      {
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
        title: "IELTS Reading Strategies",
        description: "Chiến lược đọc hiểu hiệu quả, kỹ thuật skimming và scanning",
        lessons: "28 bài học",
        duration: "7 tuần",
      },
      {
                        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop",
                        title: "Academic Reading Mastery",
                        description: "Luyện đọc văn bản học thuật, phân tích cấu trúc và từ vựng chuyên ngành",
                        lessons: "36 bài học",
                        duration: "9 tuần"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=200&fit=crop",
                        title: "Reading Speed & Accuracy",
                        description: "Tăng tốc độ đọc và độ chính xác trong thời gian giới hạn",
                        lessons: "20 bài học",
                        duration: "5 tuần"
                    }
    ],
    writing: [
      {
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop",
        title: "IELTS Writing Task 1",
        description: "Viết mô tả biểu đồ, bảng số liệu và quy trình một cách chính xác",
        lessons: "25 bài học",
        duration: "6 tuần",
      },
      {
                        image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=300&h=200&fit=crop",
                        title: "IELTS Writing Task 2",
                        description: "Viết luận argumentative essay với cấu trúc rõ ràng và ý tưởng sâu sắc",
                        lessons: "30 bài học",
                        duration: "8 tuần"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop",
                        title: "Writing Band 7+ Techniques",
                        description: "Kỹ thuật nâng cao để đạt điểm Writing 7.0+ với từ vựng và ngữ pháp phức tạp",
                        lessons: "40 bài học",
                        duration: "10 tuần"
                    }
    ],
    speaking: [
      {
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop",
        title: "IELTS Speaking Part 1",
        description: "Luyện tập trả lời câu hỏi cá nhân và chủ đề quen thuộc một cách tự nhiên",
        lessons: "20 bài học",
        duration: "5 tuần",
      },
       {
                        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop",
                        title: "IELTS Speaking Part 2 & 3",
                        description: "Kỹ năng thuyết trình 2 phút và thảo luận chuyên sâu về các chủ đề phức tạp",
                        lessons: "35 bài học",
                        duration: "9 tuần"
                    },
                    {
                        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
                        title: "Pronunciation & Fluency",
                        description: "Cải thiện phát âm, ngữ điệu và độ trưng thành trong giao tiếp",
                        lessons: "24 bài học",
                        duration: "6 tuần"
                    }
    ],
  };

  // Tạm thời chỉ lấy 1 course để demo, bạn hãy copy đủ 3 course cho mỗi skill
  const coursesToShow = courses[activeSkill].slice(0, 3); 

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Khóa học theo kỹ năng
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lựa chọn kỹ năng bạn muốn cải thiện và khám phá các khóa học chuyên biệt
          </p>
        </div>

        {/* Skill Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeSkill === skill.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{skill.icon}</span>
              {skill.name}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bạn hãy copy đủ 3 card cho mỗi skill từ test.html nhé */}
          {courses[activeSkill].map((course, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover slide-animation">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>📚 {course.lessons}</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium btn-hover">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCourses;