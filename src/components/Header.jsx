import React, { useState } from "react";
import { Link } from "react-router-dom"; // Dùng Link của React Router

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Prep<span className="text-blue-800">IELTS</span>
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              {/* (Các link khác của bạn) */}
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Khóa học
              </a>
              <Link to="/ai-assessment" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Luyện thi AI
              </Link>
            </div>
          </nav>

          {/* CTA Buttons (ĐÃ THAY ĐỔI) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium btn-hover"
            >
              Đăng ký
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (ĐÃ CẬP NHẬT) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="text-gray-900 block px-3 py-2 text-base font-medium">Home</Link>
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">Khóa học</a>
              <Link to="/ai-assessment" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">Luyện thi AI</Link>
              
              <div className="border-t my-2"></div>
              
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              >
                Đăng nhập
              </Link>
              <Link
                to="/signup"
                className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-base font-medium mt-1"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
