import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate để điều hướng sau khi login
import { Mail, Lock } from "lucide-react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook để điều hướng

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic đăng nhập ở đây (ví dụ: gọi API)
    console.log("Đăng nhập với:", { email, password });

    // Giả lập đăng nhập thành công và điều hướng về trang chủ
    alert("Đăng nhập thành công! (Giả lập)");
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Đăng nhập tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

          {/* Trường Password */}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ghi nhớ tôi
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>

          {/* Nút Đăng nhập */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors btn-hover"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Component phụ cho Input (để tái sử dụng)
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

export default LoginPage;
