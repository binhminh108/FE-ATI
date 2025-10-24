// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-4">
              Prep<span className="text-white">IELTS</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Nền tảng luyện thi IELTS trực tuyến hàng đầu Việt Nam với phương pháp học hiệu quả
              và đội ngũ giảng viên chuyên nghiệp.
            </p>
            {/* Social media icons (SVGs) - bạn có thể giữ hoặc bỏ */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Khóa học</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Thi thử</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📧 info@prepielts.vn</li>
              <li>📞 1900 1234</li>
              <li>📍 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Prep IELTS. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;