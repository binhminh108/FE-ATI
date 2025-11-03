// src/components/AIIELTS.jsx
import React from "react";
import { Link } from "react-router-dom";
// === THAY ĐỔI 1: Import 'Landmark' thay vì 'PenSquare' và 'Mic' ===
import { Landmark, ArrowRight } from "lucide-react";

const AIIELTS = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/images/bee.png"
            alt="Bee Mascot"
            className="w-50 h-auto transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
          <span className="text-blue-600">AI IELTS</span> for providing better
          test preparation
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Instantly get feedback on Writing and Speaking skills. Our AI
          Assistant evaluates your record with detailed comments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Card 1: Writing */}
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg text-left flex flex-col">
            {/* === THAY ĐỔI 2: Sử dụng icon 'Landmark' === */}
            <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mb-5">
              <Landmark className="w-8 h-8 text-blue-600" />
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Cambridge English IELTS Collection
            </h3>
            {/* Description */}
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              Free IELTS online mock tests with Cambridge sets, including both
              Academic & General Training.
            </p>
            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/cambridge-tests"
                className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium btn-hover"
              >
                Academic
              </Link>
            </div>
          </div>

          {/* Card 2: Speaking */}
          <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-lg text-left flex flex-col">
            {/* === THAY ĐỔI 3: Sử dụng icon 'Landmark' === */}
            <div className="w-16 h-16 bg-blue-100/70 rounded-full flex items-center justify-center mb-5">
              <Landmark className="w-8 h-8 text-blue-600" />
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Collins English IELTS Tests Collection
            </h3>
            {/* Description */}
            <p className="text-gray-600 text-lg mb-6 flex-grow">
              Free IELTS online mock tests with Collins sets, including both
              Academic & General Training.
            </p>
            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/collins-tests"
                className="bg-blue-600 hover:bg-blue-900 text-white px-6 py-2.5 rounded-lg font-medium btn-hover"
              >
                Academic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIIELTS;
