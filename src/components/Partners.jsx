// src/components/Partners.jsx
import React from "react";

const Partners = () => {
  const partners = [
    { name: "IDP", logo: "/images/gioi-thieu-ve-idp.jpg" },
    { name: "British Council", logo: "/images/british.png" },
    { name: "IPT IELTS", logo: "/images/ipp.png" },
    // Thêm các đối tác khác nếu muốn
  ];

  // Lặp lại mảng partners để tạo hiệu ứng marquee mượt mà
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          Được đồng hành bởi những đơn vị giáo dục uy tín hàng đầu Việt Nam
        </h2>

        {/* Sử dụng class 'animate-marquee' từ file App.css của bạn.
          Bạn cần đảm bảo file src/App.css có định nghĩa @keyframes 'marquee'
        */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee space-x-10">
            {duplicatedPartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white rounded-xl shadow p-6 w-48 h-28 flex-shrink-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 object-contain transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;