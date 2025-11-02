// src/MainLayout.jsx
// (Tạo file mới này)

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

/**
 * Layout này bao gồm Header, Footer, và Chatbot.
 * Hầu hết các trang bình thường sẽ dùng layout này.
 */
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop /> {/* Vẫn giữ ScrollToTop ở đây */}
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* Đây là nơi các component trang (Homepage, List...) sẽ render */}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MainLayout;