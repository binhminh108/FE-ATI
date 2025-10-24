import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }
    // Xử lý logic đăng ký ở đây (ví dụ: gọi API)
    console.log("Đăng ký với:", { fullName, email, password });

    // Giả lập đăng ký thành công và điều hướng đến trang đăng nhập
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Trường Họ tên */}
          <InputGroup
            id="full-name"
            name="full-name"
            type="text"
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            icon={<User className="h-5 w-5 text-gray-400" />}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          {/* Trường Email */}
          <InputGroup
            id="email"
            name="email"
            type="email"
            label="Địa chỉ email"
            placeholder="email@example.com"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Trường Mật khẩu */}
          <InputGroup
            id="password"
            name="password"
            type="password"
            label="Mật khẩu"
            placeholder="••••••••"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Trường Xác nhận Mật khẩu */}
          <InputGroup
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="Xác nhận mật khẩu"
            placeholder="••••••••"
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Nút Đăng ký */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors btn-hover"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Component phụ cho Input (tái sử dụng)
const InputGroup = ({
  id,
  label,
  icon,
  value,
  onChange,
  ...props
}) => (
  <div className="relative rounded-md shadow-sm">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      id={id}
      value={value}
      onChange={onChange}
      className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      {...props}
    />
  </div>
);

export default SignupPage;
