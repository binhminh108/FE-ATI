const ScoreBar = ({ title, score }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium text-gray-700 text-sm">{title}</span>
      {/* Hiển thị dấu gạch ngang '-' nếu điểm là 0 */}
      <span className="font-bold text-teal-600">
        {score > 0 ? score.toFixed(1) : "-"}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-teal-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(score / 9) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ScoreBar;
