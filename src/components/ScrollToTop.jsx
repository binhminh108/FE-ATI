// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component này sẽ tự động cuộn lên đầu mỗi khi URL thay đổi
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Kích hoạt mỗi khi 'pathname' (đường dẫn) thay đổi

  return null; // Component này không render ra bất cứ thứ gì
}

export default ScrollToTop;