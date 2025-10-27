const TargetScore = ({ targetScore, setTargetScore }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Mục tiêu điểm</h2>
    <select
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      value={targetScore}
      onChange={(e) => setTargetScore(e.target.value)}
    >
      {["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"].map(
        (score) => (
          <option key={score} value={score}>
            {score}
          </option>
        )
      )}
    </select>
  </div>
);

export default TargetScore;
