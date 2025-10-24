// src/pages/Homepage.jsx
import React from "react";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import Partners from "../components/Partners";
import AIIELTS from "../components/AIIELTS";
import SkillsCourses from "../components/SkillsCourses";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Instructors from "../components/Instructor";

// Trang chủ mới, tập hợp tất cả các section từ test.html
function Homepage() {
  return (
    <div>
      <Hero />
      <WhyChoose />
      <Partners />
      <AIIELTS />
      <SkillsCourses />
      <Instructors />
      <Testimonials />
      <CTASection />
      
      {/* Chúng ta không cần ChatbotWidget ở đây nữa
        vì nó đã được tích hợp vào App.jsx
      */}
    </div>
  );
}

export default Homepage;