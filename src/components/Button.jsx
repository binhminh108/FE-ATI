// src/components/Button.jsx
import React from "react";
import { Link } from "react-router-dom";

function Button({ label, to }) {
  return (
    <Link
      to={to}
      className="inline-block border-2 border-black bg-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-blue-500 hover:text-white transition"
    >
      {label}
    </Link>
  );
}

export default Button;
