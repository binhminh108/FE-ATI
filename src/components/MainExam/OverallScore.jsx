const OverallScore = ({ score, getScoreCircleStyle, getScoreLevel }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Điểm tổng</h2>
    <div className="relative w-32 h-32 mx-auto mb-4">
      <div
        className="w-full h-full rounded-full flex items-center justify-center"
        style={getScoreCircleStyle(score)}
      >
        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center border-4 border-white">
          <span className="text-3xl font-bold text-teal-600">
            {score > 0 ? score.toFixed(1) : "-"}
          </span>
        </div>
      </div>
    </div>
    <div className="h-2 rounded-full mb-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
    <div className="flex justify-between text-xs text-gray-500">
      <span>0</span>
      <span>2</span>
      <span>4</span>
      <span>6</span>
      <span>8</span>
      <span>10</span>
    </div>
    <p className="mt-2 text-base font-medium text-gray-600">
      {getScoreLevel(score)}
    </p>
  </div>
);

export default OverallScore;
